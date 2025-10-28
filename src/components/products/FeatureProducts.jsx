import React, { useEffect } from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_card, add_to_wishlist, messageClear } from '../../store/reducers/cardReducer';
import toast from 'react-hot-toast';

const FeatureProducts = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { successMessage, errorMessage } = useSelector(state => state.card);

  const add_card = (id) => {
    if (userInfo) {
      dispatch(add_to_card({
        userId: userInfo.id,
        quantity: 1,
        productId: id
      }));
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const add_wishlist = (pro) => {
    dispatch(add_to_wishlist({
      userId: userInfo.id,
      productId: pro._id,
      name: pro.name,
      price: pro.price,
      images: pro.images[0],
      discount: pro.discount,
      rating: pro.rating,
      slug: pro.slug
    }));
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="w-[85%] mx-auto">
        {/* Titre style Amazon */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Produits vedettes</h2>
            <Link to="/products" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
              Voir tout
            </Link>
          </div>
          <p className="text-sm text-gray-600">Découvrez notre sélection de produits populaires</p>
        </div>

        {/* Grid (même layout responsive) */}
        <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-6">
        {products.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 group"
          >
            {/* Image produit avec fond gris */}
            <div className="relative bg-gray-50 p-4">
              {p.discount ? (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm z-10">
                  -{p.discount}%
                </span>
              ) : null}

              <div className="aspect-square flex items-center justify-center">
                <img
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  src={p.images[0]}
                  alt={p.name}
                />
              </div>

              {/* Boutons overlay améliorés */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <button
                    onClick={() => add_wishlist(p)}
                    className="w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all duration-200"
                  >
                    <FaRegHeart className="text-sm" />
                  </button>
                  <Link
                    to={`/product/details/${p.slug}`}
                    className="w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-all duration-200"
                  >
                    <FaEye className="text-sm" />
                  </Link>
                  <button
                    onClick={() => add_card(p._id)}
                    className="w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-md hover:bg-green-500 hover:text-white transition-all duration-200"
                  >
                    <RiShoppingCartLine className="text-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Infos produit améliorées */}
            <div className="p-4">
              <Link to={`/product/details/${p.slug}`}>
                <h3 className="font-medium text-gray-900 hover:text-green-600 transition-colors text-sm mb-2 line-clamp-2 leading-tight">
                  {p.name}
                </h3>
              </Link>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  {p.price} FCFA
                </span>
                <Rating ratings={p.rating} />
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureProducts;
