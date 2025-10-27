import React, { useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categorys from '../components/Categorys';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../store/reducers/homeReducer';

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
    <div className='w-full bg-gray-50'>
      <Header />

      {/* --- Section Bannière style Amazon --- */}
      <div className="relative h-[500px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        {/* Image de fond */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images-eu.ssl-images-amazon.com/images/G/31/img23/Fashion/Event/Gateway/AugART23/AFD_PC_HERO_2x._CB599381476_.jpg')",
          }}
        ></div>

        {/* Dégradé fondu vers le bas */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>

        {/* Bannière dynamique */}
        <div className="relative z-10">
          <Banner />
        </div>
      </div>

      {/* --- Section Catégories (superposée à la bannière) --- */}
      <div className="relative z-20 -mt-20 sm:-mt-10">
        <Categorys />
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
  );
};

export default Home;
