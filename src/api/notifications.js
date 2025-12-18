import api from './api';

// Service pour gérer les notifications via Brevo
export const notificationService = {
  // Les emails sont automatiquement envoyés côté backend
  // Ces méthodes sont pour des notifications supplémentaires si nécessaire
  
  sendCustomNotification: async (notificationData) => {
    try {
      const response = await api.post('/notifications/custom', notificationData);
      return response.data;
    } catch (error) {
      console.error('Erreur envoi notification:', error);
      throw error;
    }
  }
};