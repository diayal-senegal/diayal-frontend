// Route à ajouter dans votre backend
// Fichier: routes/customerRoutes.js ou routes/orderRoutes.js

const express = require('express');
const router = express.Router();

// Endpoint pour récupérer les commandes d'un client
router.get('/home/customer/get-dashboard-data/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;
        
        // Remplacez 'Order' par votre modèle de commande
        const Order = require('../models/orderModel'); // Ajustez le chemin
        
        // Récupérer toutes les commandes du client
        const orders = await Order.find({ 
            customerId: customerId 
        }).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            orders: orders,
            totalOrders: orders.length
        });
        
    } catch (error) {
        console.error('Erreur récupération commandes:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la récupération des commandes'
        });
    }
});

// Alternative avec filtre par statut
router.get('/home/customer/get-orders/:customerId/:status', async (req, res) => {
    try {
        const { customerId, status } = req.params;
        
        const Order = require('../models/orderModel');
        
        let query = { customerId: customerId };
        
        // Ajouter le filtre de statut si ce n'est pas "all"
        if (status !== 'all') {
            query.delivery_status = status;
        }
        
        const orders = await Order.find(query).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            orders: orders
        });
        
    } catch (error) {
        console.error('Erreur récupération commandes:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur'
        });
    }
});

module.exports = router;