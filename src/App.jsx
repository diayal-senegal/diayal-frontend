import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './debug'; // Debug temporaire
import Home from './pages/Home';
import Shops from './pages/Shops';
import Card from './pages/Card';
import Shipping from './pages/Shipping';
import Details from './pages/Details';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { useDispatch } from 'react-redux';
import { get_category } from './store/reducers/homeReducer';
import CategoryShop from './pages/CategoryShop';
import SearchProducts from './pages/SearchProducts';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import ProtectUser from './utils/ProtectUser';
import Index from './components/dashboard/Index';
import Orders from './components/dashboard/Orders';
import Wishlist from './components/dashboard/Wishlist';
import ChangePassword from './components/dashboard/ChangePassword';
import OrderDetails from './components/dashboard/OrderDetails';
import ConfirmOrder from './pages/ConfirmOrder';
import Chat from './components/dashboard/Chat';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';

import About from './pages/About';
import Platform from './pages/Platform';
import DeliveryInfo from './pages/DeliveryInfo';
import Terms from './pages/Terms';
import Blog from './pages/Blog';
import Services from './pages/Services';
import Company from './pages/Company';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Legal from './pages/Legal';
import FAQ from './pages/FAQ';
import Vendor from './pages/Vendor';
import Deals from './pages/Deals';
import Bestsellers from './pages/Bestsellers';
import NewArrivals from './pages/NewArrivals';
import CustomerService from './pages/CustomerService';
import AdminDeals from './pages/AdminDeals';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_category());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/card" element={<Card />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/products?" element={<CategoryShop />} />
        <Route path="/products/search?" element={<SearchProducts />} />
        <Route path="product/details/:slug" element={<Details />} />
        <Route path="order/confirm?" element={<ConfirmOrder />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />

        {/* ✅ Nouvelles routes institutionnelles */}
        <Route path="/about" element={<About />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/delivery" element={<DeliveryInfo />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/services" element={<Services />} />
        <Route path="/company" element={<Company />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/vendor" element={<Vendor />} />
        
        {/* ✅ Nouvelles pages e-commerce */}
        <Route path="/deals" element={<Deals />} />
        <Route path="/bestsellers" element={<Bestsellers />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/customer-service" element={<CustomerService />} />
        
        {/* ✅ Admin */}
        <Route path="/admin/deals" element={<AdminDeals />} />



        {/* ✅ Zone protégée */}
        <Route path="dashboard" element={<ProtectUser />}>
          {/* Dashboard est un layout */}
          <Route element={<Dashboard />}>
            {/* Page par défaut quand tu entres sur /dashboard */}
            <Route index element={<Index />} />
            <Route path="my-orders" element={<Orders />} />
            <Route path="my-wishlist" element={<Wishlist />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="order/details/:orderId" element={<OrderDetails />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:sellerId" element={<Chat />} />
            {/* Plus tard tu peux rajouter d’autres sous-pages ici */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
