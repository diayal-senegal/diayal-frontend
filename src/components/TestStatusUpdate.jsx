import React, { useState } from 'react';
import axios from 'axios';

const TestStatusUpdate = ({ orderId }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const updateStatus = async (newStatus) => {
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:5000/api/order/update-status/${orderId}`, {
                delivery_status: newStatus
            });
            setResult(`✅ Statut mis à jour vers: ${newStatus}`);
            console.log('Mise à jour réussie:', response.data);
            
            // Recharger la page après 2 secondes
            setTimeout(() => window.location.reload(), 2000);
        } catch (error) {
            setResult(`❌ Erreur: ${error.response?.data?.message || error.message}`);
            console.error('Erreur mise à jour:', error);
        }
        setLoading(false);
    };

    return (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
            <h3 className="font-bold text-yellow-800 mb-2">🧪 Test Mise à jour Statut</h3>
            <div className="flex gap-2 flex-wrap mb-2">
                <button 
                    onClick={() => updateStatus('shipping')}
                    disabled={loading}
                    className="px-3 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 disabled:opacity-50"
                >
                    → Shipping
                </button>
                <button 
                    onClick={() => updateStatus('delivered')}
                    disabled={loading}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50"
                >
                    → Delivered
                </button>
                <button 
                    onClick={() => updateStatus('warehouse')}
                    disabled={loading}
                    className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 disabled:opacity-50"
                >
                    → Warehouse
                </button>
            </div>
            {result && <p className="text-sm">{result}</p>}
        </div>
    );
};

export default TestStatusUpdate;