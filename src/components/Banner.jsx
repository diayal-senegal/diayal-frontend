import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [currentBanner, setCurrentBanner] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const loadBanners = async () => {
            // 1. Essayer localStorage frontend
            let frontendBanners = JSON.parse(localStorage.getItem('frontendBanners') || '[]');
            
            // 2. Si vide, essayer de charger depuis banners.json
            if (frontendBanners.length === 0) {
                try {
                    const response = await fetch('/banners.json?t=' + Date.now());
                    if (response.ok) {
                        const jsonBanners = await response.json();
                        if (jsonBanners && jsonBanners.length > 0) {
                            frontendBanners = jsonBanners;
                            localStorage.setItem('frontendBanners', JSON.stringify(jsonBanners));
                        }
                    }
                } catch (error) {
                    console.log('Erreur chargement banners.json');
                }
            }
            
            setBanners(frontendBanners);
            console.log('Bannières chargées:', frontendBanners.length);
        };

        loadBanners();
        
        // Écouter les messages du dashboard
        const handleMessage = (event) => {
            if (event.origin === 'http://localhost:3001' && event.data.type === 'SYNC_BANNERS') {
                setBanners(event.data.banners);
                localStorage.setItem('frontendBanners', JSON.stringify(event.data.banners));
                console.log('Bannières synchronisées depuis dashboard:', event.data.banners.length);
            }
        };

        const handleStorageChange = (e) => {
            if (e.key === 'frontendBanners') {
                loadBanners();
            }
        };

        window.addEventListener('message', handleMessage);
        window.addEventListener('storage', handleStorageChange);
        const interval = setInterval(loadBanners, 3000);

        return () => {
            window.removeEventListener('message', handleMessage);
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (banners.length > 1) {
            const interval = setInterval(() => {
                setCurrentBanner((prev) => (prev + 1) % banners.length);
            }, 7000); // Change toutes les 7 secondes

            return () => clearInterval(interval);
        }
    }, [banners.length]);

    if (banners.length === 0) {
        return null; // Ne rien afficher s'il n'y a pas de bannières
    }

    const banner = banners[currentBanner];

    const handleBannerClick = (banner) => {
        console.log('Clic sur bannière de:', banner.sellerName, 'Action:', banner.clickAction);
        
        if (banner.clickAction === 'product' && banner.productSlug) {
            // Naviguer vers le produit spécifique
            navigate(`/product/details/${banner.productSlug}`);
        } else if (banner.clickAction === 'shops' || banner.shopUrl) {
            // Naviguer vers la page des boutiques
            navigate('/shops');
        } else {
            // Fallback vers les produits
            navigate('/products');
        }
    };

    return (
        <div className="relative w-full">
            {/* Container principal avec hauteur fixe comme panier/shipping */}
            <div className="relative w-full h-[590px] sm:h-[400px] md:h-[450px] lg:h-[420px]">
                <div 
                    className="absolute inset-0 bg-contain bg-no-repeat bg-center overflow-hidden cursor-pointer group"
                    onClick={() => handleBannerClick(banner)}
                    style={{ backgroundImage: `url(${banner.image})` }}
                >
                    {/* Overlay sombre comme panier/shipping */}
                    {/* <div className="absolute inset-0 bg-[#2422228a]"></div> */}
                    
                    {/* Contenu en haut à gauche */}
                    <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
                        <div className="flex flex-col justify-start gap-1 items-start h-full w-full text-black pt-6">
                            <h2 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-left">Boutique de {banner.sellerName}</h2>
                            <div className="flex flex-col sm:flex-row justify-start items-start gap-2 text-sm sm:text-base lg:text-lg">
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                    // banner.bannerType === 'vip' ? 'bg-purple-600' :
                                    // banner.bannerType === 'premium' ? 'bg-blue-600' :
                                    'bg-gray-600'
                                }`}>
                                    {/* {banner.bannerType === 'vip' ? '👑 VIP' :
                                     banner.bannerType === 'premium' ? '⭐ PREMIUM' :
                                     '🏷️ GRATUIT'} */}
                                </span>
                                {/* <span></span> */}
                                {/* <span>Cliquez pour visiter la boutique</span> */}
                            </div>
                        </div>
                    </div>
                    
                    {/* Boutons de navigation adaptés */}
                    {banners.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentBanner(currentBanner === 0 ? banners.length - 1 : currentBanner - 1);
                                }}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
                            >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentBanner(currentBanner === banners.length - 1 ? 0 : currentBanner + 1);
                                }}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
                            >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>
            
            {/* Indicateurs de pagination compacts */}
            {banners.length > 1 && (
                <div className="flex justify-center mt-1 sm:mt-3 space-x-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentBanner(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentBanner 
                                    ? 'w-6 bg-blue-600' 
                                    : 'w-2 bg-gray-400 hover:bg-gray-500'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Banner;