import React from 'react';
import './CSS/test.css';

const sampleOrderNumber = 12345;
const sampleProducts = [
  { name: "Product 1", quantity: 2, price: 29.99 },
  { name: "Product 2", quantity: 1, price: 49.99 },
];
const sampleRecipient = {
  name: "John Doe",
  phone: "+1 234 567 890",
  address: "123 Main St, Anytown, USA"
};
const samplePaymentMethod = "**** **** **** 1234";
const sampleTracking = [
  { date: "2024-07-15", status: "Shipped", details: "Your package has been shipped." },
  { date: "2024-07-16", status: "In Transit", details: "Your package is on the way." },
  { date: "2024-07-17", status: "Out for Delivery", details: "Your package is out for delivery." },
];

const Test = ({ orderNumber, products = [], recipient = {}, paymentMethod, tracking = [] }) => {
  // Default values for recipient properties
  const recipientName = recipient.name || 'N/A';
  const recipientPhone = recipient.phone || 'N/A';
  const recipientAddress = recipient.address || 'N/A';

  return (
    <div className="t-checkout-order">
      <header className="t-header">
        <img src="logo.png" alt="Logo" className="logo" />
        <nav className="t-nav">
          <a href="#">Home</a>
          <a href="#">Our product</a>
          <a href="#">About us</a>
          <a href="#">Contact</a>
          <a href="#">Promotions</a>
        </nav>
        <div className="t-icons">
          <div className="t-cart-icon"></div>
          <div className="t-user-icon"></div>
        </div>
      </header>

      <div className="t-container">
        <div className="t-order-tracking">
          <h2>Order tracking</h2>
          <p>Order number #{orderNumber} <a href="#" className="t-invoice-link">View invoice</a></p>

          <section className="t-products">
            <h3>Product</h3>
            {products.map((product, index) => (
              <div className="t-product-item" key={index}>
                <div className="t-product-image"></div>
                <div className="t-product-info">
                  <p>{product.name}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
                <div className="t-product-price">${product.price}</div>
              </div>
            ))}
          </section>

          <section className="t-delivery-info">
            <h3>Deliver to</h3>
            <div className="t-recipient-info">
              <div className="t-recipient-avatar"></div>
              <div className="t-recipient-details">
                <p>{recipientName}</p>
                <p><div className="t-icon phone-icon"></div>{recipientPhone}</p>
                <p><div className="t-icon address-icon"></div>{recipientAddress}</p>
              </div>
            </div>
          </section>

          <section className="t-payment-method">
            <h3>Payment method</h3>
            <p><div className="t-icon visa-icon"></div>VISA {paymentMethod}</p>
          </section>
        </div>

        <div className="t-package-tracking">
          <h3>Track your package</h3>
          {tracking.map((stage, index) => (
            <div className="t-tracking-item" key={index}>
              <div className="t-tracking-date">{stage.date}</div>
              <div className="t-tracking-status">{stage.status}</div>
              <div className="t-tracking-details">{stage.details}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Test
      orderNumber={sampleOrderNumber}
      products={sampleProducts}
      recipient={sampleRecipient}
      paymentMethod={samplePaymentMethod}
      tracking={sampleTracking}
    />
  );
};

export default App;
