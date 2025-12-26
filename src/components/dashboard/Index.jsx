import React, { useEffect } from 'react';
import { RiShoppingCart2Fill } from "react-icons/ri";
import { FaEye, FaCreditCard } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { get_dashboard_index_data } from '../../store/reducers/dashboardRducer';
import { get_orders } from '../../store/reducers/orderReducer';


const Index = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.auth)
  const {recentOrders, totalOrder, pendingOrder, cancelledOrder} = useSelector(state => state.dashboard)
  const { myOrders } = useSelector(state => state.order) // Fallback data

  const translatePaymentStatus = (status) => {
    const translations = {
      'paid': 'Payé',
      'unpaid': 'Non payé'
    };
    return translations[status] || status;
  };
  
  const translateDeliveryStatus = (status) => {
    const translations = {
      'cancelled': 'Annulée',
      'pending': 'En attente',
      'placed': 'Passée',
      'warehouse': 'En cours de préparation',
      'shipping': 'En cours de livraison',
      'delivered': 'Livrée',
      'processing': 'En cours de traitement'
    };
    return translations[status] || status;
  };

  useEffect(() => {
    if (userInfo && userInfo.id) {
      console.log('Fetching dashboard data for user:', userInfo.id);
      dispatch(get_dashboard_index_data(userInfo.id))
      // Fallback: charger aussi les commandes directement
      dispatch(get_orders({status: 'all', customerId: userInfo.id}))
    }
  }, [dispatch, userInfo])

  // Debug: Afficher les données reçues
  useEffect(() => {
    console.log('Dashboard data:', { totalOrder, pendingOrder, cancelledOrder, recentOrders });
    console.log('Orders fallback:', myOrders);
  }, [totalOrder, pendingOrder, cancelledOrder, recentOrders, myOrders])

  // Calcul des statistiques depuis myOrders si les données dashboard ne sont pas disponibles
  const calculateStats = () => {
    if (!myOrders || myOrders.length === 0) return { total: 0, pending: 0, cancelled: 0 };
    
    const total = myOrders.length;
    const pending = myOrders.filter(order => 
      order.delivery_status === 'pending' || 
      order.delivery_status === 'placed' || 
      order.delivery_status === 'processing' ||
      order.delivery_status === 'warehouse' ||
      order.delivery_status === 'shipping'
    ).length;
    const cancelled = myOrders.filter(order => order.delivery_status === 'cancelled').length;
    
    return { total, pending, cancelled };
  };

  const stats = calculateStats();
  
  // Utiliser les données dashboard si disponibles, sinon utiliser le fallback
  const displayTotalOrder = totalOrder !== undefined ? totalOrder : stats.total;
  const displayPendingOrder = pendingOrder !== undefined ? pendingOrder : stats.pending;
  const displayCancelledOrder = cancelledOrder !== undefined ? cancelledOrder : stats.cancelled;
  const displayRecentOrders = recentOrders && recentOrders.length > 0 ? recentOrders : (myOrders ? myOrders.slice(0, 5) : []);


  const redirect = (ord) => {
    let items = 0;
    if (ord && ord.products && Array.isArray(ord.products)) {
      for (let i = 0; i < ord.products.length; i++) {
        items = ord.products[i].quantity + items;
      }
    }
    navigate('/payment', {
      state : {
        price: ord.price,
        items,
        orderId: ord._id
      }})
  }

    return (
        <div>
            <div className='grid grid-cols-3 md:grid-cols-1 gap-5'>

              <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5 shadow'>
                <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                  <span className='text-xl text-green-800'><RiShoppingCart2Fill /></span>
                </div>
                <div className='flex flex-col justify-start items-start text-slate-600'>
                  <h2 className='text-3xl font-bold'>{displayTotalOrder}</h2>
                  <span>Commandes passées</span>
                 </div>
              </div>

              <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5 shadow'>
                <div className='bg-yellow-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                  <span className='text-yellow-800'><RiShoppingCart2Fill /></span>
                </div>
                <div className='flex flex-col justify-start items-start text-slate-600'>
                  <h2 className='text-3xl font-bold'>{displayPendingOrder}</h2>
                  <span>Commandes en attente</span>
                 </div>
              </div>

              <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5 shadow'>
                <div className='bg-red-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                  <span className='text-red-800'><RiShoppingCart2Fill /></span>
                </div>
                <div className='flex flex-col justify-start items-start text-slate-600'>
                  <h2 className='text-3xl font-bold'>{displayCancelledOrder}</h2>
                  <span>Commandes annulées</span>
                 </div>
              </div>

            </div>
            <div className='bg-white p-5 mt-5 rounded-md shadow'>
              <h2 className='text-xl font-semibold mb-4'>Commandes récentes</h2>
             <div className='pt-4'>
           {/* Version Desktop */}
           <div className='md-lg:hidden relative overflow-x-auto rounded-md'>
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-200'>
           <tr>
            <th scope='col' className='px-6 py-3'>ID commande</th>
            <th scope='col' className='px-6 py-3'>Prix</th>
            <th scope='col' className='px-6 py-3'>Statut paiement</th>
            <th scope='col' className='px-6 py-3'>Statut commande</th>
            <th scope='col' className='px-6 py-3'>Action</th>
           </tr>
               </thead>
                  <tbody>
                  {
                    displayRecentOrders && displayRecentOrders.length > 0 ? displayRecentOrders.map((o, i) => <tr key={i} className='bg-white border-b'>
                      <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>#{o._id.slice(-8)}</th>
                      <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.price} FCFA</th>
                      <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          o.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {translatePaymentStatus(o.payment_status)}
                        </span>
                      </th>
                      <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          o.delivery_status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          o.delivery_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          o.delivery_status === 'placed' ? 'bg-blue-100 text-blue-800' :
                          o.delivery_status === 'processing' ? 'bg-indigo-100 text-indigo-800' :
                          o.delivery_status === 'warehouse' ? 'bg-purple-100 text-purple-800' :
                          o.delivery_status === 'shipping' ? 'bg-orange-100 text-orange-800' :
                          o.delivery_status === 'delivered' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {translateDeliveryStatus(o.delivery_status)}
                        </span>
                      </th>
                      <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                        <div className='flex items-center gap-2'>
                          <Link to={`/dashboard/order/details/${o._id}`}>
                            <span className='inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold py-2 px-3 rounded hover:bg-blue-700 transition-colors'>
                              <FaEye /> Voir
                            </span>
                          </Link>
                          {o.payment_status !== 'paid' && 
                            <span onClick={() => redirect(o)} className='inline-flex items-center gap-1 bg-[#059473] text-white text-xs font-semibold py-2 px-3 rounded cursor-pointer hover:bg-[#047857] transition-colors'>
                              <FaCreditCard /> Payer
                            </span>
                          }
                        </div>
                      </th>
                    </tr>
                   
                    ) : (
                      <tr className='bg-white border-b'>
                        <td colSpan='5' className='px-6 py-4 text-center text-gray-500'>
                          Aucune commande récente
                        </td>
                      </tr>
                    )
                  }
                    
                  </tbody>
           </table>
        </div>

        {/* Version Mobile */}
        <div className='md-lg:block hidden space-y-3'>
          {displayRecentOrders && displayRecentOrders.length > 0 ? displayRecentOrders.map((o, i) => (
            <div key={i} className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
              <div className='flex justify-between items-start mb-3'>
                <div>
                  <div className='font-bold text-gray-900'>#{o._id.slice(-8)}</div>
                  <div className='text-sm text-gray-500'>ID: {o._id}</div>
                </div>
                <div className='text-right'>
                  <div className='font-bold text-[#059473]'>{o.price} FCFA</div>
                </div>
              </div>
              
              <div className='flex flex-wrap gap-2 mb-3'>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  o.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {translatePaymentStatus(o.payment_status)}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  o.delivery_status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  o.delivery_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  o.delivery_status === 'placed' ? 'bg-blue-100 text-blue-800' :
                  o.delivery_status === 'processing' ? 'bg-indigo-100 text-indigo-800' :
                  o.delivery_status === 'warehouse' ? 'bg-purple-100 text-purple-800' :
                  o.delivery_status === 'shipping' ? 'bg-orange-100 text-orange-800' :
                  o.delivery_status === 'delivered' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {translateDeliveryStatus(o.delivery_status)}
                </span>
              </div>
              
              <div className='flex flex-col gap-2'>
                <Link to={`/dashboard/order/details/${o._id}`} className='flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors'>
                  <FaEye className='text-xs' /> Voir les détails
                </Link>
                {o.payment_status !== 'paid' && (
                  <button onClick={() => redirect(o)} className='flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#059473] text-white text-sm font-medium rounded-lg hover:bg-[#047857] transition-colors'>
                    <FaCreditCard className='text-xs' /> Payer maintenant
                  </button>
                )}
              </div>
            </div>
          )) : (
            <div className='text-center py-8 text-gray-500'>
              Aucune commande récente
            </div>
          )}
        </div>
        </div>
    </div>
        </div>
    );
};

export default Index;