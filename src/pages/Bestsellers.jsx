import React, { useState, useEffect } from 'react';
import { FaStar, FaFire, FaEye, FaHeart, FaShoppingCart, FaRegHeart, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import { useSelector, useDispatch } from 'react-redux';
import { query_products, get_bestsellers, get_sales_stats } from '../store/reducers/homeReducer';

const Bestsellers = () => {
    const dispatch = useDispatch();
    const { categorys, products, bestsellers, salesStats, bestsellerLoading } = useSelector(state => state.home);
    const [activeCategory, setActiveCategory] = useState('all');
    const [useRealData, setUseRealData] = useState(true); // Toujours essayer les données réelles d'abord
    
    const staticBestsellers = [
        { 
            _id: 1, 
            name: "Boubou Brodé Traditionnel", 
            price: 85000, 
            rating: 4.9, 
            reviews: 247, 
            sales: 1542, 
            category: 'textile',
            images: ["/images/boubou-brode.jpg"],
            slug: "boubou-brode-traditionnel",
            badge: "N°1 des ventes",
            artisan: "Khadija Mbaye",
            region: "Saint-Louis"
        },
        { 
            _id: 2, 
            name: "Masque Sénoufo Authentique", 
            price: 150000, 
            rating: 4.8, 
            reviews: 134, 
            sales: 235, 
            category: 'sculpture',
            images: ["/images/masque-senoufo.jpg"],
            slug: "masque-senoufo-authentique",
            badge: "Art Traditionnel",
            artisan: "Moussa Diallo",
            region: "Kédougou"
        },
        { 
            _id: 3, 
            name: "Collier en Or Peul", 
            price: 120000, 
            rating: 4.9, 
            reviews: 189, 
            sales: 875, 
            category: 'bijoux',
            images: ["/images/collier-peul.jpg"],
            slug: "collier-or-peul",
            badge: "Bijou Authentique",
            artisan: "Aminata Sow",
            region: "Fouta"
        },
        { 
            _id: 4, 
            name: "Sac Cuir Tannage Traditionnel", 
            price: 45000, 
            rating: 4.7, 
            reviews: 298, 
            sales: 1240, 
            category: 'textile',
            images: ["/images/sac-cuir.jpg"],
            slug: "sac-cuir-traditionnel",
            badge: "Cuir Authentique",
            artisan: "Ibrahima Fall",
            region: "Thiès"
        },
        { 
            _id: 5, 
            name: "Djembé Artisanal Casamance", 
            price: 75000, 
            rating: 4.8, 
            reviews: 156, 
            sales: 456, 
            category: 'sculpture',
            images: ["/images/djembe.jpg"],
            slug: "djembe-artisanal-casamance",
            badge: "Instrument Traditionnel",
            artisan: "Seydou Cissé",
            region: "Casamance"
        },
        { 
            _id: 6, 
            name: "Tissu Wax Premium", 
            price: 25000, 
            rating: 4.6, 
            reviews: 567, 
            sales: 2568, 
            category: 'textile',
            images: ["/images/wax-premium.jpg"],
            slug: "tissu-wax-premium",
            badge: "Wax Authentique",
            artisan: "Fatou Diop",
            region: "Dakar"
        },
        { 
            _id: 7, 
            name: "Poterie Sérère Traditionnelle", 
            price: 35000, 
            rating: 4.7, 
            reviews: 234, 
            sales: 567, 
            category: 'sculpture',
            images: ["/images/poterie-serere.jpg"],
            slug: "poterie-serere-traditionnelle",
            badge: "Céramique Artisanale",
            artisan: "Mariama Ndiaye",
            region: "Fatick"
        },
        { 
            _id: 8, 
            name: "Bracelet Argent Wolof", 
            price: 65000, 
            rating: 5.0, 
            reviews: 89, 
            sales: 156, 
            category: 'bijoux',
            images: ["/images/bracelet-wolof.jpg"],
            slug: "bracelet-argent-wolof",
            badge: "Pièce Unique",
            artisan: "Ousmane Sarr",
            region: "Louga"
        }
    ];

    // Utilisation uniquement des catégories dynamiques de la base de données
    const categories = [
        { id: 'all', name: 'Toutes créations', icon: FaFire },
        ...categorys.map(cat => ({
            id: cat.slug,
            name: cat.name,
            icon: FaFire
        }))
    ];

    // Charger les données réelles en priorité, fallback sur statiques si nécessaire
    useEffect(() => {
        const category = activeCategory === 'all' ? '' : activeCategory;
        dispatch(get_bestsellers({ category, limit: 20 }));
        dispatch(get_sales_stats());
    }, [activeCategory, dispatch]);
    
    // Logique automatique : utiliser les données statiques si pas de données réelles
    useEffect(() => {
        // Si pas de bestsellers réels et pas en cours de chargement, utiliser les données statiques
        if (!bestsellerLoading && bestsellers.length === 0 && activeCategory === 'all') {
            setUseRealData(false);
        } else if (bestsellers.length > 0) {
            setUseRealData(true);
        }
    }, [bestsellers, bestsellerLoading, activeCategory]);

    // Logique d'affichage selon le mode
    const getDisplayProducts = () => {
        if (useRealData) {
            // Mode données réelles : utiliser les vrais bestsellers
            return bestsellers.map((product, index) => ({
                _id: product._id,
                name: product.name,
                price: product.price,
                rating: product.rating,
                reviews: product.reviewCount || 0,
                sales: product.totalSales,
                images: product.images,
                slug: product.slug,
                badge: product.badge,
                artisan: product.shopName || 'Artisan local',
                region: 'Sénégal',
                totalRevenue: product.totalRevenue
            }));
        } else {
            // Mode données statiques
            if (activeCategory === 'all') {
                return staticBestsellers; // Produits statiques
            } else {
                return products.map((product, index) => ({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    rating: product.rating,
                    reviews: product.reviewCount || 0,
                    sales: Math.floor(Math.random() * 1000) + 100,
                    images: product.images,
                    slug: product.slug,
                    badge: index < 3 ? `N°${index + 1} des ventes` : 'Populaire',
                    artisan: product.shopName || 'Artisan local',
                    region: 'Sénégal'
                }));
            }
        }
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
                                <h2 className='text-2xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-center'>Meilleures Créations</h2>
                                <div className='flex flex-col sm:flex-row justify-center items-center gap-2 text-sm sm:text-base lg:text-lg w-full'>
                                    <span>Les créations artisanales les plus appréciées</span>
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
                                const IconComponent = category.icon;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                                            activeCategory === category.id
                                                ? 'bg-orange-500 text-white shadow-lg'
                                                : 'bg-white text-gray-700 hover:bg-orange-100 border border-gray-200'
                                        }`}
                                    >
                                        <IconComponent />
                                        {category.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>



                    {/* Products Grid */}
                    <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                        {bestsellerLoading && useRealData ? (
                            // Loading state pour les données réelles
                            <div className="col-span-full text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                                <p className="text-gray-600">Chargement des bestsellers...</p>
                            </div>
                        ) : displayProducts.length > 0 ? (
                            displayProducts.map((product, index) => (
                                <ProductCard key={product._id} product={product} index={index} useRealData={useRealData} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <div className="text-gray-400 text-6xl mb-4">🛍️</div>
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                    Aucun bestseller dans cette catégorie
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    Cette catégorie n'a pas encore assez de commandes pour établir un classement des meilleures ventes.
                                </p>
                                <div className="flex gap-3 justify-center">
                                    <button 
                                        onClick={() => setActiveCategory('all')}
                                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        Voir les bestsellers
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
                        <button className="flex items-center gap-3 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-lg px-4 py-3 transition-all shadow-sm hover:shadow-md">
                            <FaFire className="text-xl text-red-500" />
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-800">
                                    {useRealData ? salesStats.weeklySales : '2,340'}
                                </div>
                                <div className="text-xs text-gray-600">Ventes cette semaine</div>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 bg-white hover:bg-yellow-50 border border-gray-200 hover:border-yellow-300 rounded-lg px-4 py-3 transition-all shadow-sm hover:shadow-md">
                            <FaStar className="text-xl text-yellow-500" />
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-800">
                                    {useRealData ? `${salesStats.avgRating}/5` : '4.8/5'}
                                </div>
                                <div className="text-xs text-gray-600">Note moyenne</div>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg px-4 py-3 transition-all shadow-sm hover:shadow-md">
                            <FaEye className="text-xl text-blue-500" />
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-800">
                                    {useRealData ? salesStats.totalSales : '125K'}
                                </div>
                                <div className="text-xs text-gray-600">{useRealData ? 'Total vendus' : 'Vues ce mois'}</div>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 bg-white hover:bg-pink-50 border border-gray-200 hover:border-pink-300 rounded-lg px-4 py-3 transition-all shadow-sm hover:shadow-md">
                            <FaHeart className="text-xl text-pink-500" />
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-800">
                                    {useRealData ? `${Math.round(salesStats.totalRevenue / 1000)}K` : '98%'}
                                </div>
                                <div className="text-xs text-gray-600">{useRealData ? 'Revenus (FCFA)' : 'Satisfaction client'}</div>
                            </div>
                        </button>
                    </div>

                    {/* CTA Section */}
                    {/* <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-8 text-center">
                        <FaFire className="text-4xl mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-4">Soutenez l'artisanat sénégalais authentique</h2>
                        <p className="text-lg mb-6">Découvrez les créations les plus appréciées de nos artisans</p>
                        <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Voir tous les produits
                        </button>
                    </div> */}
                </div>
            </div>

            <Footer />
        </div>
    );
};

const ProductCard = ({ product, index, useRealData }) => {
    const getBadgeColor = (badge) => {
        const colors = {
            "N°1 des ventes": "bg-red-500",
            "Art Traditionnel": "bg-purple-500",
            "Bijou Authentique": "bg-yellow-500",
            "Cuir Authentique": "bg-brown-500",
            "Instrument Traditionnel": "bg-blue-500",
            "Wax Authentique": "bg-green-500",
            "Céramique Artisanale": "bg-orange-500",
            "Pièce Unique": "bg-indigo-500"
        };
        return colors[badge] || "bg-gray-500";
    };

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 group">
            <div className="relative bg-gray-50 p-4">
                {/* Ranking Badge */}
                <div className="absolute top-2 left-2 z-10">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        #{index + 1}
                    </div>
                </div>
                
                {/* Product Badge */}
                <div className="absolute top-2 right-2 z-10">
                    <div className={`${getBadgeColor(product.badge)} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                        {product.badge}
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

                <div className="text-sm text-green-600 font-semibold mb-3">
                    🔥 {product.sales} vendus
                    {useRealData && product.totalRevenue && (
                        <div className="text-xs text-gray-500 mt-1">
                            Revenus: {product.totalRevenue.toLocaleString()} FCFA
                        </div>
                    )}
                </div>

                <div className="text-lg font-bold text-gray-900 mb-4">
                    {product.price.toLocaleString()} FCFA
                </div>
            </div>
        </div>
    );
};

export default Bestsellers;