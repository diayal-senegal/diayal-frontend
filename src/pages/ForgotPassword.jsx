import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { forgot_password, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgot_password(email));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            setIsSubmitted(true);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

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
                        
                        {!isSubmitted ? (
                            <>
                                <div className='text-center mb-6'>
                                    <div className='mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4'>
                                        <FaEnvelope className='text-2xl text-green-600' />
                                    </div>
                                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
                                        Mot de passe oublié ?
                                    </h2>
                                    <p className='text-gray-600'>
                                        Saisissez votre adresse email pour recevoir un lien de réinitialisation
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className='space-y-6'>
                                    <div>
                                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                                            Adresse email
                                        </label>
                                        <input 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none' 
                                            type='email' 
                                            name='email' 
                                            id='email' 
                                            placeholder='votre@email.com' 
                                            required 
                                        />
                                    </div>

                                    <button 
                                        type='submit'
                                        className='w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-200 transform hover:-translate-y-0.5'
                                    >
                                        Envoyer le lien de réinitialisation
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className='text-center'>
                                <div className='mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4'>
                                    <FaEnvelope className='text-2xl text-green-600' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                                    Email envoyé !
                                </h2>
                                <p className='text-gray-600 mb-6'>
                                    Un lien de réinitialisation a été envoyé à <strong>{email}</strong>. 
                                    Vérifiez votre boîte de réception et vos spams.
                                </p>
                                <button 
                                    onClick={() => setIsSubmitted(false)}
                                    className='text-green-600 hover:text-green-700 font-medium hover:underline'
                                >
                                    Renvoyer l'email
                                </button>
                            </div>
                        )}

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

export default ForgotPassword;