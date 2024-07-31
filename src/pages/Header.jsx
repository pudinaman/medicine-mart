import React from 'react';
import './CSS/Header.css';
import heroImage from '../assets/hero.png'; // Adjust the path as necessary

const Header = () => {
  const heroStyle = {
    backgroundImage: `url(${heroImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  };

  return (
    <header> 
      
      <div className="hero" style={heroStyle}>
        <h1>Gift for your skin</h1>
        <p>Aliquip fugiat ipsum nostrud ex et eu incididunt quis minim dolore excepteur voluptate</p>
        <button className='hero-button1'>Shop Now</button>
      </div>
    </header>
  );
};

export default Header;
