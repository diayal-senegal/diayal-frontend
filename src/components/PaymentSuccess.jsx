import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        const token = searchParams.get('token');
        
        if (token === 'simulation-success') {
            // Mode simulation
            const simulatedPayment = localStorage.getItem('simulatedPayment');
            if (simulatedPayment) {
                setStatus('success');
                localStorage.removeItem('simulatedPayment');
                setTimeout(() => navigate('/dashboard/my-orders'), 3000);
            } else {
                setStatus('error');
            }
        } else if (token) {
            verifyPayment(token);
        } else {
            setStatus('error');
        }
    }, [searchParams]);

    const verifyPayment = async (token) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/payment/verify/${token}`);

            if (data.success) {
                setStatus('success');
                localStorage.removeItem('orderId');
                setTimeout(() => navigate('/dashboard/my-orders'), 3000);
            } else {
                setStatus('failed');
            }
        } catch (error) {
            console.error('Erreur vérification:', error);
            setStatus('error');
        }
    };

    if (status === 'loading') {
        return <div className="text-center p-8">Vérification du paiement...</div>;
    }

    if (status === 'success') {
        return (
            <div className="text-center p-8">
                <h2 className="text-2xl text-green-600 mb-4">✅ Paiement réussi!</h2>
                <p>Redirection vers vos commandes...</p>
            </div>
        );
    }

    return (
        <div className="text-center p-8">
            <h2 className="text-2xl text-red-600 mb-4">❌ Échec du paiement</h2>
            <button onClick={() => navigate('/cart')} className="bg-blue-500 text-white px-4 py-2 rounded">
                Retour au panier
            </button>
        </div>
    );
};

export default PaymentSuccess;