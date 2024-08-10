import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BreadCrumb from "../components/BreadCrumb";
import { APPLY_FILTERS, CONVERT_TO_KEBAB_CASE, generateBreadcrumbs, URL_DECODER } from "../utils/Important_functions";
import { Button, Drawer, Pagination, Select, Spin } from "antd";
import "./styles/AllProducts.css";
import filterIcon from '../assets/icons/filter.svg';
import Filters from "../less_use/Filters";
import ProductCard from "../components/ProductCard";
import { ITEMS_PER_PAGE } from "../values/homePageData";
import { API_GET_PRODUCTS_BY_SIZE, API_GET_PRODUCTS_BY_TYPE } from "../api/api_product";

const { Option } = Select;

const ProductsBySize = () => {
  const path = window.location.pathname;
  const [showSpinner, setShowSpinner] = useState(false);
  const breadcrumbItems = generateBreadcrumbs(path);
  const lastItem = breadcrumbItems[breadcrumbItems.length - 1];
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [current, setCurrent] = useState(1);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [filters, setFilters] = useState({ size: "None", priceRange: [1000, 50000] });
  const [sortOrder, setSortOrder] = useState("alphabetical-asc"); // Default sorting

  // Fetch products when component mounts or lastItem.title changes
  useEffect(() => {
    const fetchProducts = async () => {
      setShowSpinner(true);
      console.log(lastItem.title)
      const response = await API_GET_PRODUCTS_BY_SIZE(URL_DECODER(lastItem.title));
      if(response.data == undefined)
      {
        setItems([]);
        setFilteredItems([]);
      }
      else
      {
        setItems(response.data);
        setFilteredItems(response.data.filter(item => !item.hide));
      }
      setCurrent(1); // Reset to the first page on new data
      setShowSpinner(false);
    };

    if (lastItem.title) {
      fetchProducts();
    }
  }, [lastItem.title]);

  // Apply sorting to filteredItems
  useEffect(() => {
    let sortedItems = [...filteredItems];
    switch (sortOrder) {
      case "alphabetical-asc":
        sortedItems.sort((a, b) => a.product_name.localeCompare(b.product_name));
        break;
      case "alphabetical-desc":
        sortedItems.sort((a, b) => b.product_name.localeCompare(a.product_name));
        break;
      case "price-asc":
        sortedItems.sort((a, b) => a.product_price_new - b.product_price_new);
        break;
      case "price-desc":
        sortedItems.sort((a, b) => b.product_price_new - a.product_price_new);
        break;
      case "date":
        sortedItems.sort((a, b) => new Date(b.creation_time) - new Date(a.creation_time));
        break;
      default:
        break;
    }
    setFilteredItems(sortedItems);
  }, [sortOrder]);

  // Update paginatedItems whenever filteredItems or current page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const startIndex = (current - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedItems(filteredItems?.slice(startIndex, endIndex));
  }, [filteredItems, current]);

  const onChange = (page) => {
    setCurrent(page);
  };

  const handleApplyFilters = (filters) => {
    setDrawerVisible(false);
    const newFilteredItems = APPLY_FILTERS(items, filters);
    setFilteredItems(newFilteredItems);
    setCurrent(1); // Reset pagination to the first page
  };

  const handleClearFilters = () => {
    setDrawerVisible(false);
    setFilters({ size: "None", priceRange: [1000, 50000] });
    setFilteredItems(items); // Reset to original items
    setCurrent(1); // Reset pagination to the first page
  };

  return (
    <div>
      <Navbar />
      {showSpinner && <Spin fullscreen />}
      {/* //!-------------------------------------- BREADCRUMB AND TITLE ---------------- */}
      <div className="row m-0">
        <div className="col p-0 px-5 text-center my-2">
          {lastItem && <h2>{lastItem.title}</h2>}
          <BreadCrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="row px-1 px-sm-3 px-md-5 mb-5 m-0" data-aos="fade-up">
        <div className="d-md-none mb-3">
          <Button className="open-filter-btn" onClick={() => setDrawerVisible(true)}>
            <img src={filterIcon} alt="Filter" />
            Filters
          </Button>
          <Drawer title="Filters" placement="left" onClose={() => setDrawerVisible(false)} visible={drawerVisible} width={300}>
            <Filters onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters} />
          </Drawer>
        </div>
        <div className="col-3 d-none d-md-block">
          <Filters onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters} />
        </div>
        <div className="col-12 col-md-9">
          <div className="row mb-0">
            <div className="col-12">
              <Select
                defaultValue="alphabetical-asc"
                onChange={setSortOrder}
                style={{ width: 200 }}
              >
                <Option value="alphabetical-asc">Sort Alphabetically (A-Z)</Option>
                <Option value="alphabetical-desc">Sort Alphabetically (Z-A)</Option>
                <Option value="price-asc">Sort by Price (Low to High)</Option>
                <Option value="price-desc">Sort by Price (High to Low)</Option>
                <Option value="date">Sort by Date</Option>
              </Select>
            </div>
          </div>
          <div className="row m-0">
            {paginatedItems?.map((item, key) => (
              !item.hide && <div className="col-6 col-lg-4 p-2" key={key}>
                <ProductCard productDetails={item} />
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12 mt-4">
              <Pagination
                current={current}
                showSizeChanger={false}
                pageSize={ITEMS_PER_PAGE}
                total={filteredItems?.length}
                align="end"
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsBySize;
