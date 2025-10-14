import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customer_login, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';


const Login = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loader, errorMessage, successMessage, userInfo } = useSelector(state => state.auth)
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

const login = (e) => {
    e.preventDefault();
   dispatch(customer_login(state))    
}

useEffect(() => {
    if (successMessage) {
        toast.success(successMessage);
        dispatch(messageClear())
    }
    if (errorMessage) {
        toast.error(errorMessage);
        dispatch(messageClear())
    }
    if (userInfo) {
        navigate('/')
    }
}, [successMessage, errorMessage, dispatch, navigate, userInfo]);
    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
            {
                loader && <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader/>
                </div>
            }
            <Header />
            
            <div className='flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-8'>
                <div className='w-full max-w-md mx-auto'>
                    <div className='bg-white rounded-2xl shadow-2xl p-6 md:p-8'>
                        <div className='text-center mb-6'>
                            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>Se connecter</h2>
                            <p className='text-gray-600'>Accédez à votre espace personnel</p>
                        </div>

                        <form onSubmit={login} className='space-y-4 md:space-y-6'>
                            <div>
                                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                                    Adresse email
                                </label>
                                <input 
                                    onChange={inputHandle} 
                                    value={state.email}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none' 
                                    type='email' 
                                    name='email' 
                                    id='email' 
                                    placeholder='votre@email.com' 
                                    required 
                                />
                            </div>

                            <div>
                                <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                                    Mot de passe
                                </label>
                                <div className='relative'>
                                    <input 
                                        onChange={inputHandle} 
                                        value={state.password}
                                        className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none' 
                                        type={showPassword ? 'text' : 'password'} 
                                        name='password' 
                                        id='password' 
                                        placeholder='••••••••' 
                                        required 
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition duration-200'
                                    >
                                        {showPassword ? <FaEyeSlash className='text-lg' /> : <FaEye className='text-lg' />}
                                    </button>
                                </div>
                            </div>

                            <button className='w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-200 transform hover:-translate-y-0.5'>
                                Se connecter
                            </button>
                        </form>

                        <div className='my-6'>
                            <div className='relative'>
                                <div className='absolute inset-0 flex items-center'>
                                    <div className='w-full border-t border-gray-300'></div>
                                </div>
                                <div className='relative flex justify-center text-sm'>
                                    <span className='px-4 bg-white text-gray-500'>Ou continuer avec</span>
                                </div>
                            </div>
                        </div>

                        <div className='space-y-3'>
                            <button className='w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-3'>
                                <FaFacebookF className='text-lg' />
                                <span>Facebook</span>
                            </button>

                            <button className='w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-3'>
                                <FaGoogle className='text-lg' />
                                <span>Google</span>
                            </button>
                        </div>

                        <div className='mt-6 text-center'>
                            <p className='text-gray-600'>
                                Pas encore de compte ? 
                                <Link to='/register' className='text-green-600 hover:text-green-700 font-medium ml-1'>
                                    S'inscrire
                                </Link>
                            </p>
                        </div>

                        <div className='mt-6 pt-6 border-t border-gray-200'>
                            <div className='space-y-3'>
                                <a target='_blank' href="http://localhost:3001/login" rel="noreferrer" className='block'>
                                    <div className='w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-200 text-center'>
                                        Espace Vendeur
                                    </div>
                                </a>

                                <a target='_blank' href="http://localhost:3001/register" rel="noreferrer" className='block'>
                                    <div className='w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-200 text-center'>
                                        Devenir Vendeur
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default Login;