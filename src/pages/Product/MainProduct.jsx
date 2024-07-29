import React, { useState, useEffect } from 'react';
import './CSS/mainProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import greencheck from '../../assets/greencheck.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const MainProduct = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [oldPrice, setOldPrice] = useState(product.sale_price);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (selectedSize) {
      const selectedSizeObject = product.size.find(size => size._id === selectedSize);
      if (selectedSizeObject) {
        const { price } = selectedSizeObject;
        const discountedPrice = calculateDiscountedPrice(price);
        setTotalPrice(discountedPrice * quantity);
        setOldPrice(price);
      }
    } else {
      setTotalPrice(product.price * quantity);
      setOldPrice(product.sale_price);
    }
  }, [selectedSize, quantity, product.size, product.price, product.sale_discount, product.sale_price]);

  const calculateDiscountedPrice = (price) => {
    const discountMultiplier = 1 - product.sale_discount / 100;
    return price * discountMultiplier;
  };

  const reviewCount = product.reviews ? product.reviews.length : 0;
  const fullStars = Math.floor(product.ratings);
  const hasHalfStar = product.ratings % 1 !== 0;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    return stars;
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value);
  };

  const handleSizeChange = (event) => {
    const value = event.target.value;
    setSelectedSize(value);
  };

  const addToCart = async (checkout = false) => {
    try {
      const accessToken = localStorage.getItem("auth-token");
      const userId = localStorage.getItem("userId");

      if (!accessToken || !userId) {
        navigate('/Login');
        return;
      }

      const selectedSizeObject = product.size.find(size => size._id === selectedSize);
      const currentPrice = selectedSizeObject ? calculateDiscountedPrice(selectedSizeObject.price) : product.price;

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
              quantity: quantity,
              selected_size: selectedSizeObject ? selectedSizeObject.size : '',
              price: currentPrice // Include the price from the request body
            }
          ]
        })
      });

      if (response.ok) {
        if (checkout) {
          navigate("/CartPage");
        } else {
          alert("Product added to cart successfully!");
        }
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const renderBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(path => path !== '');
    let breadcrumbPath = '';
    return (
      <nav className="mp-breadcrumb">
        <Link to="/">Home</Link>
        {paths.map((path, index) => {
          breadcrumbPath += `/${path}`;
          const isLast = index === paths.length - 1;
          return (
            <React.Fragment key={path}>
              &nbsp;&gt;&nbsp;
              {isLast ? (
                <span>{product.product_name}</span>
              ) : (
                <Link to={breadcrumbPath}>{path}</Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    );
  };

  return (
    <div className="mp-product-detail">
      {renderBreadcrumbs()}
      <div className="mp-product-container">
        <div className="mp-thumbnails">
          {product.product_image && product.product_image.map((image, index) => (
            <div key={index} className="mp-thumbnail">
              <img src={image} alt={`Product Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="mp-product-main">
          <div className="mp-product-image">
            <img src={product.product_image[0]} alt="Product" />
          </div>
          <div className="mp-product-info">
            {product.bestSeller && <span className="mp-best-seller">Best Seller</span>}
            <h1>{product.product_name}</h1>
            <p>{product.short_description}</p>
            <div className="mp-price">
              <span className="new-current-price">${totalPrice.toFixed(2)}</span>
              {oldPrice && <span className="new-old-price">${oldPrice}</span>}
            </div>
            <p>{product.description_details.description}</p>
            <div className="mp-reviews">
              <span className="mp-review-count">{reviewCount} reviews</span>
              <span className="mp-sold-count">{product.total_orders_of_product} sold</span>
              <span className="mp-stars">
                {renderStars()}
                {product.ratings}
              </span>
            </div>
            <ul className="mp-features">
              {product.features && product.features.map((feature, index) => (
                <li key={index}>
                  <img src={greencheck} alt="" className="greencheck" />
                  {feature}
                </li>
              ))}
              <li>
                <img src={greencheck} alt="" className="greencheck" />
                Free shipping on orders over $49 USD
              </li>
              <li>
                <img src={greencheck} alt="" className="greencheck" />
                Free + easy returns
              </li>
            </ul>
            <div className="mp-options">
              <label htmlFor="size">Choose size</label>
              <div className="mp-select-wrapper">
                <select id="size" onChange={handleSizeChange}>
                  <option value="">Select Size</option>
                  {product.size && product.size.map((size, index) => (
                    <option key={size._id} value={size._id}>{size.size}</option>
                  ))}
                </select>
              </div>
              <div className="mp-quantity">
                <label htmlFor="quantity">Quantity</label>
                <button className="negative" onClick={() => setQuantity(Math.max(quantity - 1, 1))}>-</button>
                <input type="number" value={quantity} onChange={handleQuantityChange} />
                <button className="positive" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <div className="mp-actions">
                <button className="mp-add-to-bag" onClick={() => addToCart(false)}>
                  <FontAwesomeIcon icon={faShoppingBag} /> Add to bag
                </button>
                <button className="mp-checkout" onClick={() => addToCart(true)}>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProduct;
