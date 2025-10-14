import api from './api';

export const getNewArrivals = async (params = {}) => {
    try {
        const response = await api.get('/home/new-arrivals', { params });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des nouvelles arrivées:', error);
        throw error;
    }
};

export const getArrivalStats = async () => {
    try {
        const response = await api.get('/home/arrival-stats');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        throw error;
    }
};