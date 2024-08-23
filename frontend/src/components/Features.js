import React from 'react';
import '../styles/Features.css';

const Features = () => {
  return (
    <section id="features" className="features">
      <h2>Discover and Describe</h2>
      <div className="features-grid">
        <div className="feature-item">
          <h3>Capture and Describe the World</h3>
          <p>Encourage your child to describe their world through photos.</p>
        </div>
        <div className="feature-item">
          <h3>Interactive Games for Learning</h3>
          <p>Engage your child with educational games.</p>
        </div>
        <div className="feature-item">
          <h3>Safe and Family-Friendly</h3>
          <p>A secure platform for kids to explore safely.</p>
        </div>
        <div className="feature-item">
          <h3>Personalized Experience</h3>
          <p>Tailor the app to your child’s preferences.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
