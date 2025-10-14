import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">❌</div>
                <h2 className="text-2xl font-bold mb-4 text-red-600">
                    Paiement annulé
                </h2>
                <p className="text-gray-600 mb-6">
                    Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
                </p>
                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/checkout')}
                        className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Réessayer le paiement
                    </button>
                    <button
                        onClick={() => navigate('/cart')}
                        className="w-full bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
                    >
                        Retour au panier
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;