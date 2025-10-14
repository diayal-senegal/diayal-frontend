import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer'
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Header/>
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-amber-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-8">
            Notre Mission
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Chez <span className="font-semibold text-orange-600">Diayal</span>, nous croyons que chaque objet artisanal raconte une histoire.
            Notre mission est simple : mettre en valeur le savoir-faire authentique des 
            artisans sénégalais et le rendre accessible à tous, partout dans le monde.
            <span className="font-semibold text-orange-600"> Diayal</span>, inspiré du mot wolof diay qui signifie partager et donner, est une marketplace moderne où les créateurs et les passionnés d’authenticité se rencontrent. 
          </p>
        </div>
      </section>


      {/* Vision Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Notre Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              { icon: "", title: "Soutenir l'économie locale", desc: "en donnant une visibilité digitale aux artisans" },
              { icon: "", title: "Préserver les traditions", desc: "et transmettre les savoir-faire artisanaux" },
              { icon: "🤝", title: "Expérience authentique", desc: "proposer un achat transparent et humain" },
              { icon: "🌍", title: "Marketplace connectée", desc: "rapprocher créateurs et amoureux de l'artisanat" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 text-white text-center">
            <p className="text-lg md:text-xl leading-relaxed">
              Nous croyons à un commerce de proximité, digitalisé et inclusif,
              qui contribue au développement économique du Sénégal et de l'Afrique de l'Ouest.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">Nos Valeurs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { emoji: "", title: "Authenticité", desc: "chaque produit est unique, fait avec passion et savoir-faire" },
              { emoji: "🤝", title: "Solidarité", desc: "nous travaillons main dans la main avec les artisans" },
              { emoji: "🌿", title: "Responsabilité", desc: "encourager une consommation durable et respectueuse" },
              { emoji: "💡", title: "Innovation", desc: "moderniser l'artisanat tout en respectant ses racines" }
            ].map((value, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-6xl mb-6 group-hover:animate-bounce">{value.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Notre équipe </h2>
          <p className="text-xl mb-12 text-gray-300">Nous sommes une jeune équipe passionnée par :</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "💻", title: "Le Digital", desc: "connecter les artisans au monde" },
              { icon: "", title: "La Culture", desc: "préserver l'authenticité sénégalaise" },
              { icon: "🚀", title: "L'Innovation", desc: "simplifier l'expérience d'achat" },
              { icon: "❤️", title: "La Solidarité", desc: "soutenir les artisans locaux" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Rejoignez l'aventure Diayal</h2>
          <p className="text-xl mb-12 leading-relaxed">
            Que vous soyez artisan cherchant une vitrine pour vos créations,
            client en quête d'objets uniques, ou simplement curieux de découvrir l'artisanat sénégalais
          </p>
          <Link to="/register">
          <div className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
            <span className="mr-2">👉</span>
            Diayal est votre espace
          </div>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;