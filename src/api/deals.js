// API pour gérer les deals
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const dealsAPI = {
  // Récupérer tous les deals et paramètres
  getDeals: async () => {
    const response = await fetch(`${API_BASE}/deals`);
    return response.json();
  },

  // Récupérer tous les produits pour l'admin
  getProducts: async () => {
    const response = await fetch(`${API_BASE}/products`);
    return response.json();
  },

  // Ajouter un produit aux ventes flash
  addFlashDeal: async (productId, discount, endTime) => {
    const response = await fetch(`${API_BASE}/deals/flash`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, discount, endTime })
    });
    return response.json();
  },

  // Ajouter un produit à la sélection du jour
  addDailyDeal: async (productId) => {
    const response = await fetch(`${API_BASE}/deals/daily`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });
    return response.json();
  },

  // Supprimer un deal
  removeDeal: async (dealId) => {
    const response = await fetch(`${API_BASE}/deals/${dealId}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Définir la date de fin des promotions (compteur)
  setPromotionEndTime: async (endTime) => {
    const response = await fetch(`${API_BASE}/deals/promotion-timer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endTime })
    });
    return response.json();
  },

  // Récupérer les paramètres de promotion (compteur)
  getPromotionSettings: async () => {
    const response = await fetch(`${API_BASE}/deals/promotion-settings`);
    return response.json();
  }
};