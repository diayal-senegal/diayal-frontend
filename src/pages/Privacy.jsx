import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer'

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Header/>
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8">
            Politique de Confidentialité
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Nous protégeons vos données personnelles avec le plus grand soin
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Section 1 - Introduction */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-green-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">1</span>
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La présente Politique de confidentialité décrit comment <span className="font-semibold text-green-600">Diayal</span> collecte, utilise, protège et partage les informations personnelles de ses utilisateurs lors de la navigation sur le site et lors de l'utilisation de nos services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              En utilisant le site, vous acceptez la collecte et l'utilisation de vos données conformément à cette politique.
            </p>
          </div>

          {/* Section 2 - Données collectées */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-green-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">2</span>
              Données collectées
            </h2>
            <p className="text-gray-700 mb-6">Nous pouvons collecter plusieurs types de données :</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">👤</span>
                  Données utilisateur
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Nom, prénom</li>
                  <li>• Adresse email</li>
                  <li>• Adresse postale et téléphone</li>
                  <li>• Informations de paiement sécurisées</li>
                </ul>
              </div>
              
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">📊</span>
                  Données automatiques
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Adresse IP</li>
                  <li>• Données de navigation</li>
                  <li>• Pages consultées</li>
                  <li>• Cookies et traceurs</li>
                </ul>
              </div>
              
              <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
                <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🏪</span>
                  Données vendeurs
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Nom boutique</li>
                  <li>• Description</li>
                  <li>• NINEA</li>
                  <li>• Coordonnées bancaires</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3 - Finalités */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg mb-8 border border-green-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">3</span>
              Finalités de la collecte
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: "🛒", text: "Gérer les commandes, paiements et livraisons" },
                { icon: "👥", text: "Création et gestion des comptes utilisateurs" },
                { icon: "✨", text: "Améliorer et personnaliser l'expérience" },
                { icon: "📧", text: "Envoyer newsletters et offres (avec consentement)" },
                { icon: "🛡️", text: "Lutter contre la fraude et sécuriser" },
                { icon: "⚖️", text: "Respecter nos obligations légales" }
              ].map((item, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-2xl mr-3">{item.icon}</span>
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4 - Partage des données */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-green-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">4</span>
              Partage des données
            </h2>
            <p className="text-gray-700 mb-4">Vos données personnelles peuvent être partagées uniquement avec :</p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">🔧</div>
                <h4 className="font-semibold text-blue-800">Prestataires techniques</h4>
                <p className="text-sm text-gray-600">Hébergement, emailing, paiement</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">🚚</div>
                <h4 className="font-semibold text-orange-800">Transporteurs</h4>
                <p className="text-sm text-gray-600">Pour la livraison des commandes</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">⚖️</div>
                <h4 className="font-semibold text-red-800">Autorités légales</h4>
                <p className="text-sm text-gray-600">En cas d'obligation judiciaire</p>
              </div>
            </div>
            <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-center">
              <p className="text-red-800 font-semibold">❌ Aucune donnée n'est vendue ou louée à des tiers</p>
            </div>
          </div>

          {/* Sections 5-10 en format compact */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Section 5 - Cookies */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
                Cookies 🍪
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Faciliter la navigation (connexion, panier)</li>
                <li>• Mesurer l'audience et performances</li>
                <li>• Proposer contenus adaptés</li>
              </ul>
              <p className="text-xs text-green-600 mt-3">👉 Gérez vos préférences via votre navigateur</p>
            </div>

            {/* Section 6 - Conservation */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</span>
                Durée de conservation ⏰
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Données clients : relation + 3 ans</li>
                <li>• Facturation : 5 ans (obligation légale)</li>
                <li>• Cookies : maximum 13 mois</li>
              </ul>
            </div>

            {/* Section 7 - Sécurité */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">7</span>
                Sécurité des données 🔐
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Cryptage SSL</li>
                <li>• Sécurisation des paiements</li>
                <li>• Contrôle des accès</li>
              </ul>
            </div>

            {/* Section 8 - Droits */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">8</span>
                Vos droits ⚖️
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Droit d'accès à vos données</li>
                <li>• Droit de rectification et suppression</li>
                <li>• Droit d'opposition et limitation</li>
                <li>• Droit à la portabilité</li>
              </ul>
              <p className="text-xs text-green-600 mt-3">👉 Contactez-nous : contact@diayal.sn</p>
            </div>
          </div>
          {/* Section 10 - Modifications */}
          <div className="bg-yellow-50 rounded-2xl p-8 shadow-lg border border-yellow-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className=" text-white  w-10 h-10 flex items-center justify-center text-lg font-bold mr-4"></span>
              Modification de la politique
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Nous nous réservons le droit de modifier la présente politique à tout moment.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  La date de mise à jour figurera en bas de la page.
                </p>
              </div>
              <div className="text-6xl">📝</div>
            </div>
          </div>

          {/* Section 9 - Responsable */}
          <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-2xl p-8 text-black text-center mt-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
              {/* <span className="bg-white text-green-600 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">9</span> */}
              Responsable du traitement
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-lg">
              <div>
                <h4 className="font-semibold mb-2">📧 Email</h4>
                <p>contact@diayal.sn</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📍 Adresse</h4>
                <p>129 Rue de la Paix<br/>Yoff, Dakar - Sénégal</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📞 Téléphone</h4>
                <p>+221 33 456 789</p>
              </div>
            </div>
          </div>

          

        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Privacy;