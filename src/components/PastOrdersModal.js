import React, { useState, useEffect, useRef, useCallback } from 'react';
import config from '../config';
import './PastOrdersModal.css';

const PastOrdersModal = ({ isOpen, onClose, user, token, onRefresh }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const isMountedRef = useRef(true);

  const fetchOrders = useCallback(async () => {
    if (!isMountedRef.current) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const ordersData = await response.json();
        // Only update state if component is still mounted
        if (isMountedRef.current) {
          setOrders(ordersData);
        }
      } else {
        console.error('Failed to fetch orders:', response.status);
        if (isMountedRef.current) {
          setOrders([]);
        }
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (isMountedRef.current) {
        setOrders([]);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [token]);

  useEffect(() => {
    isMountedRef.current = true;
    
    if (isOpen && user) {
      fetchOrders();
    }
    
    return () => {
      isMountedRef.current = false;
    };
  }, [isOpen, user, fetchOrders]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#4caf50';
      case 'shipped': return '#2196f3';
      case 'confirmed': return '#ff9800';
      case 'pending': return '#9e9e9e';
      case 'cancelled': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(selectedOrder?._id === order._id ? null : order);
  };

  if (!isOpen || !user || !token) return null;

  return (
    <div className="modal-overlay">
      <div className="past-orders-modal">
        <div className="modal-header">
          <h2>Past Orders</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="orders-content">
          {loading ? (
            <div className="loading">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="no-orders">
              <p>No orders yet. Start shopping to see your order history!</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-header" onClick={() => handleOrderClick(order)}>
                    <div className="order-info">
                      <div className="order-id">Order #{order._id.slice(-8)}</div>
                      <div className="order-date">{formatDate(order.orderDate)}</div>
                    </div>
                    <div className="order-status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className="expand-icon">
                        {selectedOrder?._id === order._id ? '−' : '+'}
                      </span>
                    </div>
                  </div>

                  {selectedOrder?._id === order._id && (
                    <div className="order-details">
                      <div className="order-items">
                        <h4>Items:</h4>
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <span className="item-name">{item.productName}</span>
                            <span className="item-quantity">x{item.quantity}</span>
                            {item.isEcoAlternative && (
                              <span className="eco-badge">🌱 Eco</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastOrdersModal; 