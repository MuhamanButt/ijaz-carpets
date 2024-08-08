import React from 'react';
import { Descriptions, List, Avatar, Typography, Row, Col } from 'antd';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DOMAIN_NAME } from '../values/Domain';
import './styles/OrderPreview.css'
import { CONVERT_TIMESTAMP_TO_DATE, GENERATE_URL } from '../utils/Important_functions';

const { Title, Paragraph } = Typography;

const OrderPreview = () => {
  const location = useLocation();
  const { items, record } = location.state || { items: [] };
  const navigate = useNavigate();

  // Function to safely parse JSON strings
  const safeJsonParse = (jsonString) => {
    try {
      const fixedString = jsonString
        .replace(/'/g, '"') // Replace single quotes with double quotes
        .replace(/True/g, 'true') // Replace True with true
        .replace(/False/g, 'false'); // Replace False with false
      return JSON.parse(fixedString);
    } catch (error) {
      console.error("Error parsing item:", error);
      return null; // Return null if parsing fails
    }
  };

  // Parse JSON strings into objects
  const parsedItems = items.map(item => safeJsonParse(item)).filter(item => item !== null); // Filter out any invalid items

  const handleProductClick = (item) => {
    navigate(GENERATE_URL(item.product_type, item.product_id));
  }

  return (
    <div className="container my-5">
      <Title level={2}>Order Details</Title>
      <Descriptions
        bordered
        column={2}
        style={{ marginBottom: '40px' }}
      >
        <Descriptions.Item label="Order ID">{record?.order_id}</Descriptions.Item>
        <Descriptions.Item label="Creation Time">{CONVERT_TIMESTAMP_TO_DATE(record?.creation_time)}</Descriptions.Item>
        <Descriptions.Item label="Name">{record?.firstName}</Descriptions.Item>
        <Descriptions.Item label="Email">{record?.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{record?.phone}</Descriptions.Item>
        <Descriptions.Item label="Address">{record?.address}</Descriptions.Item>
        <Descriptions.Item label="City">{record?.city}</Descriptions.Item>
        <Descriptions.Item label="Postal Code">{record?.postalCode}</Descriptions.Item>
        <Descriptions.Item label="Total Amount">{record?.total_amount}</Descriptions.Item>
        <Descriptions.Item label="Transaction Image">
          <a href={record?.transaction_url} target="_blank" rel="noopener noreferrer">{record?.transaction_url}</a>
        </Descriptions.Item>
      </Descriptions>

      <Title level={2} className="mt-4">Order Items</Title>
      <List
        itemLayout="horizontal"
        dataSource={parsedItems}
        renderItem={(item) => (
          <List.Item onClick={() => handleProductClick(item)}>
            <List.Item.Meta
              avatar={<Avatar src={item.images_url[0]} className='order-preview-item' />}
              title={item.product_name}
              description={
                <Descriptions
                  column={1}
                  bordered
                  size="small"
                  style={{ margin: 0, padding: 0 }}
                >
                  <Descriptions.Item label="Type">{item.product_type}</Descriptions.Item>
                  <Descriptions.Item label="Price">Rs. {item.product_price_new}</Descriptions.Item>
                  <Descriptions.Item label="Quantity Ordered">{item.quantity} items</Descriptions.Item>
                  <Descriptions.Item label="Estimated Delivery">{item.estimated_delivery_days} day(s)</Descriptions.Item>
                  <Descriptions.Item label="Available Quantity">{item.quantity_available}</Descriptions.Item>
                  <Descriptions.Item label="Sizes Available">{item.sizes_available.join(', ')}</Descriptions.Item>
                </Descriptions>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default OrderPreview;
