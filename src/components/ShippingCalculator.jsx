import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculate_shipping } from '../store/reducers/shippingReducer';

const ShippingCalculator = ({ cartItems, onShippingUpdate }) => {
    const dispatch = useDispatch();
    const { shippingCost, freeShipping, promotionMessage, loader } = useSelector(state => state.shipping);
    const [customerRegion, setCustomerRegion] = useState('Dakar');
    const [originalShippingCost, setOriginalShippingCost] = useState(5000);
    const onShippingUpdateRef = useRef(onShippingUpdate);
    const [isCalculating, setIsCalculating] = useState(false);
    
    // Update ref when callback changes
    useEffect(() => {
        onShippingUpdateRef.current = onShippingUpdate;
    }, [onShippingUpdate]);

    const regions = [
        'Dakar', 'Thiès', 'Saint-Louis', 'Diourbel', 'Louga', 
        'Tambacounda', 'Kaolack', 'Ziguinchor', 'Fatick', 
        'Kolda', 'Matam', 'Kaffrine', 'Kédougou', 'Sédhiou'
    ];

    // Group cart items by seller
    const groupedBySeller = React.useMemo(() => {
        if (!cartItems || cartItems.length === 0) return {};
        
        return cartItems.reduce((acc, item) => {
            const productInfo = item.productInfo || item;
            const sellerId = productInfo.sellerId;
            if (sellerId) {
                if (!acc[sellerId]) {
                    acc[sellerId] = [];
                }
                acc[sellerId].push(item);
            }
            return acc;
        }, {});
    }, [cartItems]);



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
                    onChange={(e) => setCustomerRegion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
            </div>

            {/* Shipping Cost Display */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Frais de livraison:</span>
                    <span className="font-semibold text-gray-900">5000 F</span>
                </div>
            </div>
        </div>
    );
};

export default ShippingCalculator;