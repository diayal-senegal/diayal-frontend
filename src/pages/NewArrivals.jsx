import React, { useState, useEffect } from 'react';
import { FaStar, FaCalendarAlt, FaRocket, FaGift, FaEye, FaHeart, FaShoppingCart, FaClock, FaRegHeart } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import { useSelector, useDispatch } from 'react-redux';
import { get_category, query_products, get_new_arrivals, get_arrival_stats } from '../store/reducers/homeReducer';

const NewArrivals = () => {
    const dispatch = useDispatch();
    const { categorys, products, newArrivals, arrivalStats, newArrivalLoading } = useSelector(state => state.home);
    const [activeCategory, setActiveCategory] = useState('all');


    // Utilisation uniquement des catégories dynamiques de la base de données
    const categories = [
        { id: 'all', name: 'Toutes créations', icon: FaRocket },
        ...categorys.map(cat => ({
            id: cat.slug,
            name: cat.name,
            icon: FaRocket
        }))
    ];

    // Charger les données de la base
    useEffect(() => {
        dispatch(get_category());
    }, [dispatch]);

    useEffect(() => {
        const category = activeCategory === 'all' ? '' : activeCategory;
        dispatch(get_new_arrivals({ category, limit: 20 }));
        dispatch(get_arrival_stats());
        
        // Charger aussi les produits par catégorie pour le fallback
        if (activeCategory !== 'all') {
            dispatch(query_products({
                category: activeCategory,
                rating: '',
                low: 0,
                high: 0,
                sortPrice: '',
                pageNumber: 1,
                searchValue: ''
            }));
        }
    }, [activeCategory, dispatch]);

    // Fonction pour générer un badge dynamique basé sur daysAgo
    const getBadgeFromDays = (daysAgo) => {
        if (daysAgo === 0) return "Nouveau aujourd'hui";
        if (daysAgo === 1) return "Nouveau hier";
        if (daysAgo <= 3) return "Nouvelle création";
        if (daysAgo <= 7) return "Nouvelle cette semaine";
        if (daysAgo <= 14) return "Arrivée récente";
        return "Récent";
    };

    // Logique d'affichage : nouvelles arrivées ou produits par catégorie
    const getDisplayProducts = () => {
        if (newArrivals.length > 0) {
            // Utiliser les nouvelles arrivées réelles
            return newArrivals.map((product) => ({
                _id: product._id,
                name: product.name,
                price: product.price,
                rating: product.rating,
                reviews: product.reviewCount || 0,
                daysAgo: product.daysAgo,
                images: product.images,
                slug: product.slug,
                badge: product.badge || getBadgeFromDays(product.daysAgo),
                artisan: product.shopName || 'Artisan local',
                region: 'Sénégal'
            }));
        } else if (products.length > 0) {
            // Fallback sur les produits de la catégorie
            return products.map((product) => {
                const daysAgo = product.daysAgo || 0;
                return {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    rating: product.rating,
                    reviews: product.reviewCount || 0,
                    daysAgo: daysAgo,
                    images: product.images,
                    slug: product.slug,
                    badge: getBadgeFromDays(daysAgo),
                    artisan: product.shopName || 'Artisan local',
                    region: 'Sénégal'
                };
            });
        }
        return [];
    };
    
    const displayProducts = getDisplayProducts();

    return (
        <div>
            <Header />
            
            <div className="min-h-screen bg-gray-50">
                {/* Banner Section */}
                <section className='bg-[url("http://localhost:3000/images/banner/diay.png")] h-[390px] sm:h-[180px] md:h-[200px] lg:h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                    <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                            <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                                <h2 className='text-2xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-center'>Nouvelles Créations</h2>
                                <div className='flex flex-col sm:flex-row justify-center items-center gap-2 text-sm sm:text-base lg:text-lg w-full'>
                                    <span>Découvrez les dernières créations artisanales</span>
                                </div>
                            </div> 
                        </div> 
                    </div> 
                </section>

                <div className="w-[85%] mx-auto py-12">
                    {/* Category Filter */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Filtrer par catégorie</h2>
                        <div className="flex flex-wrap gap-4">
                            {categories.map(category => {
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`px-6 py-3 rounded-full font-semibold transition-all ${
                                            activeCategory === category.id
                                                ? 'bg-purple-500 text-white shadow-lg'
                                                : 'bg-white text-gray-700 hover:bg-purple-100 border border-gray-200'
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                        {newArrivalLoading ? (
                            // Loading state pour les données réelles
                            <div className="col-span-full text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                                <p className="text-gray-600">Chargement des nouvelles créations...</p>
                            </div>
                        ) : displayProducts.length > 0 ? (
                            displayProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <div className="text-gray-400 text-6xl mb-4">🎆</div>
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                    Aucune nouvelle création dans cette catégorie
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    Cette catégorie n'a pas encore de nouvelles créations récentes.
                                </p>
                                <div className="flex gap-3 justify-center">
                                    <button 
                                        onClick={() => setActiveCategory('all')}
                                        className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                                    >
                                        Voir toutes les créations
                                    </button>
                                    <Link 
                                        to="/shops"
                                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        Voir tous les produits
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stats Buttons Section */}
                    <div className="mt-12 flex flex-wrap justify-center gap-4 mb-8">
                        <button className="flex items-center gap-3 bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-lg px-4 py-3 transition-all shadow-sm hover:shadow-md">
                            <FaRocket className="text-xl text-purple-500" />
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-800">
                                    {arrivalStats.weeklyArrivals || '0'}
                                </div>
                                <div className="text-xs text-gray-600">Créations cette semaine</div>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg px-4 py-3 transition-all shadow-sm hover:shadow-md">
                            <FaCalendarAlt className="text-xl text-blue-500" />
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-800">
                                    {arrivalStats.monthlyArrivals || '0'}
                                </div>
                                <div className="text-xs text-gray-600">Créations ce mois</div>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg px-4 py-3 transition-all shadow-sm hover:shadow-md">
                            <FaStar className="text-xl text-green-500" />
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-800">
                                    {arrivalStats.avgRating ? `${arrivalStats.avgRating.toFixed(1)}/5` : '0/5'}
                                </div>
                                <div className="text-xs text-gray-600">Note moyenne</div>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg px-4 py-3 transition-all shadow-sm hover:shadow-md">
                            <FaEye className="text-xl text-orange-500" />
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-800">
                                    {arrivalStats.totalProducts || '0'}
                                </div>
                                <div className="text-xs text-gray-600">Total produits</div>
                            </div>
                        </button>
                    </div>

                    {/* CTA Section */}
                    {/* <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-8 text-center">
                        <FaRocket className="text-4xl mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-4">Découvrez l'innovation artisanale sénégalaise</h2>
                        <p className="text-lg mb-6">Soyez les premiers à découvrir les nouvelles créations de nos artisans</p>
                        <button className="bg-white text-purple-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Voir tous les produits
                        </button>
                    </div> */}
                </div>
            </div>

            <Footer />
        </div>
    );
};

const ProductCard = ({ product }) => {
    const getBadgeColor = (badge) => {
        const colors = {
            "Nouveau aujourd'hui": "bg-purple-500",
            "Nouveau hier": "bg-purple-600",
            "Nouvelle création": "bg-blue-500",
            "Récent": "bg-green-500",
            "Arrivée récente": "bg-orange-500",
            "Nouvelle cette semaine": "bg-pink-500"
        };
        return colors[badge] || "bg-gray-500";
    };

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 group">
            <div className="relative bg-gray-50 p-4">
                {/* New Badge */}
                <div className="absolute top-2 left-2 z-10">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        ✨
                    </div>
                </div>
                
                {/* Product Badge */}
                <div className="absolute top-2 right-2 z-10">
                    <div className={`${getBadgeColor(product.badge)} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                        {product.badge}
                    </div>
                </div>
                
                {/* Days Ago Badge */}
                <div className="absolute bottom-2 right-2 z-10">
                    <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <FaClock className="text-xs" />
                        Il y a {product.daysAgo}j
                    </div>
                </div>
                
                <div className="aspect-square flex items-center justify-center">
                    <img
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        src={product.images[0]}
                        alt={product.name}
                    />
                </div>
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                        <button className="w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all duration-200">
                            <FaRegHeart className="text-sm" />
                        </button>
                        <Link
                            to={`/product/details/${product.slug}`}
                            className="w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-all duration-200"
                        >
                            <FaEye className="text-sm" />
                        </Link>
                        <button className="w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-md hover:bg-green-500 hover:text-white transition-all duration-200">
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
                
                <p className="text-sm text-green-600 mb-1">Par {product.artisan}</p>
                <p className="text-xs text-gray-500 mb-2">{product.region}</p>
                
                <div className="flex items-center justify-between mb-2">
                    <Rating ratings={product.rating} />
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>

                <div className="text-sm text-purple-600 font-semibold mb-3">
                    🎆 Nouveau depuis {product.daysAgo} jour{product.daysAgo > 1 ? 's' : ''}
                </div>

                <div className="text-lg font-bold text-gray-900 mb-4">
                    {product.price.toLocaleString()} FCFA
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;