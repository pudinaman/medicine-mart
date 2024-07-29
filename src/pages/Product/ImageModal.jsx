import React from 'react';
import './CSS/imageModal.css'; // Create CSS for styling the modal

const ImageModal = ({ image, onClose }) => {
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <img src={image} alt="Modal" className="modal-image" />
      </div>
    </div>
  );
};

export default ImageModal;
