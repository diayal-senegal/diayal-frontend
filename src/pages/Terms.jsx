import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer'

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header/>
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Dernière mise à jour : Décembre 2025
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Section 1 - Objet */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">1</span>
              Objet
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») ont pour objet de définir les droits et obligations des utilisateurs (acheteurs et vendeurs) dans le cadre de l'utilisation de la plateforme <span className="font-semibold text-blue-600">Diayal</span>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              La Plateforme a pour vocation de mettre en relation des artisans locaux sénégalais et des acheteurs particuliers au Sénégal et à l'international, via un site e-commerce accessible en ligne.
            </p>
          </div>

          {/* Section 2 - Acceptation */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">2</span>
              Acceptation des CGU
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                L'utilisation de la Plateforme implique l'acceptation pleine et entière des présentes CGU.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                Si un utilisateur n'accepte pas les présentes conditions, il est tenu de cesser immédiatement toute utilisation de la Plateforme.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                Les présentes CGU peuvent être mises à jour à tout moment par Diayal ; la version applicable est celle en vigueur au jour de la navigation ou de la commande.
              </li>
            </ul>
          </div>

          {/* Section 3 - Compte utilisateur */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">3</span>
              Compte utilisateur
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                La création d'un compte est obligatoire pour publier, vendre ou acheter sur la Plateforme.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                L'utilisateur s'engage à fournir des informations exactes, complètes et à jour. Toute fausse déclaration peut entraîner la suspension ou la suppression du compte.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                Chaque utilisateur est responsable de la confidentialité de ses identifiants (login, mot de passe).
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                Diayal se réserve le droit de suspendre ou fermer un compte en cas de non-respect des présentes CGU.
              </li>
            </ul>
          </div>

          {/* Section 4 - Rôle de la Plateforme */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg mb-8 border border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">4</span>
              Rôle de la Plateforme
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                Diayal agit exclusivement en tant qu'intermédiaire technique : elle met à disposition une infrastructure numérique.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                Diayal ne vend pas de produits et n'intervient pas dans la fabrication, la qualité ou la livraison des articles.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                En cas de litige relatif à un produit, la responsabilité incombe au vendeur.
              </li>
            </ul>
          </div>

          {/* Section 5 - Produits et prix */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">5</span>
              Produits et prix
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                Les produits proposés sur Diayal sont décrits et présentés par les artisans eux-mêmes.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                Les prix sont fixés librement par les vendeurs et affichés en francs CFA (FCFA), toutes taxes comprises.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                Les vendeurs sont seuls responsables de l'exactitude des informations relatives aux produits.
              </li>
            </ul>
          </div>

          {/* Section 6 - Paiement */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">6</span>
              Paiement et commission
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>Les paiements sont réalisés via des solutions sécurisées :</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">💳 Paiements internationaux</h4>
                  <p className="text-sm">Stripe pour les cartes bancaires</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-2">📱 Paiements locaux</h4>
                  <p className="text-sm">Mobile Money (Orange Money, Wave, Free Money)</p>
                </div>
              </div>
              <p>Diayal agit comme intermédiaire de paiement et prélève automatiquement une commission sur chaque transaction.</p>
            </div>
          </div>

          {/* Section 7 - Concept Diayal */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 shadow-lg mb-8 border border-orange-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">7</span>
              Concept Diayal
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-3 mt-1">🎨</span>
                Diayal est dédié aux produits artisanaux sénégalais authentiques.
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-3 mt-1">✨</span>
                Tous les vendeurs s'engagent à respecter ce concept, garantissant qualité et authenticité.
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-3 mt-1">🇸🇳</span>
                Seuls ces produits authentiques sont disponibles sur la plateforme.
              </li>
            </ul>
          </div>

          {/* Sections 8-14 en format compact */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Section 8 - Livraison */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">8</span>
                Livraison
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Livraison assurée par les artisans vendeurs</li>
                <li>• Vérification obligatoire à réception</li>
                <li>• Signalement immédiat des dommages requis</li>
              </ul>
            </div>

            {/* Section 9 - Retours */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">9</span>
                Droit de rétractation
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 7 jours à compter de la réception</li>
                <li>• Exceptions : produits personnalisés, alimentaires</li>
                <li>• Retour intact et complet requis</li>
              </ul>
            </div>

            {/* Section 10 - Responsabilités */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">10</span>
                Responsabilités
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Vendeur : exécution et conformité</li>
                <li>• Acheteur : vérification compatibilité</li>
                <li>• Diayal : intermédiaire uniquement</li>
              </ul>
            </div>

            {/* Section 11 - Propriété intellectuelle */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">11</span>
                Propriété intellectuelle
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Éléments de la plateforme protégés</li>
                <li>• Reproduction interdite sans autorisation</li>
                <li>• Vendeurs garantissent leurs droits</li>
              </ul>
            </div>

            {/* Section 12 - Données personnelles */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">12</span>
                Protection des données
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Standards internationaux (RGPD)</li>
                <li>• Usage limité aux services</li>
                <li>• Droits d'accès et suppression</li>
              </ul>
            </div>

            {/* Section 13 - Modifications */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">13</span>
                Modification des CGU
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Modifications possibles à tout moment</li>
                <li>• Notification par email ou plateforme</li>
                <li>• Usage continu = acceptation</li>
              </ul>
            </div>
          </div>

          {/* Section 14 - Juridiction */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center mt-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
              {/* <span className="bg-white text-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">14</span> */}
              Loi applicable et juridiction compétente
            </h2>
            <p className="text-lg leading-relaxed">
              Les présentes CGU sont régies par la <span className="font-semibold">loi sénégalaise</span>. 
              En cas de litige, les juridictions sénégalaises seront seules compétentes, 
              sous réserve de dispositions légales contraires pour les consommateurs étrangers.
            </p>
          </div>

        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Terms;