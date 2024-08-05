import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BreadCrumb from "../components/BreadCrumb";
import { CONVERT_TO_KEBAB_CASE, CONVERT_URL_TO_TYPE, generateBreadcrumbs } from "../utils/Important_functions";
import { Button, Drawer, Pagination, Spin } from "antd";
import "./styles/AllProducts.css";
import filterIcon from '../assets/icons/filter.svg';
import Filters from "../less_use/Filters";
import ProductCard from "../components/ProductCard";
import { ITEMS_PER_PAGE } from "../values/homePageData";
import { API_GET_PRODUCTS_BY_TYPE } from "../api/api_product";

const AllProducts = () => {
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

  // Fetch products when component mounts or lastItem.title changes
  useEffect(() => {
    const fetchProducts = async () => {
      setShowSpinner(true);
      try {
        const response = await API_GET_PRODUCTS_BY_TYPE(CONVERT_TO_KEBAB_CASE(lastItem.title));
        console.log(response.data)
        setItems(response.data);
        setFilteredItems(response.data.filter(item => !item.hide));
        setCurrent(1); // Reset to the first page on new data
      } catch (error) {
        console.error(error);
      } finally {
        setShowSpinner(false);
      }
    };

    if (lastItem.title) {
      fetchProducts();
    }
  }, [lastItem.title]);

  // Update paginatedItems whenever filteredItems or current page changes
  useEffect(() => {
    const startIndex = (current - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedItems(filteredItems?.slice(startIndex, endIndex));
  }, [filteredItems, current]);

  const onChange = (page) => {
    setCurrent(page);
  };
 const handleApplyFilters = (filters) => {
    setDrawerVisible(false);
  
    // Apply filters to items
    console.log('filters',filters)
    const newFilteredItems = items.filter(item => {

    // Check if item is hidden
    if (item.hide) {
        return false;
      }
    console.log('item.sizes_available',item.product_price_new)
      const isWithinPriceRange = item.product_price_new > filters.priceRange[0] && item.product_price_new < filters.priceRange[1];
      const isSizeMatch = filters.size === "None" || item.sizes_available.includes(filters.size);
      console.log(isWithinPriceRange,isSizeMatch)
      return isWithinPriceRange && isSizeMatch;
    });

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
        <div className="col p-0 px-5">
          {lastItem && <h2>{lastItem.title}</h2>}
          <BreadCrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="row px-1 px-sm-3 px-md-5 mb-5 m-0">
        <div className="d-md-none mb-3">
          <Button className="open-filter-btn" onClick={() => setDrawerVisible(true)}>
            <img src={filterIcon} alt="Filter" />
            Filters
          </Button>
          <Drawer title="Filters" placement="left" onClose={() => setDrawerVisible(false)} visible={drawerVisible} width={300} >
            <Filters onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters}/>
          </Drawer>
        </div>
        <div className="col-3 d-none d-md-block">
          <Filters onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters}/>
        </div>
        <div className="col-12 col-md-9">
          <div className="row m-0">
            {paginatedItems?.map((item, key) => (
                !item.hide && <div className="col-6 col-lg-4 p-2" key={key}>
                <ProductCard productDetails={item} />
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12 mt-4">
              <Pagination current={current} showSizeChanger={false} pageSize={ITEMS_PER_PAGE} total={filteredItems?.length} align="end" onChange={onChange}/>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllProducts;
