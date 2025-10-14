import api from './api';

export const bestsellersAPI = {
    // Obtenir les bestsellers (avec filtrage optionnel par catégorie)
    getBestsellers: async (category = '', limit = 20) => {
        try {
            const params = new URLSearchParams();
            if (category) params.append('category', category);
            if (limit) params.append('limit', limit.toString());
            
            const queryString = params.toString();
            const url = `/home/bestsellers${queryString ? `?${queryString}` : ''}`;
            
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des bestsellers:', error);
            throw error;
        }
    },

    // Obtenir les statistiques de vente générales
    getSalesStats: async () => {
        try {
            const response = await api.get('/home/bestsellers/stats');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des statistiques:', error);
            throw error;
        }
    }
};