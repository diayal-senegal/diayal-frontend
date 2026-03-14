import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCamera, FaSave, FaTimes, FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../../api/api';
import Avatar from '../Avatar';

const Profile = () => {
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || ''
      });
    }
  }, [userInfo]);

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Le nom est requis');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('L\'email est requis');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Email invalide');
      return false;
    }
    if (formData.phone && !/^[0-9+\s()-]{8,}$/.test(formData.phone)) {
      toast.error('Numéro de téléphone invalide');
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('L\'image ne doit pas dépasser 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Veuillez sélectionner une image');
        return;
      }

      setAvatarFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAvatar = async () => {
    if (!avatarFile) return;

    try {
      setUploadingAvatar(true);
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      formData.append('userId', userInfo.id);
      
      const { data } = await api.post('/customer/upload-avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (data.token) {
        localStorage.setItem('customerToken', data.token);
      }

      toast.success('Photo de profil mise à jour !');
      setAvatarPreview(null);
      setAvatarFile(null);
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Erreur lors de l\'upload');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const { data } = await api.put('/customer/update-profile', {
        userId: userInfo.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });

      console.log('Réponse backend:', data);
      
      if (data.token) {
        localStorage.setItem('customerToken', data.token);
      }
      
      toast.success('Profil mis à jour avec succès !');
      setIsEditing(false);
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Erreur complète:', error);
      toast.error(error.response?.data?.error || 'Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userInfo.name || '',
      email: userInfo.email || '',
      phone: userInfo.phone || ''
    });
    setIsEditing(false);
    setAvatarPreview(null);
    setAvatarFile(null);
  };

  return (
    <div className='w-full'>
      <div className='flex items-center gap-3 mb-6'>
        <div className='p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg'>
          <FaUser className='text-xl' />
        </div>
        <div>
          <h2 className='text-2xl font-bold text-gray-800'>Mon profil</h2>
          <p className='text-gray-500 text-sm'>Gérez vos informations personnelles</p>
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
        <div className='p-6'>
          <div className='flex flex-col items-center mb-8 pb-8 border-b border-gray-200'>
            <div className='relative'>
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Preview"
                  className='w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg'
                />
              ) : (
                <Avatar
                  type="customer"
                  image={userInfo?.image}
                  name={userInfo?.name}
                  size="xl"
                />
              )}
              
              <label
                htmlFor="avatar-upload"
                className='absolute bottom-0 right-0 w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-600 transition-all duration-200 shadow-lg'
              >
                <FaCamera />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className='hidden'
                />
              </label>
            </div>

            {avatarPreview && (
              <div className='flex gap-2 mt-4'>
                <button
                  onClick={handleUploadAvatar}
                  disabled={uploadingAvatar}
                  className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors text-sm font-medium'
                >
                  {uploadingAvatar ? 'Upload...' : 'Enregistrer la photo'}
                </button>
                <button
                  onClick={() => {
                    setAvatarPreview(null);
                    setAvatarFile(null);
                  }}
                  className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium'
                >
                  Annuler
                </button>
              </div>
            )}

            <p className='text-sm text-gray-500 mt-3'>
              Formats acceptés : JPG, PNG (max 5MB)
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                <FaUser className='inline mr-2 text-indigo-500' />
                Nom complet
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-200'
                  placeholder='Votre nom complet'
                />
              ) : (
                <div className='px-4 py-3 bg-gray-50 rounded-lg text-gray-800 font-medium'>
                  {userInfo?.name || 'Non renseigné'}
                </div>
              )}
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                <FaEnvelope className='inline mr-2 text-indigo-500' />
                Adresse email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-200'
                  placeholder='votre@email.com'
                />
              ) : (
                <div className='px-4 py-3 bg-gray-50 rounded-lg text-gray-800 font-medium'>
                  {userInfo?.email || 'Non renseigné'}
                </div>
              )}
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                <FaPhone className='inline mr-2 text-indigo-500' />
                Numéro de téléphone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-200'
                  placeholder='+221 XX XXX XX XX'
                />
              ) : (
                <div className='px-4 py-3 bg-gray-50 rounded-lg text-gray-800 font-medium'>
                  {userInfo?.phone || 'Non renseigné'}
                </div>
              )}
            </div>

            <div className='flex flex-col sm:flex-row gap-3 pt-4'>
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100'
                  >
                    <FaSave />
                    {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className='px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200'
                  >
                    <FaTimes className='inline mr-2' />
                    Annuler
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105'
                >
                  <FaEdit />
                  Modifier mon profil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
