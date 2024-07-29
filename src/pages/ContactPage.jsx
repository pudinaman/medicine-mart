import React, { useState } from 'react';
import './CSS/ContactPage.css';
import building from '../assets/building.jpeg';
import Navbar from './Navbar';
import Footer from './Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/contact/sendmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Message sent successfully!');
        alert("Message sent successfully!")
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Function to handle alert dismissal
  const handleAlertDismiss = () => {
    setSubmitSuccess(false);
  };

  return (
    <div>
      <Navbar />
      <div className="contact-page">
        <img src={building} alt="Building" className="background-image" />
        <div className="content-container">
          <div className="title-container">
            <h2>Contact Us</h2>
            <p>For inquiries or assistance with your Ayurvedic medicinal needs, Wayu Mart is here to help. Contact us today for expert guidance and support. Our dedicated team is committed to providing you with top-quality products and exceptional service. Reach out to us for a healthier tomorrow.</p>
          </div>
          <div className="info-form-container">
            <div className="info-container">
              <div className="info">
                <h3>Address</h3>
                <p>J-108 Gali no-5 Ground Floor,
                Near Bangoli Laxmi Nagar
                Delhi-110092 India</p>
              </div>
              <div className="info">
                <h3>Phone</h3>
                <p>+91 9555668667</p>
              </div>
              <div className="info">
                <h3>Email</h3>
                <p>info@wayumart.com</p>
              </div>
            </div>
            <div className="form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {submitSuccess && (
        <div className="alert alert-success" role="alert">
          Message sent successfully!
          <button type="button" className="close" onClick={handleAlertDismiss}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ContactPage;
