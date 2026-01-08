import { useState, useEffect } from 'react';
import api from '../api/api';

export const useCSRF = () => {
    const [csrfToken, setCsrfToken] = useState(null);

    useEffect(() => {
        const fetchCSRFToken = async () => {
            try {
                const response = await api.get('/csrf-token');
                setCsrfToken(response.data.csrfToken);
                
                // Ajouter le token aux headers par défaut
                api.defaults.headers.common['X-CSRF-Token'] = response.data.csrfToken;
            } catch (error) {
                console.error('Erreur récupération token CSRF:', error);
            }
        };

        fetchCSRFToken();
    }, []);

    return csrfToken;
};