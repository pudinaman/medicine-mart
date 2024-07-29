import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './pages/LoginSignup';
import HomePage from './pages/HomePage';
import ProductPage from './pages/Product/ProductPage';
import SearchedProduct from './pages/product list/SearchedProduct';
import CartPage from './pages/Cart/CartPage';
import PaymentDecline from './pages/PaymentDecline';
import OrderPurchased from './pages/OrderPurchased';
import { CheckoutOrder } from './pages/CheckoutOrder';
import PurchaseHistory from './pages/PurchaseHistory';
import AboutUs from './pages/AboutUs/aboutPage';
import ContactPage from './pages/ContactPage';
import Story from './pages/Story';
import Cart from './pages/Cart';
import Test from './pages/test';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/" element={<HomePage />} /> {/* Default route to HomePage */}
          <Route path='/product/:productId' element={<ProductPage/>}/>
          <Route path='/SearchedProduct' element={<SearchedProduct/>}/>
          <Route path='/CartPage' element={<CartPage/>}/>
          <Route path='/PaymentDecline'element={<PaymentDecline/>}/>
          <Route path='/OrderPurchased'element={<OrderPurchased/>}/>
          <Route path="/CheckoutOrder/:orderId" element={<CheckoutOrder />} />
          <Route path='/PurchaseHistory' element={<PurchaseHistory/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/aboutPage' element={<AboutUs/>}/>
          <Route path='/ContactPage' element={<ContactPage/>}/>
          <Route path='/Cart' element={<Cart/>}/>
          <Route path='/test' element={<Test/>}/>
        </Routes>    
      </BrowserRouter>
    </div>
  );
}

export default App;
