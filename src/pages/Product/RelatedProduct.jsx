import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CSS/RelatedProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const RelatedProducts = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState(null); // State for cart operation feedback
  const navigate = useNavigate(); // Access navigate function from React Router

  // UseEffect hook to fetch related products based on category
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // Replace with actual API call to fetch related products based on category
        const response = await fetch(`http://localhost:4000/products/similar/${category}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data); // Assuming data is the array of products
        } else {
          console.error('Failed to fetch related products');
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchRelatedProducts();
  }, [category]); // Fetch when category changes

  // Function to add product to cart
  const addToCart = async (productId) => {
    try {
      const accessToken = localStorage.getItem("auth-token");
      const userId = localStorage.getItem("userId");

      // Check if user is authenticated
      if (!accessToken || !userId) {
        navigate('/Login'); // Redirect to login page if not logged in
        return;
      }

      // Example of a POST request to add product to cart
      const response = await fetch(`http://localhost:4000/cart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': accessToken
        },
        body: JSON.stringify({
          userId: userId,
          products: [{
            productId: productId,
            quantity: 1, // Example: Add one item by default
          }]
        })
      });

      if (response.ok) {
        console.log('Product added to cart successfully!');
      } else {
        setCartMessage('Failed to add product to cart');
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      setCartMessage('Error adding product to cart');
      console.error('Error adding product to cart:', error);
    }
  };

  // Display loading indicator while fetching data
  if (loading) {
    return <p>Loading related products...</p>;
  }

  return (
    <div className="rp-related-products">
      <h2>Related products</h2>
      <div className="rp-products-grid">
        {products.map((product) => (
          <div key={product.id} className="rp-product-item">
            {/* Add logic for best seller label if needed */}
            <img src={product.product_image} alt={product.name} />
            <h3>{product.product_name}</h3>
            <p>{product.short_description}</p>
            <p className="rp-price">
              <span className="rp-sale-price">${product.sale_price}</span>
              {' '}
              <span className="rp-original-price">${product.actual_price}</span>
            </p>
            <button className="rp-new-add-to-cart" onClick={() => addToCart(product._id)}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </div>
        ))}
      </div>
      {cartMessage && <p>{cartMessage}</p>}
    </div>
  );
};

export default RelatedProducts;
