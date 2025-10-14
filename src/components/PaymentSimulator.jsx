import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSimulator = ({ price, orderId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const simulatePayment = async () => {
        setIsLoading(true);
        
        try {
            console.log('Confirmation commande:', orderId);
            
            // Confirmer la commande côté backend
            const response = await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`);
            console.log('Réponse confirmation:', response.data);
            
            // Simulation d'un paiement réussi
            localStorage.setItem('simulatedPayment', JSON.stringify({
                orderId,
                amount: price,
                status: 'success',
                transactionId: 'SIM-' + Date.now()
            }));
            
            // Simulation d'un délai de paiement puis redirection
            setTimeout(() => {
                navigate('/payment/success?token=simulation-success');
            }, 2000);
        } catch (error) {
            console.error('Erreur confirmation commande:', error);
            alert('Erreur lors de la confirmation de commande');
            setIsLoading(false);
        }
    };

    return (
        <div className='mt-4'>
            <div className='w-full px-4 py-8 bg-yellow-50 border border-yellow-200 rounded'>
                <div className='mb-4 p-3 bg-yellow-100 rounded'>
                    <h3 className='font-bold text-yellow-800'>⚠️ Mode Simulation</h3>
                    <p className='text-yellow-700 text-sm'>
                        PayDunya temporairement indisponible (KYC en attente)
                    </p>
                </div>
                
                <div className='text-center'>
                    <p className='mb-4'>Montant à payer: <strong>{price} FCFA</strong></p>
                    <button 
                        onClick={simulatePayment}
                        disabled={isLoading}
                        className='w-full px-10 py-3 rounded-md bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50'
                    >
                        {isLoading ? 'Simulation en cours...' : '🎭 Simuler le paiement'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSimulator;