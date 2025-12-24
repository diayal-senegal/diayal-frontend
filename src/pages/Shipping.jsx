import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useLocation, useNavigate, } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { place_order } from '../store/reducers/orderReducer';
import ShippingCalculator from '../components/ShippingCalculator';
import toast from 'react-hot-toast';

const Shipping = () => {

    const location = useLocation();
    const { products, price, shipping_fee, items } = location.state || {};
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector(state => state.auth)

    const [res, setRes] = useState(false);
    const [shippingInfo, setShippingInfo] = useState({
        totalShipping: shipping_fee || 0,
        hasPromotion: false,
        promotionMessages: [],
        savings: 0
    });
    const [state, setState] = useState({
        name: '',
        adress: '',
        phone: '',
        post: '',
        region: '',
        city: '',
        area: ''
    });

    // Rediriger vers le panier si les données sont manquantes
    useEffect(() => {
        if (!products || !Array.isArray(products) || products.length === 0) {
            navigate('/card');
        }
    }, [products, navigate]);

    // Ne pas rendre le composant si les données ne sont pas disponibles
    if (!products || !Array.isArray(products) || products.length === 0) {
        return null;
    }
    
    // Utiliser les valeurs du Redux store (calculées côté serveur)
    const totalPrice = price || 0;
    const totalItems = items || 0;
    
    // Calculer les frais de livraison
    const baseShippingCost = shippingInfo.totalShipping || shipping_fee || 0;
    
    // Check for free shipping (over 30000 F) - seulement sur le prix des articles
    const isFreeShipping = totalPrice >= 30000;
    const finalShippingCost = isFreeShipping ? 0 : baseShippingCost;

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const save = (e) => {
        e.preventDefault();
        const { name, adress, phone, post, region, city, area } = state;
        if (name && adress && phone && post && region && city && area) {
            setRes(true)
        }
    }

    const placeOrder = () => {
        if (!userInfo) {
            toast.error("Veuillez créer un compte ou vous connecter pour finaliser votre commande");
            return;
        }
        
        dispatch(place_order({ 
          price: totalPrice, 
          products, 
          shipping_fee: finalShippingCost, 
          items: totalItems, 
          shippingInfo : state,
          userId : userInfo,
          navigate

        }))
    }


    return (
        <div>
           <Header />
            <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
            <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                <h2 className='text-3xl font-bold'>Commande & livraison </h2>
                <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                        <Link to='/'>Home</Link>
                        <span className='pt-1'>
                        <IoIosArrowForward />
                        </span>
                        <span>Livraison</span>
                      </div>
                    </div> 
                </div> 
            </div> 
           </section>
    <section className='bg-[#eeeeee]'>
      <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] mx-auto py-16'>
        <div className='w-full flex flex-wrap'>
           <div className='w-[67%] md-lg:w-full'>
              <div className='flex flex-col gap-3'>
                  <div className='bg-white p-6 shadow-sm rounded-md'>
                     <h2 className='text-slate-600 font-bold pb-3'>Informations de livraison </h2>  

    {
       !res && <>
        <form onSubmit={save}>
                        <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                           <div className='flex flex-col gap-1 mb-2 w-full'>
                             <label htmlFor='name'>Nom et prenom</label>
                             <input onChange={inputHandle} value={state.name} type='text' 
                             className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' 
                             placeholder='Nom destinataire' 
                             name='name' 
                             id='name'
                             />
                           </div>
                           <div className='flex flex-col gap-1 mb-2 w-full'>
                             <label htmlFor='adress'>Adresse complete</label>
                             <input onChange={inputHandle} value={state.adress} type='text' 
                             className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' 
                             placeholder='Adresse complete' 
                             name='adress' 
                             id='adress'
                             />
                           </div>
                        </div>
                        {/* Séparation de formulaire */}
                        <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                           <div className='flex flex-col gap-1 mb-2 w-full'>
                             <label htmlFor='phone'>Téléphone</label>
                             <input onChange={inputHandle} value={state.phone} type='text' 
                             className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' 
                             placeholder='Numéro de téléphone' 
                             name='phone' 
                             id='phone'
                             />
                           </div>
                           <div className='flex flex-col gap-1 mb-2 w-full'>
                             <label htmlFor='post'>Code postal</label>
                             <input onChange={inputHandle} value={state.post} type='text' 
                             className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' 
                             placeholder='Numéro code postal' 
                             name='post' 
                             id='post'
                             />
                           </div>
                        </div>
                        {/* Deuxième séparation de formulaire */}
                        <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                           <div className='flex flex-col gap-1 mb-2 w-full'>
                             <label htmlFor='region'>Région</label>
                             <input onChange={inputHandle} value={state.region} type='text' 
                             className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' 
                             placeholder='Région' 
                             name='region' 
                             id='region'
                             />
                           </div>
                           <div className='flex flex-col gap-1 mb-2 w-full'>
                             <label htmlFor='city'>Ville / Commune</label>
                             <input onChange={inputHandle} value={state.city} type='text' 
                             className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' 
                             placeholder='Ville ou Commune' 
                             name='city' 
                             id='city'
                             />
                           </div>
                        </div>
                        {/* Troisième séparation de formulaire */}
                        <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                           <div className='flex flex-col gap-1 mb-2 w-full'>
                             <label htmlFor='area'>Localité</label>
                             <input onChange={inputHandle} value={state.area} type='text' 
                             className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' 
                             placeholder='La localité' 
                             name='area' 
                             id='area'
                             />
                           </div>
                           <div className='flex flex-col gap-1 mt-8 mb-2 w-full'>
                             <button className='px-3 py-[6px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white font-semibold'>
                               Enregistrer
                             </button>
                           </div>
                        </div>
                     </form>
       </> 
    }
    
    {
        res && <div className='flex flex-col gap-2'>
        <h2 className='text-slate-600 font-semibold pb-2'>Livraison chez : {state.name} </h2>
        <div className='bg-gray-100 p-3 rounded-lg'>
              <span className='text-blue-500 mr-2'><FaHome /></span>
             <span className='bg-blue-200 text-blue-500 text-sm font-medium mr-2 py-1 px-2 rounded'>Domicile</span>
            <div className='mt-2 text-sm text-gray-700'>
                <p><strong>Adresse :</strong> {state.adress}</p>
                <p><strong>Ville/Commune :</strong> {state.city}</p>
                <p><strong>Région :</strong> {state.region}</p>
                <p><strong>Téléphone :</strong> {state.phone}</p>
            </div>
           <span onClick={() =>setRes(false)} className='text-indigo-500 cursor-pointer mt-2 inline-block'>Changer l'adresse</span>
        </div>
    </div> 
    }             
    </div>

     {products && products.map((p, i) => (
                <div key={i} className='flex bg-white p-4 flex-col gap-2'>
                  <div className='flex justify-start items-center'>
                    <h2 className='text-md text-slate-600 font-bold'>
                     {p.shopName}
                    </h2>
                  </div>

                  {p.products.map((pt, i) => (
                    <div
                      key={i}
                      className='w-full flex flex-wrap mb-5 gap-y-4'
                    >
                      <div className='flex sm:w-full gap-2 w-7/12'>
                        <div className='flex gap-2 justify-start items-center'>
                          <img
                            className='w-[80px] h-[80px] max-w-full'
                            src={pt.productInfo.images[0]}
                            alt=''
                          />
                          <div className='pr-4 text-slate-600'>
                            <h2 className='text-md font-semibold'>
                              {pt.productInfo.name}
                            </h2>
                            <span className='text-sm'>
                              Marque : {pt.productInfo.brand}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
                        <div className='pl-4 sm:pl-0'>
                          {pt.productInfo.finalDiscount && pt.productInfo.finalDiscount > 0 ? (
                            <>
                              <h2 className='text-lg text-orange-500'>
                                {pt.productInfo.price - Math.floor((pt.productInfo.price * pt.productInfo.finalDiscount) / 100)} FCFA
                              </h2>
                              <p className='line-through text-gray-400'>{pt.productInfo.price} FCFA</p>
                              <p className='text-red-500 font-semibold'>-{pt.productInfo.finalDiscount}%
                                {pt.productInfo.dealDiscount && (
                                  <span className='text-xs bg-red-100 text-red-700 px-1 rounded ml-1'>PROMO</span>
                                )}
                              </p>
                            </>
                          ) : (
                            <h2 className='text-lg text-orange-500'>
                              {pt.productInfo.price} FCFA
                            </h2>
                          )}
                        </div>
                        
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              </div>
           </div>
<div className='w-[33%] md-lg:w-full'>
           <div className='pl-3 md-lg:pl-0 md-lg:mt-5'>
                
                    <div className='space-y-4'>
                      {/* Shipping Calculator */}
                      <ShippingCalculator 
                        cartItems={products?.flatMap(p => p.products || []) || []}
                        onShippingUpdate={setShippingInfo}
                      />
                      
                      {/* Order Summary */}
                      <div className='bg-white p-3 text-slate-600 flex flex-col gap-3'>
                        <h2 className='text-xl font-bold'>Détails de la commande</h2>
                        <div className='flex justify-between items-center '>
                            <span>Total des articles ({totalItems})</span>
                            <span>{totalPrice} FCFA</span>
                        </div>
                        <div className='flex justify-between items-center '>
                            <span>Frais de livraison</span>
                            <span className={isFreeShipping ? 'text-green-600' : ''}>
                              {isFreeShipping ? (
                                <>
                                  <span className='line-through text-gray-400 mr-2'>{shippingInfo.totalShipping} FCFA</span>
                                  GRATUIT
                                </>
                              ) : (
                                `${shippingInfo.totalShipping} FCFA`
                              )}
                            </span>
                        </div>
                        {shippingInfo.promotionMessages && shippingInfo.promotionMessages.length > 0 && (
                          <div className='bg-green-50 border border-green-200 rounded p-2'>
                            {shippingInfo.promotionMessages.map((message, index) => (
                              <div key={index} className='text-green-800 text-sm'>🎉 {message}</div>
                            ))}
                          </div>
                        )}
                        <div className='flex justify-between items-center '>
                            <span>Sous-total</span>
                            <span>{totalPrice + finalShippingCost} FCFA</span>
                        </div>
                        <div className='flex justify-between items-center '>
                            <span>Total</span>
                            <span className='text-lg text-[#059473]'>{totalPrice + finalShippingCost} FCFA</span>
                        </div>
                        <button onClick={placeOrder} disabled={res ? false : true} className={`px-5 py-[6px] bg-green-500 hover:shadow-red-500/50 hover:shadow-lg 
                         text-white uppercase font-semibold rounded-sm ${res ? '' : 'cursor-not-allowed' }`}>Passer la commande</button>
                      </div>
                    </div>
                
           </div>  
        </div>

        </div>
      </div>
    </section>
           <Footer />
        </div>
    );
};

export default Shipping;