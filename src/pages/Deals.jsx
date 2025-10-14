import React, { useState, useEffect } from 'react';
import { FaClock, FaPercent, FaEye, FaRegHeart } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_card, add_to_wishlist, messageClear } from '../store/reducers/cardReducer';
import toast from 'react-hot-toast';
import { dealsAPI } from '../api/deals';

const Deals = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { successMessage, errorMessage } = useSelector(state => state.card);
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [promotionEndTime, setPromotionEndTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        fetchDeals();
        fetchPromotionSettings();
    }, []);

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
                // Fallback: 24h à partir de maintenant
                const fallbackEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
                setPromotionEndTime(fallbackEndTime.toISOString());
            }
        } catch (error) {
            console.log('Paramètres promotion non disponibles, utilisation du fallback');
            // Fallback: 24h à partir de maintenant
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

    const staticDeals = [
        { 
            _id: 1, 
            name: "Sac en Cuir Traditionnel", 
            price: 30000, 
            discount: 33, 
            images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"], 
            category: "flash",
            rating: 4.8,
            slug: "sac-cuir-traditionnel"
        },
        { 
            _id: 2, 
            name: "Bijoux en Or Sénégalais", 
            price: 60000, 
            discount: 29, 
            images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop"], 
            category: "flash",
            rating: 4.9,
            slug: "bijoux-or-senegalais"
        },
        { 
            _id: 3, 
            name: "Sculpture Bois d'Ébène", 
            price: 80000, 
            discount: 33, 
            images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"], 
            category: "daily",
            rating: 4.7,
            slug: "sculpture-bois-ebene"
        },
        { 
            _id: 4, 
            name: "Tissu Wax Authentique", 
            price: 18000, 
            discount: 28, 
            images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop"], 
            category: "daily",
            rating: 4.6,
            slug: "tissu-wax-authentique"
        }
    ];

    const flashDeals = deals.filter(deal => deal.category === 'flash');
    const dailyDeals = deals.filter(deal => deal.category === 'daily');
    
    const ProductCard = ({ product }) => (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 group">
            <div className="relative bg-gray-50 p-4">
                {product.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm z-10">
                        -{product.discount}%
                    </span>
                )}
                
                <div className="aspect-square flex items-center justify-center">
                    <img
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        src={product.images[0]}
                        alt={product.name}
                    />
                </div>
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
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
                    <h3 className="font-medium text-gray-900 hover:text-green-600 transition-colors text-sm mb-2 line-clamp-2 leading-tight">
                        {product.name}
                    </h3>
                </Link>
                
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        {product.discount ? (
                            <>
                                <span className="text-lg font-bold text-green-600">
                                    {product.salePrice} FCFA
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                    {product.originalPrice} FCFA
                                </span>
                            </>
                        ) : (
                            <span className="text-lg font-bold text-gray-900">
                                {product.price} FCFA
                            </span>
                        )}
                    </div>
                    <Rating ratings={product.rating} />
                </div>
            </div>
        </div>
    );

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
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Promotions Exclusives
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Découvrez notre sélection d'artisanat sénégalais authentique à prix exceptionnels
                        </p>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block border border-white/20">
                            <p className="text-sm mb-3 text-gray-300">Offre limitée - Se termine dans :</p>
                            <div className="flex gap-4 text-2xl font-bold">
                                <div className="text-center">
                                    <div className="bg-white text-gray-900 rounded-xl px-4 py-3 min-w-[60px]">{timeLeft.hours.toString().padStart(2, '0')}</div>
                                    <div className="text-xs mt-2 text-gray-300">Heures</div>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white text-gray-900 rounded-xl px-4 py-3 min-w-[60px]">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                                    <div className="text-xs mt-2 text-gray-300">Minutes</div>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white text-gray-900 rounded-xl px-4 py-3 min-w-[60px]">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                                    <div className="text-xs mt-2 text-gray-300">Secondes</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[85%] mx-auto py-12">
                    {/* Flash Deals */}
                    {flashDeals.length > 0 && (
                        <section className="mb-12">
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <FaClock className="text-red-500 text-xl" />
                                        <h2 className="text-2xl font-bold text-gray-900">Ventes Flash</h2>
                                        <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                                            Temps limité
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">Profitez de nos offres exceptionnelles</p>
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
                        <section className="mb-12">
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <FaPercent className="text-green-600 text-xl" />
                                        <h2 className="text-2xl font-bold text-gray-900">Sélection du Jour</h2>
                                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                            Nouveautés quotidiennes
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">Découvrez nos coups de cœur quotidiens</p>
                            </div>
                            
                            <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                                {dailyDeals.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Newsletter */}
                    <section className="bg-gray-900 text-white rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">Restez informé de nos promotions</h2>
                        <p className="text-gray-300 mb-6 max-w-md mx-auto">
                            Recevez en exclusivité nos meilleures offres
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input 
                                type="email" 
                                placeholder="Votre adresse email" 
                                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                S'abonner
                            </button>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Deals;