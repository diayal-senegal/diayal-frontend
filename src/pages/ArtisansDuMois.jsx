import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaQuoteLeft, FaPlay, FaArrowRight } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { get_artisans_du_mois } from '../store/reducers/artisanReducer';

const ArtisansDuMois = () => {
  const dispatch = useDispatch();
  const { artisans, loader } = useSelector(state => state.artisan);
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    dispatch(get_artisans_du_mois());
  }, [dispatch]);

  useEffect(() => {
    if (artisans) artisans.forEach(a => console.log('video:', a.video));
  }, [artisans]);

  const currentMonth = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  return (
    <div className='bg-gray-50'>
      <Header />
      
      {/* Hero Section - Magazine Style */}
      <div className='relative h-[70vh] overflow-hidden'>
        <div 
          className='absolute inset-0 bg-gradient-to-br from-[#059473] via-[#37475A] to-[#2c3e50]'
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply'
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30'></div>
        </div>
        
        <div className='relative h-full flex items-center justify-center text-center px-4'>
          <div className='max-w-4xl'>
            <div className='inline-block mb-4 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20'>
              <span className='text-white/90 text-sm font-medium uppercase tracking-wider'>
                {currentMonth}
              </span>
            </div>
            <h1 className='text-4xl md:text-4xl font-bold text-white mb-5 leading-tight'>
              Artisans du Mois
            </h1>
            <p className='text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed'>
              Découvrez les histoires inspirantes des artisans qui façonnent l'excellence de notre plateforme
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <div className='w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2'>
            <div className='w-1 h-3 bg-white/50 rounded-full'></div>
          </div>
        </div>
      </div>

      {/* Artisans Stories */}
      <div className='max-w-7xl mx-auto px-4 py-16'>
        {loader ? (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-[#059473]'></div>
          </div>
        ) : artisans && artisans.length > 0 ? (
          <div className='space-y-32'>
            {artisans.map((artisan, index) => (
              <article key={artisan._id} className='relative'>
                {/* Artisan Story Section */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
                  
                  {/* Image + Infos - Colonne 1 */}
                  <div className='lg:col-span-1 space-y-4'>
                    <div className='relative group'>
                      <div className='absolute -top-4 -left-4 z-20'>
                        <div className='bg-gradient-to-br from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-xl shadow-lg'>
                          <div className='flex items-center gap-2'>
                            <span className='text-xl'>⭐</span>
                            <span className='font-bold text-xs'>Artisan du Mois</span>
                          </div>
                        </div>
                      </div>

                      <div className='relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] max-h-[450px]'>
                        {artisan.video ? (
                          <div className='absolute inset-0 bg-black'>
                            {playingVideo === artisan._id ? (
                              <iframe
                                className='w-full h-full'
                                src={artisan.video}
                                title={artisan.shopInfo?.shopName}
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                allowFullScreen
                              ></iframe>
                            ) : (
                              <>
                                <img 
                                  src={artisan.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'} 
                                  alt={artisan.shopInfo?.shopName}
                                  className='w-full h-full object-cover'
                                />
                                <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
                                  <button
                                    onClick={() => setPlayingVideo(artisan._id)}
                                    className='w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transform hover:scale-110 transition-all shadow-2xl'
                                  >
                                    <FaPlay className='text-[#059473] text-xl ml-1' />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <img 
                            src={artisan.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'} 
                            alt={artisan.shopInfo?.shopName}
                            className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700'
                          />
                        )}
                      </div>
                    </div>

                    {/* Carte Infos combinée sous l'image */}
                    <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm'>
                      <div className='space-y-1'>
                        {artisan.shopInfo?.district && (
                          <div className='flex items-center gap-3'>
                            <FaMapMarkerAlt className='text-[#059473] text-lg flex-shrink-0' />
                            <div>
                              <p className='text-xs text-gray-500'>Localisation</p>
                              <p className='text-sm text-gray-900 font-semibold'>{artisan.shopInfo.district}</p>
                            </div>
                          </div>
                        )}
                        {artisan.products && artisan.products.length > 0 && (
                          <>
                            {artisan.shopInfo?.district && <div className='h-px bg-gray-100'></div>}
                            <div className='flex items-center gap-3'>
                              <span className='text-xl flex-shrink-0'>🎨</span>
                              <div>
                                <p className='text-xs text-gray-500'>Créations</p>
                                <p className='text-sm text-gray-900 font-semibold'>{artisan.products.length}+ produits</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description - Colonne 2 */}
                  <div className='lg:col-span-1'>
                    <div className='relative bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 lg:p-10 rounded-xl border border-gray-100 shadow-sm h-full flex flex-col justify-center min-h-[200px] lg:min-h-[350px]'>
                      <div className='mb-4'>
                        <div className='flex items-center gap-2 mb-2'>
                          <div className='h-1 w-8 bg-gradient-to-r from-[#059473] to-transparent rounded-full'></div>
                          <span className='text-[#059473] font-semibold text-xs uppercase tracking-wider'>Portrait</span>
                        </div>
                        <h2 className='text-2xl md:text-md font-semibold text-gray-900 mb-1 leading-tight'>
                          {artisan.shopInfo?.shopName || artisan.name}
                        </h2>
                        <p className='text-base md:text-lg text-[#059473] font-semibold mb-2'>
                          {artisan.category || "Artisan d'Excellence"}
                        </p>
                        {artisan.rating > 0 && (
                          <div className='flex items-center gap-2 mb-2'>
                            <div className='flex items-center gap-1'>
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={`text-sm ${i < Math.floor(artisan.rating) ? 'text-yellow-500' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className='text-sm text-gray-600 font-medium'>{artisan.rating}/5</span>
                          </div>
                        )}
                      </div>
                      <FaQuoteLeft className='absolute top-4 left-4 text-3xl md:text-4xl text-[#059473]/10' />
                      <p className='text-gray-700 text-base md:text-lg leading-relaxed relative z-10 italic'>
                        {artisan.description || `Passionné par mon métier, je crée des pièces uniques qui allient tradition et modernité. Chaque création raconte une histoire et porte en elle l'âme de l'artisanat authentique.`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Products Showcase */}
                {artisan.products && artisan.products.length > 0 && (
                  <div className='mt-12'>
                    <div className='text-center mb-6'>
                      <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-2'>
                        Créations Phares
                      </h3>
                      <p className='text-gray-600 text-sm md:text-base'>
                        Une sélection des meilleures œuvres de {artisan.shopInfo?.shopName || artisan.name}
                      </p>
                    </div>

                    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                      {artisan.products.map((product) => (
                        <Link 
                          key={product._id}
                          to={`/product/details/${product.slug}`}
                          className='group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
                        >
                          {/* Product Image */}
                          <div className='relative w-full pb-[80%] overflow-hidden bg-gray-100'>
                            <img 
                              src={product.images?.[0] || 'https://via.placeholder.com/400'} 
                              alt={product.name}
                              className='absolute inset-0 w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500'
                            />
                            {product.discount > 0 && (
                              <div className='absolute top-1 right-1 bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold shadow-lg'>
                                -{product.discount}%
                              </div>
                            )}
                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity'>
                              <div className='absolute bottom-1 left-1 right-1'>
                                <div className='flex items-center justify-center text-white'>
                                  <FaArrowRight className='transform group-hover:translate-x-1 transition-transform text-xs' />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className='p-2'>
                            <h4 className='text-xs font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-[#059473] transition-colors leading-tight'>
                              {product.name}
                            </h4>
                            <div className='flex items-center justify-between gap-1'>
                              <div className='flex-1 min-w-0'>
                                {product.discount > 0 ? (
                                  <div className='flex flex-col'>
                                    <span className='text-xs font-bold text-[#059473] truncate'>
                                      {product.price - Math.floor((product.price * product.discount) / 100)} F
                                    </span>
                                    <span className='text-[10px] text-gray-400 line-through truncate'>
                                      {product.price} F
                                    </span>
                                  </div>
                                ) : (
                                  <span className='text-xs font-bold text-[#059473] truncate block'>
                                    {product.price} F
                                  </span>
                                )}
                              </div>
                              {product.rating > 0 && (
                                <div className='flex items-center gap-0.5 flex-shrink-0'>
                                  <FaStar className='text-yellow-500 text-[10px]' />
                                  <span className='text-[10px] font-semibold text-gray-700'>{product.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Bouton Découvrir l'Atelier après les articles */}
                    <div className='mt-8 text-center'>
                      <Link 
                        to={`/products?sellerId=${artisan._id}&type=product`}
                        className='inline-flex items-center gap-3 bg-gradient-to-r from-[#059473] to-[#048060] hover:from-[#048060] hover:to-[#059473] text-white px-8 py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all group'
                      >
                        <span>Découvrir l'Atelier Complet</span>
                        <FaArrowRight className='group-hover:translate-x-2 transition-transform' />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Divider between artisans */}
                {index < artisans.length - 1 && (
                  <div className='mt-32 flex items-center justify-center'>
                    <div className='h-px w-32 bg-gradient-to-r from-transparent via-gray-300 to-transparent'></div>
                    <div className='mx-4 text-gray-400'>✦</div>
                    <div className='h-px w-32 bg-gradient-to-r from-transparent via-gray-300 to-transparent'></div>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className='text-center py-20'>
            <div className='text-6xl mb-6'>🎨</div>
            <h3 className='text-3xl font-bold text-gray-800 mb-3'>
              Aucun artisan ce mois-ci
            </h3>
            <p className='text-gray-600 text-lg'>
              Revenez bientôt pour découvrir nos artisans d'exception !
            </p>
          </div>
        )}
      </div>

      {/* CTA Section - Become Artisan */}
      <div className='relative py-24 overflow-hidden'>
        <div 
          className='absolute inset-0 bg-gradient-to-br from-[#37475A] via-[#2c3e50] to-[#059473]'
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply'
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
        </div>
        
        <div className='relative max-w-4xl mx-auto text-center px-4'>
          <div className='inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20'>
            <span className='text-white/90 text-sm font-medium uppercase tracking-wider'>
              Rejoignez-nous
            </span>
          </div>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            Vous êtes artisan ?
          </h2>
          <p className='text-xl text-white/90 mb-10 leading-relaxed'>
            Partagez votre passion et votre savoir-faire avec des milliers de clients. 
            Devenez l'artisan du mois et racontez votre histoire !
          </p>
          <Link 
            to='/vendor'
            className='inline-flex items-center gap-3 bg-white text-[#059473] px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 group'
          >
            <span>Devenir Vendeur</span>
            <FaArrowRight className='group-hover:translate-x-2 transition-transform' />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArtisansDuMois;
