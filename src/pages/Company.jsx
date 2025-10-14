import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Company = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Notre entreprise
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Diayma est née d’une ambition : rendre le commerce électronique accessible et fiable pour tous.
            Basée à Dakar, notre équipe est composée de passionnés du digital et du commerce.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Nous travaillons main dans la main avec des partenaires locaux et internationaux 
            pour offrir les meilleurs produits et services, tout en contribuant au développement 
            économique du Sénégal et de l’Afrique.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Company;
