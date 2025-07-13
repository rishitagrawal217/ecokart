import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1>About EcoKart 🌱</h1>
          <p>Your Sustainable Shopping Destination</p>
        </div>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At EcoKart, we believe that every purchase can make a positive impact on our planet. 
            Our mission is to make sustainable shopping accessible, rewarding, and easy for everyone.
          </p>
        </section>

        <section className="about-section">
          <h2>How EcoKart Works</h2>
          <div className="how-it-works-grid">
            <div className="step-card">
              <div className="step-icon">🛍️</div>
              <h3>1. Browse & Compare</h3>
              <p>
                Explore our wide range of product categories. For every product, we show you 
                both the regular option and its eco-friendly alternative, making it easy to 
                see the difference.
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-icon">🌱</div>
              <h3>2. Choose Eco-Friendly</h3>
              <p>
                When you select eco-friendly alternatives, you're not just making a better 
                choice for the environment - you're also earning EcoPoints for your sustainable decisions.
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-icon">🎁</div>
              <h3>3. Earn EcoPoints</h3>
              <p>
                Every eco-friendly purchase earns you EcoPoints. These points can be redeemed 
                for discounts, free shipping, and exclusive rewards on future orders.
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-icon">🌍</div>
              <h3>4. Track Your Impact</h3>
              <p>
                See your environmental impact in real-time. Track how many eco-friendly choices 
                you've made and the carbon footprint you've helped reduce.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Why Choose Eco-Friendly Products?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">♻️</div>
              <h3>Reduced Waste</h3>
              <p>Eco-friendly products often use recycled materials and biodegradable packaging.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3>Lower Carbon Footprint</h3>
              <p>Sustainable manufacturing processes use less energy and produce fewer emissions.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">💧</div>
              <h3>Water Conservation</h3>
              <p>Many eco-friendly products use water-saving production methods.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🌿</div>
              <h3>Natural Ingredients</h3>
              <p>Eco-friendly products often use natural, non-toxic ingredients that are safer for you and the environment.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Impact</h2>
          <div className="impact-stats">
            <div className="impact-stat">
              <div className="stat-number">10kg</div>
              <div className="stat-label">CO2 saved per eco-friendly purchase</div>
            </div>
            <div className="impact-stat">
              <div className="stat-number">♻️</div>
              <div className="stat-label">Recycled materials used</div>
            </div>
            <div className="impact-stat">
              <div className="stat-number">🌱</div>
              <div className="stat-label">EcoPoints earned by users</div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Join the Movement</h2>
          <p>
            Every small choice matters. By choosing eco-friendly alternatives, you're contributing 
            to a more sustainable future. Start your journey with EcoKart today and see the 
            difference you can make.
          </p>
          <div className="cta-buttons">
            <Link to="/products" className="cta-button primary">
              Start Shopping
            </Link>
            <Link to="/" className="cta-button secondary">
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 