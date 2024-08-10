// src/components/Filters.js
import React, { useState } from "react";
import { Collapse, Slider, Button } from "antd";
import { RUG_SIZES, SIZES_AVAILABLE } from "../values/homePageData";
import "./styles/Filters.css"; // Create and add styles for Filters here

const { Panel } = Collapse;

const Filters = ({ onApplyFilters, onClearFilters }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [priceRange, setPriceRange] = useState([1000, 50000]);
  const [isClearFilterVisible, setisClearFilterVisible] = useState(false);

  // Handler for size selection
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  // Handler for price range change
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  // Handler for apply filter button
  const applyFilters = () => {
    setisClearFilterVisible(true)
    const sizeToLog = selectedSize || "None";
    const priceRangeToLog = `${priceRange[0]}Rs - ${priceRange[1]}Rs`;
    onApplyFilters({ size: sizeToLog, priceRange: priceRange });
  };

  // Handler for clear filters button
  const clearFilters = () => {
    setisClearFilterVisible(false)
    setSelectedSize("");
    setPriceRange([1000, 50000]);
    onClearFilters();
  };

  return (
    <div className="filters" data-aos="fade-right">
      <p>Filters</p>
      <Button onClick={applyFilters} className="apply-filters-btn">
        Apply Filters
      </Button>
      {isClearFilterVisible && 
      <Button onClick={clearFilters} className="clear-filters-btn">
        Clear Filters
      </Button>}
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Size" key="1">
          {SIZES_AVAILABLE.map((size, index) => (
            <div
              key={index}
              onClick={() => handleSizeClick(size)}
              className={`filter-size-item ${selectedSize === size ? "selected" : ""}`}
            >
              {size}
            </div>
          ))}
        </Panel>
        <Panel header="Price" key="2">
          <p className="pricing">
            Price Range: <br />
            {priceRange[0]}Rs - {priceRange[1]}Rs
          </p>
          <Slider
            range
            min={500}
            max={50000}
            defaultValue={[1000, 50000]}
            step={200}
            onChange={handlePriceChange}
            value={priceRange}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default Filters;
