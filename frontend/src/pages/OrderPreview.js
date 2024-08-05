import React from 'react';
import { List, Avatar, Col, Row } from 'antd';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DOMAIN_NAME } from '../values/Domain';
import './styles/OrderPreview.css'
import { CONVERT_TIMESTAMP_TO_DATE, GENERATE_URL } from '../utils/Important_functions';

const OrderPreview = () => {
  const location = useLocation();
  const { items,record } = location.state || { items: [] };
  console.log(record)
  const navigate=useNavigate()

  // Function to safely parse JSON strings
  const safeJsonParse = (jsonString) => {
    try {
      // Replace single quotes with double quotes and fix booleans
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



  const handleProductClick = (item)=> {
        navigate(GENERATE_URL(item.product_type,item.product_id))
  }
  return (
    <div className="container my-5">
<div>
                <p><strong>Order ID:</strong> {record?.order_id}</p>
                <p><strong>Creation Time:</strong> {CONVERT_TIMESTAMP_TO_DATE(record?.creation_time)}</p>
                <p><strong>Name:</strong> {record?.firstName}</p>
                <p><strong>Email:</strong> {record?.email}</p>
                <p><strong>Phone:</strong> {record?.phone}</p>
                <p><strong>Address:</strong> {record?.address}</p>
                <p><strong>City:</strong> {record?.city}</p>
                <p><strong>Postal Code:</strong> {record?.postalCode}</p>
                <p><strong>Total Amount:</strong> {record?.total_amount}</p>
                <p><strong>Transaction Image:</strong> <a href={record?.transaction_url} target="_blank" rel="noopener noreferrer">{record?.transaction_url}</a></p>
              </div>

      <h2 className="mb-4">Order Items</h2>
      <List itemLayout="horizontal" dataSource={parsedItems} renderItem={(item, index) => (
          <List.Item onClick={()=>handleProductClick(item)}>
            <List.Item.Meta avatar={<Avatar  src={item.images_url[0]}   className='order-preview-item' />}
              title={item.product_name}
              description={
                <>
                  <p><strong>Type:</strong> {item.product_type}</p>
                  <p><strong>Price:</strong> Rs. {item.product_price_new}</p>
                  <p><strong>Quantity Ordered:</strong> {item.quantity} items</p>
                  <p><strong>Estimated Delivery:</strong> {item.estimated_delivery_days} day(s)</p>
                  <p><strong>Available Quantity:</strong> {item.quantity_available}</p>
                  <p><strong>Sizes Available:</strong> {item.sizes_available.join(', ')}</p>
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default OrderPreview;
