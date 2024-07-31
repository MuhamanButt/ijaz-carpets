import React, { useState, useEffect } from 'react';
import navbar_logo_black from '../assets/logo_black.svg';
import './styles/Navbar.css';
import { HEADLINE, PHONE_NUMBER } from '../values/homePageData';
import { Drawer } from 'antd';
import user_icon from '../assets/icons/user.svg';
import cart_icon from '../assets/icons/cart.svg';
import liked_icon from '../assets/icons/liked.svg';
import search_icon from '../assets/icons/search.svg';
import options_icon from '../assets/icons/options.svg';
import SearchModal from './SearchModal';

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [open_sm_navbar, setOpenSmNavbar] = useState(false);
  const [showDrawer, setshowDrawer] = useState(false);
  const [showSearchDrawer, setShowSearchDrawer] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className='navbar_main'>
      <div className="row m-0 navbar_tagline">
        <div className="col-auto p-0">
          <i className="fa-solid fa-phone me-2"></i>
          {PHONE_NUMBER}
        </div>
        <div className="col d-none d-sm-block text-center">
          {HEADLINE}
        </div>
      </div>

      {windowWidth > 992 ? (
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar_logo navbar-brand" href="#">
              <img src={navbar_logo_black} alt="Logo" />
            </a>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-4">
                <li className="nav-item "> <a className="nav-link btnStyles active" aria-current="page" href="#">Home </a></li>
                <li className="nav-item "> <a className="nav-link btnStyles" href="#"> Rugs </a></li>
                <li className="nav-item "> <a className="nav-link btnStyles" href="#"> Wall Hangings </a></li>
                <li className="nav-item "> <a className="nav-link btnStyles" href="#"> Door mats </a></li>
                <li className="nav-item "> <a className="nav-link btnStyles" href="#"> About us </a></li>
              </ul>
              <img className="navbar_icon" src={search_icon} alt="Search" onClick={()=>setShowSearchDrawer(true)}/>
              <img className="navbar_icon" src={liked_icon} alt="Liked" />
              <img className="navbar_icon" src={cart_icon} alt="Cart" />
            </div>
          </div>
        </nav>
      ) : (
        <div className="row align-items-center navbar_sm m-0">
          <div className="col-auto d-flex align-items-center z-2">
            <label className="hamburger">
              <input type="checkbox" checked={showDrawer} onClick={()=>{ setshowDrawer(!showDrawer)} }/>
              <svg viewBox="0 0 32 32">
                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" ></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </div>

          <div className="col text-center">
            <a className="navbar-brand" href="#"> <img className="navbar_logo_sm" src={navbar_logo_black} alt="Logo" /> </a>
          </div>

          <div className="col-auto d-flex justify-content-end">
            <img className="navbar_icon" src={search_icon} alt="Search" />
            <img className="navbar_icon" src={liked_icon} alt="Liked" />
            <img className="navbar_icon" src={cart_icon} alt="Cart" />
          </div>
        </div>
      )}
    {showDrawer && windowWidth <= 992 && 
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navbar-animated position-absolute">
        <li className="nav-item navbar_options"><a className="nav-link btnStyles active" aria-current="page" href="#">Home</a></li>
        <li className="nav-item navbar_options"><a className="nav-link btnStyles m-0" href="#">Rugs</a></li>
        <li className="nav-item navbar_options"><a className="nav-link btnStyles" href="#">Wall Hangings</a></li>
        <li className="nav-item navbar_options"><a className="nav-link btnStyles" href="#">Door mats</a></li>
        <li className="nav-item navbar_options"><a className="nav-link btnStyles" href="#">About us</a></li>
    </ul>
    }
      <SearchModal isOpen={showSearchDrawer} onClose={() => setShowSearchDrawer(false)} />
    </div>

  );
};

export default Navbar;
