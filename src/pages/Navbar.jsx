import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './CSS/Navbar.css';
import logo from '../assets/wayubg.png'

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to false
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Access navigate for navigation

  const auth = getAuth(); // Initialize Firebase auth

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign out
      setIsLoggedIn(false);
      closeDropdown();
      localStorage.removeItem('auth-token');
      localStorage.removeItem('userId');
      navigate('/'); // Redirect to homepage using navigate
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSearchIconClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // Redirect to searched product page with searchQuery as a parameter
    navigate(`/SearchedProduct?query=${searchQuery}`);
  };

  const handleCartIconClick = () => {
    navigate('/Cart'); // Navigate to CartPage
  };

  const handleStoreClick = (e) => {
    e.preventDefault();
    navigate(`/SearchedProduct?query=${searchQuery}`);
  };

  return (
    <nav className="navbar">
      <div className="logo"><img src={logo} alt="" /></div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/store" onClick={handleStoreClick}>Store</Link>
        <Link to="/AboutPage">About</Link>
        <Link to="/ContactPage">Contact</Link>
      </div>
      <div className="nav-icons">
        <div className={`search-container ${searchOpen ? 'active' : ''}`}>
          <form className="search-box" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search..."
            />
          </form>
          <FaSearch className="icon" onClick={handleSearchIconClick} />
        </div>
        <FaShoppingCart className="icon" onClick={handleCartIconClick} />
        <div className="user-icon" onClick={toggleDropdown}>
          <FaUser className="icon" />
          {dropdownOpen && (
            <div className="dropdown-content">
              {isLoggedIn ? (
                <>
                  <Link to="/PurchaseHistory" onClick={closeDropdown}>Purchase History</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={closeDropdown}>Signin/Signup</Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
