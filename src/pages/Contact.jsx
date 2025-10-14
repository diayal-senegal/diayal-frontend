import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const response = await fetch('http://localhost:5000/api/contact/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            
            const data = await response.json()
            
            if (response.ok) {
                setMessage('Message envoyé avec succès !')
                setFormData({ name: '', email: '', subject: '', message: '' })
            } else {
                setMessage(data.error || 'Erreur lors de l\'envoi')
            }
        } catch (error) {
            setMessage('Erreur lors de l\'envoi')
        } finally {
            setLoading(false)
            setTimeout(() => setMessage(''), 5000)
        }
    }

    return (
        <div>
            <Header />
            <div className="bg-slate-100 py-16">
                <div className="w-[90%] mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold text-center mb-8">Nous contacter</h1>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Informations de contact */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4">Nos coordonnées</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold">Adresse</h3>
                                        <p className="text-gray-600">129 Rue de la Paix - 12000 - Yoff<br/>Dakar (Sénégal)</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Téléphone</h3>
                                        <p className="text-gray-600">+221 33 456 789</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <p className="text-gray-600">contact@diayma.sn</p>
                                    </div>
                                </div>
                            </div>

                            {/* Formulaire de contact */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4">Envoyez-nous un message</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Votre nom"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#059473]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Votre email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#059473]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="Sujet"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#059473]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            name="message"
                                            placeholder="Votre message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#059473]"
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-[#059473] to-[#04b383] text-white py-3 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-50"
                                    >
                                        {loading ? 'Envoi...' : 'Envoyer le message'}
                                    </button>
                                    {message && (
                                        <p className={`text-center ${message.includes('succès') ? 'text-green-600' : 'text-red-600'}`}>
                                            {message}
                                        </p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact