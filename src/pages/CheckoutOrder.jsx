import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CSS/CheckoutOrder.css";
import packed from '../assets/packed.png';
import transit from '../assets/transit.png';
import ofd from '../assets/outfrodelivery.png';
import delivered from '../assets/delivered.png';
import location from '../assets/location.png';
import phone from '../assets/phone.png';
import visa from '../assets/visa.png';
import line from '../assets/line.png';
import orline from '../assets/verticalor.png';
import dvl from '../assets/dottedverticalline.png';
import Navbar from "./Navbar";
import Footer from "./Footer";

export const CheckoutOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:4000/orders/${userId}/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>No order found</div>;
  }

  const { products, status, order_id, bill, payment_id, createdAt, billing_address, couponUsed, couponDiscount } = order;

  return (
    <div>
      <Navbar />
      <div className="checkout-order">
        <div className="text-wrapper">Order tracking</div>
        <div className="container">
          <img className="img" alt="Packed" src={packed} />
          <div className="div">{new Date(createdAt).toLocaleDateString()}</div>
          <div className="text-wrapper-2">Packed</div>
          <img className="container-2" alt="In Transit" src={transit} />
          <div className="text-wrapper-3">05 Mar</div>
          <div className="text-wrapper-4">At the transit center</div>
          <p className="exercitation">
            <span className="span">Exercitation voluptate eiusmod qui irure dolore pariatur</span>
          </p>
          <img className="container-3" alt="Out for Delivery" src={ofd} />
          <div className="text-wrapper-9">05 Mar</div>
          <div className="text-wrapper-10">Being delivered</div>
          <p className="nulla-exercitation">
            <span className="span">Nulla exercitation sit excepteur veniam ad irure ut</span>
            <span className="text-wrapper-5"></span>
            <span className="span"> id voluptate</span>
          </p>
          <img className="container-4" alt="Delivered" src={delivered} />
          <div className="text-wrapper-6">06 Mar</div>
          <div className="text-wrapper-7">Deliver to you</div>
          <p className="fugiat-aliqua-et">
            <span className="span">Fugiat aliqua et aute consequat quis ea adipisici</span>
            <span className="text-wrapper-5"></span>
            <span className="span">ng</span>
          </p>
          <img className="line" alt="Line" src={orline} />
          <img className="line-2" alt="Line" src={orline} />
          <div className="text-wrapper-8">Track your package</div>
          <img className="line-3" alt="Line" src={dvl} />
          <p className="p">Consectetur amet in excepteur mollit velit tempor pariatur fugiat culpa sit tempor</p>
        </div>
        <img className="line-4" alt="Line" src={line} />
        <img className="line-5" alt="Line" src={line} />
        <p className="visa">
          <span className="span">V</span>
          <span className="text-wrapper-5">isa ****64</span>
        </p>
        <img className="image-2" alt="Visa" src={visa} />
        <div className="rectangle-wrapper">
          <div className="rectangle-2" />
        </div>
        <p className="austin-foley">
          <span className="span">{billing_address.firstName} {billing_address.lastName}</span>
        </p>
        <p className="element">
          <span className="text-wrapper-12">{billing_address.phone}</span>
        </p>
        <img className="phone" alt="Phone" src={phone} />
        <p className="element-mongolia-phoenix">
          <span className="text-wrapper-12">
            {billing_address.address.street}, {billing_address.address.apartment}, {billing_address.address.city}, {billing_address.address.state}, {billing_address.address.postalCode}, {billing_address.address.country}
          </span>
        </p>
        <img className="pin" alt="Pin" src={location} />
        <div className="text-wrapper-14">Deliver to</div>
        <div className="products-list">
          {products && products.map((product, index) => (
            <div className="product-details" key={index}>
              <div className="image-3">
                <img src={product.product_image} alt={product.name} />
              </div>
              <div className="product-info">
                <p className="product-name">
                  <span className="span">{product.name}</span>
                </p>
                <p className="quantity">
                  <span className="text-wrapper-12">Quantity: </span>
                  <span className="text-wrapper-13">{product.quantity}</span>
                </p>
                <p className="element-2">
                  <span className="span">${(product.sale_price * product.quantity).toFixed(2)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="order-number">
          <span className="text-wrapper-16">Order number</span>
          <span className="text-wrapper-5"> {order_id}</span>
        </p>
        <p className="view-invoice">
          <span className="span">&nbsp;</span>
          <span className="text-wrapper-5">View invoice</span>
        </p>
        <img className="line-6" alt="Line" src={line} />
        <div className="text-wrapper-17">Product</div>
        <div className="text-wrapper-18">Payment method</div>
      </div>
      <Footer />
    </div>
  );
};
