import React, { useState } from 'react';
import { getInitials, getAvatarColor } from '../utils/avatarUtils';

const Avatar = ({ 
    type = 'user',
    image, 
    name, 
    size = 'md',
    className = '',
    showOnline = false,
    borderColor = 'gray-200'
}) => {
    const [imageError, setImageError] = useState(false);

    const sizeClasses = {
        xs: 'w-8 h-8',
        sm: 'w-10 h-10',
        md: 'w-12 h-12',
        lg: 'w-14 h-14'
    };

    const textSizeClasses = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
    };

    const onlineDotSize = {
        xs: 'w-2 h-2',
        sm: 'w-3 h-3',
        md: 'w-3 h-3',
        lg: 'w-4 h-4'
    };

    // Fonction pour gérer l'URL de l'image
    const getImageUrl = (img) => {
        if (!img) return null;
        if (img.startsWith('http')) return img;
        return `http://localhost:3001/${img}`;
    };

    const imageUrl = getImageUrl(image);

    // Si l'image existe et n'a pas d'erreur, l'afficher
    if (imageUrl && !imageError) {
        return (
            <div className={`relative ${className}`}>
                <img 
                    className={`${sizeClasses[size]} border-2 border-${borderColor} rounded-full object-cover`}
                    src={imageUrl}
                    alt={name || 'User'}
                    onError={() => setImageError(true)}
                />
                {showOnline && (
                    <div className={`${onlineDotSize[size]} bg-green-500 rounded-full absolute -bottom-1 -right-1 border-2 border-white`}></div>
                )}
            </div>
        );
    }

    // Sinon, afficher les initiales
    const initials = getInitials(name);
    const bgColor = getAvatarColor(name);

    return (
        <div className={`relative ${className}`}>
            <div 
                className={`${sizeClasses[size]} border-2 border-${borderColor} rounded-full flex items-center justify-center font-bold text-white ${textSizeClasses[size]}`}
                style={{ backgroundColor: bgColor }}
            >
                {initials}
            </div>
            {showOnline && (
                <div className={`${onlineDotSize[size]} bg-green-500 rounded-full absolute -bottom-1 -right-1 border-2 border-white`}></div>
            )}
        </div>
    );
};

export default Avatar;
