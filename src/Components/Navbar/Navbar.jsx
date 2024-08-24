


import React, { useState } from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import profile_icon from '../../assets/simon.png';
import sun_icon from '../../assets/sun.png';
import moon_icon from '../../assets/moon.png';
import { Link } from 'react-router-dom';

const Navbar = ({ setSidebar }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme', !darkMode);
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className='nav-left flex-div'>
        <img src={menu_icon} onClick={() => setSidebar(prev => !prev)} className='menu-icon' alt="Menu" />
        <Link to='/'><img src={logo} className='logo' alt="Logo" /></Link>
      </div>
      <div className='nav-middle flex-div'>
        <div className="search-box flex-div">
          <input type="text" placeholder='Search' />
          <img src={search_icon} alt="Search" />
        </div>
      </div>
      <div className="nav-right flex-div">
        <img src={upload_icon} className='logo' alt="Upload" />
        <img src={more_icon} className='logo' alt="More" />
        <img src={notification_icon} className='logo' alt="Notifications" />
        <img src={profile_icon} className='user-icon' alt="Profile" />
        <img
          src={darkMode ? sun_icon : moon_icon}
          onClick={toggleTheme}
          className='theme-icon'
          alt="Theme Toggle"
        />
      </div>
    </nav>
  );
};

export default Navbar;
