import React, { useState } from 'react';
import axios from 'axios';

const PayDunya = ({ price, orderId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [paymentType, setPaymentType] = useState('mobile');
    const [formData, setFormData] = useState({
        customerName: '',
        phoneNumber: '',
        provider: 'orange-money-senegal',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handlePayment = async () => {
        setIsLoading(true);
        localStorage.setItem('orderId', orderId);
        
        try {
            const endpoint = paymentType === 'mobile' 
                ? 'http://localhost:5000/api/payment/mobile/initiate'
                : 'http://localhost:5000/api/payment/card/initiate';
            
            const payload = {
                orderId,
                amount: price,
                customerName: formData.customerName,
                ...(paymentType === 'mobile' ? {
                    provider: formData.provider,
                    phoneNumber: formData.phoneNumber.startsWith('+221') ? formData.phoneNumber : `+221${formData.phoneNumber}`
                } : {
                    cardNumber: formData.cardNumber,
                    expiryDate: formData.expiryDate,
                    cvv: formData.cvv
                })
            };
            
            console.log('Payload envoyé:', payload);
            
            const { data } = await axios.post(endpoint, payload);
            
            if (data.success && data.payment_url) {
                window.location.href = data.payment_url;
            } else {
                alert(data.message || 'Erreur lors du paiement');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Erreur paiement:', error);
            console.error('Erreur response:', error.response?.data);
            console.error('Erreur status:', error.response?.status);
            
            const errorMessage = error.response?.data?.message || error.message || 'Erreur lors du paiement';
            alert(`Erreur: ${errorMessage}`);
            setIsLoading(false);
        }
    };

    return (
        <div className='mt-4'>
            <div className='w-full px-4 py-8 bg-white shadow-sm'>
                <div className='mb-6'>
                    <div className='flex gap-4 mb-4'>
                        <button
                            onClick={() => setPaymentType('mobile')}
                            className={`px-4 py-2 rounded ${paymentType === 'mobile' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}
                        >
                            📱 Mobile Money
                        </button>
                        <button
                            onClick={() => setPaymentType('card')}
                            className={`px-4 py-2 rounded ${paymentType === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                            💳 Carte Bancaire
                        </button>
                    </div>
                </div>

                <div className='space-y-4 mb-6'>
                    <input
                        type="text"
                        placeholder="Nom complet"
                        value={formData.customerName}
                        onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                        className='w-full p-3 border rounded focus:outline-none focus:border-blue-500'
                        required
                    />

                    {paymentType === 'mobile' ? (
                        <>
                            <select
                                value={formData.provider}
                                onChange={(e) => setFormData({...formData, provider: e.target.value})}
                                className='w-full p-3 border rounded focus:outline-none focus:border-blue-500'
                            >
                                <option value="orange-money-senegal">🟠 Orange Money</option>
                                <option value="free-money">🔵 Free Money</option>
                                <option value="e-money">🟢 E-Money</option>
                            </select>
                            <input
                                type="tel"
                                placeholder="Numéro de téléphone (77123456)"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                                className='w-full p-3 border rounded focus:outline-none focus:border-blue-500'
                                required
                            />
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Numéro de carte (1234 5678 9012 3456)"
                                value={formData.cardNumber}
                                onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                                className='w-full p-3 border rounded focus:outline-none focus:border-blue-500'
                                maxLength="19"
                                required
                            />
                            <div className='grid grid-cols-2 gap-4'>
                                <input
                                    type="text"
                                    placeholder="MM/AA"
                                    value={formData.expiryDate}
                                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                                    className='p-3 border rounded focus:outline-none focus:border-blue-500'
                                    maxLength="5"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    value={formData.cvv}
                                    onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                                    className='p-3 border rounded focus:outline-none focus:border-blue-500'
                                    maxLength="4"
                                    required
                                />
                            </div>
                        </>
                    )}
                </div>

                <button 
                    onClick={handlePayment}
                    disabled={isLoading || !formData.customerName || (paymentType === 'mobile' && !formData.phoneNumber) || (paymentType === 'card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv))}
                    className='w-full px-10 py-3 rounded-md hover:shadow-lg bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {isLoading ? 'Traitement...' : `Payer ${price} FCFA`}
                </button>
            </div>
        </div>
    );
};

export default PayDunya;