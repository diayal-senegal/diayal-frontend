import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Platform = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
           Notre plateforme
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Notre site a été conçu pour offrir une expérience fluide et intuitive :
          </p>
          <ul className="list-disc pl-6 text-left text-lg text-gray-600 space-y-2 mb-6">
            <li>🔎 Recherche rapide de produits avec filtres avancés.</li>
            <li>🛒 Panier et paiement sécurisés via Visa, Mastercard, Orange Money, Wave, PayPal.</li>
            <li>🚚 Suivi en temps réel de vos commandes.</li>
            <li>📱 Accessible sur ordinateur et mobile.</li>
          </ul>
          <p className="text-lg text-gray-600 leading-relaxed">
            Nous mettons la technologie au service de votre confort et de la confiance dans vos transactions.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Platform;
