import React from 'react';
import OrderSummary from './OrderSummary';
import Navbar from '../Navbar';
import PaymentMethod from './PaymentMethod';
import './CSS/CartPage.css';
import DeliveryOptions from './DeliveryOption';
import RecipientInformation from './RecipientInformation';
import Footer from '../Footer';
const userId =localStorage.getItem("userId");

const CartPage = () => {
  return (
    <div className="cp-cart-container">
      <Navbar />
      <h1>Checkout</h1>
      <div className="cp-cart-content">
        <div className="cp-left-column">
          <OrderSummary userId={userId}/>
          <RecipientInformation />
        </div>
        <PaymentMethod />
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
