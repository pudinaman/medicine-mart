import React from 'react';
import './CSS/EventPromotion.css'; // Ensure you have an EventPromotion.css file in your project
import neem from '../assets/neem.png';
import giloi from '../assets/giloi.png'
const EventPromotion = () => {
  return (
    <div className="event-promotion">
      <h2>Event promotion</h2>
      <div className="promotion-content">
        <div className="promotion-block">
          <img src={neem} alt="Relaxing & Pampering" />
          <div className="promotion-text">
            <h3>Relaxing & Pampering</h3>
            <p>Paritur ad nis ex tempor ea</p>
            <button className="explore-button">Explore</button>
          </div>
        </div>
        <div className="promotion-block">
          <img src={giloi} alt="Smooth & Bright Skin" />
          <div className="promotion-text">
            <h3>Smooth & Bright Skin</h3>
            <p>Paritur ad nis ex tempor ea</p>
            <button className="explore-button">Explore</button>
          </div>
        </div>
      </div>
      <a href="#" className="see-all-link">See all</a>
    </div>
  );
};

export default EventPromotion;
