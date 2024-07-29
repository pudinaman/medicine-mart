import React, { useState, useEffect } from 'react';
import './CSS/Cart.css';
import deleteicon from '../assets/delete.png';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Cart = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchOrderDetails = async () => {
    try {
      const accessToken = localStorage.getItem("auth-token");
      const response = await fetch(`http://localhost:4000/cart/${userId}`, {
        headers: {
          'x-access-token': accessToken
        }
      });
      const data = await response.json();
      setOrder(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [userId]);

  const removeFromCart = async (productId, selectedSize) => {
    try {
      const accessToken = localStorage.getItem("auth-token");
      await fetch(`http://localhost:4000/removeFromCart/${userId}?productId=${productId}&selectedSize=${selectedSize}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': accessToken
        }
      });
      fetchOrderDetails(); // Refresh order details after deletion
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order || !order.products) {
    return <p>No products found.</p>;
  }

  const aggregateProducts = () => {
    const aggregatedProducts = {};
    order.products.forEach(product => {
      const { productId, selected_size, price, quantity } = product;
      const key = `${productId}-${selected_size}`;
      if (aggregatedProducts[key]) {
        aggregatedProducts[key].quantity += quantity;
        aggregatedProducts[key].total += price * quantity;
      } else {
        aggregatedProducts[key] = {
          ...product,
          total: price * quantity
        };
      }
    });
    return Object.values(aggregatedProducts);
  };

  const aggregatedProducts = aggregateProducts();

  const handleProceedToCheckout = () => {
    navigate('/CartPage');
  };

  return (
    <div>
      <Navbar />
      <div className="cart-summary">
        <h2>Order summary</h2>
        <div className="cart-summary-table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {aggregatedProducts.map(product => (
                <tr key={product._id}>
                  <td className="cartproduct-info">
                    <img src={product.product_image} alt={product.name} />
                    <span>{product.name}</span>
                  </td>
                  <td>{product.selected_size}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>${product.total.toFixed(2)}</td>
                  <td>
                    <button className="cartdelete-btn" onClick={() => removeFromCart(product.productId, product.selected_size)}>
                      <img src={deleteicon} alt="Delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="carttext-right"><strong>Total:</strong></td>
                <td>${order.bill.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <button className='cart-checkout' onClick={handleProceedToCheckout}>Proceed to checkout</button>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
