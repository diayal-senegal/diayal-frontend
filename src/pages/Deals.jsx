import React, { useState, useEffect } from 'react';
import { FaClock, FaPercent, FaEye, FaRegHeart, FaFire, FaTags, FaBolt } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_card, add_to_wishlist, messageClear } from '../store/reducers/cardReducer';
import toast from 'react-hot-toast';
import { dealsAPI } from '../api/deals';

const CountdownTimer = ({ promotionEndTime }) => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        if (!promotionEndTime) return;
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const endTime = new Date(promotionEndTime).getTime();
            const difference = endTime - now;
            
            if (difference > 0) {
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                
                setTimeLeft({ hours, minutes, seconds });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [promotionEndTime]);

    return (
        <div className="flex gap-3 text-2xl font-bold">
            <div className="text-center">
                <div className="bg-gradient-to-br from-white to-purple-100 text-purple-900 rounded-xl px-5 py-4 min-w-[70px] shadow-lg">
                    {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-xs mt-2 text-purple-200 font-semibold">Heures</div>
            </div>
            <div className="text-3xl self-center text-white/50">:</div>
            <div className="text-center">
                <div className="bg-gradient-to-br from-white to-purple-100 text-purple-900 rounded-xl px-5 py-4 min-w-[70px] shadow-lg">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-xs mt-2 text-purple-200 font-semibold">Minutes</div>
            </div>
            <div className="text-3xl self-center text-white/50">:</div>
            <div className="text-center">
                <div className="bg-gradient-to-br from-white to-purple-100 text-purple-900 rounded-xl px-5 py-4 min-w-[70px] shadow-lg">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-xs mt-2 text-purple-200 font-semibold">Secondes</div>
            </div>
        </div>
    );
};

const Deals = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { successMessage, errorMessage } = useSelector(state => state.card);
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [promotionEndTime, setPromotionEndTime] = useState(null);

    useEffect(() => {
        fetchDeals();
        fetchPromotionSettings();
    }, []);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    const fetchDeals = async () => {
        try {
            const data = await dealsAPI.getDeals();

            setDeals(data.deals || staticDeals);
        } catch (error) {
            console.log('API non disponible, utilisation des données statiques');
            setDeals(staticDeals);
        } finally {
            setLoading(false);
        }
    };

    const fetchPromotionSettings = async () => {
        try {
            const data = await dealsAPI.getPromotionSettings();
            if (data.endTime) {
                setPromotionEndTime(data.endTime);
            } else {
                const fallbackEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
                setPromotionEndTime(fallbackEndTime.toISOString());
            }
        } catch (error) {
            console.error('Erreur paramètres promotion:', error);
            const fallbackEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
            setPromotionEndTime(fallbackEndTime.toISOString());
        }
    };

    const add_card = (id) => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity: 1,
                productId: id
            }));
        } else {
            navigate('/login');
        }
    };

    const add_wishlist = (pro) => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: pro._id,
                name: pro.name,
                price: pro.price,
                images: pro.images[0],
                discount: pro.discount,
                rating: pro.rating,
                slug: pro.slug
            }));
        } else {
            navigate('/login');
        }
    };

    const getBadgeInfo = (discount) => {
        if (discount >= 50) return { text: 'MEGA PROMO', color: 'bg-gradient-to-r from-red-600 to-pink-600', icon: FaFire };
        if (discount >= 30) return { text: 'SUPER DEAL', color: 'bg-gradient-to-r from-orange-500 to-red-500', icon: FaBolt };
        if (discount >= 20) return { text: 'PROMO', color: 'bg-gradient-to-r from-yellow-500 to-orange-500', icon: FaTags };
        return { text: 'OFFRE', color: 'bg-gradient-to-r from-green-500 to-teal-500', icon: FaPercent };
    };

    const staticDeals = [
        { 
            _id: 1, 
            name: "Sac en Cuir Traditionnel", 
            price: 30000, 
            discount: 33, 
            images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"], 
            category: "flash",
            rating: 4.8,
            slug: "sac-cuir-traditionnel",
            stock: 12
        },
        { 
            _id: 2, 
            name: "Bijoux en Or Sénégalais", 
            price: 60000, 
            discount: 29, 
            images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop"], 
            category: "flash",
            rating: 4.9,
            slug: "bijoux-or-senegalais",
            stock: 8
        },
        { 
            _id: 3, 
            name: "Sculpture Bois d'Ébène", 
            price: 80000, 
            discount: 33, 
            images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"], 
            category: "daily",
            rating: 4.7,
            slug: "sculpture-bois-ebene",
            stock: 15
        },
        { 
            _id: 4, 
            name: "Tissu Wax Authentique", 
            price: 18000, 
            discount: 28, 
            images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop"], 
            category: "daily",
            rating: 4.6,
            slug: "tissu-wax-authentique",
            stock: 25
        }
    ];

    const flashDeals = deals.filter(deal => deal.category === 'flash');
    const dailyDeals = deals.filter(deal => deal.category === 'daily');
    
    const calculateSalePrice = (price, discount) => {
        return Math.round(price - (price * discount / 100));
    };

    const ProductCard = React.memo(({ product }) => {
        const badgeInfo = getBadgeInfo(product.discount);
        const BadgeIcon = badgeInfo.icon;
        const salePrice = calculateSalePrice(product.price, product.discount);
        const savings = product.price - salePrice;

        return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-purple-300 group">
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 min-h-[280px] overflow-hidden">
                {product.discount && (
                    <div className="absolute top-2 left-2 right-2 z-20 flex items-start justify-between gap-2">
                        <div className={`${badgeInfo.color} text-white px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 font-bold text-xs`}>
                            <BadgeIcon className="text-sm" />
                            -{product.discount}%
                        </div>
                        <div className="bg-black/80 text-white px-2 py-1 rounded-md text-xs font-semibold backdrop-blur-sm whitespace-nowrap">
                            {badgeInfo.text}
                        </div>
                    </div>
                )}
                
                {product.stock && product.stock < 10 && (
                    <div className="absolute bottom-2 left-2 z-20">
                        <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <FaFire className="text-xs" />
                            Plus que {product.stock}
                        </div>
                    </div>
                )}
                
                <div className="aspect-square flex items-center justify-center overflow-hidden">
                    <img
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        src={product.images[0]}
                        alt={product.name}
                    />
                </div>
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                    <div className="flex gap-2 pointer-events-auto">
                        <button
                            onClick={() => add_wishlist(product)}
                            className="w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all duration-200"
                        >
                            <FaRegHeart className="text-sm" />
                        </button>
                        <Link
                            to={`/product/details/${product.slug}`}
                            className="w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-all duration-200"
                        >
                            <FaEye className="text-sm" />
                        </Link>
                        <button
                            onClick={() => add_card(product._id)}
                            className="w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-md hover:bg-green-500 hover:text-white transition-all duration-200"
                        >
                            <RiShoppingCartLine className="text-sm" />
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="p-4">
                <Link to={`/product/details/${product.slug}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-purple-600 transition-colors text-sm mb-3 line-clamp-2 leading-tight">
                        {product.name}
                    </h3>
                </Link>
                
                <div className="flex items-center justify-between mb-3">
                    <Rating ratings={product.rating} />
                    <span className="text-xs text-gray-500">({product.rating})</span>
                </div>

                <div className="space-y-2">
                    {product.discount ? (
                        <>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-green-600">
                                    {salePrice.toLocaleString()}
                                </span>
                                <span className="text-xs text-gray-600">FCFA</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400 line-through">
                                    {product.price.toLocaleString()} FCFA
                                </span>
                                <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                                    Économisez {savings.toLocaleString()} FCFA
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                                {product.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-600">FCFA</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
        );
    });

    if (loading) {
        return (
            <div>
                <Header />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                        <p className="text-gray-600">Chargement des promotions...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMC00YzEuMSAwIDItLjkgMi0ycy0uOS0yLTItMi0yIC45LTIgMiAuOSAyIDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <div className="inline-block mb-4">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                <FaFire className="text-orange-400 animate-pulse" />
                                <span className="text-sm font-semibold">Offres Limitées</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                            Promotions Exclusives
                        </h1>
                        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                            Découvrez notre sélection d'artisanat sénégalais authentique à prix exceptionnels
                        </p>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 inline-block border border-white/30 shadow-2xl">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <FaClock className="text-yellow-300" />
                                <p className="text-sm font-semibold text-purple-100">Offre limitée - Se termine dans :</p>
                            </div>
                            <CountdownTimer promotionEndTime={promotionEndTime} />
                        </div>
                    </div>
                </div>

                <div className="w-[85%] mx-auto py-12">
                    {/* Flash Deals */}
                    {flashDeals.length > 0 && (
                        <section className="mb-16">
                            <div className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border-l-4 border-red-500">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-red-500 p-3 rounded-xl shadow-lg">
                                            <FaBolt className="text-white text-2xl" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-gray-900">Ventes Flash</h2>
                                            <p className="text-sm text-gray-600 mt-1">Profitez de nos offres exceptionnelles avant qu'il ne soit trop tard</p>
                                        </div>
                                    </div>
                                    <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse flex items-center gap-2">
                                        <FaFire />
                                        Temps limité
                                    </div>
                                </div>
                            </div>
                            
                            <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                                {flashDeals.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Daily Deals */}
                    {dailyDeals.length > 0 && (
                        <section className="mb-16">
                            <div className="mb-8 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border-l-4 border-green-500">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-500 p-3 rounded-xl shadow-lg">
                                            <FaTags className="text-white text-2xl" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-gray-900">Sélection du Jour</h2>
                                            <p className="text-sm text-gray-600 mt-1">Découvrez nos coups de cœur quotidiens sélectionnés avec soin</p>
                                        </div>
                                    </div>
                                    <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                                        <FaPercent />
                                        Nouveautés
                                    </div>
                                </div>
                            </div>
                            
                            <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                                {dailyDeals.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Newsletter */}
                    <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white rounded-2xl p-10 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMC00YzEuMSAwIDItLjkgMi0ycy0uOS0yLTItMi0yIC45LTIgMiAuOSAyIDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
                        <div className="relative z-10">
                            <div className="inline-block mb-4">
                                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
                                    <FaPercent className="text-3xl text-yellow-300" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Restez informé de nos promotions</h2>
                            <p className="text-purple-100 mb-8 max-w-md mx-auto text-lg">
                                Recevez en exclusivité nos meilleures offres et ne manquez aucune promotion
                            </p>
                            <div className="flex flex-col gap-3 max-w-lg mx-auto">
                                <input 
                                    type="email" 
                                    placeholder="Votre adresse email" 
                                    className="w-full px-5 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg"
                                />
                                <button className="w-full bg-white text-purple-900 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    S'abonner
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Deals;