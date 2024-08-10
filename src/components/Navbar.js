import React, { useState, useEffect } from 'react';
import './styles/Navbar.css';
import { HEADLINE, PHONE_NUMBER, SIZES_AVAILABLE } from '../values/homePageData';
import { Drawer,Badge } from 'antd';
import user_icon from '../assets/icons/user.svg';
import cart_icon from '../assets/icons/cart.svg';
import navbar_logo_black from '../assets/logo_black.svg';
import liked_icon from '../assets/icons/liked.svg';
import search_icon from '../assets/icons/search.svg';
import options_icon from '../assets/icons/options.svg';
import SearchModal from './SearchModal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSearchDrawer, setShowSearchDrawer] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const CART_ITEMS = useSelector((state) => state.cart.items);
  const totalQuantity = CART_ITEMS.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleScroll = () => {
        if(window.scrollY > 100)
        {
            setIsSticky(true);
            setIsVisible(true); // Show navbar when sticky
        }
        else{
        setIsSticky(false);
        setIsVisible(false); // Show navbar when sticky
        }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (<>
    <div className={`navbar_main sticky`}>
      <div className="row m-0 navbar_tagline">
        <div className="col-auto p-0">
          <i className="fa-solid fa-phone me-2"></i>
          {PHONE_NUMBER}
        </div>
        <div className="col d-none d-sm-block text-center">
          {HEADLINE}
        </div>
      </div>

      <SearchModal isOpen={showSearchDrawer} onClose={() => setShowSearchDrawer(false)} />
      {windowWidth > 992 ? (
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar_logo navbar-brand" onClick={() => navigate('/')}>
              <img src={navbar_logo_black} alt="Logo" />
            </a>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-4">
                <li className="nav-item">
                  <a className="nav-link btnStyles active" aria-current="page" onClick={() => navigate('/')}>Home</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle btnStyles" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Rugs<i className="ms-2 fa-solid fa-chevron-down"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" onClick={() => navigate('/rugs/modern')}>Modern Rugs</a></li>
                    <li><a className="dropdown-item" onClick={() => navigate('/rugs/woven')}>Woven Rugs</a></li>
                    <li><a className="dropdown-item" onClick={() => navigate('/rugs/non-woven')}>Non Woven Rugs</a></li>
                    <li><a className="dropdown-item" onClick={() => navigate('/rugs/persian')}>Persian Rugs</a></li>
                    <li><a className="dropdown-item" onClick={() => navigate('/rugs/runners')}>Runners</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link btnStyles" onClick={() => navigate('/wall-hangings')}>Wall Hangings</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link btnStyles" onClick={() => navigate('/door-mats')}>Door mats</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle btnStyles" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    By Size<i className="ms-2 fa-solid fa-chevron-down"></i>
                  </a>
                  <ul className="dropdown-menu">
                        {SIZES_AVAILABLE.map((item)=><li><a className="dropdown-item" onClick={() => navigate(`/${item}`)}>{item}</a></li>
                    )}
                  </ul>
                </li>
                
              </ul>
              <img className="navbar_icon" src={search_icon} alt="Search" onClick={() => setShowSearchDrawer(true)} />
              {/* <img className="navbar_icon" src={liked_icon} alt="Liked" /> */}
              {totalQuantity > 0 ? <Badge count={totalQuantity}  onClick={()=>navigate('/cart')}><img className="navbar_icon" src={cart_icon} alt="Cart" /></Badge> :<img className="navbar_icon" src={cart_icon} alt="Cart" onClick={()=>navigate('/cart')}/>}
            </div>
          </div>
        </nav>
      ) : (
        <div className="row align-items-center navbar_sm m-0" >
          <div className="col-auto d-flex align-items-center z-2">
            <label className="hamburger">
              <input type="checkbox" checked={showDrawer} onClick={() => { setShowDrawer(!showDrawer) }} />
              <svg viewBox="0 0 32 32">
                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </div>

          <div className="col text-center">
            <a className="navbar-brand" onClick={() => navigate('/')}> <img className="navbar_logo_sm" src={navbar_logo_black} alt="Logo" /> </a>
          </div>

          <div className="col-auto d-flex justify-content-end">
            <img className="navbar_icon" src={search_icon} alt="Search" onClick={() => setShowSearchDrawer(true)} />
            {/* <img className="navbar_icon" src={liked_icon} alt="Liked" /> */}
              {totalQuantity > 0 ? <Badge count={totalQuantity}  onClick={()=>navigate('/cart')}><img className="navbar_icon" src={cart_icon} alt="Cart" /></Badge> :<img className="navbar_icon" src={cart_icon} alt="Cart" onClick={()=>navigate('/cart')}/>}
          </div>
        </div>
      )}
      {showDrawer && windowWidth <= 992 &&
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navbar-animated position-absolute" style={{zIndex:"1000"}}>
          <li className="nav-item navbar_options">
            <a className="nav-link btnStyles active" aria-current="page" onClick={() => navigate('/')}>Home</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle btnStyles navbar_options" href="#" id="navbarDropdownSm" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Rugs
            </a>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" onClick={() => navigate('/rugs/modern')}>Modern Rugs</a></li>
                <li><a className="dropdown-item" onClick={() => navigate('/rugs/woven')}>Woven Rugs</a></li>
                <li><a className="dropdown-item" onClick={() => navigate('/rugs/non-woven')}>Non Woven Rugs</a></li>
                <li><a className="dropdown-item" onClick={() => navigate('/rugs/persian')}>Persian Rugs</a></li>
                <li><a className="dropdown-item" onClick={() => navigate('/rugs/runners')}>Runners</a></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle btnStyles navbar_options" href="#" id="navbarDropdownSm" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              By Size
            </a>
            <ul className="dropdown-menu">
                {SIZES_AVAILABLE.map((item)=><li><a className="dropdown-item" onClick={() => navigate(`/${item}`)}>{item}</a></li>)}
            </ul>
          </li>
          <li className="nav-item navbar_options">
            <a className="nav-link btnStyles" onClick={() => navigate('/wall-hangings')}>Wall Hangings</a>
          </li>
          <li className="nav-item navbar_options">
            <a className="nav-link btnStyles" onClick={() => navigate('/door-mats')}>Door mats</a>
          </li>
          
        </ul>
      }
    </div>
    
    <div className="row m-0">
        <div className="col "   style={{height:'110px'}}></div>
    </div>
    </>
  );
};

export default Navbar;
