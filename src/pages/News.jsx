import React from 'react';
import './CSS/News.css';
import news1 from '../assets/news1.png';
import news2 from '../assets/news2.png';
import leftArrow from '../assets/left-arrow.png'; // Add your left arrow icon here
import rightArrow from '../assets/right-arrow.png'; // Add your right arrow icon here

// Individual news item component
const NewsItem = ({ image, text, date }) => (
  <div className="news-item">
    <img src={image} alt="News" />
    <p>{text}</p>
    <span>{date}</span>
  </div>
);

// Main news section component
const NewsSection = () => (
  <section className="news-section">
    <div className="news-header">
      <h2>Read what's new</h2>
      <p>Sint consequat in ipsum irure adipisicing dolore culpa incididunt. Veniam elit magna anim ipsum eiusmod eu</p>
      <div className="explore-container">
        <button className="explore-button">Explore more</button>
        <div className="arrow-buttons">
          <button className="arrow-button">
            <img src={leftArrow} alt="Left Arrow" />
          </button>
          <button className="arrow-button">
            <img src={rightArrow} alt="Right Arrow" />
          </button>
        </div>
      </div>
    </div>
    <div className="news-container">
      <NewsItem
        image={news1}
        text="Anim sint Lorem excepteur commodo"
        date="Oct 12, 2022"
      />
      <NewsItem
        image={news2}
        text="Adipisicing elit proident in elit magna deser"
        date="Oct 12, 2022"
      />
    </div>
  </section>
);

export default NewsSection;
