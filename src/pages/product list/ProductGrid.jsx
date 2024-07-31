import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/ProductGrid.css';

const ProductGrid = ({ products }) => {
  const [sortBy, setSortBy] = useState('Last posted');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('auth-token');
  const userId = localStorage.getItem('userId');

  // Function to handle sort option change
  const handleSortChange = (option) => {
    setSortBy(option);
    setDropdownOpen(false);
    switch (option) {
      case 'Last posted':
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'Price: Low to High':
        products.sort((a, b) => a.sale_price - b.sale_price);
        break;
      case 'Price: High to Low':
        products.sort((a, b) => b.sale_price - a.sale_price);
        break;
      case 'Best Rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
  };

  // Function to handle clicking on a product item
  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  // Function to handle adding a product to the cart
  const handleAddToCart = async (product) => {
    const selectedSizeObject = product.size && product.size.length > 0 ? product.size[0] : null;

    if (!selectedSizeObject) {
      console.error('Product does not have a size available');
      return;
    }

    const cartItem = {
      userId: userId,
      products: [
        {
          productId: product._id,
          quantity: 1,
          selected_size: selectedSizeObject.size, // Use size name
        },
      ],
    };

    try {
      const response = await fetch('http://localhost:4000/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      const result = await response.json();
      console.log('Product added to cart:', result);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="product-grid">
      <h2>Product Results</h2>
      <div className="product-count">{products.length} products</div>
      <div className="product-sort">
        Sort by
        <div className="sort-by-dropdown" onClick={() => setDropdownOpen(!isDropdownOpen)}>
          {sortBy} <span className="down-arrow">&#9660;</span>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleSortChange('Last posted')}>Last posted</li>
              <li onClick={() => handleSortChange('Price: Low to High')}>Price: Low to High</li>
              <li onClick={() => handleSortChange('Price: High to Low')}>Price: High to Low</li>
              <li onClick={() => handleSortChange('Best Rating')}>Best Rating</li>
            </ul>
          )}
        </div>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product._id}
            className="product-item"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.product_image}
              alt={product.product_name}
              className="product-image"
            />
            <h3 className="product-name">{product.product_name}</h3>
            <p className="product-description">{product.short_description}</p>
            <div className="product-price">{`$${product.sale_price}`}</div>
            <button
              className="add-to-cart-button"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
