import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get order data from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const orderDataParam = urlParams.get('data');
  const orderData = orderDataParam ? JSON.parse(decodeURIComponent(orderDataParam)) : {};

  const handleGoHome = () => {
    navigate('/');
  };

  const handleViewOrders = () => {
    navigate('/orders');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <div className="success-icon">
          ✅
        </div>
        
        <h1 className="success-title">Order Placed Successfully!</h1>
        
        <div className="ecopoints-earned">
          <h2>You earned 🌱 {orderData.totalEcoPoints || 0} EcoPoints</h2>
        </div>

        <div className="order-details">
          <h3>Order Details</h3>
          <div className="detail-row">
            <span>Order Total:</span>
            <span>₹{(orderData.finalTotal || 0).toFixed(2)}</span>
          </div>
          <div className="detail-row">
            <span>Order ID:</span>
            <span>{orderData.orderId || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <span>Order Date:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-primary" onClick={handleGoHome}>
            🏠 Go to Home
          </button>
          <button className="btn-secondary" onClick={handleContinueShopping}>
            🛍️ Continue Shopping
          </button>
          <button className="btn-outline" onClick={handleViewOrders}>
            📋 View Orders
          </button>
        </div>

        <div className="thank-you-message">
          <p>Thank you for choosing EcoKart! 🌱</p>
          <p>Your eco-friendly choices make a difference.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess; 