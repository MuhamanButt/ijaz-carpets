import React, { useState, useEffect } from 'react';
import { Descriptions, Button } from 'antd';
import { CONVERT_TIMESTAMP_TO_DATE } from '../utils/Important_functions';

const OrderDetails = ({ order, onViewItems }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (<Descriptions
    title="Order Details"
    bordered
    column={windowWidth > 768 ? 2:1} // Use single column layout for more control
    style={{ margin: '0 auto', maxWidth: '1200px' }} // Center and limit width
  >
    <Descriptions.Item label="Order ID" style={{ padding: '10px', fontWeight: 'bold' }} > {order.order_id} </Descriptions.Item>
    <Descriptions.Item label="Creation Time" style={{ padding: '10px' }} > {CONVERT_TIMESTAMP_TO_DATE(order.creation_time)} </Descriptions.Item>
    <Descriptions.Item label="Name" style={{ padding: '10px' }} > {order.firstName} </Descriptions.Item>
    <Descriptions.Item label="Email" style={{ padding: '10px' }} > {order.email} </Descriptions.Item>
    <Descriptions.Item label="Phone" style={{ padding: '10px' }} > {order.phone} </Descriptions.Item>
    <Descriptions.Item label="City" style={{ padding: '10px' }} > {order.city} </Descriptions.Item>
    <Descriptions.Item label="Address" style={{ padding: '10px' }} > {order.address} </Descriptions.Item>
    <Descriptions.Item label="Postal Code" style={{ padding: '10px' }} > {order.postalCode} </Descriptions.Item>
    <Descriptions.Item label="Total Amount" style={{ padding: '10px' }} > {order.total_amount} </Descriptions.Item>
    <Descriptions.Item label="Transaction Image" style={{ padding: '10px' }} > <a href={order.transaction_url} target="_blank" rel="noopener noreferrer"> {order.transaction_url} </a> </Descriptions.Item>
    <Descriptions.Item label="Items" style={{ padding: '10px' }} >
      <Button onClick={() => onViewItems(order.items)}>View Items</Button>
    </Descriptions.Item>
  </Descriptions>)
};

export default OrderDetails;
