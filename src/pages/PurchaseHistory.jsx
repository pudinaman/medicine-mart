import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/PurchaseHistory.css';
import Navbar from './Navbar';
import Footer from './Footer';

const PurchaseHistory = () => {
  const [orders, setOrders] = useState([]);
  const [visibleOrders, setVisibleOrders] = useState({});
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('auth-token');
      try {
        const response = await fetch(`http://localhost:4000/userOrders/${userId}`, {
          headers: {
            'x-access-token': token,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        console.log('Fetched orders:', data);
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  const toggleOrderDetails = (orderId) => {
    setVisibleOrders((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId]
    }));
  };

  const handleManageOrder = (orderId) => {
    console.log('Navigating to CheckoutOrder for orderId:', orderId);
    navigate(`/CheckoutOrder/${orderId}`);
  };

  return (
    <div>
      <Navbar/>
    <div className="new-purchase-history">
      <h2>Purchase history</h2>
      <p>Check the status of recent orders, manage returns, and discover similar products.</p>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="new-order">
            <div className="new-order-header">
              <span className="new-order-no">Order #{order.order_id}</span>
              <span className="new-delivery">{order.status} on {new Date(order.createdAt).toLocaleDateString()}</span>
              <div className="new-order-actions">
                <button onClick={() => handleManageOrder(order._id)}>Manage order</button>
                <button>View invoice</button>
                <button onClick={() => toggleOrderDetails(order._id)} className="dropdown-new">
                  <span className={`ph-dropdown-icon ${visibleOrders[order._id] ? 'open' : ''}`}>&#9660;</span>
                </button>
              </div>
            </div>
            {visibleOrders[order._id] && (
              <div className="new-order-products">
                {order.products.map(product => (
                  <div key={product._id} className="new-product">
                    <div className="new-product-image">
                      <img src={product.product_image} alt={product.name} />
                    </div>
                    <div className="new-product-details-wrapper">
                      <div className="new-product-details-left">
                        <div className="new-product-details">
                          <p>{product.name}</p>
                          <p>Quantity: {product.quantity}</p>
                          <p>Price: ${product.price}</p>
                        </div>
                      </div>
                      <div className="new-product-details-right">
                        <button className="new-buy-again">Buy again</button>
                        <button className="new-view-product">View product</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default PurchaseHistory;
