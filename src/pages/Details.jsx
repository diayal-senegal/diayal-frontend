import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Rating from '../components/Rating';
import { FaHeart, FaTwitter, FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import Reviews from '../components/Reviews';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { product_details } from '../store/reducers/homeReducer';
import toast from 'react-hot-toast';
import { add_to_card, messageClear, add_to_wishlist } from '../store/reducers/cardReducer';
import PromotionBadge from '../components/PromotionBadge';


const Details = () => {

  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, relatedProducts, moreProducts, sellerPromotion } = useSelector((state) => state.home);
  const { userInfo } = useSelector(state => state.auth);
  const { successMessage, errorMessage } = useSelector(state => state.card);
  
  useEffect(() => {
    dispatch(product_details(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);
  
  
  const [image, setImage] = useState('')
  const [state, setState] = useState('reviews');
  const [showPreOrderModal, setShowPreOrderModal] = useState(false);
  const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4
        },
        mdtablet: {
          breakpoint: { max: 991, min: 464 },
          items: 4
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 3
        },
        smmobile: {
          breakpoint: { max: 640, min: 0 },
          items: 2
        },
        xsmobile: {
          breakpoint: { max: 440, min: 0 },
          items: 1
        }
      }; 

      const [quantity, setQuantity] = useState(1);
      const inc = () => {
        if (quantity >= product.stock) {
            toast.error('Quantité disponible insuffisante');
        } else {
          setQuantity(quantity + 1);
        }
      }

      const dec = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
            
        } 
      }

       const add_card = () => {
          if (userInfo) {
            // Si c'est une précommande, afficher la modale de confirmation
            if (product.isPreOrder) {
              setShowPreOrderModal(true);
            } else {
              // Ajout normal au panier
              dispatch(add_to_card({
                userId: userInfo.id,
                quantity,
                productId: product._id
              }));
            }
          } else {
            toast.error("Veuillez créer un compte ou vous connecter pour ajouter des articles au panier");
            navigate('/login');
          }
        };

        const confirmPreOrder = () => {
          dispatch(add_to_card({
            userId: userInfo.id,
            quantity,
            productId: product._id
          }));
          setShowPreOrderModal(false);
        };

        const add_wishlist = () => {
          if (userInfo) {
            dispatch(add_to_wishlist({
              userId: userInfo.id,
              productId: product._id,
              name: product.name,
              price: product.price,
              images: product.images[0],
              discount: product.discount,
              rating: product.rating,
              slug: product.slug
            }));
          }else{
            toast.error("Veuillez créer un compte ou vous connecter pour ajouter des articles aux favoris");
            navigate('/login');
          }
            
          };

          const buynow = () => {
            let price = 0;
            if (product.discount !== 0) {
              price = product.price - Math.floor((product.price * product.discount) / 100)  ;
            } else {
              price = product.price;  
            }
            const obj = [
              {
                sellerId: product.sellerId,
                shopName: product.shopName,
                price: quantity * (price - Math.floor((price * 5) / 100)),
                products: [
                  {
                    quantity,
                    productInfo: product
                  }
                ]
                
              }
            ]
            navigate("/shipping", {
            state: {
            products : obj,
            price : price * quantity,
            shipping_fee : 5000,
            items : 1 

        }
      });  
          }


    return (
        <div>
            <Header />
            
            {/* Modale de confirmation précommande */}
            {showPreOrderModal && (
              <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
                <div className='bg-white rounded-lg p-6 max-w-md w-full'>
                  <h3 className='text-xl font-bold text-slate-800 mb-3'>📅 Confirmer la précommande</h3>
                  <div className='mb-4 p-3 bg-blue-50 rounded-md border border-blue-200'>
                    <p className='text-slate-700 mb-2'>
                      Vous êtes sur le point de précommander <span className='font-bold'>{product.name}</span>
                    </p>
                    <p className='text-sm text-blue-700 mb-1'>
                      <span className='font-semibold'>Date de disponibilité :</span> {product.preOrderDate ? new Date(product.preOrderDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Non définie'}
                    </p>
                    <p className='text-sm text-slate-600'>
                      <span className='font-semibold'>Quantité :</span> {quantity}
                    </p>
                  </div>
                  <div className='bg-amber-50 border border-amber-200 rounded-md p-3 mb-4'>
                    <p className='text-sm text-amber-800'>
                      <span className='font-bold'>⚠️ Important :</span> Vous paierez maintenant et recevrez l'article à la date indiquée. La précommande est un engagement.
                    </p>
                  </div>
                  <div className='flex gap-3'>
                    <button
                      onClick={() => setShowPreOrderModal(false)}
                      className='flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50'
                    >
                      Annuler
                    </button>
                    <button
                      onClick={confirmPreOrder}
                      className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold'
                    >
                      Confirmer
                    </button>
                  </div>
                </div>
              </div>
            )}
              <section className='bg-[url(http://localhost:3000/images/banner/diay.png)] bg-cover bg-no-repeat h-[390px] mt-6 relative bg-left'>
             <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
              <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] mx-auto h-full'>
                <div className='flex flex-col justify-center gap-1 h-full w-full items-center text-white'>
                   <h2 className='text-3xl font-bold'>Détails de l'article</h2>
                   <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                      <Link to='/'>Accueil</Link> 
                      <span className='pt-1'><IoIosArrowForward /></span>
                      <span>Article</span>
                   </div>
                </div>
              </div>
             </div>
           </section>
      <section>
        <div className='bg-slate-100 py-5 mb-5'>
           <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] mx-auto h-full '>
             <div className='flex justify-start items-center text-md text-slate-600 w-full'>
                <Link to='/'>Accueil</Link> 
                <span className='pt-1'><IoIosArrowForward /></span>
                <Link to='/'>{product.category} </Link>
                <span className='pt-1'><IoIosArrowForward /></span> 
                <span > {product.name}</span>
                
             </div>
           </div>  
        </div>
      </section>  
          <section>
              <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] mx-auto h-full '>
                 <div className='grid grid-cols-2 md-lg:grid-cols-1 gap-8'>
                 <div>
                    <div className='p-5 border relative flex justify-center items-center bg-white'>
                       <img className='h-[400px] w-auto max-w-full object-contain' src={image ?  image : product.images?.[0]} alt="" />
                       {product.isPreOrder && (
                         <span className='absolute top-8 left-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold px-3 py-2 rounded-md shadow-lg z-10'>
                           PRÉCOMMANDE
                         </span>
                       )}
                       {product.isUniqueItem && (
                         <span className='absolute bottom-8 right-8 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-bold px-3 py-2 rounded-md shadow-lg z-10'>
                           PIÈCE UNIQUE
                         </span>
                       )}
                    </div>
                    <div className='py-3'>
                       {
                         product.images && <Carousel
                                          autoPlay={true}
                                          autoPlaySpeed={3000}
                                          infinite={true}
                                          arrows={true}
                                          responsive={responsive}
                                          transitionDuration={500}
                                          partialVisible={false}
                                          
                                          >
                                          {
                                            product.images.map((img, i) => {
                                              return (
                                                <div key={i} onClick={() => setImage(img)} className='px-0'>
                                                <img className='h-[120px] cursor-pointer object-contain' src={img} alt="" />
                                                </div>
                                              )
                                            })
                                          }

                                    </Carousel>
                       }
                    </div>
                    </div>
          <div className='flex flex-col gap-5'>
          <p className="py-1">
            <span className="text-slate-600 font-bold text-lg">La boutique de :</span>{' '}
            <span className="text-[#059473] font-extrabold text-2xl tracking-wide">
              {product.shopName}
            </span>
          </p>

             <div className='text-3xl text-slate-600 font-bold'>
               <h3>{product.name}</h3>
             </div>
               <div className='flex justify-start items-center gap-4'>
                  <div className='flex text-xl'>
                     <Rating ratings={product.ratings} />
                  </div>
                  <span className='text-green-600'>(avis)</span>
               </div>
           <div className='text-2xl text-red-500 font-bold flex gap-3'>
              {
                product.discount !== 0 ? <>
                 Prix : <h2 className='line-through'>  {product.price} FCFA</h2>
                  <h2>{product.price - Math.floor((product.price * product.discount) / 100)} FCFA (-{product.discount}%)</h2>
                </> : <h2>Prix : {product.price} FCFA</h2>
              }
           </div>
           {product.isPreOrder && product.preOrderDate && (
             <div className='p-3 rounded-md bg-blue-50 border border-blue-200'>
               <p className='text-blue-700 font-semibold text-sm'>📅 Précommande</p>
               <p className='text-blue-600 text-sm mt-1'>
                 Disponible le : <span className='font-bold'>{new Date(product.preOrderDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
               </p>
               <p className='text-blue-500 text-xs mt-1'>Vous paierez maintenant et recevrez l'article à cette date.</p>
             </div>
           )} 
             <div className='text-slate-600'>
                <p>
                   {product.description ? product.description.substring(0, 230) + '...' : ''}
                </p>
             </div>
             
             {/* Promotion Badge */}
             <PromotionBadge sellerPromotion={sellerPromotion} />
               <div className='flex gap-3 pb-10 border-b'>
                   {
                     product.stock ? <>
                     <div className='flex bg-slate-200 h-[50px] justify-center items-center tex-xl'>
                         <div onClick={dec} className='px-6 cursor-pointer'>-</div> 
                         <div className='px-6 '>{quantity}</div> 
                         <div onClick={inc} className='px-6 cursor-pointer'>+</div> 
                     </div>
                       <div>
                         <button onClick={add_card} className={`${product.isPreOrder ? 'bg-blue-600 hover:shadow-blue-500/40' : 'bg-[#059473] hover:shadow-green-500/40'} text-white px-6 py-3 flex items-center justify-center min-h-[50px] w-full sm:w-auto cursor-pointer hover:shadow-lg`}>
                         {product.isPreOrder ? 'Précommander maintenant' : 'Ajouter au panier'}
                         </button>

                       </div>
                     </> : ''
                   }
                    <div>
                       <div onClick={add_wishlist} className='h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white'>
                          <FaHeart /> 
                       </div>
                    </div>
               </div> 
                    <div className="flex flex-col gap-4">
  {/* Bloc Disponibilité + Partager */}
  <div className="flex gap-5 pb-3">
    <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-4">
      <span>Disponibilité</span>
      <span>Partager sur</span>
    </div>
    <div className="flex flex-col gap-4">
      <span className={`${product.isPreOrder ? 'text-blue-600 font-semibold' : product.stock ? 'text-green-500' : 'text-red-500'}`}>
        {product.isPreOrder ? `Précommande (${product.stock} disponibles)` : product.stock ? `En stock(${product.stock})` : 'En rupture de stock'}
      </span>
      <ul className="flex justify-start items-center gap-3">
        <li>
          <a
            className="w-[25px] h-[25px] sm:w-[25px] sm:h-[25px] hover:bg-[#1877f2] hover:text-white flex justify-center items-center rounded-full bg-white text-[#1877f2] transition-all duration-300 hover:scale-110" href="https://www.facebook.com/profile.php?id=61582393357735&locale=fr_FR" title="Facebook"
          >
            <FaFacebookF />
          </a>
        </li>
        <li>
          <a
            className="w-[25px] h-[25px] sm:w-[25px] sm:h-[25px] hover:bg-[#000000] hover:text-white flex justify-center items-center rounded-full bg-white text-[#000000] transition-all duration-300 hover:scale-110" href="https://www.tiktok.com/@diayal1?lang=fr" title="TikTok"
          >
            <AiFillTikTok />
          </a>
        </li>
        <li>
          <a
            className="w-[25px] h-[25px] sm:w-[25px] sm:h-[25px] hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white flex justify-center items-center rounded-full bg-white text-[#e4405f] transition-all duration-300 hover:scale-110" href="https://www.instagram.com/diayal_officiel/" title="Instagram"
          >
            <FaSquareInstagram />
          </a>
        </li>
        <li>
          <a
            className="w-[25px] h-[25px] sm:w-[25px] sm:h-[25px hover:bg-[#1da1f2] hover:text-white flex justify-center items-center rounded-full bg-white text-[#1da1f2] transition-all duration-300 hover:scale-110" href="https://x.com/Diayal_officiel" title="Twitter"
          >
            <FaTwitter />
          </a>
        </li>
      </ul>
    </div>
  </div>

  {/* Bloc Boutons */}
  <div className="flex gap-3">
    {product.stock && (
      <button onClick={buynow} className={`${product.isPreOrder ? 'bg-blue-700 hover:shadow-blue-500/40' : 'bg-[#24a889] hover:shadow-green-500/40'} text-white px-6 py-3 flex items-center justify-center min-h-[50px] w-full sm:w-auto cursor-pointer hover:shadow-lg`}>
        {product.isPreOrder ? 'Précommander et payer' : 'Acheter maintenant'}
      </button>
    )}
    <Link
      to={`/dashboard/chat/${product.sellerId}`}
      className="bg-red-500 text-white px-6 py-3 flex items-center justify-center min-h-[50px] w-full sm:w-auto cursor-pointer hover:shadow-lg hover:shadow-red-500/40"
    >
      Chat avec le vendeur
    </Link>
  </div>
</div>


                  </div>
                 </div>
              </div>
          </section>
              <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] mx-auto h-full pb-16'>
                   <div className='flex flex-wrap'>
                      <div className='w-[72%] md-lg:w-full'>
                        <div className='pr-4 md-lg:pr-0'>
                           <div className='grid grid-cols-2 '>
                              <button onClick={() => setState('reviews')} 
                               className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${state === 'reviews' ? 'bg-[#059473] text-white' 
                               : 'bg-slate-200 text-slate-700'} rounded-sm`}>
                               Avis
                               </button>

                              <button onClick={() => setState('description')} 
                               className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${state === 'description' ? 'bg-[#059473] text-white' 
                               : 'bg-slate-200 text-slate-700'} rounded-sm`}>
                               Description
                               </button>
                           </div> 
                             <div>
                              {
                                state === 'reviews' ? <Reviews product={product}/> : <p className='text-slate-600'>
                                  {product.description}
                                </p>
                              }
                             </div>
                        </div>
                      </div>
                           <div className='w-[28%] md-lg:w-full'>
                              <div className='pl-4 md-lg:pl-0'>
                                 <div className='px-3 py-2 text-slate-600 bg-slate-200'>
                                     <h2 className='font-bold'>De {product.shopName}</h2>
                                 </div>
                                  <div className='flex flex-col gap-5 mt-3 boreder p-3'>
                                      {
                                        moreProducts.map((p, i) => {
                                          return (
                                            <Link className='block' to={`/product/details/${p.slug}`}>
                                               <div className='relative h-[270px]'>
                                                  <img className='w-full h-full' src={p.images[0]} alt="" />
                                                  {
                                                    p.discount !== 0 && <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full
                                                   bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}%

                                                    </div>
                                                  }
                                               </div>
                                               <h2 className='text-slate-600 font-bold py-1'>{p.name}</h2>
                                               <div className= 'flex gap-2'>
                                                  <h2 className='text-lg font-bold text-black'>{p.price} FCFA</h2>
                                                    <div className='flex items-center gap-2'>
                                                       <Rating ratings={p.rating} /> (Avis)
                                                    </div>
                                               </div>
                                            </Link>
                                          )
                                        })
                                      }
                                  </div>
                              </div>
                           </div>
                   </div>
                </div>
              </section>

                <section>
                  <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] mx-auto h-full '>
                     <h2 className='text-2xl py-8 text-slate-600'>Articles similaires</h2>
                       <div>
                        <Swiper 
                          slidesPerView='auto'
                          breakpoints={{
                            565: {
                              slidesPerView: 2,
                            },
                            640: {
                              slidesPerView: 2,
                            },
                            768: {
                              slidesPerView: 3,
                            },
                            1280: {
                              slidesPerView: 4,
                            },
                          }}
                          spaceBetween={25}
                          loop={true}
                          pagination={{
                            clickable: true,
                            el: '.custom_bullet',
                          }}
                          modules={[Pagination]}
                          className='mySwiper'
                        >   
                          {
                            relatedProducts.map((p, i) => {
                              return (
                                <SwiperSlide>
                                  <Link className='block' to={`/product/details/${p.slug}`}>
                                     <div className='relative h-[270px]'>
                                       <div className='w-full h-full'>
                                        <img className='w-full h-full' src={p.images[0]} alt="" /> 
                                      <div className='absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500'>
                                      </div>
                                       </div>
                                       {
                                          p.discount !== 0 && <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full
                                           bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}%</div>
                                       }
                                     </div>
                                         <div className='p-4 flex flex-col gap-1 '>
                                            <h2 className='text-slate-600 text-lg font-bold '>{p.name}</h2>
                                               <div className='flex justify-start items-center gap-3'>
                                                  <h2 className='text-lg font-bold text-black'>{p.price} FCFA</h2>
                                                    <div className='flex '>
                                                       <Rating ratings={p.rating} /> (Avis)
                                                    </div>
                                               </div>
                                         </div>
                                  </Link>
                                </SwiperSlide>
                              )
                            })
                          }
                        </Swiper>
                       </div>
                           <div className='w-full flex justify-center items-center py-8'>
                             <div className='custom_bullet justify-center gap-3 !w-auto'>

                             </div>
                           </div>
                  </div>
                </section>
            <Footer />
        </div>
    );
};

export default Details;