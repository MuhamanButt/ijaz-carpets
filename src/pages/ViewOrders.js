import React, { useState, useEffect } from 'react';
import { Spin, Modal, message, Table, Button, Tag, Select } from 'antd';
import { EditOutlined, EyeOutlined, ArrowRightOutlined, StarOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CONVERT_TIMESTAMP_TO_DATE } from '../utils/Important_functions';
import dayjs from 'dayjs';
import OrderEditForm from '../less_use/OrderEditForm';
import OrderDetails from '../less_use/OrderDetails'; // Import the new component
import { API_GET_ORDERS, API_UPDATE_ORDER } from '../api/api_orders';
import './styles/ViewOrders.css';

const { Option } = Select;

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [filter, setFilter] = useState([]);
  const [detailsOrder, setDetailsOrder] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setShowSpinner(true);
    try {
      const response = await API_GET_ORDERS();
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch orders.');
    } finally {
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (filter.length === 0) {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        (filter.includes('Completed') && order.is_completed) ||
        (filter.includes('Viewed') && !order.is_viewed) ||
        (filter.includes('Important') && order.is_important)
      );
      setFilteredOrders(filtered);
    }
  }, [filter, orders]);

  const handleEdit = (order) => {
    setSelectedOrder(order);
  };

  const handleSubmit = async (values) => {
    setShowSpinner(true);
    try {
      await API_UPDATE_ORDER(values);
      setOrders(orders.map((order) => (order.order_id === values.order_id ? values : order)));
      setFilteredOrders(filteredOrders.map((order) => (order.order_id === values.order_id ? values : order)));
      setSelectedOrder(null);
      message.success('Order updated successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to update order.');
    } finally {
      setShowSpinner(false);
    }
  };

  const showOrderDetails = (order) => {
    setDetailsOrder(order);
  };

  const handleItemClick = (items, record) => {
    navigate('/view-order', { state: { items, record } });
  };

  const statusTags = (order) => {
    const tags = [];
    if (order.is_important) tags.push({  color: 'red', icon: <StarOutlined /> });
    if (!order.is_viewed) tags.push({ color: 'orange', icon: <ExclamationCircleOutlined /> });
    if (order.is_completed) tags.push({  color: 'green', icon: <CheckCircleOutlined /> });
    return tags.map(tag => <Tag color={tag.color} key={tag.label} icon={tag.icon}>{tag.label}</Tag>);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const columns = [
    windowWidth > 850 &&{
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
      sorter: (a, b) => a.order_id.localeCompare(b.order_id),
    },
    {
      title: 'Creation',
      dataIndex: 'creation_time',
      key: 'creation_time',
      sorter: (a, b) => dayjs(a.creation_time).unix() - dayjs(b.creation_time).unix(),
      render: (text) => CONVERT_TIMESTAMP_TO_DATE(text),
    },
    windowWidth > 1075 && {
      title: 'Amount',
      dataIndex: 'total_amount',
      key: 'amount',
      sorter: (a, b) => a.total_amount - (b.total_amount),
    },
    {
      title: 'Tags',
      key: 'tags',
      render: (text, record) => (
        <>{statusTags(record)}</>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <EditOutlined onClick={() => handleEdit(record)} className='view-product-action-icon' />
          <EyeOutlined onClick={() => showOrderDetails(record)} className='view-product-action-icon' />
          <ArrowRightOutlined onClick={() => handleItemClick(record.items, record)} className='view-product-action-icon' />
        </>
      ),
    },
  ].filter(Boolean); 

  return (
    <div>
      {showSpinner && <Spin fullscreen />}
      <div className="row m-0">
        <div className="col p-0 px-5 pt-3 pt-sm-4 admin-heading">
          <p>Order Dashboard</p>
        </div>
      </div>
      <div className="row m-0 px-2">
        <div className="col-12 mb-3">
          <Select
            placeholder="Filter by tags"
            onChange={handleFilterChange}
            style={{ width: '100%' }}
            allowClear
            mode="multiple"
          >
            <Option value="Completed">Completed</Option>
            <Option value="Viewed">Viewed</Option>
            <Option value="Important">Important</Option>
          </Select>
        </div>
        <div className="col">
          <Table
            columns={columns}
            dataSource={filteredOrders}
            pagination={{ pageSize: 20 }}
            rowKey="order_id"
          />
          <Modal visible={!!selectedOrder} title="Edit Order" onCancel={() => setSelectedOrder(null)} footer={null} width={1000}>
            {selectedOrder && (
              <OrderEditForm order={selectedOrder} onSubmit={handleSubmit} />
            )}
          </Modal>
          <Modal visible={!!detailsOrder} onCancel={() => setDetailsOrder(null)} footer={null} width={1500}>
            {detailsOrder && (
              <OrderDetails order={detailsOrder} onViewItems={(items) => handleItemClick(items, detailsOrder)} />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
