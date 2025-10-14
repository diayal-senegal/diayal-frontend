import React, { useEffect } from 'react';
import { FaEye, FaRegHeart, FaHeart } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Rating from '../Rating';
import { useDispatch, useSelector } from 'react-redux';
import { get_wishlist_products, remove_wishlist, messageClear, add_to_card } from '../../store/reducers/cardReducer';
import toast from 'react-hot-toast';


const Wishlist = () => {


  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { wishlist, successMessage, errorMessage } = useSelector(state => state.card);

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(get_wishlist_products(userInfo.id));
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      if (userInfo?.id) {
        dispatch(get_wishlist_products(userInfo.id));
      }
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, userInfo]);



    
    return (
        <div className='w-full'>
            {/* Header */}
            <div className='flex items-center gap-3 mb-6'>
                <div className='p-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg'>
                    <FaHeart className='text-xl' />
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>Mes favoris</h2>
                    <p className='text-gray-500 text-sm'>{wishlist?.length || 0} produit(s) dans vos favoris</p>
                </div>
            </div>

            {/* Grille des produits */}
            {wishlist && wishlist.length > 0 ? (
                <div className='grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
                    {wishlist.map((p, i) => (
                        <div key={i} className='bg-white rounded-lg shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden'>
                            <div className='relative overflow-hidden'>
                                {/* Badge de réduction */}
                                {p.discount !== 0 && (
                                    <div className='absolute top-2 left-2 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg'>
                                        -{p.discount}%
                                    </div>
                                )}
                                
                                {/* Image du produit */}
                                <img 
                                    className='w-full h-[240px] object-contain group-hover:scale-105 transition-transform duration-300' 
                                    src={p.image} 
                                    alt={p.name} 
                                />
                                
                                {/* Boutons d'action */}
                                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center'>
                                    <div className='flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
                                        <button 
                                            onClick={() => dispatch(remove_wishlist(p._id))} 
                                            className='w-9 h-9 bg-white text-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition-all duration-200'
                                            title='Retirer des favoris'
                                        >
                                            <FaRegHeart className='text-sm' />
                                        </button>
                                        
                                        <Link 
                                            to={`/product/details/${p.slug}`} 
                                            className='w-9 h-9 bg-white text-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-200'
                                            title='Voir le produit'
                                        >
                                            <FaEye className='text-sm' />
                                        </Link>
                                        
                                        <button 
                                            onClick={() => userInfo?.id && dispatch(add_to_card({ userId: userInfo.id, quantity: 1, productId: p.productId }))} 
                                            className='w-9 h-9 bg-white text-[#059473] rounded-full flex items-center justify-center shadow-lg hover:bg-[#059473] hover:text-white transition-all duration-200'
                                            title='Ajouter au panier'
                                        >
                                            <RiShoppingCartLine className='text-sm' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Informations du produit */}
                            <div className='p-3'>
                                <h3 className='font-bold text-gray-800 mb-2 text-sm hover:text-[#059473] transition-colors duration-200'>
                                    {p.name}
                                </h3>
                                
                                <div className='flex items-center justify-between mb-2'>
                                    <span className='text-md font-semibold text-[#059473]'>
                                        {p.discount > 0 ? (
                                            <>
                                                {Math.floor(p.price - (p.price * p.discount / 100))} FCFA
                                                <span className='text-xs text-gray-400 line-through ml-1'>
                                                    {p.price} FCFA
                                                </span>
                                            </>
                                        ) : (
                                            `${p.price} FCFA`
                                        )}
                                    </span>
                                </div>
                                
                                {/* Rating */}
                                <div className='flex items-center'>
                                    <Rating ratings={p.rating} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* État vide */
                <div className='bg-white rounded-xl shadow-lg border border-gray-100 text-center py-16'>
                    <div className='text-6xl mb-4'>💝</div>
                    <h3 className='text-xl font-semibold text-gray-700 mb-2'>Votre liste de favoris est vide</h3>
                    <p className='text-gray-500 mb-6'>Découvrez nos produits et ajoutez vos coups de cœur !</p>
                    <Link 
                        to='/shops' 
                        className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#059473] to-[#047857] text-white font-medium rounded-lg hover:from-[#047857] hover:to-[#059473] transition-all duration-200 transform hover:scale-105'
                    >
                        Découvrir les produits
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Wishlist;