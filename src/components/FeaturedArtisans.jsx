import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const FeaturedArtisans = () => {
    // Données pour les métiers artisanaux sénégalais
    const traditionalCrafts = [
        {
            id: 1,
            name: "Tissage",
            description: "Art ancestral des pagnes et kente",
            image: "http://localhost:3000/images/crafts/tissage.jpg",
            category: "textile",
            heritage: "Tradition millénaire"
        },
        {
            id: 2,
            name: "Poterie",
            description: "Céramiques et terres cuites",
            image: "http://localhost:3000/images/crafts/poterie.jpg",
            category: "ceramique",
            heritage: "Savoir ancestral"
        },
        {
            id: 3,
            name: "Maroquinerie",
            description: "Cuir du Sahel et accessoires",
            image: "http://localhost:3000/images/crafts/maroquinerie.jpg",
            category: "cuir",
            heritage: "Artisanat moderne"
        },
        {
            id: 4,
            name: "Bijouterie",
            description: "Or et argent traditionnels",
            image: "http://localhost:3000/images/crafts/bijouterie.jpg",
            category: "bijoux",
            heritage: "Art précieux"
        },
        {
            id: 5,
            name: "Sculpture",
            description: "Bois d'ébène et masques",
            image: "http://localhost:3000/images/crafts/sculpture.jpg",
            category: "bois",
            heritage: "Expression culturelle"
        },
        {
            id: 6,
            name: "Vannerie",
            description: "Paniers et chapeaux tressés",
            image: "http://localhost:3000/images/crafts/vannerie.jpg",
            category: "vannerie",
            heritage: "Tressage traditionnel"
        }
    ];

    return (
        <div className="bg-gray-50 py-12">
            <div className="w-[85%] mx-auto">
                {/* Titre Savoir-Faire Sénégalais */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-gray-900">Savoir-Faire Sénégalais</h2>
                            <span className="bg-gradient-to-r from-green-600 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                🇸🇳 Patrimoine
                            </span>
                        </div>
                        <Link to="/categories" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Tous les métiers
                        </Link>
                    </div>
                    <p className="text-sm text-gray-600">Découvrez les métiers traditionnels qui font la richesse de l'artisanat sénégalais</p>
                </div>

                {/* Grid des métiers */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2">
                    {traditionalCrafts.map((craft) => (
                        <div
                            key={craft.id}
                            className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 group"
                        >
                            {/* Image du métier */}
                            <div className="relative aspect-square overflow-hidden">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    src={craft.image}
                                    alt={craft.name}
                                    onError={(e) => {
                                        e.target.src = "http://localhost:3000/images/chaussuresf.jpg";
                                    }}
                                />
                                
                                {/* Badge patrimoine */}
                                <div className="absolute top-1 right-1">
                                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-1 py-0.5 rounded-full font-bold">
                                        🏛️
                                    </span>
                                </div>
                                
                                {/* Overlay gradient */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent h-2/3"></div>
                                
                                {/* Informations */}
                                <div className="absolute bottom-0 left-0 right-0 p-1 text-white">
                                    <h3 className="font-bold text-xs mb-0.5">{craft.name}</h3>
                                    <p className="text-xs truncate mb-1 opacity-90">{craft.description}</p>
                                    <Link
                                        to={`/products?category=${craft.category}`}
                                        className="w-full bg-white/90 hover:bg-white text-gray-900 text-xs py-1 rounded transition-colors duration-200 block text-center font-medium"
                                    >
                                        Découvrir
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedArtisans;