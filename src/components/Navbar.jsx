import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout, onShowCart, onShowOrders, onShowEcoPoints, onShowAuth }) => {

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <span className="ecokart-logo-text">EcoKart <span role="img" aria-label="leaf">🌱</span></span>
        </Link>
      </div>
      <div className="nav-actions">
        <Link to="/" className="nav-btn home-btn">
          Home
        </Link>
        <Link to="/about" className="nav-btn about-btn">
          About Us
        </Link>
        <button className="nav-btn contact-btn" onClick={() => {
          const footer = document.getElementById('footer');
          if (footer) footer.scrollIntoView({ behavior: 'smooth' });
        }}>
          Contact Us
        </button>
        {user ? (
          <div className="user-section">
            <span className="user-name">Welcome, {user.name}!</span>
            <span 
              className="user-points" 
              onClick={onShowEcoPoints} 
              style={{cursor: 'pointer'}}
              title="Click to view EcoPoints details"
            >
              🌱 {user.ecoPoints || 0} EcoPoints
            </span>
            <button className="nav-btn cart-btn" onClick={onShowCart}>
              🛒 Cart
            </button>
            <button className="nav-btn orders-btn" onClick={onShowOrders}>
              📋 Orders
            </button>
            <button className="nav-btn logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="nav-btn login-btn" onClick={onShowAuth}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 