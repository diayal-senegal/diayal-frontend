import React, { useState, useEffect } from 'react';
import { MdEmail } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaFacebookF, FaUser, FaList, FaPhoneAlt, FaSearch } from "react-icons/fa";
import { FaTwitter, FaSquareInstagram, FaLock, FaHeart, FaCartShopping, FaWhatsapp } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { IoMdArrowDropdown, IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_card_products, get_wishlist_products } from '../store/reducers/cardReducer';

const Header = () => {

    const dispatch = useDispatch()   
    const navigate = useNavigate(); 
    const {categorys} = useSelector(state => state.home)
    const {userInfo} = useSelector(state => state.auth)
    const {card_product_count, wishlist_count } = useSelector(state => state.card)

    const {pathname} = useLocation()

    const [showSidebar, setShowSidebar] = useState(true)
    const [categoryShow, setCategoryShow] = useState(true)

    const [searchValue, setSearchValue] = useState('')
    const [category, setCategory] = useState('')

    const search = () => {
      navigate(`/products/search?category=${category}&value=${searchValue}`)
    }

    const redirect_card_page = () => {
      if (userInfo) {
        navigate('/card')
      } else {
        navigate('/login')
      }
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(get_card_products(userInfo.id))
            dispatch(get_wishlist_products(userInfo.id))
        }  
    },[userInfo,dispatch])

    // Recharger le panier quand le compteur change
    useEffect(() => {
        if (userInfo && card_product_count > 0) {
            dispatch(get_card_products(userInfo.id))
        }
    }, [card_product_count, userInfo, dispatch])

    // Recharger la wishlist quand le compteur change
    useEffect(() => {
        if (userInfo && wishlist_count >= 0) {
            dispatch(get_wishlist_products(userInfo.id))
        }
    }, [wishlist_count, userInfo, dispatch])

    return (
        <>


          {/* HEADER GLOBAL RESPONSIVE */}
      <div className='bg-[#73aff7] py-3'>
        <div className='w-[95%] mx-auto flex flex-wrap items-center justify-between gap-4'>

          {/* GAUCHE : Logo + Support */}
          <div className='flex items-center gap-3 flex-wrap'>
            <Link to='/'>
              <img
                src="http://localhost:3000/images/logo_diayal.svg"
                alt="Logo Diayal"
                className='h-16 sm:h-20'
              />
            </Link>

            <div className='flex items-center gap-3 text-white text-xs sm:text-sm flex-wrap'>
              <div className='flex items-center gap-1'>
                <MdEmail />
                <span>support@diayal.sn</span>
              </div>
              <a
                href="https://wa.me/0033698135322?text=Bonjour,%20j'ai%20besoin%20d'aide"
                target="_blank"
                rel="noopener noreferrer"
                className='flex items-center gap-1 hover:text-green-600 transition-colors'
              >
                <FaWhatsapp />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* CENTRE : Barre de recherche */}
          <div className='flex-1 min-w-[250px] sm:min-w-[350px] max-w-md mx-auto'>
            <div className='flex bg-white rounded-md overflow-hidden shadow-sm'>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className='bg-blu-100 border-r border-gray-300 px-2 sm:px-0 py-2 text-xs sm:text-sm text-gray-700 focus:outline-none min-w-[100px]'
              >
                <option value="">Toutes les catégories</option>
                {categorys.map((c, i) => (
                  <option key={i} value={c.slug}>{c.name}</option>
                ))}
              </select>
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                placeholder="Rechercher..."
                className='flex-1 px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-700 focus:outline-none'
                onKeyDown={(e) => e.key === 'Enter' && search()}
              />
              <button
                onClick={search}
                className='bg-[#059473] hover:bg-green-600 px-3 py-2 transition-colors'
              >
                <FaSearch className='text-black text-sm' />
              </button>
            </div>
          </div>

          {/* DROITE : Réseaux + Connexion + Wishlist + Panier */}
          <div className='flex items-center gap-4 flex-wrap justify-center'>

            {/* Réseaux sociaux */}
            <div className='flex items-center gap-2'>
              <a className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] hover:bg-[#1877f2] hover:text-white flex justify-center items-center rounded-full bg-white text-[#1877f2] transition-all duration-300 hover:scale-110" href="https://www.facebook.com/profile.php?id=61582393357735&locale=fr_FR" title="Facebook">
                <FaFacebookF className='text-sm' />
              </a>
              <a className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] hover:bg-[#000000] hover:text-white flex justify-center items-center rounded-full bg-white text-[#000000] transition-all duration-300 hover:scale-110" href="https://www.tiktok.com/@diayal1?lang=fr" title="TikTok">
                <AiFillTikTok className='text-sm' />
              </a>
              <a className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white flex justify-center items-center rounded-full bg-white text-[#e4405f] transition-all duration-300 hover:scale-110" href="https://www.instagram.com/diayal_officiel/" title="Instagram">
                <FaSquareInstagram className='text-sm' />
              </a>
              <a className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] hover:bg-[#1da1f2] hover:text-white flex justify-center items-center rounded-full bg-white text-[#1da1f2] transition-all duration-300 hover:scale-110" href="https://x.com/Diayal_officiel" title="Twitter">
                <FaTwitter className='text-sm' />
              </a>
            </div>

            {/* Connexion */}
            {userInfo ? (
              <Link to='/dashboard' className='flex items-center gap-1 text-white hover:text-green-600 transition-colors text-lg sm:text-base'>
                <FaUser className='text-xl sm:text-lg' />
                <span className='text-lg sm:text-base font-medium'> Bonjour, {userInfo.name}</span>
              </Link>
            ) : (
              <Link to='/login' className='flex items-center gap-1 text-white hover:text-green-600 transition-colors text-lg sm:text-base'>
                <FaLock className='text-xl sm:text-lg' />
                <span className='text-lg sm:text-base font-medium'>Se connecter</span>
              </Link>
            )}

            {/* Wishlist & Panier */}
            <div className='flex items-center gap-3'>
              <div
                onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')}
                className='relative cursor-pointer text-white hover:text-green-600 transition-colors'
              >
                <FaHeart className='text-lg sm:text-xl' />
                {wishlist_count !== 0 && (
                  <span className='absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center'>
                    {wishlist_count}
                  </span>
                )}
              </div>

              <div
                onClick={redirect_card_page}
                className='relative cursor-pointer text-white hover:text-green-600 transition-colors'
              >
                <FaCartShopping className='text-lg sm:text-xl' />
                {card_product_count !== 0 && (
                  <span className='absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center'>
                    {card_product_count}
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BARRE DE NAVIGATION (TOUJOURS VISIBLE, CENTRÉE ET ADAPTATIVE) */}
      <div className='bg-[#37475A] py-2'>
        <div className='w-[95%] mx-auto'>
          <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center'>
            {[
              { to: '/', label: 'Accueil' },
              { to: '/shops', label: 'Boutique' },
              { to: '/deals', label: 'Promotions' },
              { to: '/bestsellers', label: 'Meilleures ventes' },
              { to: '/new-arrivals', label: 'Nouveautés' },
              { to: '/about', label: 'À propos' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-white hover:text-green-400 transition-colors font-medium text-md sm:text-sm ${pathname === link.to ? 'text-green-400' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;