import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center p-8">
            <h2 className="text-2xl text-orange-600 mb-4">⚠️ Paiement annulé</h2>
            <p className="mb-4">Votre paiement a été annulé.</p>
            <button 
                onClick={() => navigate('/cart')} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Retour au panier
            </button>
        </div>
    );
};

export default PaymentCancel;