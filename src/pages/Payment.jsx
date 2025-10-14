import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import Stripe from '../components/Stripe';
import PaymentSimulator from '../components/PaymentSimulator';
// import CinetPay from '../components/CinetPay'; // En attente de vraies clés

const Payment = () => {

    const location = useLocation()
    const { price, items, orderId } = location.state || {}
    const [paymentMethod, setPaymentMethod] = useState('paydunya')

    if (price == null || items == null || orderId == null) {
        return (
            <div>
                <Header />
                <div className='min-h-screen flex items-center justify-center'>
                    <div className='text-center'>
                        <h2 className='text-2xl font-bold text-red-600 mb-4'>Erreur de paiement</h2>
                        <p className='text-gray-600'>Informations de commande manquantes. Veuillez retourner au panier.</p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div>
            <Header />  
              <section className='bg-[#eeeeee]'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4'>
                 <div className='flex flex-wrap md:flex-col-reverse'>
                   <div className='w-7/12 md:w-full'>
                    <div className='pr-2 md:pr-0'>
                      <div className='flex flex-wrap'>
                  <div className='w-full cursor-pointer py-8 px-12 bg-white'>
                    <div className='flex flex-col gap-[3px] justify-center items-center'>
                     <img src="http://localhost:3000/images/payment/payment3.png" alt="payment"
                     className='w-[50px] h-[50px]'
                     />
                    </div>
                    <span className='text-slate-600 text-center block'>Paiements Mobile & Carte</span>
                  </div>      
                      </div>  
                    
                         <div>
                           <PaymentSimulator orderId={orderId} price={price} />
                         </div>
                   </div>
                 </div>
                      <div className='w-5/12 md:w-full'>
                        <div className='pl-2 md:pl-0 md:mb-0'>
                          <div className='bg-white shadow p-5 text-slate-600 flex flex-col gap-3'>
                            <h2 className='font-bold text-lg'>Détails de la commande</h2>
                            <div className='flex justify-between items-center'>
                              <span>{items} Aticles avec frais de livraison inclus</span>
                              <span>{price} FCFA</span>
                            </div>
                            <div className='flex justify-between items-center font-semibold'>
                              <span>Montant total</span>
                              <span className='text-lg text-green-600'>{price} FCFA</span>
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

export default Payment;