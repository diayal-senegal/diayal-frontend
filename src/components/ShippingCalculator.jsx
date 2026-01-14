import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculate_shipping, setCustomerRegion } from '../store/reducers/shippingReducer';
import { SHIPPING_CONFIG } from '../config/shippingConfig';

const ShippingCalculator = ({ cartItems, onShippingUpdate }) => {
    const dispatch = useDispatch();
    const {
        customerRegion: customerRegionFromStore,
        shippingBySeller,
        totalShipping,
        loader
    } = useSelector(state => state.shipping);

    const [customerRegion, setCustomerRegionLocal] = useState(customerRegionFromStore || 'Dakar');
    const onShippingUpdateRef = useRef(onShippingUpdate);

    useEffect(() => {
        onShippingUpdateRef.current = onShippingUpdate;
    }, [onShippingUpdate]);

    // Group cart items by seller with seller info
    const groupedBySeller = useMemo(() => {
        if (!cartItems || cartItems.length === 0) return {};

        return cartItems.reduce((acc, item) => {
            const productInfo = item.productInfo || item;
            const sellerId = productInfo.sellerId;
            const shopName = productInfo.shopName;
            if (!sellerId) return acc;

            if (!acc[sellerId]) {
                acc[sellerId] = {
                    items: [],
                    shopName: shopName || 'Vendeur'
                };
            }
            acc[sellerId].items.push(item);

            return acc;
        }, {});
    }, [cartItems]);

    // Compute order amount per seller
    const sellerTotals = useMemo(() => {
        const result = {};
        Object.entries(groupedBySeller).forEach(([sellerId, sellerData]) => {
            const items = sellerData.items || [];
            const amount = items.reduce((sum, it) => {
                const p = it.productInfo || it;
                const price = Number(p.price || it.price || 0);
                const discount = Number(p.finalDiscount || p.discount || 0);
                const finalPrice = discount > 0 ? price - Math.floor((price * discount) / 100) : price;
                const qty = Number(it.quantity || 1);
                return sum + finalPrice * qty;
            }, 0);

            result[sellerId] = amount;
        });
        return result;
    }, [groupedBySeller]);

    // Sync region in Redux
    useEffect(() => {
        dispatch(setCustomerRegion(customerRegion));
    }, [customerRegion, dispatch]);

    // Calculate shipping PER SELLER (only once or when region changes)
    const [calculatedSellers, setCalculatedSellers] = useState(new Set());

    useEffect(() => {
        const sellerIds = Object.keys(sellerTotals);
        if (sellerIds.length === 0) return;

        sellerIds.forEach((sellerId) => {
            const key = `${sellerId}-${customerRegion}-${sellerTotals[sellerId]}`;
            if (!calculatedSellers.has(key)) {
                console.log('🚚 Calcul livraison pour:', {
                    sellerId,
                    shopName: groupedBySeller[sellerId]?.shopName,
                    orderAmount: sellerTotals[sellerId],
                    customerRegion
                });
                dispatch(calculate_shipping({
                    sellerId,
                    orderAmount: sellerTotals[sellerId],
                    customerRegion
                }));
                setCalculatedSellers(prev => new Set([...prev, key]));
            }
        });
    }, [customerRegion, sellerTotals, dispatch, calculatedSellers, groupedBySeller]);

    // Reset calculated sellers when region changes
    useEffect(() => {
        setCalculatedSellers(new Set());
    }, [customerRegion]);

    // Notify parent
    useEffect(() => {
        if (!onShippingUpdateRef.current) return;
        console.log('📦 Mise à jour shipping info:', {
            totalShipping,
            shippingBySeller,
            customerRegion
        });
        onShippingUpdateRef.current({
            totalShipping,
            shippingBySeller,
            customerRegion,
            hasPromotion: false,
            savings: 0
        });
    }, [totalShipping, shippingBySeller, customerRegion]);

    const sellerIds = Object.keys(groupedBySeller);

    return (
        <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Calcul de livraison</h3>

            {/* Region Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre région
                </label>
                <select
                    value={customerRegion}
                    onChange={(e) => setCustomerRegionLocal(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    {SHIPPING_CONFIG.REGIONS.map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
            </div>

            {/* Per seller breakdown */}
            <div className="space-y-3">
                {sellerIds.length === 0 ? (
                    <div className="text-sm text-gray-500">Ajoutez un article pour calculer la livraison.</div>
                ) : (
                    sellerIds.map((sellerId) => {
                        const sellerShipping = shippingBySeller?.[sellerId];
                        const cost = sellerShipping?.shippingCost;
                        const isFree = sellerShipping?.freeShipping;
                        const promoMessage = sellerShipping?.promotionMessage;
                        const originalCost = sellerShipping?.originalShippingCost;
                        const sellerAmount = sellerTotals?.[sellerId] || 0;
                        const shopName = groupedBySeller[sellerId]?.shopName || 'Vendeur';

                        return (
                            <div key={sellerId} className="flex items-center justify-between rounded-md border p-3">
                                <div className="flex-1">
                                    <div className="text-sm font-semibold text-gray-900">
                                        {shopName}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Montant: {sellerAmount.toLocaleString('fr-FR')} F
                                    </div>
                                    {isFree && promoMessage && (
                                        <div className="text-xs text-green-600 mt-1">
                                            🎉 {promoMessage}
                                        </div>
                                    )}
                                </div>

                                <div className="text-right">
                                    <div className="text-sm text-gray-600">Livraison</div>
                                    {isFree ? (
                                        <div>
                                            <div className="font-semibold text-green-600">GRATUIT</div>
                                            {originalCost > 0 && (
                                                <div className="text-xs text-gray-400 line-through">
                                                    {originalCost.toLocaleString('fr-FR')} F
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="font-semibold text-gray-900">
                                            {loader && (cost === undefined || cost === null) ? 'Calcul…' : `${(cost ?? 0).toLocaleString('fr-FR')} F`}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Total */}
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="text-gray-700 font-medium">Total livraison</span>
                <span className="text-gray-900 font-bold">
                    {loader && sellerIds.length > 0 && totalShipping === 0 ? 'Calcul…' : `${(totalShipping || 0).toLocaleString('fr-FR')} F`}
                </span>
            </div>

            <div className="mt-2 text-xs text-gray-500">
                Règle: Dakar = 2200 F / Hors Dakar = 2200 F + surcharge région (par vendeur/colis)
            </div>
        </div>
    );
};

export default ShippingCalculator;