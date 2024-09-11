import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import OurApp from './routes/OurAppPage'
import AboutPage from './routes/AboutPage'
import ContactPage from './routes/ContactPage'
import LoginPage from './routes/LoginPage'
import ImageCaptionPage from "./routes/ImageCaptionPage";
import ProfilePage from './routes/ProfilePage'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/ourApp' element={<OurApp />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path="/imageCaption" element={<ImageCaptionPage />} />
      <Route path='/profile' element={<ProfilePage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);