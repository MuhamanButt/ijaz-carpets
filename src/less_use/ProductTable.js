import React, { useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import ProductDetails from './ProductDetails';
import { CONVERT_TIMESTAMP_TO_DATE, getColumnSearchProps } from '../utils/Important_functions';
import dayjs from 'dayjs'; // Import dayjs for date formatting

const ProductTable = ({ products, onEdit, onDelete }) => {
  const [expandedRowKey, setExpandedRowKey] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to convert creation time to Unix timestamp
  const toTimestamp = (creationTime) => {
    return dayjs(creationTime).unix();
  };

  const columns = [
    windowWidth > 500 &&{
      title: 'Product Type',
      dataIndex: 'product_type',
      key: 'product_type',
      sorter: (a, b) => a.product_type.localeCompare(b.product_type),
      ...getColumnSearchProps('product_type'),
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
      ...getColumnSearchProps('product_name'),
    },
    windowWidth > 768 && {
      title: 'Creation',
      dataIndex: 'creation_time',
      key: 'creation_time',
      sorter: (a, b) => toTimestamp(a.creation_time) - toTimestamp(b.creation_time), // Sort by timestamp
      render: (text) => CONVERT_TIMESTAMP_TO_DATE(text), // Format creation time
      ...getColumnSearchProps('creation_time'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <EditOutlined onClick={() => onEdit(record)} className='me-2' />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => onDelete(record.product_id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className='me-2 py-2' />
          </Popconfirm>
          {record.hide ? <EyeInvisibleOutlined /> : null}
        </>
      ),
    }
  ].filter(Boolean); // Filter out undefined columns based on windowWidth

  const expandedRowRender = (record) => (
    <ProductDetails product={record} />
  );

  const handleExpand = (expanded, record) => {
    setExpandedRowKey(expanded ? record.key : null);
  };

  return (
    <Table
      columns={columns}
      dataSource={products}
      pagination={{ pageSize: 20 }}
      rowKey="product_id" // Ensure unique key for each row
      expandable={{
        expandedRowRender: (record) => expandedRowRender(record),
        rowExpandable: (record) => record.name !== 'Not Expandable',}}
    />
  );
};

export default ProductTable;
