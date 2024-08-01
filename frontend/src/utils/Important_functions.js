// src/utils/utils.js

import { message } from 'antd';
import { addItemToCart, updateItemQuantity } from '../redux/Cart.js/Action';

export const generateBreadcrumbs = (path) => {
    // Split the path and filter out empty segments
    const segments = path.split('/').filter(segment => segment);
  
    // Generate breadcrumb items
    const breadcrumbItems = segments.map((segment, index) => {
      const url = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize the first letter
        url: index === segments.length - 1 ? null : url, // No URL for the last segment
      };
    });
  
    // Add 'Home' breadcrumb
    breadcrumbItems.unshift({ title: 'Home', url: '/' });
  
    return breadcrumbItems;
  };
  
  export const handleAddToCart = (productDetails, QuantityVal, CART_ITEMS, dispatch) => {
    // Ensure quantity is within valid range
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
        const quantity_available = getRandomInt(1, 5);
        const reviews = [];
        for (let j = 0; j < numOfReview; j++) {
            reviews.push({
                userID: getRandomInt(100000, 999999),
                review: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, velit."
            });
        }
        const imagesUrl = [getRandomElement(images), getRandomElement(images), getRandomElement(images)];

        items.push({
            product_id: id,
            product_name: name,
            product_type:"modern",
            product_price_old: oldPrice,
            product_price_new: newPrice,
            product_description: description,
            sizes_available: sizesAvailable,
            num_of_review: numOfReview,
            average_rating: averageRating,
            reviews: reviews,
            estimated_delivery_days: estimatedDeliveryDays,
            images_url: imagesUrl,
            quantity_available:quantity_available
        });
    }

    return items;
}