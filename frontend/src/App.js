import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Features from './components/Features';
import About from './components/About';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ImageCaptioning from './childUser/ImageCaptioning'; // Updated path

const App = () => (
  <>
    <Navbar />
    <Header />
    <Features />
    <About />
    <FAQ />
    <ImageCaptioning /> {/* Include the new component */}
    <Footer />
  </>
);

export default App;
