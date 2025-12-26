import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { get_orders } from '../../store/reducers/orderReducer';
import { FaBorderAll, FaEye, FaCreditCard, FaFilter } from 'react-icons/fa';

const Orders = () => {
    const [state, setState] = useState('all');
    
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
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.auth)
    const { myOrders } = useSelector(state => state.order)

      const fetchOrders = () => {
        if (userInfo && userInfo.id) {
          dispatch(get_orders({status:state, customerId:userInfo.id}))
        }
      }

      useEffect(() => {
        fetchOrders()
      }, [dispatch, state, userInfo])

      // Auto-refresh toutes les 30 secondes
      useEffect(() => {
        if (userInfo && userInfo.id) {
          const interval = setInterval(() => {
            fetchOrders()
          }, 30000)
          return () => clearInterval(interval)
        }
      }, [state, userInfo])


 
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
        <div className='w-full'>
           {/* Header avec titre et filtre */}
           <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
               <div className='flex items-center gap-3'>
                   <div className='p-2 bg-gradient-to-r from-[#059473] to-[#047857] text-white rounded-lg'>
                       <FaBorderAll className='text-xl' />
                   </div>
                   <div>
                       <h2 className='text-2xl font-bold text-gray-800'>Mes commandes</h2>
                       <p className='text-gray-500 text-sm'>Gérez et suivez vos commandes</p>
                   </div>
               </div>
               
               <div className='flex items-center gap-3'>
                   <button 
                       onClick={fetchOrders}
                       className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors duration-200'
                   >
                       Actualiser
                   </button>
                   <div className='relative'>
                       <FaFilter className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                       <select  
                           className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-gray-700 bg-white shadow-sm hover:border-[#059473] focus:border-[#059473] focus:ring-2 focus:ring-[#059473]/20 outline-none transition-all duration-200" 
                           value={state} 
                           onChange={(e) => setState(e.target.value)}
                       >
                        <option value="all">Tous les statuts</option>
                        <option value="placed">Passées</option>
                        <option value="pending">En attente</option>
                        <option value="processing">En cours de traitement</option>
                        <option value="warehouse">En cours de préparation</option>
                        <option value="shipping">En cours de livraison</option>
                        <option value="delivered">Livrées</option>
                        <option value="cancelled">Annulées</option>
                       </select>
                   </div>
               </div>
           </div>

           {/* Tableau des commandes - Version Desktop */}
           <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
               {myOrders && myOrders.length > 0 ? (
                   <>
                       {/* Version Desktop */}
                       <div className='md-lg:hidden overflow-x-auto'>
                           <table className='w-full'>
                               <thead className='bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200'>
                                   <tr>
                                       <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>Commande</th>
                                       <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>Prix</th>
                                       <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>Paiement</th>
                                       <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>Statut</th>
                                       <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>Actions</th>
                                   </tr>
                               </thead>
                               <tbody className='divide-y divide-gray-100'>
                                   {myOrders.map((o, i) => (
                                       <tr key={i} className='hover:bg-gray-50 transition-colors duration-200'>
                                           <td className='px-6 py-4'>
                                               <div className='font-medium text-gray-900'>#{o._id.slice(-8)}</div>
                                               <div className='text-sm text-gray-500'>ID: {o._id}</div>
                                           </td>
                                           <td className='px-6 py-4'>
                                               <span className='font-semibold text-gray-900'>{o.price} FCFA</span>
                                           </td>
                                           <td className='px-6 py-4'>
                                               <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                   o.payment_status === 'paid' 
                                                       ? 'bg-green-100 text-green-800' 
                                                       : 'bg-red-100 text-red-800'
                                               }`}>
                                                   {translatePaymentStatus(o.payment_status)}
                                               </span>
                                           </td>
                                           <td className='px-6 py-4'>
                                               <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
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
                                           </td>
                                           <td className='px-6 py-4'>
                                               <div className='flex items-center gap-2'>
                                                   <Link 
                                                       to={`/dashboard/order/details/${o._id}`}
                                                       className='inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200'
                                                   >
                                                       <FaEye className='text-xs' />
                                                       Voir
                                                   </Link>
                                                   {o.payment_status !== 'paid' && (
                                                       <button 
                                                           onClick={() => redirect(o)} 
                                                           className='inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#059473] to-[#047857] text-white text-sm font-medium rounded-lg hover:from-[#047857] hover:to-[#059473] transition-all duration-200 transform hover:scale-105'
                                                       >
                                                           <FaCreditCard className='text-xs' />
                                                           Payer
                                                       </button>
                                                   )}
                                               </div>
                                           </td>
                                       </tr>
                                   ))}
                               </tbody>
                           </table>
                       </div>

                       {/* Version Mobile - Cartes */}
                       <div className='md-lg:block hidden space-y-4 p-4'>
                           {myOrders.map((o, i) => (
                               <div key={i} className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                                   {/* En-tête de la carte */}
                                   <div className='flex justify-between items-start mb-3'>
                                       <div>
                                           <div className='font-bold text-gray-900 text-lg'>#{o._id.slice(-8)}</div>
                                           <div className='text-xs text-gray-500 mt-1'>ID: {o._id}</div>
                                       </div>
                                       <div className='text-right'>
                                           <div className='font-bold text-lg text-[#059473]'>{o.price} FCFA</div>
                                       </div>
                                   </div>

                                   {/* Statuts */}
                                   <div className='flex flex-wrap gap-2 mb-4'>
                                       <div className='flex items-center gap-2'>
                                           <span className='text-sm font-medium text-gray-600'>Paiement:</span>
                                           <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                               o.payment_status === 'paid' 
                                                   ? 'bg-green-100 text-green-800' 
                                                   : 'bg-red-100 text-red-800'
                                           }`}>
                                               {translatePaymentStatus(o.payment_status)}
                                           </span>
                                       </div>
                                       <div className='flex items-center gap-2'>
                                           <span className='text-sm font-medium text-gray-600'>Statut:</span>
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
                                   </div>

                                   {/* Actions */}
                                   <div className='flex flex-col sm:flex-row gap-2'>
                                       <Link 
                                           to={`/dashboard/order/details/${o._id}`}
                                           className='flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200'
                                       >
                                           <FaEye className='text-xs' />
                                           Voir les détails
                                       </Link>
                                       {o.payment_status !== 'paid' && (
                                           <button 
                                               onClick={() => redirect(o)} 
                                               className='flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#059473] to-[#047857] text-white text-sm font-medium rounded-lg hover:from-[#047857] hover:to-[#059473] transition-all duration-200'
                                           >
                                               <FaCreditCard className='text-xs' />
                                               Payer maintenant
                                           </button>
                                       )}
                                   </div>
                               </div>
                           ))}
                       </div>
                   </>
               ) : (
                   <div className='text-center py-12'>
                       <div className='text-6xl mb-4'>📦</div>
                       <h3 className='text-lg font-semibold text-gray-700 mb-2'>Aucune commande trouvée</h3>
                       <p className='text-gray-500'>Vous n'avez pas encore passé de commande.</p>
                   </div>
               )}
           </div>
        </div>
    );
};

export default Orders;