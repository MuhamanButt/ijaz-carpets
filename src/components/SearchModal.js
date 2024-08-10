import React, { useState, useEffect } from "react";
import { Drawer, Badge, message,List,Button,Avatar } from 'antd';
import cart_icon from "../assets/icons/cart.svg";
import logo_black from "../assets/logo_black.svg";
import search_icon from "../assets/icons/search.svg";
import "./styles/SearchModal.css";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { API_GET_PRODUCTS_BY_NAME } from "../api/api_product";
import { TOP_SEARCHES } from "../values/homePageData";
import { DOMAIN_NAME } from "../values/Domain";
import { GENERATE_URL } from "../utils/Important_functions";

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(isOpen);
  const [topSearches, setTopSearches] = useState(['Islamic', 'Persian', 'Most Selling']);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
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

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchInput.trim()) {
        setSearchResults([]);
        setSuggestions([]);
        return;
      }

      try {
        const limit = 3
        const response = await API_GET_PRODUCTS_BY_NAME(searchInput,limit);
        const results = response.data;
        setSearchResults(results);
        setSuggestions(results);
      } catch (error) {
        console.error(error);
        message.error('Failed to fetch search results.');
      }
    };

    const debounceFetch = setTimeout(fetchResults, 300); // Debouncing to limit API calls
    return () => clearTimeout(debounceFetch);
  }, [searchInput]);

  // Adjust height based on the number of suggestions
  const drawerHeight = Math.max(200, 60 + (suggestions? suggestions?.length * 100 : 0)); // Adjust multiplier if needed

  return (
    <Drawer
      placement="top"
      closable={false} // Disable the default close icon
      onClose={() => {
        if (onClose) onClose(); // Trigger parent close handler if provided
      }}
      open={open}
      height={drawerHeight} // Dynamically set height
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

        <div className=" col-12 text-center">
          <div className="d-flex search_bar">
            <input
              placeholder="Search.."
              className="form-control me-2"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className="footer_email_btn"
              onClick={() => {}}
            >
             <img className="search_option_icon" src={search_icon} alt="Search" />
            </button>
          </div>
        </div>

        <div className="col-sm-10 col-8 mt-2 search-results">
            {suggestions?.length > 0 && (
                
                <List
                dataSource={suggestions}
                renderItem={(result) => (
                  <List.Item
                    key={result.product_id}
                    className="search-results-list-item"
                    onClick={() => navigate(GENERATE_URL(result.product_type, result.product_id))}
                    
                  >
                    
                    <List.Item.Meta
                        avatar={<Avatar src={result.images_url[0]} />}
                      title={result.product_name}
                      // Add other metadata or descriptions if needed
                    />
                  </List.Item>
                )}
              />
              
            )}
          </div>
      </div>
      <div className="row m-0 mt-3 justify-content-center">
        <div className="col-12 px-0 px-sm-5">
          <b>Top Searches:</b>
          <ul className="top-searches-list d-flex">
            {TOP_SEARCHES.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          
        </div>
      </div>
    </Drawer>
  );
};

export default SearchModal;
