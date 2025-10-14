import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Qu'est-ce que Diayal ?",
      answer: "Diayal est une plateforme qui met en relation des artisans locaux sénégalais et des acheteurs particuliers, au Sénégal et partout dans le monde. Nous ne vendons pas directement les produits : nous offrons un espace sécurisé pour que les artisans et les clients puissent échanger et commercer.",
      icon: "🏪"
    },
    {
      question: "Quels produits puis-je acheter sur Diayal ?",
      answer: "Tous les produits disponibles sont des produits artisanaux sénégalais authentiques, fabriqués localement par des artisans. Cela garantit qualité, authenticité et soutien à l'économie locale.",
      icon: "🎨"
    },
    {
      question: "Comment créer un compte ?",
      answer: "Il suffit de cliquer sur S'inscrire, de renseigner vos informations exactes (nom, email) et de créer un mot de passe. Vous pourrez ensuite acheter facilement.",
      icon: "👤"
    },
    {
      question: "Quels moyens de paiement sont disponibles ?",
      answer: "• Mobile Money (Orange Money, Wave, Free Money, etc.) via PayDunya ou CinetPay.\n• Cartes bancaires (Visa, Mastercard) via Stripe.\nTous les paiements passent par des solutions sécurisées.",
      icon: "💳"
    },
    {
      question: "Qui gère la livraison ?",
      answer: "La livraison est assurée directement par les artisans vendeurs. Chaque vendeur précise ses délais, ses frais et son mode de livraison.",
      icon: "📦"
    },
    {
      question: "Que faire si je veux retourner un produit ?",
      answer: "Vous disposez de 7 jours après réception pour changer d'avis (sauf pour les produits personnalisés, alimentaires ou périssables).\n• Le produit doit être retourné intact, non utilisé, complet avec tous ses accessoires dans son emballage d'origine.\n• L'acheteur est invité à vérifier l'état du colis à réception et à signaler immédiatement tout dommage au transporteur et au vendeur avant signature.\n• Les frais de retour sont à la charge de l'acheteur, sauf si le vendeur s'est trompé ou a livré un produit défectueux.",
      icon: "🔄"
    },
    {
      question: "Qui est responsable en cas de problème avec un produit ?",
      answer: "Chaque artisan vendeur est responsable de la qualité et de la conformité de ses produits. Diayal n'intervient pas directement dans la vente ou la livraison : notre rôle est de sécuriser les paiements et d'assurer la mise en relation.",
      icon: "⚖️"
    },
    {
      question: "Mes données personnelles sont-elles protégées ?",
      answer: "Oui ✅ Vos données sont utilisées uniquement pour gérer votre compte et vos commandes. Nous respectons des standards proches du RGPD pour garantir la confidentialité et la sécurité de vos informations.",
      icon: "🔒"
    },
    {
      question: "Que faire si j'ai un litige avec un vendeur ?",
      answer: "En cas de problème (retard, défaut, produit manquant), contactez d'abord le vendeur. Si le litige persiste, vous pouvez signaler le problème à Diayal afin que nous intervenions en médiation dans la mesure du possible.",
      icon: "🤝"
    },
    {
      question: "La plateforme est-elle disponible à l'international ?",
      answer: "Oui 🌍 Les artisans sénégalais peuvent vendre à des clients du monde entier. Les paiements par carte bancaire (Stripe) permettent aux acheteurs internationaux de commander facilement.",
      icon: "🌍"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">❓</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 sm:mb-8">
            FAQ Acheteur
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto px-2">
            Questions fréquentes pour vous aider à mieux comprendre et utiliser Diayal.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4 flex-shrink-0">{faq.icon}</span>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-6 h-6 text-blue-600 transform transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="pl-12 pr-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Vous ne trouvez pas votre réponse ?
            </h2>
            <p className="text-blue-100 mb-6 text-lg">
              Notre équipe est là pour vous aider ! Contactez-nous et nous vous répondrons rapidement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">📧</span>
                Nous contacter
              </a>
              <div className="flex items-center text-blue-100">
                <span className="mr-2">📞</span>
                <span>+221 33 456 789</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/services"
              className="bg-white rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-200 text-center group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🛠️</div>
              <h4 className="font-semibold text-gray-900">Nos Services</h4>
              <p className="text-sm text-gray-600">Découvrez tous nos services</p>
            </a>
            
            <a
              href="/delivery"
              className="bg-white rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-200 text-center group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📦</div>
              <h4 className="font-semibold text-gray-900">Livraison</h4>
              <p className="text-sm text-gray-600">Infos sur la livraison</p>
            </a>
            
            <a
              href="/terms"
              className="bg-white rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-200 text-center group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📜</div>
              <h4 className="font-semibold text-gray-900">CGU</h4>
              <p className="text-sm text-gray-600">Conditions d'utilisation</p>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FAQ;