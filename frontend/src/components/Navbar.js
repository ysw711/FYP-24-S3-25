import React from 'react';
import '../styles/Navbar.css'; // Adjust path if necessary

const Navbar = () => (
  <nav className="navbar">
    <div className="siteTitle">SeeSay Moments</div>
    <div className="navbarContainer">
      <ul className="navList">
        <li><a href="#header">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#login">Login</a></li>
        <li><a href="#imagecaptioning">ImgCaption</a></li> {/* Updated ID to match component */}
      </ul>
    </div>
  </nav>
);

export default Navbar;
