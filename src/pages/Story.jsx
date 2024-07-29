import React from 'react';
import './CSS/Story.css';
import girlface from '../assets/girlface.png';
import play from '../assets/play.png';

const Story = () => {
  return (
    <section className="story">
      <h2>Our story</h2>
      <div className="story-content">
        <img src={girlface} alt="" />
        <a href="https://youtu.be/V9ll-bsBRd8" target="_blank" rel="noopener noreferrer">
          <button>
            Watch video <img src={play} alt="" />
          </button>
        </a>
      </div>
    </section>
  );
};

export default Story;
