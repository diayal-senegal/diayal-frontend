import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Blog = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Blog
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Découvrez nos articles pour mieux comprendre le e-commerce au Sénégal et en Afrique :
          </p>
          <ul className="list-disc pl-6 text-left text-lg text-gray-600 space-y-2 mb-6">
            <li>📈 Les tendances du e-commerce au Sénégal et en Afrique.</li>
            <li>🔒 Conseils pour acheter en ligne en toute sécurité.</li>
            <li>🤝 Interviews avec nos vendeurs partenaires.</li>
            <li>💡 Astuces pour bien utiliser nos services.</li>
          </ul>
          <p className="text-lg text-gray-600 leading-relaxed">
            Le blog est mis à jour régulièrement pour vous inspirer et vous informer.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
