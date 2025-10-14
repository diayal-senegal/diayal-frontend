import React, { useState } from 'react';
import axios from 'axios';

const CinetPay = ({ price, orderId }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        setIsLoading(true);
        localStorage.setItem('orderId', orderId);
        
        try {
            const { data } = await axios.post('http://localhost:5000/api/payment/create-cinetpay-payment', {
                price,
                orderId
            });
            
            if (data.payment_link) {
                // Rediriger vers la page de paiement CinetPay
                window.location.href = data.payment_link;
            }
        } catch (error) {
            console.log('Erreur création paiement CinetPay:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className='mt-4'>
            <div className='w-full px-4 py-8 bg-white shadow-sm'>
                <div className='mb-4'>
                    <h3 className='text-lg font-semibold text-gray-700 mb-2'>Paiement Mobile Money</h3>
                    <div className='flex gap-2 mb-3'>
                        <span className='px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded'>Orange Money</span>
                        <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded'>Free Money</span>
                        <span className='px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded'>Wave</span>
                    </div>
                </div>
                <button 
                    onClick={handlePayment}
                    disabled={isLoading}
                    className='px-10 py-[6px] rounded-md hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white disabled:opacity-50'
                >
                    {isLoading ? 'Redirection...' : 'Payer avec Mobile Money'}
                </button>
            </div>
        </div>
    );
};

export default CinetPay;