import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Vendor = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-amber-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">🏪</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-6 sm:mb-8">
            Devenir Vendeur
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto px-2 mb-8">
            Vous êtes artisan sénégalais ? Rejoignez Diayal et vendez vos créations authentiques à des milliers de clients au Sénégal et dans le monde entier.
          </p>
          <a
            href="/register"
            className="inline-flex items-center bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
          >
            <span className="mr-2">🚀</span>
            Créer mon compte vendeur
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Pourquoi vendre sur Diayal ?
            </h2>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Audience Internationale</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Accédez à une large audience nationale et internationale. Vendez vos produits artisanaux au-delà des frontières.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">📦</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Gestion Simplifiée</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Outils de gestion de stock et commandes simples et efficaces. Interface intuitive pour gérer votre boutique.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Paiements Sécurisés</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Recevez vos paiements rapidement via cartes bancaires et Mobile Money. Transactions 100% sécurisées.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Visibilité Accrue</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Bénéficiez de nos campagnes marketing et promotions pour augmenter vos ventes et votre notoriété.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-teal-100 to-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Support Dédié</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Équipe d'accompagnement dédiée aux vendeurs. Formation et support technique inclus.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Artisanat Authentique</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Plateforme dédiée exclusivement à l'artisanat sénégalais authentique. Valorisation de votre savoir-faire.
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-6 sm:p-8 text-white mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
              Comment ça marche ?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">1️⃣</span>
                </div>
                <h4 className="font-bold mb-2">Inscription</h4>
                <p className="text-sm text-orange-100">Créez votre compte vendeur gratuitement</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">2️⃣</span>
                </div>
                <h4 className="font-bold mb-2">Configuration</h4>
                <p className="text-sm text-orange-100">Configurez votre boutique et ajoutez vos produits</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">3️⃣</span>
                </div>
                <h4 className="font-bold mb-2">Vente</h4>
                <p className="text-sm text-orange-100">Recevez des commandes et gérez vos ventes</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">4️⃣</span>
                </div>
                <h4 className="font-bold mb-2">Paiement</h4>
                <p className="text-sm text-orange-100">Recevez vos paiements rapidement</p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-orange-100 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              Conditions pour devenir vendeur
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">✅</span>
                  Requis
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Être artisan sénégalais ou résider au Sénégal</li>
                  <li>• Produire des articles artisanaux authentiques</li>
                  <li>• Avoir une pièce d'identité valide</li>
                  <li>• Disposer d'un téléphone et d'un email</li>
                  <li>• Accepter nos conditions de vente</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">📋</span>
                  Documents nécessaires
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Carte d'identité nationale ou passeport</li>
                  <li>• Photos de vos produits artisanaux</li>
                  <li>• Informations bancaires ou Mobile Money</li>
                  <li>• Description de votre activité artisanale</li>
                  <li>• Coordonnées complètes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Prêt à commencer ?
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Rejoignez notre communauté d'artisans sénégalais et donnez une nouvelle dimension à votre activité. 
                L'inscription est gratuite et ne prend que quelques minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/register"
                  className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 flex items-center"
                >
                  <span className="mr-2">🚀</span>
                  Créer mon compte vendeur
                </a>
                
                <a
                  href="/contact"
                  className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all duration-300 flex items-center"
                >
                  <span className="mr-2">💬</span>
                  Poser une question
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Vendor;