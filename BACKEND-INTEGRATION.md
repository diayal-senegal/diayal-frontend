# Instructions d'intégration Backend

## 1. Ajoutez ces routes dans votre backend

### Dans votre fichier principal (app.js ou server.js) :
```javascript
const customerRoutes = require('./routes/customerRoutes');
app.use('/api', customerRoutes);
```

### Ou copiez directement ces routes dans votre fichier de routes existant :

```javascript
// GET /api/home/customer/get-dashboard-data/:customerId
app.get('/api/home/customer/get-dashboard-data/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;
        
        // Remplacez par votre modèle Order
        const orders = await Order.find({ 
            customerId: customerId 
        }).sort({ createdAt: -1 });
        
        res.json({
            success: true,
            orders: orders
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/home/customer/get-orders/:customerId/:status  
app.get('/api/home/customer/get-orders/:customerId/:status', async (req, res) => {
    try {
        const { customerId, status } = req.params;
        
        let query = { customerId: customerId };
        if (status !== 'all') {
            query.delivery_status = status;
        }
        
        const orders = await Order.find(query).sort({ createdAt: -1 });
        
        res.json({
            success: true,
            orders: orders
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
```

## 2. Vérifiez votre modèle Order

Assurez-vous que votre modèle Order a ces champs :
- customerId (ID du client)
- delivery_status (pending, placed, warehouse, shipping, delivered, cancelled)
- payment_status (paid, unpaid)
- price (montant)
- createdAt (date de création)

## 3. Testez l'endpoint

Une fois ajouté, testez avec :
```
GET http://localhost:5000/api/home/customer/get-dashboard-data/68a22ae1a7f4d72ed51324cc
```