import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaShieldAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import api from '../../api/api';
import toast from 'react-hot-toast';

// Configuration pour utiliser les cookies
api.defaults.withCredentials = true;

const ChangePassword = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });

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

    const passwordValidation = validatePassword(formData.new_password);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!passwordValidation.isValid) {
            toast.error('Le nouveau mot de passe ne respecte pas les critères de sécurité');
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await api.post('/customer/change-password', {
                oldPassword: formData.old_password,
                newPassword: formData.new_password
            });

            toast.success(response.data.message || 'Mot de passe changé avec succès!');
            setFormData({ old_password: '', new_password: '', confirm_password: '' });
            setMessage({ type: 'success', text: response.data.message || 'Mot de passe changé avec succès!' });
            
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            
        } catch (error) {
            console.error('Erreur changement mot de passe:', error);
            const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Erreur lors du changement de mot de passe';
            toast.error(errorMessage);
            setMessage({ type: 'error', text: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full'>
            {/* Header */}
            <div className='flex items-center gap-3 mb-6'>
                <div className='p-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg'>
                    <RiLockPasswordLine className='text-xl' />
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>Changer le mot de passe</h2>
                    <p className='text-gray-500 text-sm'>Modifiez votre mot de passe pour sécuriser votre compte</p>
                </div>
            </div>

            {/* Formulaire */}
            <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
                <div className='p-6'>
                    {/* Conseils de sécurité */}
                    <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
                        <div className='flex items-start gap-3'>
                            <FaShieldAlt className='text-blue-500 text-lg mt-0.5 flex-shrink-0' />
                            <div>
                                <h3 className='font-semibold text-blue-800 mb-2'>Conseils pour un mot de passe sécurisé :</h3>
                                <ul className='text-sm text-blue-700 space-y-1'>
                                    <li>• Au moins 8 caractères</li>
                                    <li>• Mélange de lettres majuscules et minuscules</li>
                                    <li>• Au moins un chiffre et un caractère spécial</li>
                                    <li>• Évitez les informations personnelles</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Message de statut */}
                    {message.text && (
                        <div className={`p-4 rounded-lg mb-4 ${
                            message.type === 'success' 
                                ? 'bg-green-50 border border-green-200 text-green-800' 
                                : 'bg-red-50 border border-red-200 text-red-800'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Ancien mot de passe */}
                        <div>
                            <label htmlFor="old_password" className='block text-sm font-semibold text-gray-700 mb-2'>
                                Ancien mot de passe
                            </label>
                            <div className='relative'>
                                <input 
                                    type={showOldPassword ? "text" : "password"}
                                    name='old_password' 
                                    id='old_password' 
                                    value={formData.old_password}
                                    onChange={handleInputChange}
                                    placeholder='Saisissez votre ancien mot de passe' 
                                    className='w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-200'
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200'
                                >
                                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Nouveau mot de passe */}
                        <div>
                            <label htmlFor="new_password" className='block text-sm font-semibold text-gray-700 mb-2'>
                                Nouveau mot de passe
                            </label>
                            <div className='relative'>
                                <input 
                                    type={showNewPassword ? "text" : "password"}
                                    name='new_password' 
                                    id='new_password' 
                                    value={formData.new_password}
                                    onChange={handleInputChange}
                                    placeholder='Saisissez votre nouveau mot de passe' 
                                    className='w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-200'
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200'
                                >
                                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            
                            {/* Validation en temps réel du mot de passe */}
                            {formData.new_password && (
                                <div className='mt-3 space-y-2'>
                                    <div className='text-xs space-y-1'>
                                        <div className={`flex items-center gap-2 ${
                                            passwordValidation.minLength ? 'text-green-600' : 'text-red-500'
                                        }`}>
                                            {passwordValidation.minLength ? <FaCheck /> : <FaTimes />}
                                            Au moins 8 caractères
                                        </div>
                                        <div className={`flex items-center gap-2 ${
                                            passwordValidation.hasUpper && passwordValidation.hasLower ? 'text-green-600' : 'text-red-500'
                                        }`}>
                                            {passwordValidation.hasUpper && passwordValidation.hasLower ? <FaCheck /> : <FaTimes />}
                                            Lettres majuscules et minuscules
                                        </div>
                                        <div className={`flex items-center gap-2 ${
                                            passwordValidation.hasNumber ? 'text-green-600' : 'text-red-500'
                                        }`}>
                                            {passwordValidation.hasNumber ? <FaCheck /> : <FaTimes />}
                                            Au moins un chiffre
                                        </div>
                                        <div className={`flex items-center gap-2 ${
                                            passwordValidation.hasSpecial ? 'text-green-600' : 'text-red-500'
                                        }`}>
                                            {passwordValidation.hasSpecial ? <FaCheck /> : <FaTimes />}
                                            Au moins un caractère spécial
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirmer mot de passe */}
                        <div>
                            <label htmlFor="confirm_password" className='block text-sm font-semibold text-gray-700 mb-2'>
                                Confirmer le nouveau mot de passe
                            </label>
                            <div className='relative'>
                                <input 
                                    type={showConfirmPassword ? "text" : "password"}
                                    name='confirm_password' 
                                    id='confirm_password' 
                                    value={formData.confirm_password}
                                    onChange={handleInputChange}
                                    placeholder='Confirmez votre nouveau mot de passe' 
                                    className='w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-200'
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200'
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {/* Validation en temps réel */}
                            {formData.confirm_password && formData.new_password !== formData.confirm_password && (
                                <p className='text-red-500 text-sm mt-2'>Les mots de passe ne correspondent pas</p>
                            )}
                            {formData.confirm_password && formData.new_password === formData.confirm_password && formData.new_password.length > 0 && (
                                <p className='text-green-500 text-sm mt-2'>✓ Les mots de passe correspondent</p>
                            )}
                        </div>

                        {/* Boutons */}
                        <div className='flex flex-col sm:flex-row gap-3 pt-4'>
                            <button 
                                type="submit"
                                disabled={loading || !formData.old_password || !passwordValidation.isValid || formData.new_password !== formData.confirm_password}
                                className='flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100'
                            >
                                {loading ? 'Changement en cours...' : 'Changer le mot de passe'}
                            </button>
                            <button 
                                type="button"
                                onClick={() => setFormData({ old_password: '', new_password: '', confirm_password: '' })}
                                className='px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200'
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;