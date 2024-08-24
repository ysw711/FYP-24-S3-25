
import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Features from './components/Features';
import About from './components/About';
import FAQ from './components/FAQ';
import Login from './Login';
import ImageCaptioning from './childUser/ImageCaptioning';
import Footer from './components/Footer'; // You can include the Footer here if it should be part of this page

const MainPage = () => {
  return (
    <>
      <Navbar />
      <div id="header"><Header /></div>
      <div id="features"><Features /></div>
      <div id="about"><About /></div>
      <div id="faq"><FAQ /></div>
      <div id="login"><Login /></div>
      <div id="imagecaptioning"><ImageCaptioning /></div>
      <Footer />
    </>
  );
};

export default MainPage;
