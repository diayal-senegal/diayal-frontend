import api from './api';

export const sendSupportMessage = async (messageData) => {
    try {
        const response = await api.post('/chat/support/send-message', messageData);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        throw error;
    }
};

export const getSupportMessages = async (sessionId) => {
    try {
        const response = await api.get(`/chat/support/messages/${sessionId}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
        throw error;
    }
};

export const getAllSupportMessages = async () => {
    try {
        const response = await api.get('/chat/support/all-messages');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de tous les messages:', error);
        throw error;
    }
};

export const markMessageAsRead = async (messageId) => {
    try {
        const response = await api.put(`/chat/support/mark-read/${messageId}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
        throw error;
    }
};