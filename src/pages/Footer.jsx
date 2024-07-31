import React from 'react';
import './CSS/Footer.css'; // Make sure to create this CSS file for styling
import bird from '../assets/bird.png'
import facebook from '../assets/facebook.png'
import linkdeln from '../assets/linkdeln.png'
import youtube from '../assets/youtube.png'
import pdf from '../assets/website_terms_and_conditions.pdf'
const openPdf = (pdfUrl) => {
  window.open(pdfUrl, '_blank');
};
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/AboutPage">About</a></li>
            <li><a href="/ContactPage">Contact</a></li>
            <li><a href="/blogs">Blogs</a></li>
          </ul>
          <div className="footer-language">
            <select>
              <option value="english">English</option>
              {/* Add other language options here */}
            </select>
          </div>
        </div>
        <div className="footer-section help">
          <h2>Help</h2>
          <ul>
            <li><a href="/PurchaseHistory">Shipping & Returns</a></li>
            <li><a href="/PurchaseHistory">Track Order</a></li>
            <li><a href="/AboutPage">FAQs</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact</h2>
          <p>Phone:</p>
          <p>+91 9555668667</p>
          <p>Email:</p>
          <p>info@wayumart.com</p>
        </div>
        <div className="footer-section promotions">
          <h2>Receive new promotions</h2>
          <p>Duis ea tempor commodo amet reprehende</p>
          <div className="email-subscription">
            <input type="email" placeholder="Input your email" />
            <button>Subscribe</button>
          </div>
          <div className="social-media">
            <a href="https://twitter.com"><img src={bird} alt="Twitter" /></a>
            <a href="https://facebook.com"><img src={facebook} alt="Facebook" /></a>
            <a href="https://linkedin.com"><img src={linkdeln} alt="LinkedIn" /></a>
            <a href="https://youtube.com"><img src={youtube} alt="YouTube" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 WayuMart. • <a onClick={() => openPdf(pdf)}href='#'>Privacy</a> • <a onClick={() => openPdf(pdf)}href='#'>Terms</a> • <a onClick={() => openPdf(pdf)}href='#'>Sitemap</a></p>
      </div>
    </footer>
  );
};

export default Footer;
