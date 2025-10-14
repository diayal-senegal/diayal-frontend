import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DeliveryInfo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">📦</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6 sm:mb-8">
            Informations de Livraison
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto px-2">
            Livraison rapide et sécurisée de vos produits artisanaux partout au Sénégal et à l'international.
          </p>
        </div>
      </section>

      {/* Delivery Information Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Delivery Zones */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
            
            {/* Dakar Zone */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-emerald-100">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full w-16 h-16 flex items-center justify-center mr-4">
                  <span className="text-3xl">🏙️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Dakar et Banlieue</h2>
                  <p className="text-emerald-600 font-semibold">Livraison Express</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-emerald-50 rounded-lg p-4">
                  <span className="font-semibold text-gray-700">Délai de livraison</span>
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">24h - 48h</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Zones couvertes :</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>• Plateau</div>
                    <div>• Almadies</div>
                    <div>• Parcelles</div>
                    <div>• Liberté</div>
                    <div>• Point E</div>
                    <div>• Yoff</div>
                    <div>• Ouakam</div>
                    <div>• Pikine</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Regions */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-emerald-100">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mr-4">
                  <span className="text-3xl">🌍</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Autres Régions</h2>
                  <p className="text-teal-600 font-semibold">Livraison Standard</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-teal-50 rounded-lg p-4">
                  <span className="font-semibold text-gray-700">Délai de livraison</span>
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-bold">48h - 72h</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Régions desservies :</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>• Thiès</div>
                    <div>• Saint-Louis</div>
                    <div>• Kaolack</div>
                    <div>• Ziguinchor</div>
                    <div>• Tambacounda</div>
                    <div>• Diourbel</div>
                    <div>• Fatick</div>
                    <div>• Louga</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Partners */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-emerald-100 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              Nos Partenaires Logistiques
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚛</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Tchiak Tchiak</h3>
                <p className="text-gray-600 text-sm">Livraison rapide dans Dakar et banlieue</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📮</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">La Poste Sénégal</h3>
                <p className="text-gray-600 text-sm">Couverture nationale et internationale</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚐</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Transporteurs Locaux</h3>
                <p className="text-gray-600 text-sm">Réseau étendu dans toutes les régions</p>
              </div>
            </div>
          </div>

          {/* Delivery Process */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 sm:p-8 text-white mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
              Comment ça marche ?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">1️⃣</span>
                </div>
                <h4 className="font-bold mb-2">Commande</h4>
                <p className="text-sm text-emerald-100">Passez votre commande en ligne</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">2️⃣</span>
                </div>
                <h4 className="font-bold mb-2">Préparation</h4>
                <p className="text-sm text-emerald-100">Emballage soigné par l'artisan</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">3️⃣</span>
                </div>
                <h4 className="font-bold mb-2">Expédition</h4>
                <p className="text-sm text-emerald-100">Prise en charge par nos partenaires</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">4️⃣</span>
                </div>
                <h4 className="font-bold mb-2">Réception</h4>
                <p className="text-sm text-emerald-100">Livraison à votre domicile</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Security */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">🔒</span>
                <h3 className="text-xl font-bold text-gray-900">Sécurité</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Emballage renforcé pour produits fragiles</li>
                <li>• Assurance colis incluse</li>
                <li>• Suivi en temps réel</li>
                <li>• Signature à la réception</li>
              </ul>
            </div>

            {/* Coming Soon */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 shadow-lg border border-yellow-200">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">🚀</span>
                <h3 className="text-xl font-bold text-gray-900">Bientôt disponible</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Suivi de commande en temps réel</li>
                <li>• Notifications SMS/Email</li>
                <li>• Livraison internationale</li>
                <li>• Points de retrait en ville</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DeliveryInfo;