import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { get_order_details } from '../../store/reducers/orderReducer';
import toast from 'react-hot-toast';

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const { myOrder } = useSelector((state) => state.order);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      await dispatch(get_order_details(orderId)).unwrap();
    } catch (err) {
      const errorMessage = err?.message || 'Erreur lors du chargement des détails';
      setError(errorMessage);
      toast.error('Impossible de charger les détails de la commande');
      console.error('Erreur OrderDetails:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [dispatch, orderId]);



  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#059473] mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement des détails...</p>
        </div>
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">Erreur de chargement</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={fetchOrderDetails}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Réessayer
            </button>
            <Link
              to="/dashboard/my-orders"
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Retour aux commandes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
              Commande #{myOrder._id?.slice(-8) || 'N/A'}
            </h1>
            <p className="text-gray-500 text-sm">Passée le {myOrder.date || 'Date inconnue'}</p>
          </div>
          <button 
            onClick={fetchOrderDetails}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium text-sm transition-colors duration-200"
          >
            Actualiser
          </button>
        </div>
      </div>

      {/* Informations principales */}
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
        
        {/* Livraison */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4">📍 Informations de livraison</h2>
          
          <div className="space-y-3">
            <div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Domicile</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Destinataire:</span>
                <p className="text-gray-600">{myOrder.shippingInfo?.name || 'N/A'}</p>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Adresse:</span>
                <p className="text-gray-600">{myOrder.shippingInfo?.adress || 'N/A'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-medium text-gray-700">Ville:</span>
                  <p className="text-gray-600">{myOrder.shippingInfo?.city || 'N/A'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Région:</span>
                  <p className="text-gray-600">{myOrder.shippingInfo?.region || 'N/A'}</p>
                </div>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Téléphone:</span>
                <p className="text-gray-600">{myOrder.shippingInfo?.phone || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Résumé commande */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4">💰 Résumé de la commande</h2>
          
          <div className="space-y-4">
            <div className="text-center py-3 bg-gray-50 rounded">
              <p className="text-2xl font-bold text-green-600">{myOrder.price || 0} FCFA</p>
              <p className="text-xs text-gray-500">Frais de livraison inclus</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Statut du paiement</p>
                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  myOrder.payment_status === 'paid' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {myOrder.payment_status === 'paid' ? '✅ Payé' : '❌ Non payé'}
                </span>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Statut de livraison</p>
                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  myOrder.delivery_status === 'delivered' ? 'bg-green-100 text-green-800' :
                  myOrder.delivery_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  myOrder.delivery_status === 'placed' ? 'bg-blue-100 text-blue-800' :
                  myOrder.delivery_status === 'warehouse' ? 'bg-purple-100 text-purple-800' :
                  myOrder.delivery_status === 'shipping' ? 'bg-orange-100 text-orange-800' :
                  myOrder.delivery_status === 'processing' ? 'bg-indigo-100 text-indigo-800' :
                  myOrder.delivery_status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {myOrder.delivery_status === 'pending' ? '⏳ En attente' :
                   myOrder.delivery_status === 'placed' ? '📋 Passée' :
                   myOrder.delivery_status === 'warehouse' ? '📦 En préparation' :
                   myOrder.delivery_status === 'shipping' ? '🚚 En livraison' :
                   myOrder.delivery_status === 'processing' ? '⚙️ En cours de traitement' :
                   myOrder.delivery_status === 'delivered' ? '✅ Livrée' :
                   myOrder.delivery_status === 'cancelled' ? '❌ Annulée' :
                   myOrder.delivery_status || 'Inconnu'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles commandés */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-4">🛍️ Articles commandés</h2>
        
        <div className="space-y-3">
          {myOrder.products && myOrder.products.length > 0 ? (
            myOrder.products.map((p, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-3">
                <div className="flex gap-3">
                  <img
                    src={p.images?.[0] || '/placeholder.jpg'}
                    alt={p.name || 'Produit'}
                    className="w-16 h-16 object-cover rounded border flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">
                      {p.name || 'Nom du produit'}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">Marque: {p.brand || 'N/A'}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Qté: {p.quantity || 1}</span>
                      <div className="text-right">
                        <p className="font-semibold text-green-600 text-sm">
                          {(p.price - Math.floor((p.price * (p.discount || 0)) / 100)) || 0} FCFA
                        </p>
                        {p.discount > 0 && (
                          <p className="text-xs text-gray-400 line-through">
                            {p.price} FCFA
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">Aucun article trouvé</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
