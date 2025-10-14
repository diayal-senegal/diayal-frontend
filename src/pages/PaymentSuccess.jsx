import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const transactionId = searchParams.get('transaction_id');

    useEffect(() => {
        // Redirection automatique après 3 secondes
        const timer = setTimeout(() => {
            navigate('/orders');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-4 text-green-600">
                    Paiement réussi !
                </h2>
                <p className="text-gray-600 mb-6">
                    Votre paiement a été traité avec succès. Vous allez recevoir un email de confirmation.
                </p>
                {transactionId && (
                    <p className="text-sm text-gray-500 mb-4">
                        ID Transaction: {transactionId}
                    </p>
                )}
                <div className="text-sm text-gray-500">
                    Redirection automatique dans 3 secondes...
                </div>
                <button
                    onClick={() => navigate('/orders')}
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                    Voir mes commandes
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;