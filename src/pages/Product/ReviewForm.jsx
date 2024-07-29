import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CSS/ReviewForm.css'; // Style your form as per your design

const ReviewForm = ({ productId, onSubmit }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5); // Default rating to 5 stars

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate inputs (if needed)

    // Call onSubmit prop to submit review
    onSubmit({ productId, review_text: reviewText, rating });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2>Write Your Review</h2>
      <label htmlFor="review-text">Your Review:</label>
      <textarea
        id="review-text"
        value={reviewText}
        onChange={handleReviewTextChange}
        required
        rows={5}
        maxLength={500}
      />
      <label htmlFor="rating">Rating:</label>
      <select id="rating" value={rating} onChange={handleRatingChange}>
        <option value={5}>5 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={2}>2 Stars</option>
        <option value={1}>1 Star</option>
      </select>
      <button type="submit">Submit Review</button>
    </form>
  );
};

ReviewForm.propTypes = {
  productId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ReviewForm;
