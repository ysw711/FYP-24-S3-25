import React, { useState, useEffect } from 'react';
import './Features.css';

const Features = () => {
  const slides = [
    { url: "https://images.unsplash.com/photo-1608106055806-e892769d2e5a?q=80&w=2989&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { url: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { url: "https://images.unsplash.com/photo-1458546450666-ebb1e605853f?q=80&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  const slideStyles = { backgroundImage: `url(${slides[currentIndex].url})` };

  return (
    <div className="features-container">
      <div className="text-slider-container">
        <div className="text-content">
          <h2>Discover and Describe</h2>
          <p className="text-description">
            Encourage your child to describe their world and uncover new insights through creative exploration and observation.
          </p>
          <div className="button-container">
            <button className="discover-button">Learn More</button>
          </div>
        </div>
        <div className="slider-container">
          <div className="slider-content">
            <div className="slide" style={slideStyles}></div>
            <div className="left-arrow" onClick={() => setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)}>❰</div>
            <div className="right-arrow" onClick={() => setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1)}>❱</div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default Features;
