import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaSquareInstagram,FaCartShopping , FaHeart, FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Footer = () => {

    const navigate = useNavigate() 
    const {userInfo} = useSelector(state => state.auth) 
    const {card_product_count,wishlist_count} = useSelector(state => state.card)
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('') // 'success', 'error', 'info'
    const [isLoading, setIsLoading] = useState(false)
    const [emailError, setEmailError] = useState('')

    // Validation email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        
        // Validation en temps réel
        if (value && !validateEmail(value)) {
            setEmailError('Format d\'email invalide')
        } else {
            setEmailError('')
        }
    }

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault()
        
        // Reset messages
        setMessage('')
        setMessageType('')
        
        // Validations
        if (!email.trim()) {
            setMessage('Veuillez entrer votre email')
            setMessageType('error')
            return
        }
        
        if (!validateEmail(email)) {
            setMessage('Veuillez entrer un email valide')
            setMessageType('error')
            return
        }
        
        setIsLoading(true)
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/newsletter/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.trim().toLowerCase() })
            })
            
            const data = await response.json()
            
            if (response.ok) {
                setMessage('🎉 ' + data.message)
                setMessageType('success')
                setEmail('')
                setEmailError('')
            } else {
                setMessage(data.message || 'Erreur lors de l\'inscription')
                setMessageType('error')
            }
        } catch (error) {
            console.log('Erreur API newsletter:', error)
            setMessage('Service temporairement indisponible. Veuillez réessayer plus tard.')
            setMessageType('error')
        } finally {
            setIsLoading(false)
        }
        
        // Auto-hide message après 4 secondes
        setTimeout(() => {
            setMessage('')
            setMessageType('')
        }, 4000)
    } 

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="w-[90%] mx-auto flex flex-wrap border-b border-gray-700 py-12 md:py-8 sm:py-6">
                
                {/* Colonne logo + infos */}
                <div className="w-3/12 lg:w-4/12 sm:w-full mb-1 sm:mb-4 pr-4">
                <div>
                    <div>
                    <div className="flex flex-col gap-2">
                     <Link to='/' className="mb-1">
                        <img 
                            className="w-[140px] sm:w-[150px] h-auto" 
                            src="/images/logo_diayalf.svg" 
                            alt="logo"
                        />
                        </Link>
                        </div>
                        </div>
                        <ul className="flex flex-col gap-1 text-gray-400 text-sm leading-relaxed">
                            <li>
                                <span className="font-semibold text-white">Adresse : </span>  
                                 129 Rue de la Paix - 12000 - Yoff <div></div>  Dakar (Sénégal)
                            </li>
                            <li>
                                <span className="font-semibold text-white">Téléphone :</span> 
                                +221 33 456 789
                            </li>
                            <li>
                                <span className="font-semibold text-white">Email : </span> 
                                contact@diayal.sn
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Accès rapides */}
                <div className="w-5/12 lg:w-8/12 sm:w-full mb-6 sm:mb-8">
                    <div className="flex justify-start w-full gap-8 lg:gap-6">
                        <div>
                            <h2 className="font-bold text-lg text-white mb-3">
                                Informations légales
                            </h2>
                            <ul className="flex flex-col gap-2 text-xs font-semibold">
                             <li><Link to="/about" className="hover:text-[#059473] transition">Qui sommes-nous ?</Link></li>
                             <li><Link to="/terms" className="hover:text-[#059473] transition">Conditions générales d’utilisation (CGU)</Link></li>
                             <li><Link to="/privacy" className="hover:text-[#059473] transition">Politique de confidentialité</Link></li>
                             <li><Link to="/legal" className="hover:text-[#059473] transition">Mentions légales </Link></li>
                             {/* <li><Link to="/blog" className="hover:text-[#059473] transition">Blogs</Link></li> */}
                             {/* <li><Link to="/company" className="hover:text-[#059473] transition">Notre entreprise</Link></li> */}
                             <li><Link to="/contact" className="hover:text-[#059473] transition">Nous contacter</Link></li>                         
                            </ul>

                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-white mb-3">
                                Services 
                            </h2>
                            <ul className="flex flex-col gap-2 text-xs font-semibold">
                            <li><Link to="/services" className="hover:text-[#059473] transition">Nos services </Link></li>
                             <li><Link to="/delivery" className="hover:text-[#059473] transition">Informations de livraison </Link></li>
                             <li><Link to="/faq" className="hover:text-[#059473] transition">FAQ acheteur </Link></li>
                             <li><Link to="/" className="hover:text-[#059473] transition">Blog / Actualités</Link></li>
                             <li><Link to="/customer-service" className="hover:text-[#059473] transition">Service client</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-white mb-3">
                                Communauté 
                            </h2>
                            <ul className="flex flex-col gap-2 text-xs font-semibold">
                            <li><Link to="/vendor" className="hover:text-[#059473] transition">Devenir vendeur sur la plateforme</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Newsletter + réseaux */}
                <div className="w-4/12 lg:w-full lg:mt-6">
                    <div className="w-full flex flex-col justify-start gap-5">
                        <h2 className="font-bold text-lg text-white">Restons en contact</h2>
                        <span className="text-sm text-gray-400">Recevez nos dernières nouveautés et offres spéciales</span>
                        
                        {/* Newsletter */}
                        <form onSubmit={handleNewsletterSubmit}>
                            <div className="flex h-[50px] w-full bg-white border rounded-full overflow-hidden">
                                <input 
                                    className="flex-1 bg-transparent px-4 text-gray-700 outline-none" 
                                    type="email" 
                                    placeholder="Entrez votre email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    disabled={isLoading}
                                />
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="bg-gradient-to-r from-[#059473] to-[#04b383] text-white uppercase px-5 font-bold text-sm rounded-full flex items-center justify-center min-w-[100px]"
                                >
                                    {isLoading ? (
                                        <FaSpinner className="animate-spin" />
                                    ) : (
                                        "S'inscrire"
                                    )}
                                </button>
                            </div>
                            
                            {/* Messages */}
                            {emailError && (
                                <p className="text-sm mt-2 text-center text-red-400">{emailError}</p>
                            )}
                            {message && (
                                <p className={`text-sm mt-2 text-center ${
                                    messageType === 'success' ? 'text-green-400' : 'text-red-400'
                                }`}>{message}</p>
                            )}
                        </form>

                        {/* Réseaux sociaux */}
                        <div className="pt-2">
                            <p className="text-sm text-gray-400 mb-3">Suivez-nous sur les réseaux sociaux</p>
                            <ul className="flex justify-start items-center gap-3">
                                <li>
                                    <a className="w-[40px] h-[40px] hover:bg-[#1877f2] hover:text-white flex justify-center items-center rounded-full bg-white text-[#1877f2] transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg" href="https://www.facebook.com/profile.php?id=61582393357735&locale=fr_FR" title="Facebook">
                                        <FaFacebookF />
                                    </a>
                                </li>
                                <li>
                                    <a className="w-[40px] h-[40px] hover:bg-[#000000] hover:text-white flex justify-center items-center rounded-full bg-white text-[#000000] transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg" href="https://www.tiktok.com/@diayal1?lang=fr" title="TikTok">
                                        <AiFillTikTok />
                                    </a>
                                </li>
                                <li>
                                    <a className="w-[40px] h-[40px] hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white flex justify-center items-center rounded-full bg-white text-[#e4405f] transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg" href="https://www.instagram.com/diayal_officiel/" title="Instagram">
                                        <FaSquareInstagram />
                                    </a>
                                </li>
                                <li>
                                    <a className="w-[40px] h-[40px] hover:bg-[#1da1f2] hover:text-white flex justify-center items-center rounded-full bg-white text-[#1da1f2] transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg" href="https://x.com/Diayal_officiel" title="Twitter">
                                        <FaTwitter />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Whishlit et panier volants */}

            <div className='hidden fixed md-lg:block w-[50px] h-[90px] bottom-3 right-2 bg- rounded-full p-2 z-50'>
        <div className='w-full h-full flex gap-3 flex-col justify-center items-center'>
        <div onClick={() => navigate(userInfo ? '/card' : '/login') }  className='relative flex justify-center items-center cursor-pointer w-[25px] h-[25px] rounded-full bg-'>
            <span className='text-lg text-green-500'><FaCartShopping/></span>
            {
                card_product_count !== 0 && <div className='w-[15px] h-[15px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                    {
                        card_product_count
                    }
                </div>
            }
     
        </div>

        <div  onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login') } className='relative flex justify-center items-center cursor-pointer w-[25px] h-[25px] rounded-full'>
            <span className='text-lg text-green-500'><FaHeart/></span>
            {
                wishlist_count !== 0 && <div className='w-[15px] h-[15px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                    {
                       wishlist_count 
                    }
                </div>
            }
            
        </div>

        </div>
    </div>

            {/* Paiements & certifications */}
            <div className="w-[90%] mx-auto py-6 border-t border-gray-700">
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                    {/* Paiement sécurisé */}
                    <span className="flex items-center gap-1 text-gray-400 text-sm whitespace-nowrap">
                        🔒 Paiement 100% sécurisé
                    </span>

                    {/* Logos de paiement */}
                    <img src="/images/payment/orange.png" alt="Orange Money" className="h-[28px] object-contain"/>
                    <img src="/images/payment/wave.png" alt="Wave" className="h-[28px] object-contain"/>
                    <img src="/images/payment/free.png" alt="Free Money" className="h-[28px] object-contain"/>
                    <img src="/images/payment/visa.png" alt="Visa" className="h-[28px] object-contain"/>
                    <img src="/images/payment/master.png" alt="Mastercard" className="h-[28px] object-contain"/>
                    <img src="/images/payment/payp.png" alt="Paypal" className="h-[28px] object-contain"/>

                    {/* Livraison rapide */}
                    <span className="flex items-center gap-1 text-gray-400 text-sm whitespace-nowrap">
                        🚚 Livraison rapide
                    </span>
                </div>
            </div>

            {/* Bas de page */}
            <div className="w-[90%] mx-auto py-4 text-center text-sm text-gray-400">
                © 2026 Diayal. Tous droits reservés.
            </div>
        </footer>
    );
};

export default Footer;
