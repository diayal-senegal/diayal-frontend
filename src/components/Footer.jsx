import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaSquareInstagram, FaCartShopping, FaHeart, FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaTruckFast, FaUserGroup, FaArrowUp } from "react-icons/fa6";
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
    const [showBackToTop, setShowBackToTop] = useState(false)

    // Gestion du bouton Back to Top
    React.useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/newsletter/subscribe`, {
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
                <div className="w-3/12 lg:w-4/12 sm:w-full mb-6 sm:mb-8 pr-4">
                    <div className="flex flex-col gap-4">
                        <Link to='/' className="mb-2">
                            <img 
                                className="w-[140px] sm:w-[150px] h-auto" 
                                src="/images/logo_diayalf.svg" 
                                alt="Diayal - Marketplace Sénégalaise"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            La marketplace #1 au Sénégal pour acheter et vendre en toute confiance.
                        </p>
                        <ul className="flex flex-col gap-2 text-gray-400 text-sm leading-relaxed">
                            <li>
                                <span className="font-semibold text-white">Adresse : </span>
                                129 Rue de la Paix, Yoff, Dakar (Sénégal)
                            </li>
                            <li>
                                <span className="font-semibold text-white">Téléphone : </span>
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
                    <div className="flex justify-start w-full gap-8 lg:gap-6 md:gap-4">
                        <div className="flex-1">
                            <h2 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                                <FaCircleInfo className="text-[#059473]" />
                                Informations
                            </h2>
                            <ul className="flex flex-col gap-2.5 text-sm font-medium">
                                <li><Link to="/about" className="hover:text-[#059473] transition-colors">Qui sommes-nous ?</Link></li>
                                <li><Link to="/terms" className="hover:text-[#059473] transition-colors">CGU</Link></li>
                                <li><Link to="/privacy" className="hover:text-[#059473] transition-colors">Confidentialité</Link></li>
                                <li><Link to="/legal" className="hover:text-[#059473] transition-colors">Mentions légales</Link></li>
                                <li><Link to="/contact" className="hover:text-[#059473] transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div className="flex-1">
                            <h2 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                                <FaTruckFast className="text-[#059473]" />
                                Services
                            </h2>
                            <ul className="flex flex-col gap-2.5 text-sm font-medium">
                                <li><Link to="/services" className="hover:text-[#059473] transition-colors">Nos services</Link></li>
                                <li><Link to="/delivery" className="hover:text-[#059473] transition-colors">Livraison</Link></li>
                                <li><Link to="/faq" className="hover:text-[#059473] transition-colors">FAQ</Link></li>
                                <li><Link to="/customer-service" className="hover:text-[#059473] transition-colors">Service client</Link></li>
                            </ul>
                        </div>
                        <div className="flex-1">
                            <h2 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                                <FaUserGroup className="text-[#059473]" />
                                Communauté
                            </h2>
                            <ul className="flex flex-col gap-2.5 text-sm font-medium">
                                <li><Link to="/vendor" className="hover:text-[#059473] transition-colors">Devenir vendeur</Link></li>
                                <li><Link to="/deals" className="hover:text-[#059473] transition-colors">Promotions</Link></li>
                                <li><Link to="/bestsellers" className="hover:text-[#059473] transition-colors">Meilleures ventes</Link></li>
                                <li><Link to="/new-arrivals" className="hover:text-[#059473] transition-colors">Nouveautés</Link></li>
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
                                <label htmlFor="newsletter-email" className="sr-only">Adresse email pour la newsletter</label>
                                <input 
                                    id="newsletter-email"
                                    className="flex-1 bg-transparent px-4 text-gray-700 outline-none" 
                                    type="email" 
                                    placeholder="Entrez votre email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    disabled={isLoading}
                                    aria-label="Entrez votre email pour la newsletter"
                                />
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="bg-gradient-to-r from-[#059473] to-[#04b383] text-white uppercase px-5 font-bold text-sm rounded-full flex items-center justify-center min-w-[100px]"
                                    aria-label="S'inscrire à la newsletter"
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
                                    <a className="w-[40px] h-[40px] hover:bg-[#1877f2] hover:text-white flex justify-center items-center rounded-full bg-white text-[#1877f2] transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg" href="https://www.facebook.com/profile.php?id=61582393357735&locale=fr_FR" title="Facebook" aria-label="Suivez-nous sur Facebook" target="_blank" rel="noopener noreferrer">
                                        <FaFacebookF />
                                    </a>
                                </li>
                                <li>
                                    <a className="w-[40px] h-[40px] hover:bg-[#000000] hover:text-white flex justify-center items-center rounded-full bg-white text-[#000000] transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg" href="https://www.tiktok.com/@diayal1?lang=fr" title="TikTok" aria-label="Suivez-nous sur TikTok" target="_blank" rel="noopener noreferrer">
                                        <AiFillTikTok />
                                    </a>
                                </li>
                                <li>
                                    <a className="w-[40px] h-[40px] hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white flex justify-center items-center rounded-full bg-white text-[#e4405f] transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg" href="https://www.instagram.com/diayal_officiel/" title="Instagram" aria-label="Suivez-nous sur Instagram" target="_blank" rel="noopener noreferrer">
                                        <FaSquareInstagram />
                                    </a>
                                </li>
                                <li>
                                    <a className="w-[40px] h-[40px] hover:bg-[#1da1f2] hover:text-white flex justify-center items-center rounded-full bg-white text-[#1da1f2] transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg" href="https://x.com/Diayal_officiel" title="Twitter" aria-label="Suivez-nous sur Twitter" target="_blank" rel="noopener noreferrer">
                                        <FaTwitter />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bouton Back to Top */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-4 bg-[#059473] text-white p-3 rounded-full shadow-lg hover:bg-[#04b383] transition-all duration-300 hover:scale-110 z-40 md-lg:bottom-28"
                    aria-label="Retour en haut de la page"
                >
                    <FaArrowUp className="text-lg" />
                </button>
            )}

            {/* Wishlist et panier volants - Visible uniquement si connecté */}
            {userInfo && (
                <div className='hidden fixed md-lg:block w-[50px] bottom-3 right-2 bg-white shadow-lg rounded-full p-2 z-50'>
                    <div className='w-full h-full flex gap-3 flex-col justify-center items-center'>
                        <div 
                            onClick={() => navigate(userInfo ? '/card' : '/login')} 
                            className='group relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full hover:bg-gray-100 transition-colors'
                            title="Panier"
                        >
                            <span className='text-xl text-green-500'><FaCartShopping/></span>
                            {
                                card_product_count !== 0 && <div className='w-[18px] h-[18px] absolute bg-red-500 rounded-full text-white flex justify-center items-center text-xs font-bold -top-[3px] -right-[5px]'>
                                    {card_product_count}
                                </div>
                            }
                        </div>

                        <div  
                            onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')} 
                            className='group relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full hover:bg-gray-100 transition-colors'
                            title="Favoris"
                        >
                            <span className='text-xl text-green-500'><FaHeart/></span>
                            {
                                wishlist_count !== 0 && <div className='w-[18px] h-[18px] absolute bg-red-500 rounded-full text-white flex justify-center items-center text-xs font-bold -top-[3px] -right-[5px]'>
                                    {wishlist_count}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )}

            {/* Paiements & certifications */}
            <div className="w-[90%] mx-auto py-6 border-t border-gray-700">
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                    {/* Paiement sécurisé */}
                    <span className="flex items-center gap-2 text-gray-400 text-sm whitespace-nowrap font-medium">
                        🔒 Paiement 100% sécurisé
                    </span>

                    {/* Logos de paiement */}
                    <img src="/images/payment/orange.png" alt="Paiement Orange Money accepté" className="h-[28px] object-contain" loading="lazy"/>
                    <img src="/images/payment/wave.png" alt="Paiement Wave accepté" className="h-[28px] object-contain" loading="lazy"/>
                    <img src="/images/payment/free.png" alt="Paiement Free Money accepté" className="h-[28px] object-contain" loading="lazy"/>
                    <img src="/images/payment/visa.png" alt="Paiement Visa accepté" className="h-[28px] object-contain" loading="lazy"/>
                    <img src="/images/payment/master.png" alt="Paiement Mastercard accepté" className="h-[28px] object-contain" loading="lazy"/>
                    <img src="/images/payment/payp.png" alt="Paiement PayPal accepté" className="h-[28px] object-contain" loading="lazy"/>

                    {/* Livraison rapide */}
                    <span className="flex items-center gap-2 text-gray-400 text-sm whitespace-nowrap font-medium">
                        🚚 Livraison rapide
                    </span>
                </div>
            </div>

            {/* Bas de page */}
            <div className="w-[90%] mx-auto py-5 text-center">
                <p className="text-sm text-gray-400">
                    © 2025 <span className="text-white font-semibold">Diayal</span>. Tous droits réservés.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                    Fait avec ❤️ au Sénégal
                </p>
            </div>
        </footer>
    );
};

export default Footer;
