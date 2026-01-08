import React, { useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categorys from '../components/Categorys';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../store/reducers/homeReducer';
import navBg from '../assets/nav-bg.png';

const Home = () => {
  const dispatch = useDispatch();
  const { products, latest_product, topRated_product, discount_product } = useSelector(state => state.home);

  useEffect(() => {
    dispatch(get_products());

    // Vérifie si des bannières sont passées dans l’URL
    const urlParams = new URLSearchParams(window.location.search);
    const bannersParam = urlParams.get('banners');
    if (bannersParam) {
      try {
        const banners = JSON.parse(decodeURIComponent(bannersParam));
        localStorage.setItem('frontendBanners', JSON.stringify(banners));
        // Nettoie l'URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error) {
        console.error('Erreur parsing bannières:', error);
      }
    }
  }, [dispatch]);

  return (
    <div 
      className='w-full bg-gray-50 min-h-screen bg-cover bg-center bg-no-repeat bg-fixed'
      style={{
        backgroundImage: `url(${navBg})`,
        backgroundAttachment: 'fixed'
      }}
    >
      <SEO 
        title="Diayal - Marketplace Sénégalaise | Achetez et Vendez en Ligne"
        description="Découvrez Diayal, la marketplace sénégalaise #1. Achetez et vendez des produits locaux : mode, électronique, alimentation. Livraison rapide au Sénégal."
        keywords="marketplace Sénégal, e-commerce Dakar, acheter en ligne Sénégal, produits locaux, Diayal"
        url="/"
      />
      {/* Overlay pour améliorer la lisibilité */}
      <div className='absolute inset-0 bg-white/10 pointer-events-none'></div>
      
      <div className='relative z-10'>
      <Header />

      {/* --- Section Bannière + Catégories unifiée --- */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images-eu.ssl-images-amazon.com/images/G/31/img23/Fashion/Event/Gateway/AugART23/AFD_PC_HERO_2x._CB599381476_.jpg')"
        }}
      >
        {/* Dégradé pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-gray-50/90"></div>
        
        {/* Bannière */}
        <div className="relative z-10 h-[390px] sm:h-[180px] md:h-[200px] lg:h-[220px]">
          <Banner />
        </div>
        
        {/* Carousel des catégories */}
        <div className="relative z-10">
          <Categorys />
        </div>
      </div>

      {/* --- Produits vedettes (flottants) --- */}
      <div className="relative z-20 -mt-10 sm:-mt-6">
        <FeatureProducts products={products} />
      </div>

      {/* --- Sections produits avec grilles --- */}
      <div className='py-16'>
        <div className='w-[85%] flex flex-wrap mx-auto'>
          <div className='grid w-full grid-cols-3 md-lg:grid-cols-1 gap-7'>

            <div className='overflow-hidden bg-white/95 backdrop-blur-sm shadow-lg rounded-lg'>
              <Products title='Nouveautés' products={latest_product} />
            </div>

            <div className='overflow-hidden bg-white/95 backdrop-blur-sm shadow-lg rounded-lg'>
              <Products title='Les mieux notés' products={topRated_product} />
            </div>

            <div className='overflow-hidden bg-white/95 backdrop-blur-sm shadow-lg rounded-lg'>
              <Products title='Articles en promotions' products={discount_product} />
            </div>

          </div>
        </div>
      </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
