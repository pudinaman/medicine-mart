import React, { useState, useEffect } from 'react';
import './CSS/PaymentDecline.css';
import paymentdecline from '../assets/PaymentDecline.png';
import calender from '../assets/calender.png';
import dollar from '../assets/dollar1.png';
import card from '../assets/card.png';
import profile from '../assets/profile1.png';
import orderno from '../assets/orderno.png';
import visa from '../assets/visa.png';
import cross from '../assets/cross.png';
import medicine1 from '../assets/medicine1.png';
import medicine2 from '../assets/medicine2.png';
import tryagain from '../assets/tryagain.png';
import question from '../assets/question.png';
import line from '../assets/line.png';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const PaymentDecline = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderId = localStorage.getItem('order_id');
      const userId = localStorage.getItem('userId');
      if (!orderId || !userId) {
        setError('Order ID or User ID is missing');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:4000/orders/${userId}/${orderId}`, {
          headers: {
            'x-access-token': localStorage.getItem('auth-token'),
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Error fetching order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, []);

  const handleTryAgain = () => {
    navigate('/CartPage'); // Navigate to CartPage route
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!orderDetails) {
    return <div>No order details found.</div>;
  }

  const { billing_address, order_id, products, bill, createdAt } = orderDetails;
  const { firstName, lastName } = billing_address;

  return (
    <div>
      <Navbar />
      <div className='payment-decline'>
        <div className='payment-decline-top'>
          <img src={paymentdecline} alt="" />
          <h1>Payment declined</h1>
          <p>Something went wrong with your payment method. Please try again.</p>
        </div>
        <div className="container">
          <img className="line" alt="Line" src={line} />
          <div className="text-wrapper-6">{order_id}</div>
          <div className="text-wrapper-7">Order Number</div>
          <div className="text-wrapper-8">${bill.toFixed(2)}</div>
          <img className="img" alt="Line" src={line} />
          <div className="text-wrapper-9">Payment Method</div>
          <div className="text-wrapper-10">Customer</div>
          <div className="text-wrapper-11">{`${firstName} ${lastName}`}</div>
          <img className="image" alt="Image" src={visa} />
          <div className="text-wrapper-12">{new Date(createdAt).toLocaleDateString()}</div>
          <img className="receipt-list" alt="Receipt list" src={orderno} />
          <div className="text-wrapper-13">Total</div>
          <img className="currency-dollar" alt="Currency dollar" src={dollar} />
          <img className="profile" alt="Profile" src={profile} />
          <img className="credit-card" alt="Credit card" src={card} />
          <div className="text-wrapper-14">Date</div>
          <img className="calendar" alt="Calendar" src={calender} />
          <div className="div-wrapper">
            <div className="frame-2">
              <div className="text-wrapper-15">Failed</div>
              <img className="e-remove" alt="E remove" src={cross} />
            </div>
          </div>
          <button className="button" onClick={handleTryAgain}>
            <div className="text-wrapper-16">Need help</div>
            <img className="img-2" alt="Question mark" src={question} />
          </button>
          <button className="button-2" onClick={handleTryAgain}>
            <div className="text-wrapper-17">Try again</div>
            <img className="img-2" alt="Arrow u down left" src={tryagain} />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentDecline;
