import React, { useState } from 'react';
import { SiDatabricks } from 'react-icons/si';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleNav = () => setNav(!nav);

    return (
        <div className='navbar'>
            <div className='navbar-container'>
                <div className='logo'>
                    <SiDatabricks className='icon' />
                    <h1>SeeSay Moments</h1>
                </div>
                <ul className={nav ? 'nav-menu active' : 'nav-menu'}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/ourApp'>Our App</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
                <div className='hamburger' onClick={handleNav}>
                    {!nav ? <FaBars className='icon' /> : <FaTimes className='icon' />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
