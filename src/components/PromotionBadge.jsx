import React from 'react';

const PromotionBadge = ({ sellerPromotion, userRegion = 'Dakar' }) => {
    // Check if promotion should be displayed
    const shouldShowPromotion = () => {
        if (!sellerPromotion || !sellerPromotion.isActive) return false;
        if (!sellerPromotion.message) return false;
        if (sellerPromotion.regions && sellerPromotion.regions.length > 0) {
            return sellerPromotion.regions.includes(userRegion);
        }
        return true;
    };

    if (!shouldShowPromotion()) return null;

    return (
        <div className="bg-green-100 border border-green-300 rounded-md px-3 py-2 mt-2">
            <div className="flex items-center">
                <span className="text-green-600 text-sm mr-2">🚚</span>
                <span className="text-green-800 text-sm font-medium">
                    {sellerPromotion.message}
                </span>
            </div>
        </div>
    );
};

export default PromotionBadge;