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
          {/* BARRE SUPÉRIEURE DESKTOP SEULEMENT */}
          <div className='bg-[#7eabe2] text-black text-sm py-2 hidden md-lg:hidden lg:block'>
            <div className='w-[85%] lg:w-[90%] mx-auto'>
              <div className='flex justify-between items-center'>
                {/* Contacts à gauche */}
                {/* <div className='flex items-center gap-6'>
                  <div className='flex items-center gap-2'>
                    <MdEmail />
                    <span>support@diayal.sn</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <MdOutlinePhoneAndroid />
                    <span>+(221) 77 77 77 77</span>
                  </div>
                  <a href="https://wa.me/221777077777?text=Bonjour,%20j'ai%20besoin%20d'aide" target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors'>
                    <FaWhatsapp />
                    <span>Support 24/7</span>
                  </a>
                </div> */}

                {/* Réseaux sociaux et compte à droite */}
                {/* <div className='flex items-center gap-6'>
                  <div className='flex items-center gap-3'>
                    <a className="w-[40px] h-[40px] hover:bg-[#1877f2] hover:text-white flex justify-center items-center rounded-full bg-white text-[#1877f2] transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg" href="#" title="Facebook">
                    <FaFacebookF /></a>
                    <a href='#' className='hover:text-green-400 transition-colors'><AiFillTikTok /></a>
                    <a href='#' className='hover:text-green-400 transition-colors'><FaSquareInstagram /></a>
                    <a href='#' className='hover:text-green-400 transition-colors'><FaTwitter /></a>
                  </div>
                  
                  <div className='relative group cursor-pointer flex items-center gap-1'>
                    <img src="http://localhost:3000/images/sn.png" alt="Sénégal" className='w-5 h-4' />
                    <span>FR</span>
                    <IoMdArrowDropdown />
                    <ul className='absolute top-8 right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white text-black p-2 w-24 flex flex-col gap-1 z-50 rounded shadow-lg'>
                      <li className="hover:bg-gray-100 px-2 py-1 rounded text-xs">Français</li>
                      <li className="hover:bg-gray-100 px-2 py-1 rounded text-xs">Anglais</li>
                    </ul>
                  </div>

                  {userInfo ? (
                    <Link className='flex items-center gap-2 hover:text-green-400 transition-colors' to='/dashboard'>
                      <FaUser />
                      <span>{userInfo.name}</span>
                    </Link>
                  ) : (
                    <Link className='flex items-center gap-2 hover:text-green-400 transition-colors' to='/login'>
                      <FaLock />
                      <span>Connexion</span>
                    </Link>
                  )}
                </div> */}
              </div>
            </div>
          </div>

         {/* BARRE PRINCIPALE DESKTOP (compacte) */}
<div className='bg-[#232F3E] py-2 hidden md-lg:hidden lg:block'>
  <div className='w-[80%] lg:w-[75%] mx-auto scale-90'>
    <div className='flex items-center gap-3'>
      {/* Logo plus petit */}
      <div className='flex-shrink-0'>
        <Link to='/'>
          <img
            src="http://localhost:3000/images/logo_diayalf.svg"
            alt="Logo Diayal"
            className='h-8'
          />
        </Link>
      </div>

      {/* Barre de recherche réduite */}
      <div className='flex-1 max-w-lg mx-3'>
        <div className='flex'>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className='bg-gray-200 border-r border-gray-300 px-2 py-2 text-sm text-gray-700 rounded-l-md focus:outline-none min-w-[120px]'
          >
            <option value="">Toutes</option>
            {categorys.map((c, i) => (
              <option key={i} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Rechercher..."
            className='w-[250px] px-3 py-2 text-sm text-gray-700 focus:outline-none'
            onKeyPress={(e) => e.key === 'Enter' && search()}
          />
          <button
            onClick={search}
            className='bg-[#FF9900] hover:bg-[#e88b00] px-3 py-2 rounded-r-md transition-colors'
          >
            <FaSearch className='text-black text-sm' />
          </button>
        </div>
      </div>

      {/* Icônes compactes */}
      <div className='flex items-center gap-3'>
        <div
          onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')}
          className='relative cursor-pointer text-white hover:text-green-400 transition-colors'
        >
          <FaHeart className='text-xl' />
          {wishlist_count !== 0 && (
            <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center'>
              {wishlist_count}
            </span>
          )}
        </div>

        <div
          onClick={redirect_card_page}
          className='relative cursor-pointer text-white hover:text-green-400 transition-colors'
        >
          <FaCartShopping className='text-xl' />
          {card_product_count !== 0 && (
            <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center'>
              {card_product_count}
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
</div>


          {/* BARRE DE CONTACTS MOBILE */}
          <div className='bg-white text-black text-md py-1 block md-lg:block lg:hidden'>
            <div className='px-4'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-1'>
                    <MdEmail className='text-xs' />
                    <span>support@diayal.sn</span>
                  </div>
                  <a href="https://wa.me/0033698135322?text=Bonjour,%20j'ai%20besoin%20d'aide" target="_blank" rel="noopener noreferrer" className='flex items-center gap-1 text-[#059473]'>
                    <FaWhatsapp className='text-md' />
                    <span>Support</span>
                  </a>
                </div>
                {/* <Link to='/' className='flex-1 flex justify-center'>
                  <img src="http://localhost:3000/images/logo_diayal.svg" alt="Logo Diayal" className='h-[120px]' />
                </Link> */}
                <div className='flex items-center gap-2'>
                  <a className="w-[20px] h-[20px] hover:bg-[#1877f2] hover:text-white flex justify-center items-center rounded-full bg-white text-[#1877f2] transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg" href="#" title="Facebook">
                  <FaFacebookF className='text-md' /></a>
                   <a className="w-[20px] h-[20px] hover:bg-[#000000] hover:text-white flex justify-center items-center rounded-full bg-white text-[#000000] transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg" href="#" title="TikTok">
                  <AiFillTikTok className='text-md' /></a>
                  <a className="w-[20px] h-[20px] hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white flex justify-center items-center rounded-full bg-white text-[#e4405f] transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg" href="#" title="Instagram">
                  <FaSquareInstagram className='text-md' /></a>
                   <a className="w-[20px] h-[20px] hover:bg-[#1da1f2] hover:text-white flex justify-center items-center rounded-full bg-white text-[#1da1f2] transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg" href="#" title="Twitter">
                  <FaTwitter className='text-md' /></a>
                </div>
              </div>
            </div>
          </div>

          {/* HEADER MOBILE AMAZON STYLE */}
          <div className='md-lg:block lg:hidden'>
            {/* Barre supérieure avec logo et panier */}
            <div className='bg-white px-4 py-3'>
              <div className='flex items-center justify-between'>
                {/* Menu hamburger */}
                {/* <button 
                  onClick={() => setShowSidebar(!showSidebar)}
                  className='text-white p-1'
                >
                  <FaList className='text-xl' />
                </button> */}

                {/* Logo Amazon style */}
                <Link to='/' className='flex-1 flex justify-center'>
                  <img src="http://localhost:3000/images/logo_diayal.svg" alt="Logo Diayal" className='h-[120px]' />
                </Link>

                {/* Panier style Amazon */}
                <div className='flex items-center gap-4'>
                  <div 
                    onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')} 
                    className='relative cursor-pointer text-black'
                  >
                    <FaHeart className='text-xl' />
                    {wishlist_count !== 0 && (
                      <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1'>
                        {wishlist_count}
                      </span>
                    )}
                  </div>

                  <div 
                    onClick={redirect_card_page} 
                    className='relative cursor-pointer text-black'
                  >
                    <FaCartShopping className='text-xl' />
                    {card_product_count !== 0 && (
                      <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1'>
                        {card_product_count}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Barre de recherche PROÉMINENTE comme Amazon */}
           <div className='bg-white px-4 pb-3 lg:flex lg:justify-center'>
           <div
              className='flex bg-white rounded-md overflow-hidden shadow-md 
               w-full 
               lg:max-w-xl lg:scale-90 lg:py-1.5 transition-transform duration-200'
               >
                <select
                  onChange={(e) => setCategory(e.target.value)}
                 className='bg-gray-100 border-r border-gray-300 
                 px-3 py-3 text-md text-gray-700 focus:outline-none w-[190px] flex-shrink-0
                 lg:px-2 lg:py-1.5 lg:text-sm lg:w-[150px]'
                 >
                 <option value="">Toutes les catégories</option>
                  {categorys.map((c, i) => (
                      <option key={i} value={c.slug}>{c.name}</option>
                        ))}
                        </select>
    
                      <input
                        onChange={(e) => setSearchValue(e.target.value)}
                        type="text"
                        placeholder="Rechercher un produit..."
                        className='flex-1 px-2 py-3 text-sm text-gray-700 focus:outline-none min-w-0
                          lg:py-1.5 lg:text-sm'
                        onKeyPress={(e) => e.key === 'Enter' && search()}
                      />
    
    <button 
      onClick={search}
      className='bg-[#059473] hover:bg-green-600 px-3 py-3 transition-colors flex-shrink-0
                 lg:px-2 lg:py-1.5'
    >
      <FaSearch className='text-black text-sm' />
    </button>
  </div>
</div>


            {/* Barre de navigation mobile Amazon style */}
            <div className='bg-[#37475A] px-4 py-2'>
              <div className='flex items-center justify-between text-white text-sm'>
                <div className='flex items-center gap-4'>
                  {userInfo ? (
                    <Link to='/dashboard' className='flex items-center gap-2 hover:text-green-400 transition-colors'>
                      <FaUser className='text-md' />
                      <span className='text-xl'>Bonjour, {userInfo.name}</span>
                    </Link>
                  ) : (
                    <Link to='/login' className='flex items-center gap-2 hover:text-green-400 transition-colors'>
                      <FaLock className='text-md' />
                      <span className='text-xl'>Se connecter</span>
                    </Link>
                  )}
                </div>

                <div className='flex items-center gap-1'>
                  <img src="http://localhost:3000/images/sn.png" alt="Sénégal" className='w-4 h-3' />
                  <span className='text-xs'>SN</span>
                </div>
              </div>
            </div>

            {/* Navigation rapide Amazon style */}
            <div className='bg-white border-b border-gray-200'>
              <div className='flex overflow-x-auto px-4 py-2 gap-4'>
                <Link to='/' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                  Accueil
                </Link>
                <Link to='/shops' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/shops' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                  Boutique
                </Link>
                <Link to='/deals' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/deals' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                  Promotions
                </Link>
                <Link to='/bestsellers' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/bestsellers' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                  Meilleures ventes
                </Link>
                <Link to='/new-arrivals' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/new-arrivals' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                  Nouveautés
                </Link>
                {/* <Link to='/customer-service' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/customer-service' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                  Service client
                </Link> */}
                <Link to='/about' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/about' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                  À propos
                </Link>
                {/* <Link to='/contact' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/contact' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                  Contact
                </Link> */}
              </div>
            </div>
          </div>

          {/* Navigation rapide DESKTOP centrée */}
          {/* <div className='bg-white border-b border-gray-200 hidden lg:block'>
            <div className='flex justify-center px-4 py-2 gap-6'>
              <Link to='/' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                Accueil
              </Link>
              <Link to='/shops' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/shops' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                Boutique
              </Link>
              <Link to='/deals' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/deals' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                Promotions
              </Link>
              <Link to='/bestsellers' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/bestsellers' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                Meilleures ventes
              </Link>
              <Link to='/new-arrivals' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/new-arrivals' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                Nouveautés
              </Link>
              <Link to='/customer-service' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/customer-service' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                Service client
              </Link>
              <Link to='/about' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/about' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                À propos
              </Link>
              <Link to='/contact' className={`whitespace-nowrap text-sm font-medium py-2 ${pathname === '/contact' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-700'}`}>
                Contact
              </Link>
            </div>
          </div> */}

          {/* BARRE DE NAVIGATION DESKTOP SEULEMENT */}
          {/* <div className='bg-[#37475A] py-2 hidden lg:block'>
            <div className='w-[85%] lg:w-[90%] mx-auto'>
              <div className='flex items-center gap-6'> */}
                {/* Toutes catégories */}
                {/* <div 
                  onClick={() => setCategoryShow(!categoryShow)} 
                  className='text-white hover:text-green-400 cursor-pointer transition-colors'
                >
                  <span className='font-medium'>Toutes les catégories</span>
                </div> */}

                {/* Navigation principale */}
                {/* <nav className='flex items-center gap-6'>
                  <Link to='/' className={`text-white hover:text-green-400 transition-colors font-medium ${pathname === '/' ? 'text-green-400' : ''}`}>
                    Accueil
                  </Link>
                  <Link to='/shops' className={`text-white hover:text-green-400 transition-colors font-medium ${pathname === '/shops' ? 'text-green-400' : ''}`}>
                    Boutique
                  </Link>
                  <Link to='/about' className={`text-white hover:text-green-400 transition-colors font-medium ${pathname === '/about' ? 'text-green-400' : ''}`}>
                    Qui sommes-nous
                  </Link>
                  <Link to='/contact' className={`text-white hover:text-green-400 transition-colors font-medium ${pathname === '/contact' ? 'text-green-400' : ''}`}>
                    Contact
                  </Link>
                </nav>
              </div>
            </div>
          </div> */}

          {/* Dropdown catégories DESKTOP SEULEMENT */}
          <div className={`${categoryShow ? 'h-0' : 'h-auto'} overflow-hidden transition-all duration-500 bg-white shadow-lg hidden md-lg:hidden lg:block`}>
            <div className='w-[85%] lg:w-[90%] mx-auto'>
              <div className='grid grid-cols-4 gap-4 py-4'>
                {categorys.map((c, i) => (
                  <Link 
                    key={i}
                    to={`/products?category=${encodeURIComponent(c.slug)}`} 
                    className='flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors'
                  >
                    <img src={c.image} className='w-8 h-8 rounded-full' alt={c.name}/>
                    <span className='text-sm font-medium text-gray-700'>{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR MOBILE (votre code existant) */}
          {/* <div className='relative md-lg:block hidden'>
            <div
              onClick={() => setShowSidebar(true)}
              className={`absolute duration-200 transition-all 
                ${showSidebar ? 'invisible opacity-0' : 'visible opacity-100'}
                w-full h-[calc(100vh-80px)] bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}>
            </div>

            <div className={`
              w-[300px] z-[9999] transition-all duration-200 fixed 
              ${showSidebar ? '-left-[300px]' : 'left-0 top-0'} 
              overflow-y-auto bg-white h-screen py-6 px-8
            `}>
              <div className='flex justify-start flex-col gap-6'>
                <Link to='/'>
                  <img src="http://localhost:3000/images/logo_diayal.svg" alt="Logo Diayma" className='w-32' />
                </Link>
                
                <div className='flex justify-start items-center gap-10'>
                  <div className='relative group cursor-pointer text-slate-800 text-sm flex justify-center items-center gap-1'>
                    <div className="flex items-center gap-1">
                      <img src="http://localhost:3000/images/sn.png" alt="Sénégal" />
                      <span><IoMdArrowDropdown /></span>
                    </div>
                    <ul className='absolute top-12 invisible opacity-0 group-hover:visible group-hover:opacity-100 
                      group-hover:top-10 transition-all duration-200 bg-black text-white p-2 w-[100px] 
                      flex flex-col gap-3 z-10 rounded-sm'>
                      <li className="hover:bg-gray-700 px-2 py-1 rounded">Français</li>
                      <li className="hover:bg-gray-700 px-2 py-1 rounded">Anglais</li>
                    </ul>
                  </div> 
                  
                  {userInfo ? (
                    <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black' to='/dashboard'>
                      <span><FaUser /></span>
                      <span>{userInfo.name}</span>
                    </Link>
                  ) : (
                    <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black' to='/login'>
                      <span><FaLock /></span>
                      <span>Connexion</span>
                    </Link>
                  )}
                </div>
                
                <ul className='flex flex-col justify-start items-start text-sm font-bold uppercase'>
                  <li>
                    <Link to='/' className={`py-2 block ${pathname === '/' ? 'text-[#059473]' : 'text-slate-600'}`}>Accueil</Link>
                  </li>
                  <li>
                    <Link to='/shops' className={`py-2 block ${pathname === '/shops' ? 'text-[#059473]' : 'text-slate-600'}`}>Boutique</Link>
                  </li>
                  <li>
                    <Link to='/about' className={`py-2 block ${pathname === '/about' ? 'text-[#059473]' : 'text-slate-600'}`}>A propos</Link>
                  </li>
                  <li>
                    <Link to='/contact' className={`py-2 block ${pathname === '/contact' ? 'text-[#059473]' : 'text-slate-600'}`}>Nous contacter</Link>
                  </li>
                </ul>
                
                <div className='flex justify-start items-center gap-4 text-black'>
                  <a href='#'><FaFacebookF /></a>
                  <a href='#'><AiFillTikTok /></a>
                  <a href='#'><FaSquareInstagram /></a>
                  <a href='#'><FaTwitter /></a>   
                </div>

                <a href="https://wa.me/221777077777?text=Bonjour,%20j'ai%20besoin%20d'aide" target="_blank" rel="noopener noreferrer" className='w-full flex justify-start gap-3 items-center hover:bg-green-50 p-2 rounded-md transition-colors'>
                  <div className='w-[35px] h-[35px] rounded-full flex bg-green-500 justify-center items-center'>
                    <span className='text-white'><FaWhatsapp /></span>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h2 className='text-sm font-medium text-slate-700'>WhatsApp</h2>
                    <span className='text-xs text-slate-500'>Support 24/7</span>
                  </div>
                </a>
                
                <ul className='flex flex-col justify-start items-start gap-3 text-[#1c1c1c]'>
                  <li className='flex justify-start items-center gap-2 text-sm'>
                    <span><MdEmail /></span>
                    <span>support@diayal.sn</span>
                  </li>
                </ul>  
              </div>
            </div>
          </div> */}


        </>
    );
};

export default Header;