import React from 'react';
import '../styles/FAQ.css';

const FAQ = () => {
  return (
    <section id="faq" className="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-grid">
        <div className="faq-item">
          <h3>What is SeeSay Moments?</h3>
          <p>SeeSay Moments is an interactive photo app for children...</p>
        </div>
        <div className="faq-item">
          <h3>How often are there updates?</h3>
          <p>We are dedicated to enhancing SeeSay Moments...</p>
        </div>
        <div className="faq-item">
          <h3>What makes SeeSay Moments the best app for kids?</h3>
          <p>SeeSay Moments stands out by combining...</p>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
