import React, { useState } from 'react';
import { SiDatabricks } from 'react-icons/si';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleNav = () => setNav(!nav);

    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await fetch('http://localhost:5000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.removeItem('email');
            navigate('/login');
        } else {
            alert("Logout failed. Please try again.");
        }
    };

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
                    {email ? (
                        <>
                            <li><Link to="/profile" className="profile-link">
                                <div className="profile-navbar" />
                            </Link></li>
                            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                        </>
                    ) : (
                        <li><Link to='/login'>Login</Link></li>
                    )}
                </ul>
                <div className='hamburger' onClick={handleNav}>
                    {!nav ? <FaBars className='icon' /> : <FaTimes className='icon' />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
