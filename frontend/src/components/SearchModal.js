import React, { useState, useEffect } from "react";
import { Drawer,Badge } from 'antd';
import cart_icon from "../assets/icons/cart.svg";
import logo_black from "../assets/logo_black.svg";
import liked_icon from "../assets/icons/liked.svg";
import search_icon from "../assets/icons/search.svg";
import "./styles/SearchModal.css";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
  const [open, setOpen] = useState(isOpen);
  const [TopSearches, setTopSearches] = useState(['Islamic', 'Persian', 'Most Selling']); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const CART_ITEMS = useSelector((state) => state.cart.items);
  const totalQuantity = CART_ITEMS.reduce((acc, item) => acc + (item.quantity || 0), 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Drawer
      placement="top"
      closable={false} // Disable the default close icon
      onClose={() => {
        if (onClose) onClose(); // Trigger parent close handler if provided
      }}
      open={open}
      height={windowWidth<520 ? 220 : 180} // Set the height of the drawer
      // headerStyle={{ display: 'none' }} // Hide the default header which includes the close icon
    >
      <div className="row align-items-center m-0 justify-content-center">
        <div className="col-12 text-center mb-3">
          <a href="#">
            <img
              className="search_option_logo_sm"
              src={logo_black}
              alt="Logo"
            />
          </a>
        </div>

        <div className="col-sm-10 col-8 text-center">
          <div className="d-flex search_bar">
            <input placeholder="Search.." className="form-control me-2" />
            <button className="footer_email_btn">
              <img className="search_option_icon" src={search_icon} alt="Search" />
            </button>
          </div>
        </div>

        <div className="col-auto d-flex justify-content-end">
          {/* <img className="search_option_icon" src={liked_icon} alt="Liked" /> */}
          <Badge count={totalQuantity} onClick={()=>navigate('/cart')}><img className="navbar_icon" src={cart_icon} alt="Cart" /></Badge>
        </div>
      </div>

      <div className="row m-0 mt-3 justify-content-center">
        <div className="col-12 px-0 px-sm-5">
          <b>Top Searches:</b>

          <ul className="top-searches-list d-flex">
            {TopSearches.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Drawer>
  );
};

export default SearchModal;
