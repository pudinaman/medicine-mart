import React, { useState, useEffect } from 'react';
import './CSS/Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('bestSellers'); // Default active tab
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = '';
        if (activeTab === 'bestSellers') {
          url = 'https://wayuapi.wayumart.com/products/popularProducts';
        } else if (activeTab === 'newProducts') {
          url = 'https://wayuapi.wayumart.com/products';
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data); // Update state with fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [activeTab]); // Fetch products whenever activeTab changes

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const handleAddToCart = async (product) => {
    try {
      const accessToken = localStorage.getItem("auth-token");
      const userId = localStorage.getItem("userId");

      if (!accessToken || !userId) {
        navigate('/Login'); // Redirect to login if not logged in
        return;
      }

      // Check if the product has sizes
      const selectedSizeObject = product.size && product.size.length > 0 ? product.size[0] : null;

      if (!selectedSizeObject) {
        console.error('Product does not have a size available');
        return;
      }

      const response = await fetch(`https://wayuapi.wayumart.com/cart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': accessToken
        },
        body: JSON.stringify({
          userId: userId,
          products: [
            {
              productId: product._id,
              quantity: 1,
              selected_size: selectedSizeObject.size // Use size name
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Product added to cart:', data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <section className="one-products">
      <h2>Our products</h2>
      <div className="one-product-menu">
        <button
          className={`one-tab ${activeTab === 'bestSellers' ? 'one-active' : ''}`}
          onClick={() => handleTabChange('bestSellers')}
        >
          Best-sellers
        </button>
        <button
          className={`one-tab ${activeTab === 'newProducts' ? 'one-active' : ''}`}
          onClick={() => handleTabChange('newProducts')}
        >
          New products
        </button>
      </div>
      <div className="one-product-list">
        {products.map((product, index) => (
          <div key={index} className="one-product-item">
            {activeTab === 'bestSellers' && (
              <div className="one-best-seller-badge">Best-seller</div>
            )}
            <img
              src={product.product_image}
              alt={product.title}
              className="one-product-image"
              onClick={() => handleProductClick(product)}
            />
            <h3>{product.product_name}</h3>
            <p className="one-product-description">{product.short_description}</p>
            <p className="one-price">
              <span className='one-newPrice'>${product.sale_price}</span>
              {product.sale_discount && <span className="one-old-price">${product.price}</span>}
              <button className="one-add-to-cart" onClick={() => handleAddToCart(product)}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Product;
