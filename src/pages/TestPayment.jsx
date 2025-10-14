import React, { useState } from 'react';

const TestPayment = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const testMobilePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/payment/mobile/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: 'TEST' + Date.now(),
                    amount: 1000,
                    provider: 'orange-money-senegal',
                    phoneNumber: '77000000',
                    customerName: 'Test User'
                })
            });
            
            const data = await response.json();
            setResult(data);
            
            if (data.success && data.payment_url) {
                window.open(data.payment_url, '_blank');
            }
        } catch (error) {
            setResult({ error: error.message });
        }
        setLoading(false);
    };

    const testCardPayment = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/payment/card/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: 'TEST' + Date.now(),
                    amount: 2000,
                    customerName: 'Test User',
                    cardNumber: '4111111111111111',
                    expiryDate: '12/25',
                    cvv: '123'
                })
            });
            
            const data = await response.json();
            setResult(data);
            
            if (data.success && data.payment_url) {
                window.open(data.payment_url, '_blank');
            }
        } catch (error) {
            setResult({ error: error.message });
        }
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Test PayDunya</h1>
            
            <div className="space-y-4 mb-6">
                <button
                    onClick={testMobilePayment}
                    disabled={loading}
                    className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 disabled:opacity-50"
                >
                    {loading ? 'Test en cours...' : 'Tester Paiement Mobile (1000 FCFA)'}
                </button>
                
                <button
                    onClick={testCardPayment}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Test en cours...' : 'Tester Paiement Carte (2000 FCFA)'}
                </button>
            </div>

            {result && (
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Résultat du test:</h3>
                    <pre className="text-sm overflow-auto">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold mb-2">Numéros de test:</h3>
                <ul className="text-sm space-y-1">
                    <li><strong>Orange Money (Succès):</strong> 77000000</li>
                    <li><strong>Orange Money (Échec):</strong> 77000001</li>
                    <li><strong>Carte Visa:</strong> 4111111111111111</li>
                    <li><strong>CVV:</strong> 123, <strong>Date:</strong> 12/25</li>
                </ul>
            </div>
        </div>
    );
};

export default TestPayment;