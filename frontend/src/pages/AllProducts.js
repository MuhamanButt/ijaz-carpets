import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BreadCrumb from "../components/BreadCrumb";
import { generateBreadcrumbs, generateRandomRugItems } from "../utils/Important_functions";
import { Button, Drawer, Pagination } from "antd";
import "./styles/AllProducts.css";
import filterIcon from '../assets/icons/filter.svg'
import Filters from "../less_use/Filters";
import ProductCard from "../components/ProductCard";
import { ITEMS_PER_PAGE } from "../values/homePageData";

const AllProducts = () => {
  const path = window.location.pathname;
  const breadcrumbItems = generateBreadcrumbs(path);
  const lastItem = breadcrumbItems[breadcrumbItems.length - 1]; // last item to show in title
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [current, setCurrent] = useState(1);
  const [items, setItems] = useState(generateRandomRugItems(30)); // Initialize with random items
  const [filteredItems, setFilteredItems] = useState(items);
  const [paginatedItems, setPaginatedItems] = useState(filteredItems.slice(0, ITEMS_PER_PAGE));
  const [filters, setFilters] = useState({ size: "None", priceRange: [1000, 50000] });

  useEffect(() => {
    // Update paginated items whenever filtered items or current page changes
    const startIndex = (current - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedItems(filteredItems.slice(startIndex, endIndex));
  }, [filteredItems, current]);

  const onChange = (page) => {
    setCurrent(page);
  };

  const handleApplyFilters = (filters) => {
    setDrawerVisible(false);
  
    // Apply filters to items
    const newFilteredItems = items.filter(item => {
      const isWithinPriceRange = item.product_price_new > filters.priceRange[0] && item.product_price_new < filters.priceRange[1];
      const isSizeMatch = filters.size === "None" || item.sizes_available.includes(filters.size);
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
            <img src={filterIcon} alt="" />
            Filters
          </Button>
          <Drawer
            title="Filters"
            placement="left"
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
            width={300}
          >
            <Filters
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
            />
          </Drawer>
        </div>
        <div className="col-3 d-none d-md-block">
          <Filters
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        </div>
        <div className="col-12 col-md-9">
          <div className="row m-0">
            {paginatedItems.map((item, key) => (
              <div className="col-6 col-lg-4 p-2" key={key}>
                <ProductCard productDetails={item} />
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12">
              <Pagination 
                current={current}
                pageSize={ITEMS_PER_PAGE}
                total={filteredItems.length} 
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

export default AllProducts;
