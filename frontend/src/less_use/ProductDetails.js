import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const ProductDetails = ({ product }) => {
  return (
        <>
        <p><strong>Product ID:</strong> {product.product_id}</p>
        <p><strong>Product Name:</strong> {product.product_name}</p>
        <p><strong>Type:</strong> {product.product_type}</p>
        <p><strong>Old Price:</strong> Rs. {product.product_price_old}</p>
        <p><strong>New Price:</strong> Rs. {product.product_price_new}</p>
        <p><strong>Description:</strong> {product.product_description}</p>
        <p><strong>Sizes Available:</strong> {product.sizes_available.join(', ')}</p>
        <p><strong>Quantity Available:</strong> {product.quantity_available}</p>
        <p><strong>Estimated Delivery Days:</strong> {product.estimated_delivery_days}</p>
        <p><strong>Images:</strong></p>
        {product.images_url.map((url, index) => (
          <img key={index} src={url} alt={`Product Image ${index + 1}`} style={{ width: '100px', marginRight: '10px' }} />
        ))}
        </>
  );
};

export default ProductDetails;
