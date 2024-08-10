// src/utils/utils.js


import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { addItemToCart, updateItemQuantity } from '../redux/Cart.js/Action';

// Helper function to capitalize the first letter of each word
// Helper function to replace hyphens with spaces and capitalize each word
const formatSegment = (str) => {
    return str
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  export const generateBreadcrumbs = (path) => {
      // Split the path and filter out empty segments
      const segments = path.split('/').filter(segment => segment);
    
      // Generate breadcrumb items
      const breadcrumbItems = segments.map((segment, index) => {
        const url = `/${segments.slice(0, index + 1).join('/')}`;
        return {
          title: formatSegment(segment), // Format each segment
          url: index === segments.length - 1 ? null : url, // No URL for the last segment
        };
      });
    
      // Add 'Home' breadcrumb
      breadcrumbItems.unshift({ title: 'Home', url: '/' });
    
      return breadcrumbItems;
  };
  
  
  
  export const handleAddToCart = (productDetails, QuantityVal, CART_ITEMS, dispatch) => {
    // Ensure quantity is within valid range
    console.log(productDetails,QuantityVal,CART_ITEMS)
    const validQuantity = Math.min(Math.max(QuantityVal, 1), productDetails.quantity_available);

    // Check if the product is already in the cart
    const existingItem = CART_ITEMS.find(item => item.product_id === productDetails.product_id);

    if (existingItem) {
        // Calculate the new quantity by adding the existing quantity with the new one
        const newQuantity = existingItem.quantity + validQuantity;
        
        // Ensure the total quantity does not exceed the available stock
        if (newQuantity > productDetails.quantity_available) {
            message.error("You cannot add more items than are available in stock.");
            return;
        }

        // Update the existing item with the new quantity
        dispatch(addItemToCart({ ...existingItem, quantity: newQuantity }));
    } else {
        // If the item is not in the cart, add it with the valid quantity
        dispatch(addItemToCart({ ...productDetails, quantity: validQuantity }));
    }

    message.success("Product added to cart!");
};

export const handleUpdateQuantity = (productId, newQuantity, CART_ITEMS, dispatch) => {
    const item = CART_ITEMS.find(item => item.product_id === productId);
    if (item) {
      // Ensure new quantity is within the range [1, available quantity]
      if (newQuantity < 1) {
        message.error("Quantity cannot be less than 1.");
        return;
      }
  
      const validQuantity = Math.min(newQuantity, item.quantity_available); // Ensure quantity does not exceed available stock
      
      if (newQuantity>item.quantity_available) {
        message.error("Cannot update quantity. Exceeds available stock.");
        return;
      }
  
      dispatch(updateItemQuantity(productId, validQuantity));
    }
  };


export const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
};
export const calculateDeliveryDate = (days) => {
    // Create a new date object for today's date
    const today = new Date();
    
    // Convert days to milliseconds
    const milliseconds = days * 24 * 60 * 60 * 1000;
    
    // Create a new date object for the delivery date
    const deliveryDate = new Date(today.getTime() + milliseconds);
    
    // Manually format the delivery date as M/D/YYYY
    const month = deliveryDate.getMonth() + 1; // Months are zero-based (0 = January, 11 = December)
    const day = deliveryDate.getDate(); // Day of the month
    const year = deliveryDate.getFullYear(); // Full year

    // Format the date string as M/D/YYYY without leading zeros
    return `${day}/${month}/${year}`;
};





export function generateRandomRugItems(numItems) {
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
    const randomWords = ["Persian", "Polypropylene", "Woven", "Blue", "Modern", "Vintage", "Elegant", "Stylish", "Traditional", "Contemporary"];
    const sizes = [
        "2.6 ft width x 6.3 ft length (80cm x 200cm)",
        "3 ft width x 5 ft length (100cm x 150cm)",
        "4 ft width x 6 ft length (120cm x 180cm)",
        "5 ft width x 7 ft length (150cm x 210cm)",
        "6 ft width x 8 ft length (180cm x 240cm)"
    ];
    const images = [
        "https://static-01.daraz.pk/p/b39953624e4a8d68f583e6342fc58c74.jpg_750x750.jpg_.webp",
        "https://static-01.daraz.pk/p/92b8c31db3ba0b3795c5088fd35d8e3a.jpg_750x750.jpg_.webp",
        "https://assets.wfcdn.com/im/49629180/compr-r85/1910/191028771/30-modern-area-rugs-for-living-room.jpg"
    ];

    const items = [];

    for (let i = 0; i < numItems; i++) {
        let word = getRandomElement(randomWords)
        const id = `${word}-(Article${i})`;
        const name = `${word} (Article${i})`;
        const oldPrice = getRandomInt(20000, 50000);
        const newPrice = oldPrice - getRandomInt(1000, 20000);
        const description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, quaerat...";
        const sizesAvailable = [getRandomElement(sizes)];
        const numOfReview = getRandomInt(1, 10);
        const averageRating = parseFloat((Math.random() * 5).toFixed(1));
        const estimatedDeliveryDays = getRandomInt(5, 15);
        const quantity_available = getRandomInt(5, 15);
        const on_sale = getRandomInt(0, 1);
        const reviews = [];
        for (let j = 0; j < numOfReview; j++) {
            reviews.push({
                userID: getRandomInt(100000, 999999),
                review: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, velit."
            });
        }
        const imagesUrl = [getRandomElement(images), getRandomElement(images), getRandomElement(images), getRandomElement(images)];

        items.push({
            product_id: id,
            product_name: name,
            product_type:"modern",
            product_price_old: on_sale ? oldPrice : null,
            product_price_new: newPrice,
            product_description: description,
            sizes_available: sizesAvailable,
            estimated_delivery_days: estimatedDeliveryDays,
            images_url: imagesUrl,
            quantity_available:quantity_available,
            out_of_stock:false,
            hide:false,
            on_sale:on_sale==0?false:true
        });
    }

    return items;
}

export const CONVERT_TO_KEBAB_CASE = (phrase) => {
    console.log("PHRASE",phrase)
    return phrase
      .toLowerCase()                  // Convert entire phrase to lowercase
      .replace(/\s+/g, '-')            // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, '');     // Remove any non-alphanumeric characters except hyphens
  };
  
export const CONVERT_TO_TITLE_CASE = (kebab) => {
    return kebab
      .replace(/-/g, ' ')             // Replace hyphens with spaces
      .toLowerCase()                  // Convert entire string to lowercase
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
};
  

// utils/columnUtils.js


export const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => confirm()}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => confirm()}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined
      style={{
        color: filtered ? '#1890ff' : undefined,
      }}
    />
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : '',
});

  
  export function CONVERT_TIMESTAMP_TO_DATE(timestamp) {
    // Convert the timestamp to milliseconds
    const date = new Date(timestamp * 1000);
  
    // Options for formatting the date and time
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    //   weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    //   second: '2-digit',
    //   timeZoneName: 'short'  // For including the time zone
    };
  
    // Format the date and time to a readable string
    return date.toLocaleString('en-US', options);
  }
  

  export const GENERATE_URL = (product_type,product_id)=>{
        if(product_type=='door-mats' || 
           product_type=='runners' ||
           product_type=='wall-hangings' 
        ){
            return `/${product_type}/${product_id}`
        }
        else
        {
            return `/rugs/${product_type}/${product_id}`
        }
  }


  export const APPLY_FILTERS = (items,filters)=>{
    return items.filter(item => {

    if (item.hide) {
        return false;
      }
      const isWithinPriceRange = item.product_price_new > filters.priceRange[0] && item.product_price_new < filters.priceRange[1];
      const isSizeMatch = filters.size === "None" || item.sizes_available.includes(filters.size);
      console.log(isWithinPriceRange,isSizeMatch)
      return isWithinPriceRange && isSizeMatch;
    });

  }


  export const URL_DECODER = (url) =>{
    const encodedText = url;
const decodedText = decodeURIComponent(encodedText);
console.log(decodedText)
return decodedText
  }