import React, { useState } from 'react';
import axios from 'axios';

const QuickTest = () => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const testPayDunya = async () => {
        setLoading(true);
        setResult('Test en cours...');
        
        try {
            const response = await axios.post('http://localhost:5000/api/payment/mobile/initiate', {
                orderId: 'TEST-' + Date.now(),
                amount: 1000,
                customerName: 'Test User',
                provider: 'orange-money-senegal',
                phoneNumber: '+221771234567'
            });
            
            setResult(`✅ SUCCESS: ${JSON.stringify(response.data, null, 2)}`);
        } catch (error) {
            setResult(`❌ ERROR: ${error.response?.data?.message || error.message}`);
        }
        setLoading(false);
    };

    return (
        <div className="p-4 border rounded m-4">
            <h3 className="text-lg font-bold mb-4">🧪 Test PayDunya Rapide</h3>
            <button 
                onClick={testPayDunya}
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Tester PayDunya
            </button>
            <pre className="mt-4 p-2 bg-gray-100 rounded text-sm overflow-auto max-h-96">
                {result}
            </pre>
        </div>
    );
};

export default QuickTest;