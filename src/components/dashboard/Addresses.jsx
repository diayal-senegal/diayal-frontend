import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaHome, FaBriefcase, FaMapPin } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../../api/api';

const Addresses = () => {
  const { userInfo } = useSelector(state => state.auth);
  
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  
  const [formData, setFormData] = useState({
    label: 'home',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Sénégal',
    isDefault: false
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/customer/addresses/${userInfo.id}`);
      setAddresses(data.addresses || []);
    } catch (error) {
      console.error('Erreur chargement adresses:', error);
      toast.error('Erreur lors du chargement des adresses');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      label: 'home',
      fullName: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'Sénégal',
      isDefault: false
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('Le nom complet est requis');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Le numéro de téléphone est requis');
      return false;
    }
    if (!/^[0-9+\s()-]{8,}$/.test(formData.phone)) {
      toast.error('Numéro de téléphone invalide');
      return false;
    }
    if (!formData.address.trim()) {
      toast.error('L\'adresse est requise');
      return false;
    }
    if (!formData.city.trim()) {
      toast.error('La ville est requise');
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddAddress = async () => {
    if (!validateForm()) return;

    try {
      const { data } = await api.post('/customer/addresses', {
        userId: userInfo.id,
        ...formData
      });
      
      toast.success('Adresse ajoutée avec succès !');
      setAddresses(data.addresses);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Erreur lors de l\'ajout');
    }
  };

  const handleEditAddress = (address) => {
    setFormData({
      label: address.label,
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      postalCode: address.postalCode || '',
      country: address.country || 'Sénégal',
      isDefault: address.isDefault
    });
    setEditingId(address._id);
    setIsAdding(false);
  };

  const handleUpdateAddress = async () => {
    if (!validateForm()) return;

    try {
      const { data } = await api.put(`/customer/addresses/${editingId}`, {
        userId: userInfo.id,
        ...formData
      });
      
      toast.success('Adresse mise à jour avec succès !');
      setAddresses(data.addresses);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Erreur lors de la mise à jour');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette adresse ?')) {
      return;
    }

    try {
      setDeletingId(addressId);
      const { data } = await api.delete(`/customer/addresses/${addressId}`, {
        data: { userId: userInfo.id }
      });
      
      toast.success('Adresse supprimée avec succès !');
      setAddresses(data.addresses);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Erreur lors de la suppression');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      const { data } = await api.put(`/customer/addresses/${addressId}/default`, {
        userId: userInfo.id
      });
      
      toast.success('Adresse par défaut mise à jour !');
      setAddresses(data.addresses);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Erreur lors de la mise à jour');
    }
  };

  const getLabelIcon = (label) => {
    switch (label) {
      case 'home': return <FaHome className="text-indigo-500" />;
      case 'work': return <FaBriefcase className="text-indigo-500" />;
      default: return <FaMapPin className="text-indigo-500" />;
    }
  };

  const getLabelText = (label) => {
    switch (label) {
      case 'home': return 'Domicile';
      case 'work': return 'Travail';
      default: return 'Autre';
    }
  };

  if (loading) {
    return (
      <div className='w-full flex justify-center items-center py-20'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500'></div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg'>
            <FaMapMarkerAlt className='text-xl' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>Mes adresses</h2>
            <p className='text-gray-500 text-sm'>Gérez vos adresses de livraison</p>
          </div>
        </div>
        
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200'
          >
            <FaPlus />
            Ajouter une adresse
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6'>
          <h3 className='text-lg font-bold text-gray-800 mb-4'>
            {editingId ? 'Modifier l\'adresse' : 'Nouvelle adresse'}
          </h3>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Type d'adresse
              </label>
              <select
                name="label"
                value={formData.label}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none'
              >
                <option value="home">Domicile</option>
                <option value="work">Travail</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Nom complet
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none'
                placeholder='Prénom et nom'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none'
                placeholder='+221 XX XXX XX XX'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Ville
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none'
                placeholder='Dakar'
              />
            </div>

            <div className='md:col-span-2'>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Adresse complète
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none'
                placeholder='Rue, quartier, numéro...'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Code postal (optionnel)
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none'
                placeholder='12345'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Pays
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none'
                placeholder='Sénégal'
              />
            </div>

            <div className='md:col-span-2'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className='w-5 h-5 text-indigo-500 border-gray-300 rounded focus:ring-indigo-500'
                />
                <span className='text-sm font-semibold text-gray-700'>
                  Définir comme adresse par défaut
                </span>
              </label>
            </div>
          </div>

          <div className='flex gap-3 mt-6'>
            <button
              onClick={editingId ? handleUpdateAddress : handleAddAddress}
              className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200'
            >
              <FaSave />
              {editingId ? 'Mettre à jour' : 'Enregistrer'}
            </button>
            <button
              onClick={resetForm}
              className='px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200'
            >
              <FaTimes className='inline mr-2' />
              Annuler
            </button>
          </div>
        </div>
      )}

      {addresses.length === 0 ? (
        <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center'>
          <FaMapMarkerAlt className='text-6xl text-gray-300 mx-auto mb-4' />
          <h3 className='text-xl font-bold text-gray-800 mb-2'>Aucune adresse</h3>
          <p className='text-gray-500 mb-6'>Vous n'avez pas encore ajouté d'adresse de livraison</p>
          <button
            onClick={() => setIsAdding(true)}
            className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200'
          >
            <FaPlus />
            Ajouter votre première adresse
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`bg-white rounded-xl shadow-lg border-2 p-6 transition-all duration-200 hover:shadow-xl ${
                address.isDefault ? 'border-indigo-500' : 'border-gray-100'
              }`}
            >
              <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-2'>
                  {getLabelIcon(address.label)}
                  <span className='font-bold text-gray-800'>{getLabelText(address.label)}</span>
                  {address.isDefault && (
                    <span className='px-2 py-1 bg-indigo-100 text-indigo-600 text-xs font-semibold rounded'>
                      Par défaut
                    </span>
                  )}
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => handleEditAddress(address)}
                    className='p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors'
                    title='Modifier'
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address._id)}
                    disabled={deletingId === address._id}
                    className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50'
                    title='Supprimer'
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className='space-y-2 text-sm text-gray-600'>
                <p className='font-semibold text-gray-800'>{address.fullName}</p>
                <p>{address.phone}</p>
                <p>{address.address}</p>
                <p>{address.city}{address.postalCode && `, ${address.postalCode}`}</p>
                <p>{address.country}</p>
              </div>

              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address._id)}
                  className='mt-4 w-full py-2 border border-indigo-500 text-indigo-500 font-semibold rounded-lg hover:bg-indigo-50 transition-colors text-sm'
                >
                  Définir par défaut
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
