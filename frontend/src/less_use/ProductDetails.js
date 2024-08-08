import React, { useState, useEffect } from 'react';
import { Descriptions, Image } from 'antd';

const ProductDetails = ({ product }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
  return (
    <Descriptions  bordered column={1}>
      <Descriptions.Item label="Product ID">{product.product_id}</Descriptions.Item>
      <Descriptions.Item label="Product Name">{product.product_name}</Descriptions.Item>
      <Descriptions.Item label="Type">{product.product_type}</Descriptions.Item>
      <Descriptions.Item label="Old Price">Rs. {product.product_price_old}</Descriptions.Item>
      <Descriptions.Item label="New Price">Rs. {product.product_price_new}</Descriptions.Item>
      <Descriptions.Item label="Description">{product.product_description}</Descriptions.Item>
      <Descriptions.Item label="Sizes Available">{product.sizes_available.join(', ')}</Descriptions.Item>
      <Descriptions.Item label="Quantity Available">{product.quantity_available}</Descriptions.Item>
      <Descriptions.Item label="Estimated Delivery Days">{product.estimated_delivery_days}</Descriptions.Item>
      <Descriptions.Item label="Images">
        <div style={{ display: 'flex', gap: '10px' }}>
          {product.images_url.map((url, index) => (
            <Image key={index} src={url} alt={`Product Image ${index + 1}`} width={100} />
          ))}
        </div>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ProductDetails;
