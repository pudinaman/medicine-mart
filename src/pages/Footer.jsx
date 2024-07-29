import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './CSS/Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li><a href="/">Home</a></li>
            
            <li><a href="/AboutPage">about</a></li>
            <li><a href="/ContactPage">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Help</h4>
          <ul>
            <li><a href="/PurchaseHistory">Shipping & Returns</a></li>
            <li><a href="/PurchaseHistory">Track Order</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>Phone: +91 9555668667</li>
            <li>Email: info@wayumart.com</li>
          </ul>
        </div>
        <div className="footer-section newsletter">
          <h4>Newsletter</h4>
          <input type="email" placeholder="Your email address" />
          <button>Subscribe</button>
        </div>
      </div>
      <div className="footer-socials">
        <FaFacebook />
        <FaTwitter />
        <FaYoutube />
        <FaInstagram />
        <FaLinkedin />
      </div>
      <div className="footer-bottom">
        <p>© 2024 Wayu Mart. All rights reserved.</p>
        <ul>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms">Terms</a></li>
          <li><a href="/sitemap">Sitemap</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
