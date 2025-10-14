import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaList, FaHeart } from 'react-icons/fa';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { IoIosHome, IoMdLogOut } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa6";
import { BsChatDotsFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import api from '../api/api';
import { useDispatch } from 'react-redux';
import { user_reset } from '../store/reducers/authReducer'
import { reset_count } from '../store/reducers/cardReducer'


const Dashboard = () => {
    const [filterShow, setFilterShow] = useState(false);

     const navigate = useNavigate()
     const dispatch = useDispatch()
     const location = useLocation()

     const isActive = (path) => {
        return location.pathname === path
     }

      const logout = async () => {
        try {
            const {data} = await api.get('/customer/logout')
            localStorage.removeItem('customerToken')
            dispatch(user_reset())
            dispatch(reset_count())
            navigate('/login')
            
        } catch (error) {
            console.log(error.response.data)
        }
    }


    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
            <Header />
            <div className='mt-5'>
              <div className='w-[90%] mx-auto md-lg:block hidden'>
                <div>
                    <button 
                        onClick={() => setFilterShow(!filterShow)} 
                        className='flex items-center justify-center py-3 px-4 bg-gradient-to-r from-[#059473] to-[#047857] text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
                    >
                        <FaList className='text-lg' />
                    </button>
                </div>
              </div>
                   <div className='h-full mx-auto'>
                     <div className='py-8 flex md-lg:w-[90%] mx-auto relative'>
                       <div className={`rounded-xl z-50 md-lg:absolute transition-all duration-300 ease-in-out ${filterShow ? '-left-4' : '-left-[360px]'} w-[280px] ml-4 bg-white shadow-2xl border border-gray-100`}>
                         <div className='p-6'>
                           <h3 className='text-lg font-semibold text-gray-800 mb-6 border-b border-gray-100 pb-3'>Menu Principal</h3>
                           <ul className='space-y-2'>
                            <li>
                              <Link 
                                to='/dashboard' 
                                className={`flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 group ${
                                  isActive('/dashboard') 
                                    ? 'bg-gradient-to-r from-[#059473] to-[#047857] text-white shadow-md' 
                                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#059473] hover:to-[#047857] hover:text-white'
                                }`}
                              >
                                <span className='text-xl group-hover:scale-110 transition-transform duration-200'><IoIosHome /></span>
                                <span className='font-medium'>Tableau de bord</span>
                              </Link>
                            </li>

                            <li>
                              <Link 
                                to='/dashboard/my-orders' 
                                className={`flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 group ${
                                  isActive('/dashboard/my-orders') 
                                    ? 'bg-gradient-to-r from-[#059473] to-[#047857] text-white shadow-md' 
                                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#059473] hover:to-[#047857] hover:text-white'
                                }`}
                              >
                                <span className='text-xl group-hover:scale-110 transition-transform duration-200'><FaBorderAll /></span>
                                <span className='font-medium'>Mes commandes</span>
                              </Link>
                            </li>

                            <li>
                              <Link 
                                to='/dashboard/my-wishlist' 
                                className={`flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 group ${
                                  isActive('/dashboard/my-wishlist') 
                                    ? 'bg-gradient-to-r from-[#059473] to-[#047857] text-white shadow-md' 
                                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#059473] hover:to-[#047857] hover:text-white'
                                }`}
                              >
                                <span className='text-xl group-hover:scale-110 transition-transform duration-200'><FaHeart /></span>
                                <span className='font-medium'>Mes favoris</span>
                              </Link>
                            </li>

                            <li>
                              <Link 
                                to='/dashboard/chat' 
                                className={`flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 group ${
                                  location.pathname.startsWith('/dashboard/chat') 
                                    ? 'bg-gradient-to-r from-[#059473] to-[#047857] text-white shadow-md' 
                                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#059473] hover:to-[#047857] hover:text-white'
                                }`}
                              >
                                <span className='text-xl group-hover:scale-110 transition-transform duration-200'><BsChatDotsFill /></span>
                                <span className='font-medium'>Chat avec le vendeur</span>
                              </Link>
                            </li>
                            
                            <li>
                              <Link 
                                to='/dashboard/change-password' 
                                className={`flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 group ${
                                  isActive('/dashboard/change-password') 
                                    ? 'bg-gradient-to-r from-[#059473] to-[#047857] text-white shadow-md' 
                                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#059473] hover:to-[#047857] hover:text-white'
                                }`}
                              >
                                <span className='text-xl group-hover:scale-110 transition-transform duration-200'><RiLockPasswordLine /></span>
                                <span className='font-medium'>Changer le mot de passe</span>
                              </Link>
                            </li>
                            
                            <li className='pt-4 border-t border-gray-100 mt-4'>
                              <button 
                                onClick={logout} 
                                className='flex items-center gap-4 py-3 px-4 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white transition-all duration-200 group w-full text-left'
                              >
                                <span className='text-xl group-hover:scale-110 transition-transform duration-200'><IoMdLogOut /></span>
                                <span className='font-medium'>Déconnexion</span>
                              </button>
                            </li>
                         </ul>
                         </div>
                       </div> 
                            <div className='w-[calc(100%-280px)] md-lg:w-full'>
                              <div className='mx-4 md-lg:mx-0 bg-white rounded-xl shadow-lg border border-gray-100 min-h-[600px]'>
                                 <div className='p-6'>
                                   <Outlet />
                                 </div>
                              </div>  
                            </div>
                     </div>
                   </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;