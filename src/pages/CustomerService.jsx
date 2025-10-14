import React, { useState, useEffect, useRef } from 'react';
import { FaHeadset, FaWhatsapp, FaEnvelope, FaPhone, FaClock, FaQuestionCircle, FaTruck, FaUndo, FaShieldAlt, FaComments, FaRobot, FaCheckCircle, FaUsers, FaAward, FaPaperPlane, FaMinus, FaExpand } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { sendSupportMessage, getSupportMessages } from '../api/customerSupport';

const CustomerService = () => {
    const [activeTab, setActiveTab] = useState('contact');
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMinimized, setChatMinimized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [userInfo, setUserInfo] = useState({ name: '', email: '' });
    const [chatInitialized, setChatInitialized] = useState(false);
    const messagesEndRef = useRef(null);
    
    // États pour le formulaire de contact
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'Question sur une création',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    // Générer un ID de session unique
    useEffect(() => {
        if (!sessionId) {
            setSessionId('session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
        }
    }, []);

    // Scroll automatique vers le bas
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Charger les messages existants
    const loadMessages = async () => {
        if (sessionId && chatInitialized) {
            try {
                const response = await getSupportMessages(sessionId);
                if (response.success) {
                    // Ne pas écraser le message de bienvenue local
                    const welcomeMessage = messages.find(msg => msg._id === 'welcome');
                    const serverMessages = response.messages;
                    
                    if (welcomeMessage && !serverMessages.find(msg => msg._id === 'welcome')) {
                        setMessages([welcomeMessage, ...serverMessages]);
                    } else {
                        setMessages(serverMessages);
                    }
                    
                    console.log(`🔄 Messages rechargés: ${serverMessages.length} messages`);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des messages:', error);
            }
        }
    };

    useEffect(() => {
        if (chatOpen && sessionId && chatInitialized) {
            loadMessages();
            // Polling pour recevoir les réponses de l'admin
            const interval = setInterval(loadMessages, 3000); // Toutes les 3 secondes
            return () => clearInterval(interval);
        }
    }, [chatOpen, sessionId, chatInitialized]);

    // Envoyer un message
    const handleSendMessage = async () => {
        if (!newMessage.trim() || !userInfo.name || !userInfo.email) return;

        try {
            const messageData = {
                senderName: userInfo.name,
                senderEmail: userInfo.email,
                message: newMessage,
                sessionId
            };

            console.log('📤 Envoi du message client:', messageData);
            const response = await sendSupportMessage(messageData);
            console.log('📥 Réponse reçue:', response);
            
            if (response.success) {
                setMessages(prev => [...prev, response.data]);
                setNewMessage('');
                console.log('✅ Message ajouté à l\'interface');
            }
        } catch (error) {
            console.error('❌ Erreur lors de l\'envoi du message:', error);
        }
    };

    // Initialiser le chat avec les informations utilisateur
    const initializeChat = () => {
        if (userInfo.name && userInfo.email) {
            setChatInitialized(true);
            // Message de bienvenue
            const welcomeMessage = {
                _id: 'welcome',
                message: `Bonjour ${userInfo.name} ! Je suis l'assistant virtuel de Diayal. Comment puis-je vous aider aujourd'hui ?`,
                isFromAdmin: true,
                createdAt: new Date()
            };
            setMessages([welcomeMessage]);
        }
    };

    // Gérer les changements du formulaire de contact
    const handleContactFormChange = (e) => {
        const { name, value } = e.target;
        setContactForm(prev => ({ ...prev, [name]: value }));
    };

    // Envoyer le message du formulaire de contact
    const handleContactFormSubmit = async (e) => {
        e.preventDefault();
        if (!contactForm.name || !contactForm.email || !contactForm.message) return;

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const messageData = {
                senderName: contactForm.name,
                senderEmail: contactForm.email,
                message: `Sujet: ${contactForm.subject}\n\nTéléphone: ${contactForm.phone || 'Non renseigné'}\n\nMessage:\n${contactForm.message}`,
                sessionId: 'contact_form_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
            };

            const response = await sendSupportMessage(messageData);
            
            if (response.success) {
                setSubmitMessage('✅ Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
                setContactForm({
                    name: '',
                    email: '',
                    phone: '',
                    subject: 'Question sur une création',
                    message: ''
                });
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
            setSubmitMessage('❌ Erreur lors de l\'envoi du message. Veuillez réessayer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactMethods = [
        {
            icon: FaWhatsapp,
            title: "WhatsApp",
            description: "Assistance instantanée 24h/7j",
            contact: "+221 77 777 77 77",
            color: "bg-green-500",
            available: true
        },
        {
            icon: FaPhone,
            title: "Téléphone",
            description: "Appelez-nous directement",
            contact: "+221 33 123 45 67",
            color: "bg-blue-500",
            available: true
        },
        {
            icon: FaEnvelope,
            title: "Email",
            description: "Réponse sous 2h en moyenne",
            contact: "artisans@diayal.sn",
            color: "bg-purple-500",
            available: true
        },
        {
            icon: FaComments,
            title: "Chat en direct",
            description: "Assistance immédiate",
            contact: "Démarrer le chat",
            color: "bg-orange-500",
            available: true
        }
    ];

    const faqCategories = [
        {
            title: "À propos de Diayal",
            icon: FaQuestionCircle,
            questions: [
                {
                    q: "Qu'est-ce que Diayal ?",
                    a: "Diayal est une plateforme qui met en relation des artisans locaux sénégalais et des acheteurs particuliers, au Sénégal et partout dans le monde. Nous ne vendons pas directement les produits : nous offrons un espace sécurisé pour que les artisans et les clients puissent échanger et commercer."
                },
                {
                    q: "Quels produits puis-je acheter sur Diayal ?",
                    a: "Tous les produits disponibles sont des produits artisanaux sénégalais authentiques, fabriqués localement par des artisans. Cela garantit qualité, authenticité et soutien à l'économie locale."
                },
                {
                    q: "La plateforme est-elle disponible à l'international ?",
                    a: "Oui 🌍 Les artisans sénégalais peuvent vendre à des clients du monde entier. Les paiements par carte bancaire (Stripe) permettent aux acheteurs internationaux de commander facilement."
                }
            ]
        },
        {
            title: "Compte & Inscription",
            icon: FaUsers,
            questions: [
                {
                    q: "Comment créer un compte ?",
                    a: "Il suffit de cliquer sur S'inscrire, de renseigner vos informations exactes (nom, email, téléphone) et de créer un mot de passe. Vous pourrez ensuite acheter ou vendre facilement."
                },
                {
                    q: "Mes données personnelles sont-elles protégées ?",
                    a: "Oui ✅ Vos données sont utilisées uniquement pour gérer votre compte et vos commandes. Nous respectons des standards proches du RGPD pour garantir la confidentialité et la sécurité de vos informations."
                }
            ]
        },
        {
            title: "Paiements & Sécurité",
            icon: FaShieldAlt,
            questions: [
                {
                    q: "Quels moyens de paiement sont disponibles ?",
                    a: "• Mobile Money (Orange Money, Wave, Free Money, etc.) via PayDunya ou CinetPay.\n• Cartes bancaires (Visa, Mastercard) via Stripe.\nTous les paiements passent par des solutions sécurisées."
                }
            ]
        },
        {
            title: "Livraison & Commandes",
            icon: FaTruck,
            questions: [
                {
                    q: "Qui gère la livraison ?",
                    a: "La livraison est assurée directement par les artisans vendeurs. Chaque vendeur précise ses délais, ses frais et son mode de livraison."
                }
            ]
        },
        {
            title: "Retours & Garanties",
            icon: FaUndo,
            questions: [
                {
                    q: "Que faire si je veux retourner un produit ?",
                    a: "Vous disposez de 7 jours après réception pour changer d'avis (sauf pour les produits personnalisés, alimentaires ou périssables).\n• Le produit doit être retourné intact, non utilisé, complet avec tous ses accessoires dans son emballage d'origine.\n• L'acheteur est invité à vérifier l'état du colis à réception et à signaler immédiatement tout dommage au transporteur et au vendeur avant signature.\n• Les frais de retour sont à la charge de l'acheteur, sauf si le vendeur s'est trompé ou a livré un produit défectueux."
                },
                {
                    q: "Qui est responsable en cas de problème avec un produit ?",
                    a: "Chaque artisan vendeur est responsable de la qualité et de la conformité de ses produits. Diayal n'intervient pas directement dans la vente ou la livraison : notre rôle est de sécuriser les paiements et d'assurer la mise en relation."
                },
                {
                    q: "Que faire si j'ai un litige avec un vendeur ?",
                    a: "En cas de problème (retard, défaut, produit manquant), contactez d'abord le vendeur. Si le litige persiste, vous pouvez signaler le problème à Diayal afin que nous intervenions en médiation dans la mesure du possible."
                }
            ]
        }
    ];

    const serviceHours = [
        { day: "Lundi - Vendredi", hours: "8h00 - 20h00" },
        { day: "Samedi", hours: "9h00 - 18h00" },
        { day: "Dimanche", hours: "10h00 - 16h00" }
    ];

    return (
        <div>
            <Header />
            
            <div className="min-h-screen bg-gray-50">
                {/* Banner Section */}
                <section className='bg-[url("http://localhost:3000/images/banner/diay.png")] h-[390px] sm:h-[180px] md:h-[200px] lg:h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                    <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                            <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                                <h2 className='text-2xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-center'>Service Client</h2>
                                <div className='flex flex-col sm:flex-row justify-center items-center gap-2 text-sm sm:text-base lg:text-lg w-full'>
                                    <span>Nous accompagnons votre découverte de l'artisanat authentique</span>
                                </div>
                            </div> 
                        </div> 
                    </div> 
                </section>

                {/* Breadcrumb */}
                <section>
                    <div className='bg-slate-100 py-5 mb-5'>
                        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] mx-auto h-full'>
                            <div className='flex justify-start items-center text-md text-slate-600 w-full'>
                                <Link to='/'>Accueil</Link> 
                                <span className='pt-1'><IoIosArrowForward /></span>
                                <span>Service Client</span>
                            </div>
                        </div>  
                    </div>
                </section>

                <div className="w-[85%] mx-auto py-12">
                    {/* Stats Section */}
                    <div className="mb-12 flex flex-wrap justify-center gap-4">
                        <div className="flex items-center gap-3 bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg px-4 py-3 transition-all shadow-sm hover:shadow-md">
                            <FaCheckCircle className="text-xl text-green-500" />
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-800">98%</div>
                                <div className="text-xs text-gray-600">Satisfaction client</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg px-4 py-3 transition-all shadow-sm hover:shadow-md">
                            <FaClock className="text-xl text-blue-500" />
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-800">2 min</div>
                                <div className="text-xs text-gray-600">Temps de réponse</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-lg px-4 py-3 transition-all shadow-sm hover:shadow-md">
                            <FaUsers className="text-xl text-purple-500" />
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-800">24h/7j</div>
                                <div className="text-xs text-gray-600">Disponibilité</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg px-4 py-3 transition-all shadow-sm hover:shadow-md">
                            <FaAward className="text-xl text-orange-500" />
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-800">5 étoiles</div>
                                <div className="text-xs text-gray-600">Note moyenne</div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Comment pouvons-nous vous aider ?</h2>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setActiveTab('contact')}
                                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                                    activeTab === 'contact'
                                        ? 'bg-green-500 text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-green-100 border border-gray-200'
                                }`}
                            >
                                Nous Contacter
                            </button>
                            <button
                                onClick={() => setActiveTab('faq')}
                                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                                    activeTab === 'faq'
                                        ? 'bg-green-500 text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-green-100 border border-gray-200'
                                }`}
                            >
                                Questions Fréquentes
                            </button>
                            <button
                                onClick={() => setActiveTab('hours')}
                                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                                    activeTab === 'hours'
                                        ? 'bg-green-500 text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-green-100 border border-gray-200'
                                }`}
                            >
                                Horaires & Disponibilité
                            </button>
                        </div>
                    </div>

                    {/* Contact Methods */}
                    {activeTab === 'contact' && (
                        <div>
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                {contactMethods.map((method, index) => {
                                    const IconComponent = method.icon;
                                    return (
                                        <button 
                                            key={index}
                                            className={`group relative overflow-hidden rounded-lg px-4 py-3 text-left transition-all duration-300 transform hover:scale-102 hover:shadow-lg ${method.color} hover:brightness-110 flex items-center gap-3`}
                                            onClick={() => {
                                                if (method.title === 'Chat en direct') {
                                                    setChatOpen(true);
                                                } else if (method.title === 'WhatsApp') {
                                                    window.open(`https://wa.me/221777777777`, '_blank');
                                                } else if (method.title === 'Téléphone') {
                                                    window.open(`tel:+221331234567`, '_self');
                                                } else if (method.title === 'Email') {
                                                    window.open(`mailto:artisans@diayal.sn`, '_self');
                                                }
                                            }}
                                        >
                                            {/* Background Pattern */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* Icon */}
                                            <div className="relative z-10">
                                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                                                    <IconComponent className="text-lg text-white" />
                                                </div>
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="relative z-10 text-white flex-1">
                                                <h3 className="text-sm font-bold mb-1 group-hover:text-white transition-colors">{method.title}</h3>
                                                <p className="text-white/90 text-xs group-hover:text-white transition-colors">{method.description}</p>
                                            </div>
                                            
                                            {/* Arrow */}
                                            <div className="relative z-10">
                                                <IoIosArrowForward className="text-white text-sm group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                            
                                            {/* Shine Effect */}
                                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out"></div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Contact Form */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                                <h3 className="text-2xl font-bold mb-6 text-gray-800">Envoyez-nous un message</h3>
                                
                                {submitMessage && (
                                    <div className={`mb-6 p-4 rounded-lg ${
                                        submitMessage.includes('✅') 
                                            ? 'bg-green-50 text-green-700 border border-green-200' 
                                            : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                                        {submitMessage}
                                    </div>
                                )}
                                
                                <form onSubmit={handleContactFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Nom complet *</label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={contactForm.name}
                                            onChange={handleContactFormChange}
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={contactForm.email}
                                            onChange={handleContactFormChange}
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Téléphone</label>
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            value={contactForm.phone}
                                            onChange={handleContactFormChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Sujet</label>
                                        <select 
                                            name="subject"
                                            value={contactForm.subject}
                                            onChange={handleContactFormChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            <option value="Question sur une création">Question sur une création</option>
                                            <option value="Contact avec un artisan">Contact avec un artisan</option>
                                            <option value="Demande de personnalisation">Demande de personnalisation</option>
                                            <option value="Livraison">Livraison</option>
                                            <option value="Vérification d'authenticité">Vérification d'authenticité</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                                        <textarea 
                                            rows="5" 
                                            name="message"
                                            value={contactForm.message}
                                            onChange={handleContactFormChange}
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        ></textarea>
                                    </div>
                                    <div className="md:col-span-2">
                                        <button 
                                            type="submit"
                                            disabled={isSubmitting || !contactForm.name || !contactForm.email || !contactForm.message}
                                            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    Envoi en cours...
                                                </>
                                            ) : (
                                                <>
                                                    <FaPaperPlane />
                                                    Envoyer le message
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* FAQ Section */}
                    {activeTab === 'faq' && (
                        <div>
                            <div className="space-y-6">
                                {faqCategories.map((category, categoryIndex) => {
                                    const IconComponent = category.icon;
                                    return (
                                        <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                            <div className="flex items-center gap-3 mb-6">
                                                <IconComponent className="text-2xl text-green-500" />
                                                <h3 className="text-xl font-bold text-gray-800">{category.title}</h3>
                                            </div>
                                            <div className="space-y-4">
                                                {category.questions.map((faq, faqIndex) => (
                                                    <div key={faqIndex} className="border-b border-gray-200 pb-4">
                                                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                                            <FaQuestionCircle className="text-green-500" />
                                                            {faq.q}
                                                        </h4>
                                                        <div className="text-gray-600 ml-6 whitespace-pre-line">{faq.a}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Service Hours */}
                    {activeTab === 'hours' && (
                        <div>
                            <div className="max-w-2xl mx-auto">
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                                    <div className="text-center mb-8">
                                        <FaClock className="text-4xl text-green-500 mx-auto mb-4" />
                                        <h3 className="text-2xl font-bold mb-2 text-gray-800">Service Client Disponible</h3>
                                        <p className="text-gray-600">Notre équipe est là pour vous aider</p>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {serviceHours.map((schedule, index) => (
                                            <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                                                <span className="font-semibold text-gray-800">{schedule.day}</span>
                                                <span className="text-green-600 font-semibold">{schedule.hours}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 p-4 bg-green-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaWhatsapp className="text-green-500" />
                                            <span className="font-semibold text-green-700">WhatsApp 24h/7j</span>
                                        </div>
                                        <p className="text-green-600 text-sm">Notre service WhatsApp est disponible en permanence pour une assistance immédiate.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Chat Widget */}
                {chatOpen && (
                    <div className={`fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-2xl border z-50 transition-all duration-300 ${
                        chatMinimized ? 'h-14' : 'h-96'
                    }`}>
                        <div className="bg-green-500 text-white p-4 rounded-t-lg flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <FaRobot />
                                <span className="font-semibold">Assistant Diayal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => setChatMinimized(!chatMinimized)} 
                                    className="text-white hover:text-gray-200 transition-colors"
                                    title={chatMinimized ? 'Agrandir' : 'Réduire'}
                                >
                                    {chatMinimized ? <FaExpand /> : <FaMinus />}
                                </button>
                                <button 
                                    onClick={() => setChatOpen(false)} 
                                    className="text-white hover:text-gray-200 transition-colors"
                                    title="Fermer"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        
                        {!chatMinimized && (
                            !chatInitialized ? (
                            <div className="p-4">
                                <h3 className="font-semibold mb-4">Pour commencer, dites-nous qui vous êtes :</h3>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Votre nom"
                                        value={userInfo.name}
                                        onChange={(e) => setUserInfo(prev => ({...prev, name: e.target.value}))}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Votre email"
                                        value={userInfo.email}
                                        onChange={(e) => setUserInfo(prev => ({...prev, email: e.target.value}))}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <button
                                        onClick={initializeChat}
                                        disabled={!userInfo.name || !userInfo.email}
                                        className="w-full bg-green-500 text-white py-2 rounded-lg text-sm hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Démarrer le chat
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="p-4 h-64 overflow-y-auto">
                                    {messages.map((msg, index) => (
                                        <div key={msg._id || index} className={`mb-3 ${msg.isFromAdmin ? 'text-left' : 'text-right'}`}>
                                            <div className={`inline-block p-3 rounded-lg max-w-xs ${
                                                msg.isFromAdmin 
                                                    ? 'bg-gray-100 text-gray-800' 
                                                    : 'bg-green-500 text-white'
                                            }`}>
                                                <p className="text-sm">{msg.message}</p>
                                                <span className="text-xs opacity-70">
                                                    {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { 
                                                        hour: '2-digit', 
                                                        minute: '2-digit' 
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                                <div className="p-4 border-t">
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            placeholder="Tapez votre message..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                        <button 
                                            onClick={handleSendMessage}
                                            disabled={!newMessage.trim()}
                                            className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                        >
                                            <FaPaperPlane />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default CustomerService;