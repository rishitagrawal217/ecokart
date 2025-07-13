import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AllProducts.css';

const AllProducts = ({ user, onAddToCart, onShowAuth }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      setError('Error loading products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product, isEcoAlternative) => {
    if (!user) {
      onShowAuth();
      return;
    }
    onAddToCart(product, isEcoAlternative);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const categories = ['all', ...new Set(products.map(product => product.category))];

  if (loading) {
    return (
      <div className="all-products-container">
        <div className="loading">Loading all products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-products-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="all-products-container">
      <div className="all-products-header">
        <h1>All Products</h1>
        <p>Discover eco-friendly alternatives across all categories</p>
        
        <div className="category-filter">
          <label htmlFor="category-select">Filter by Category:</label>
          <select 
            id="category-select"
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-comparison">
              <div className="product-option">
                <div className="product-image">
                  <img 
                    src={product.bestsellerImage || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop'} 
                    alt={product.bestseller}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop';
                    }}
                  />
                </div>
                <div className="product-name">{product.bestseller}</div>
                <div className="product-label">Non Eco-Friendly</div>
                <div className="price">₹{(product.bestsellerPrice / 100).toFixed(2)}</div>
              </div>
              
              <div className="comparison-arrow">→</div>
              
              <div className="product-option eco-option">
                <div className="product-image">
                  <img 
                    src={product.ecoImage || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop'} 
                    alt={product.ecoAlternative}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop';
                    }}
                  />
                </div>
                <div className="product-name">{product.ecoAlternative}</div>
                <div className="product-label">Eco-Friendly</div>
                <div className="price">₹{(product.ecoPrice / 100).toFixed(2)}</div>
                <div className="ecopoints">+{product.pointValue} EcoPoints</div>
              </div>
            </div>
            
            <div className="product-actions">
              <button 
                className="add-to-cart-btn regular"
                onClick={() => handleAddToCart(product, false)}
              >
                Add Non Eco-Friendly
              </button>
              <button 
                className="add-to-cart-btn eco"
                onClick={() => handleAddToCart(product, true)}
              >
                Add Eco (+{product.pointValue} pts)
              </button>
              <Link 
                to={`/product/${product._id}`}
                className="view-details-btn"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default AllProducts; 