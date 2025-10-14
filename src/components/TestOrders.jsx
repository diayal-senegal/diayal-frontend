import React, { useState } from 'react';
import axios from 'axios';

const TestOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const testEndpoints = async () => {
        setLoading(true);
        const customerId = '68a22ae1a7f4d72ed51324cc';
        
        const endpoints = [
            `/api/home/customer/orders/${customerId}/all`,
            `/api/customer/orders/${customerId}/all`,
            `/api/orders/${customerId}/all`,
            `/api/order/customer/${customerId}`,
            `/api/orders/customer/${customerId}`,
            `/api/home/orders/${customerId}`,
        ];

        for (const endpoint of endpoints) {
            try {
                console.log(`Test endpoint: ${endpoint}`);
                const response = await axios.get(`http://localhost:5000${endpoint}`);
                console.log(`✅ SUCCESS ${endpoint}:`, response.data);
                setOrders(response.data.orders || response.data);
                break;
            } catch (error) {
                console.log(`❌ FAILED ${endpoint}:`, error.response?.status);
            }
        }
        setLoading(false);
    };

    return (
        <div className="p-4 border rounded">
            <h3 className="text-lg font-bold mb-4">🧪 Test Endpoints Commandes</h3>
            <button 
                onClick={testEndpoints}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {loading ? 'Test en cours...' : 'Tester les endpoints'}
            </button>
            
            {orders.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-bold">Commandes trouvées:</h4>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                        {JSON.stringify(orders, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default TestOrders;