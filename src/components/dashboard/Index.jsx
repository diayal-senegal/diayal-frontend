import React, { useEffect } from 'react';
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { get_dashboard_index_data } from '../../store/reducers/dashboardRducer';


const Index = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.auth)
  const {recentOrders, totalOrder, pendingOrder, cancelledOrder} = useSelector(state => state.dashboard)

  useEffect(() => {
    dispatch(get_dashboard_index_data(userInfo.id))
  }, [])


  const redirect = (ord) => {
    let items = 0;
    for (let i = 0; i < ord.length; i++) {
      items = ord.products[i].quantity + items;
      
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
            <div className=' grid grid-cols-3 md:grid-cols-1 gap-5'>

              <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5  shadow'>
                <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                  <span className='text-xl text-green-800'><RiShoppingCart2Fill /></span>
                </div>
                <div className='flex flex-col justify-start items-start text-slate-600'>
                  <h2 className='text-3xl font-bold'>{totalOrder || 0}</h2>
                  <span>Commandes passées</span>
                 </div>
              </div>

              <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5  shadow'>
                <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                  <span ><RiShoppingCart2Fill /></span>
                </div>
                <div className='flex flex-col justify-start items-start text-slate-600'>
                  <h2 className='text-3xl font-bold'>{pendingOrder || 0}</h2>
                  <span>Commandes en attentes </span>
                 </div>
              </div>

              <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5  shadow'>
                <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                  <span ><RiShoppingCart2Fill /></span>
                </div>
                <div className='flex flex-col justify-start items-start text-slate-600'>
                  <h2 className='text-3xl font-bold'>{cancelledOrder || 0}</h2>
                  <span>Commandes annulées </span>
                 </div>
              </div>

            </div>
            <div className='bg-white p-5 mt-5 rounded-md shadow'>
              <h2>Commandes récentes</h2>
             <div className='pt-4'>
           <div className='relative overflow-x-auto rounded-md'>
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-200'>
           <tr>
            <th scope='col' className='px-6 py-3'>ID  commande</th>
            <th scope='col' className='px-6 py-3'>Prix</th>
            <th scope='col' className='px-6 py-3'>statut paiement</th>
            <th scope='col' className='px-6 py-3'>statut de la commande</th>
            <th scope='col' className='px-6 py-3'>action</th>
           </tr>
               </thead>
                  <tbody>
                  {
                    recentOrders && recentOrders.length > 0 ? recentOrders.map((o, i) => <tr key={i} className='bg-white border-b'>
                      <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>#{o._id}</th>
                      <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.price} Fcfa</th>
                      <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.payment_status}</th>
                      <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.delivery_status}</th>
                      <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                        <Link to={`/dashboard/order/details/${o._id}`}><span className='bg-green-200 text-green-800 text-md font-semibold mr-2 py-[3px] px-3 rounded'>Voir</span></Link>
                        {
                         o.payment_status !== 'paid' && <span onClick={() => redirect(o)} className='bg-green-200 text-green-800 text-md font-semibold mr-2 py-[3px] px-3 rounded cursor-pointer'>Payer maintenant</span>
                        }
                        
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
        </div>
    </div>
        </div>
    );
};

export default Index;