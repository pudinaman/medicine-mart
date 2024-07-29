import React from 'react';
import './CSS/VideoButton.css'; // Ensure you have a corresponding CSS file for styling
import imageUrl from '../../assets/apply.png';
import videoUrl from '../../assets/apply.png';
import play from '../../assets/play.png';
const VideoButton = () => {
  return (
    <div className="video-button-container">
      <h2>How to use</h2>
      <img src={imageUrl} alt="Applying oil to skin" className="background-image" />
      <a href={videoUrl} className="watch-video-button">
        Watch video
        <img src={play} alt="" />
      </a>
    </div>
  );
};

export default VideoButton;
