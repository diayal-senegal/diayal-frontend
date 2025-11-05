import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { reset_password, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth);
    
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        dispatch(reset_password({
            token,
            password: formData.password
        }));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch, navigate]);

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
                            <div className='mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4'>
                                <FaLock className='text-2xl text-green-600' />
                            </div>
                            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
                                Nouveau mot de passe
                            </h2>
                            <p className='text-gray-600'>
                                Saisissez votre nouveau mot de passe
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <div>
                                <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                                    Nouveau mot de passe
                                </label>
                                <div className='relative'>
                                    <input 
                                        value={formData.password}
                                        onChange={handleChange}
                                        className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none' 
                                        type={showPassword ? 'text' : 'password'} 
                                        name='password' 
                                        id='password' 
                                        placeholder='••••••••' 
                                        required 
                                        minLength={6}
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

                            <div>
                                <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700 mb-2'>
                                    Confirmer le mot de passe
                                </label>
                                <div className='relative'>
                                    <input 
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none' 
                                        type={showConfirmPassword ? 'text' : 'password'} 
                                        name='confirmPassword' 
                                        id='confirmPassword' 
                                        placeholder='••••••••' 
                                        required 
                                        minLength={6}
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition duration-200'
                                    >
                                        {showConfirmPassword ? <FaEyeSlash className='text-lg' /> : <FaEye className='text-lg' />}
                                    </button>
                                </div>
                            </div>

                            <button 
                                type='submit'
                                className='w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-200 transform hover:-translate-y-0.5'
                            >
                                Réinitialiser le mot de passe
                            </button>
                        </form>

                        <div className='mt-6 text-center'>
                            <Link 
                                to='/login' 
                                className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition duration-200'
                            >
                                <FaArrowLeft className='text-sm' />
                                Retour à la connexion
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default ResetPassword;