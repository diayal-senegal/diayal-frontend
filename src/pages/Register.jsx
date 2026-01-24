import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash, FaCheck, FaXmark } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customer_register, messageClear } from '../store/reducers/authReducer';
import { useCSRF } from '../hooks/useCSRF';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

const Register = () => {
    
    const navigate = useNavigate();
    const {loader, errorMessage, successMessage, userInfo } = useSelector(state => state.auth)
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)

    // Validation du mot de passe
    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return {
            minLength,
            hasUpper,
            hasLower,
            hasNumber,
            hasSpecial,
            isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial
        };
    };

    const passwordValidation = validatePassword(state.password);

    const dispatch = useDispatch();
    const csrfToken = useCSRF();

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const register = (e) => {
        e.preventDefault();
        
        if (!passwordValidation.isValid) {
            toast.error('Le mot de passe ne respecte pas les critères de sécurité');
            return;
        }
        
        const registrationData = {
            ...state,
            name: `${state.firstName.trim()} ${state.lastName.trim()}`
        };
        
        dispatch(customer_register(registrationData))
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
            <SEO 
                title="Inscription - Diayal | Créez votre compte gratuitement"
                description="Inscrivez-vous gratuitement sur Diayal et découvrez la marketplace sénégalaise. Accès à des milliers de produits locaux et livraison rapide."
                keywords="inscription Diayal, créer compte, s'inscrire, nouveau client, compte gratuit"
                url="/register"
            />
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
                            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>S'inscrire</h2>
                            <p className='text-gray-600'>Créez votre compte personnel</p>
                        </div>

                        <form onSubmit={register} className='space-y-4 md:space-y-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mb-2'>
                                        Prénom
                                    </label>
                                    <input 
                                        onChange={inputHandle} 
                                        value={state.firstName}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none' 
                                        type='text' 
                                        name='firstName' 
                                        id='firstName' 
                                        placeholder='Votre prénom' 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-2'>
                                        Nom
                                    </label>
                                    <input 
                                        onChange={inputHandle} 
                                        value={state.lastName}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none' 
                                        type='text' 
                                        name='lastName' 
                                        id='lastName' 
                                        placeholder='Votre nom' 
                                        required 
                                    />
                                </div>
                            </div>

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
                                
                                {/* Validation en temps réel du mot de passe */}
                                {state.password && (
                                    <div className='mt-3 space-y-2'>
                                        <div className='text-xs space-y-1'>
                                            <div className={`flex items-center gap-2 ${
                                                passwordValidation.minLength ? 'text-green-600' : 'text-red-500'
                                            }`}>
                                                {passwordValidation.minLength ? <FaCheck /> : <FaXmark />}
                                                Au moins 8 caractères
                                            </div>
                                            <div className={`flex items-center gap-2 ${
                                                passwordValidation.hasUpper && passwordValidation.hasLower ? 'text-green-600' : 'text-red-500'
                                            }`}>
                                                {passwordValidation.hasUpper && passwordValidation.hasLower ? <FaCheck /> : <FaXmark />}
                                                Lettres majuscules et minuscules
                                            </div>
                                            <div className={`flex items-center gap-2 ${
                                                passwordValidation.hasNumber ? 'text-green-600' : 'text-red-500'
                                            }`}>
                                                {passwordValidation.hasNumber ? <FaCheck /> : <FaXmark />}
                                                Au moins un chiffre
                                            </div>
                                            <div className={`flex items-center gap-2 ${
                                                passwordValidation.hasSpecial ? 'text-green-600' : 'text-red-500'
                                            }`}>
                                                {passwordValidation.hasSpecial ? <FaCheck /> : <FaXmark />}
                                                Au moins un caractère spécial
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button 
                                disabled={!passwordValidation.isValid && state.password}
                                className='w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-200 transform hover:-translate-y-0.5 disabled:hover:transform-none'
                            >
                                S'inscrire
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
                                Déjà un compte ? 
                                <Link to='/login' className='text-green-600 hover:text-green-700 font-medium ml-1'>
                                    Se connecter
                                </Link>
                            </p>
                        </div>

                        <div className='mt-6 pt-6 border-t border-gray-200'>
                            <div className='space-y-3'>
                                <a target='_blank' href={`${process.env.REACT_APP_SELLER_URL}/login`} rel="noreferrer" className='block'>
                                    <div className='w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-200 text-center'>
                                        Espace Vendeur
                                    </div>
                                </a>

                                <a target='_blank' href={`${process.env.REACT_APP_SELLER_URL}/register`} rel="noreferrer" className='block'>
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

export default Register;