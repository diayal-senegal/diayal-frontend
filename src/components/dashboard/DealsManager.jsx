import React, { useState, useEffect } from 'react';
import { FaClock, FaPercent, FaTrash, FaPlus } from 'react-icons/fa';

const DealsManager = () => {
  const [products, setProducts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [discount, setDiscount] = useState('');
  const [dealType, setDealType] = useState('flash');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchDeals();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/products`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Erreur produits:', error);
    }
  };

  const fetchDeals = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/deals`);
      const data = await response.json();
      setDeals(data.deals || []);
    } catch (error) {
      console.error('Erreur deals:', error);
    }
  };

  const handleAddDeal = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = dealType === 'flash' ? '/deals/flash' : '/deals/daily';
      const body = dealType === 'flash' 
        ? { productId: selectedProduct, discount, endTime: new Date(Date.now() + 24 * 60 * 60 * 1000) }
        : { productId: selectedProduct };

      await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      fetchDeals();
      setSelectedProduct('');
      setDiscount('');
    } catch (error) {
      console.error('Erreur ajout deal:', error);
    }
    setLoading(false);
  };

  const handleRemoveDeal = async (dealId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/deals/${dealId}`, {
        method: 'DELETE'
      });
      fetchDeals();
    } catch (error) {
      console.error('Erreur suppression deal:', error);
    }
  };

  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex justify-between items-center pb-4 border-b">
        <h2 className="text-xl font-semibold text-[#383737]">Gestion des Promotions</h2>
      </div>

      {/* Formulaire d'ajout */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <FaPlus className="text-green-500" />
          Ajouter une promotion
        </h3>
        <form onSubmit={handleAddDeal} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select 
              value={dealType} 
              onChange={(e) => setDealType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            >
              <option value="flash">Vente Flash</option>
              <option value="daily">Sélection du Jour</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
            <select 
              value={selectedProduct} 
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">Sélectionner</option>
              {products.map(product => (
                <option key={product._id} value={product._id}>
                  {product.name.substring(0, 30)}...
                </option>
              ))}
            </select>
          </div>
          
          {dealType === 'flash' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Réduction (%)</label>
              <input 
                type="number" 
                value={discount} 
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                min="1" 
                max="90"
                required
              />
            </div>
          )}
          
          <div className="flex items-end">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 disabled:opacity-50"
            >
              {loading ? 'Ajout...' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>

      {/* Liste des deals */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Promotions actives ({deals.length})</h3>
        <div className="space-y-3">
          {deals.map(deal => (
            <div key={deal._id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
              <div className="flex items-center gap-3">
                {deal.type === 'flash' ? (
                  <FaClock className="text-red-500" />
                ) : (
                  <FaPercent className="text-green-500" />
                )}
                <div>
                  <div className="font-medium text-gray-900">
                    {deal.product?.name || 'Produit supprimé'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {deal.product?.price} FCFA
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  deal.type === 'flash' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {deal.type === 'flash' ? `Flash -${deal.discount}%` : 'Sélection du jour'}
                </span>
              </div>
              <button 
                onClick={() => handleRemoveDeal(deal._id)}
                className="text-red-500 hover:text-red-700 p-2"
                title="Supprimer"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          {deals.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucune promotion active
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealsManager;