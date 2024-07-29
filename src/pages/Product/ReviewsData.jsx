import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CSS/Reviews.css'; // Make sure to create a CSS file to style the component

const Reviews = ({ reviews, productId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3; // Set the number of reviews per page

  const [showReviewForm, setShowReviewForm] = useState(false); // State to control the visibility of the review form

  // Form state for review submission
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5); // Default rating to 5 stars

  // Calculate the index range for the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Calculate the overall rating and distribution
  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
    : 0;

  const ratingDistribution = Array(5).fill(0);
  reviews.forEach(review => {
    ratingDistribution[5 - review.rating]++;
  });

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {'★'.repeat(fullStars)}
        {halfStar && '½'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleOpenReviewForm = () => {
    setShowReviewForm(true);
  };

  const handleCloseReviewForm = () => {
    setShowReviewForm(false);
    // Reset form fields if needed
    setReviewText('');
    setRating(5);
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:4000/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId:localStorage.getItem("userId"),
          review_text: reviewText,
          rating: rating
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      
      // Handle successful submission (e.g., show success message, update UI)
      alert('Review submitted successfully!');
      
      // Close the form after submission
      handleCloseReviewForm();
      
      // Optionally, fetch updated reviews after submission if needed
      // You can add logic here to update the reviews state or refresh data from server
    } catch (error) {
      // Handle error (e.g., show error message, handle retry logic)
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again later.');
    }
  };

  return (
    <div className="reviews">
      <div className="header">
        <h1>Customer Reviews</h1>
        <button className="write-review" onClick={handleOpenReviewForm}>
          Write a review
        </button>
      </div>
      <div className="reviews-content">
        <div className="reviews-summary">
          <div className="overall-rating">
            <span className="rating-score">{averageRating}</span>
            <span className="stars">{renderStars(averageRating)}</span>
            <span className="total-reviews">{totalReviews} Reviews</span>
          </div>
          <div className="reviews-distribution">
            {ratingDistribution.map((count, index) => (
              <div key={index} className="rating-bar">
                <span className="star">{5 - index}★</span>
                <div className="bar">
                  <div className="filled-bar" style={{ width: `${(count / totalReviews) * 100}%` }}></div>
                </div>
                <span className="percentage">{((count / totalReviews) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="reviews-list">
          {currentReviews.map((review) => (
            <div key={review._id} className="review">
              <img src={review.avatar} alt={`${review.username}`} className="review-image" />
              <div className="review-content">
                <div className="review-header">
                  <span className="reviewer-name">{review.username}</span>
                  <span className="review-date">{formatDate(review.date)}</span>
                  <span className="stars">{renderStars(review.rating)}</span>
                </div>
                <p className="review-text">{review.review_text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="reviews-pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>◀</button>
        <span className="page-number">{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>▶</button>
      </div>

      {/* Review Form Popup */}
      {showReviewForm && (
        <div className="review-form-popup">
          <div className="review-form">
            <h2>Write Your Review</h2>
            <form onSubmit={handleSubmitReview}>
              <label htmlFor="rating"> Rating:</label>
              <select id="rating" value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
              <label className='r-text-1' htmlFor="review-text">Your Review:</label>
              <textarea
                id="review-text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                rows={5}
                maxLength={500}
              />
              <div className="form-buttons">
                <button type="submit">Submit Review</button>
                <button type="button" onClick={handleCloseReviewForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      review_text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  productId: PropTypes.string.isRequired, // Ensure productId is required for API endpoint
};

export default Reviews;
