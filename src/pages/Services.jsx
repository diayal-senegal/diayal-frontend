import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">🛠️</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 sm:mb-8">
            Nos Services
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto px-2">
            Nous proposons une gamme complète de services pour simplifier vos achats et vos ventes d'artisanat sénégalais authentique.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Service 1 - Vente en ligne */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">🛍️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Vente en ligne</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Des milliers de produits artisanaux authentiques à portée de clic. Découvrez notre marketplace dédiée à l'artisanat sénégalais.
              </p>
            </div>

            {/* Service 2 - Livraison rapide */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Livraison rapide</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Livraison sécurisée et rapide partout au Sénégal et à l'international. Suivi en temps réel de vos commandes.
              </p>
            </div>

            {/* Service 3 - Paiement sécurisé */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">💳</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Paiement sécurisé</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Multiples options de paiement : cartes bancaires, Mobile Money (Orange Money, Wave), et solutions internationales.
              </p>
            </div>

            {/* Service 4 - Service client */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">📞</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Service client dédié</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Équipe dédiée pour vous accompagner. Assistance personnalisée et réponse sous 24h ouvrées.
              </p>
            </div>

            {/* Service 5 - Retours/échanges */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-teal-100 to-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Retours / Échanges faciles</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Politique de retour flexible. Procédure simplifiée pour les échanges et remboursements sous 7 jours.
              </p>
            </div>

            {/* Service 6 - Personnalisation */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Personnalisation</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Possibilité de personnaliser certains produits selon vos goûts. Créations uniques adaptées à vos besoins.
              </p>
            </div>
          </div>

          {/* Additional Services */}
          <div className="mt-12 sm:mt-16">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Pourquoi choisir Diayal ?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2">🏦</div>
                  <h4 className="font-semibold mb-1">Marketplace</h4>
                  <p className="text-sm text-indigo-100">Espace pour artisans locaux</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2">🇸🇳</div>
                  <h4 className="font-semibold mb-1">Authenticité</h4>
                  <p className="text-sm text-indigo-100">Produits artisanaux sénégalais certifiés</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2">📦</div>
                  <h4 className="font-semibold mb-1">SAV</h4>
                  <p className="text-sm text-indigo-100">Service après-vente de qualité</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2">🌍</div>
                  <h4 className="font-semibold mb-1">International</h4>
                  <p className="text-sm text-indigo-100">Livraison dans le monde entier bientôt disponible !</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;