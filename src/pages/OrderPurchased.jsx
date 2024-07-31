import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import orderpurchased from '../assets/orderpurchased.png';
import './CSS/OrderPurchased.css';
import calender from '../assets/calender.png';
import dollar from '../assets/dollar1.png';
import card from '../assets/card.png';
import profile from '../assets/profile1.png';
import orderno from '../assets/orderno.png';
import visa from '../assets/visa.png';
import line from '../assets/line.png';
import Footer from './Footer';
import Navbar from './Navbar';

const OrderPurchased = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const orderId = localStorage.getItem('order_id');
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId || !userId) {
        setError('Order ID or User ID is missing');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`https://wayuapi.wayumart.com/orders/${userId}/${orderId}`, {
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
  }, [orderId, userId]);

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
      <div className='payment-accepted'>
        <div className='payment-accepted-top'>
          <img src={orderpurchased} alt="Order Purchased" />
          <h1>Thank you for your purchase! 🎉</h1>
          <p>You will receive a confirmation letter through your email</p>
        </div>
        <div className="new-container">
          <button className="new-button" onClick={() => navigate('/')}>
            <div className="new-text-wrapper">Continue shopping</div>
          </button>
          <img className="new-line" alt="Line" src={line} />
          <div className="new-text-wrapper-7">{order_id}</div>
          <div className="new-text-wrapper-8">Order Number</div>
          <div className="new-text-wrapper-9">${bill}</div>
          <img className="new-img" alt="Line" src={line} />
          <div className="new-text-wrapper-10">Payment Method</div>
          <div className="new-text-wrapper-11">Customer</div>
          <div className="new-text-wrapper-12">{`${firstName} ${lastName}`}</div>
          <img className="new-image" alt="Visa" src={visa} />
          <div className="new-text-wrapper-13">{new Date(createdAt).toLocaleDateString()}</div>
          <img className="new-receipt-list" alt="Receipt list" src={orderno} />
          <div className="new-text-wrapper-14">Total</div>
          <img className="new-currency-dollar" alt="Currency dollar" src={dollar} />
          <img className="new-profile" alt="Profile" src={profile} />
          <img className="new-money" alt="Money" src={card} />
          <div className="new-text-wrapper-15">Date</div>
          <img className="new-calendar-date" alt="Calendar date" src={calender} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPurchased;
