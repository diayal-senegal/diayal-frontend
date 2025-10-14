import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer'

const Legal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Header/>
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="text-6xl mb-6">📜</div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-9">
            Mentions Légales
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Informations légales et réglementaires de la plateforme Diayal
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Section 1 - Éditeur du site */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-purple-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">1</span>
              Éditeur du site
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Le site <span className="font-semibold text-purple-600">Diayal</span> est édité par :
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">🏢</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Raison sociale</h4>
                    <p className="text-gray-600">Diayal SARL</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">⚖️</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Forme juridique</h4>
                    <p className="text-gray-600">Société à Responsabilité Limitée (SARL)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">📍</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Siège social</h4>
                    <p className="text-gray-600">129 Rue de la Paix - 12000 - Yoff<br/>Dakar, Sénégal</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">💰</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Capital social</h4>
                    <p className="text-gray-600">1 000 000 FCFA</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">📞</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Téléphone</h4>
                    <p className="text-gray-600">+221 33 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">📧</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">contact@diayal.sn</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">🆔</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">NINEA</h4>
                    <p className="text-gray-600">123456789012345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">👤</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Responsable de publication</h4>
                    <p className="text-gray-600">Directeur Général</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 - Hébergement */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 shadow-lg mb-8 border border-purple-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">2</span>
              Hébergement du site
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">Le site est hébergé par :</p>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🌐</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Hébergeur</h4>
                      <p className="text-gray-600">Vercel Inc.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📍</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Adresse</h4>
                      <p className="text-gray-600">340 S Lemon Ave #4133<br/>Walnut, CA 91789, USA</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🔗</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Site web</h4>
                      <p className="text-gray-600">vercel.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📞</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Support</h4>
                      <p className="text-gray-600">support@vercel.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 - Propriété intellectuelle */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-purple-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">3</span>
              Propriété intellectuelle
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <span className="text-3xl mr-4 mt-1">©️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Protection du contenu</h4>
                  <p className="text-gray-700 leading-relaxed">
                    L'ensemble du contenu du site (textes, images, illustrations, logos, vidéos, base de données, structure…) 
                    est protégé par le droit d'auteur et la législation relative à la propriété intellectuelle.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-3xl mr-4 mt-1">🚫</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Interdictions</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Toute reproduction, représentation, diffusion ou utilisation sans autorisation est strictement interdite.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-3xl mr-4 mt-1">🏷️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Marques et logos</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Les marques et logos de Diayal sont protégés. Leur utilisation sans autorisation est strictement interdite.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sections 4-6 en format compact */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Section 4 - Responsabilité */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                Responsabilité ⚠️
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p>• Diayal s'efforce d'assurer l'exactitude des informations mais ne peut garantir l'absence d'erreurs</p>
                <p>• Le site peut être temporairement indisponible pour maintenance</p>
                <p>• Diayal décline toute responsabilité concernant :</p>
                <ul className="ml-4 space-y-1">
                  <li>- Les interruptions de service</li>
                  <li>- Les dommages liés à l'utilisation</li>
                  <li>- Les contenus externes via liens</li>
                </ul>
              </div>
            </div>

            {/* Section 5 - Données & Cookies */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
                Données & Cookies 🍪
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p>• Informations collectées traitées selon notre Politique de confidentialité</p>
                <p>• Droit de suppression/rectification : contact@diayal.sn</p>
                <p>• Cookies utilisés pour améliorer l'expérience et mesurer l'audience</p>
              </div>
              <div className="mt-4 flex gap-2">
                <a href="/privacy" className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-green-200 transition">
                  Politique de confidentialité
                </a>
              </div>
            </div>
          </div>

          {/* Section 6 - Juridiction */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center mt-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
              <span className="bg-white  flex items-center justify-center text-lg font-bold mr-4"></span>
              Droit applicable et juridiction compétente
            </h2>
            <div className="flex items-center justify-center gap-8">
              <div className="text-6xl">⚖️</div>
              <div className="text-left">
                <p className="text-lg leading-relaxed mb-2">
                  Les présentes mentions légales sont soumises au <span className="font-semibold">droit sénégalais</span>.
                </p>
                <p className="text-lg leading-relaxed">
                  En cas de litige, compétence exclusive est attribuée aux tribunaux sénégalais compétents.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Legal;