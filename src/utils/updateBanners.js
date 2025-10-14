// Utilitaire pour mettre à jour le fichier banners.json
export const updateBannersFile = async (banners) => {
    try {
        // En développement, on ne peut pas écrire directement dans public/
        // Cette fonction sera appelée manuellement ou via un script
        console.log('Bannières à sauvegarder:', banners);
        
        // Pour le moment, on sauvegarde dans localStorage comme fallback
        localStorage.setItem('frontendBanners', JSON.stringify(banners));
        
        return true;
    } catch (error) {
        console.error('Erreur mise à jour bannières:', error);
        return false;
    }
};

// Fonction pour copier les bannières depuis le dashboard
export const copyBannersFromDashboard = () => {
    try {
        // Simuler la récupération depuis le dashboard
        const dashboardBanners = [
            {
                _id: 'demo1',
                sellerName: 'Vendeur Demo',
                bannerType: 'premium',
                image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoAFoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigD//2Q==',
                status: 'approved',
                approvedAt: new Date().toLocaleString(),
                publishedAt: new Date().toLocaleString()
            }
        ];
        
        localStorage.setItem('frontendBanners', JSON.stringify(dashboardBanners));
        return dashboardBanners;
    } catch (error) {
        console.error('Erreur copie bannières:', error);
        return [];
    }
};