import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/PaymentMethod.css';

const PaymentMethod = () => {
  const [voucher, setVoucher] = useState('');
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [cart, setCart] = useState(null);
  const userId = localStorage.getItem("userId");
  const [billingId, setBillingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:4000/cart/${userId}`, {
          headers: {
            'x-access-token': localStorage.getItem('auth-token'),
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cart data');
        }
        const cartData = await response.json();
        setCart(cartData);
        setSubtotal(parseFloat(cartData.bill).toFixed(2));

        const billingResponse = await fetch(`http://localhost:4000/billing/${userId}`, {
          headers: {
            'x-access-token': localStorage.getItem('auth-token'),
          },
        });
        if (!billingResponse.ok) {
          throw new Error('Failed to fetch billing information');
        }
        const billingData = await billingResponse.json();
        if (billingData && billingData.length > 0) {
          setBillingId(billingData[0]._id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCart();
  }, [userId]);

  const handleApplyVoucher = () => {
    if (voucher === '$15 OFF') {
      setDiscount(15);
    } else {
      setDiscount(0);
    }
  };

  const calculateDeliveryFee = () => {
    if (subtotal === 0 || subtotal >= 100) {
      return 0;
    }
    return 22;
  };

  const total = parseFloat(subtotal - discount + calculateDeliveryFee()).toFixed(2);

  const handlePayment = async () => {
    try {
      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded');
      }

      const orderResponse = await fetch('http://localhost:4000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('auth-token'),
        },
        body: JSON.stringify({
          product_id: null,
          cart_id: cart._id,
          user_id: userId,
          orderTotal: total,
          selectedBillingId: billingId,
          couponUsed: voucher,
          couponDiscount: discount,
          razorpayPaymentId: 'pay_1234567890',
          status: 'packed',
        }),
      });
      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }
      const { order, razorpayOrder } = await orderResponse.json();

      const options = {
        key: 'rzp_test_xregHb2DEPb7F5',
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Wayug Infotech Solution',
        description: 'Test Transaction',
        order_id: razorpayOrder.id,
        handler: async (response) => {
          console.log('Payment successful:', response);
          // Store orderId and order _id after successful payment
          localStorage.setItem('orderId', order.order_id);
          localStorage.setItem('order_id', order._id);
          navigate('/OrderPurchased');
        },
        prefill: {
          name: 'Your Name',
          email: 'youremail@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        // Store orderId after failed payment
        localStorage.setItem('orderId', order.order_id);
        localStorage.setItem('order_id', order._id);
        navigate('/PaymentDecline');
      });

      rzp1.open();
    } catch (error) {
      console.error('Error creating order or initiating payment:', error);
      navigate('/PaymentDecline');
    }
  };

  return (
    <div className="payment-method">
      <div className="section">
        <h2 className="title">Payment method</h2>
        <a href="#" className="change-method">Change payment methods</a>
        <div className="card-info">
          <div className="card-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" />
          </div>
          <div className="card-details">
            <span>Mastercard</span>
            <span>**** 5987</span>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Voucher</h3>
        <div className="voucher">
          <input 
            type="text" 
            value={voucher} 
            onChange={(e) => setVoucher(e.target.value)} 
            placeholder="$15 OFF" 
          />
          <button onClick={handleApplyVoucher}>Apply</button>
        </div>
      </div>

      <div className="section summary">
        <h3 className="summary-title">Summary</h3>
        <div className="summary-item">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="summary-item">
          <span>Discount</span>
          <span>-${discount}</span>
        </div>
        <div className="summary-item">
          <span>Delivery Fee</span>
          <span>${calculateDeliveryFee()}</span>
        </div>
        <div className="total">
          <span>Total</span>
          <span>${total}</span>
        </div>
        <button className="proceed-btn" onClick={handlePayment}>Proceed to payment</button>
      </div>
    </div>
  );
};

export default PaymentMethod;
