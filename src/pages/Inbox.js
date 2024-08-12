import React, { useState, useEffect } from 'react';
import { Spin, Table, Tag, Button, Popconfirm, message, Select, Modal, Form, Checkbox, Input } from 'antd';
import { ExclamationCircleOutlined, DeleteOutlined, EditOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons';
import { API_GET_ALL_MESSAGES, API_DELETE_MESSAGE, API_UPDATE_MESSAGE } from '../api/api_message';
import './styles/Inbox.css';
import { DOMAIN_NAME, FRONTEND_DOMAIN_NAME } from '../values/Domain';

const { Option } = Select;

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);
  const [viewingMessage, setViewingMessage] = useState(null);
  const [form] = Form.useForm();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await API_GET_ALL_MESSAGES();
      if (response) {
        setMessages(response);
        setFilteredMessages(response);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (filter.length === 0) {
      setFilteredMessages(messages);
    } else {
      const filtered = messages.filter(message =>
        (filter.includes('Important') && message.is_important) ||
        (filter.includes('Viewed') && message.is_viewed)
      );
      setFilteredMessages(filtered);
    }
  }, [filter, messages]);

  const handleDelete = async (message_id) => {
    try {
      const success = await API_DELETE_MESSAGE(message_id);
      if (success) {
        message.success('Message deleted successfully.');
        fetchMessages(); // Refetch messages after deletion
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
      message.error('Failed to delete message.');
    }
  };

  const handleEdit = async (values) => {
    try {
      const updatedMessage = await API_UPDATE_MESSAGE(values);
      if (updatedMessage) {
        message.success('Message updated successfully.');
        fetchMessages(); // Refetch messages after update
        setEditingMessage(null);
      }
    } catch (error) {
      console.error('Failed to update message:', error);
      message.error('Failed to update message.');
    }
  };

  const statusTags = (message) => {
    const tags = [];
    if (message.is_important) tags.push({ color: 'red', icon: <StarOutlined />, });
    if (!message.is_viewed) tags.push({ color: 'orange', icon: <ExclamationCircleOutlined />,  });
    return tags.map(tag => <Tag color={tag.color} icon={tag.icon} key={tag.label}>{tag.label}</Tag>);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleView = (record) => {
    setViewingMessage(record);
  };

  const columns = [
    windowWidth > 850 && {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    windowWidth > 850 && {
      title: 'Number',
      dataIndex: 'contact_number',
      key: 'contact_number',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (text) => <div style={{ wordBreak: 'break-word', whiteSpace: 'normal', maxWidth: '200px' }}>{`${text?.slice(0, 50)}...`}</div>,
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
          <EyeOutlined onClick={() => handleView(record)} className='view-product-action-icon' />
          <EditOutlined onClick={() => { 
            form.setFieldsValue({ 
              ...record, 
              is_important: record.is_important, 
              is_viewed: record.is_viewed 
            }); 
            setEditingMessage(record); 
          }} className='view-product-action-icon' />
          <Popconfirm 
            title="Are you sure you want to delete this message?" 
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />} 
            onConfirm={() => handleDelete(record.message_id)} 
            okText="Yes" 
            cancelText="No"
          > 
            <DeleteOutlined className='view-product-action-icon' />
          </Popconfirm>
        </>
      ),
    },
  ].filter(Boolean);

  return (
    <div>
      {loading && <Spin fullscreen />}
      <div className="row m-0">
        <div className="col p-0 px-5 pt-3 pt-sm-4 admin-heading">
          <p>Inbox</p>
        </div>
      </div>
      <div className="row m-0 px-2">
        <div className="col-12 mb-3 p-0">
          <Select
            placeholder="Filter by tags"
            onChange={handleFilterChange}
            style={{ width: '100%' }}
            allowClear
            mode="multiple"
          >
            <Option value="Important">Important</Option>
            <Option value="Viewed">Viewed</Option>
          </Select>
        </div>
        <div className="col p-0">
          <Table
            columns={columns}
            dataSource={filteredMessages}
            pagination={{ pageSize: 20 }}
            rowKey="message_id"
          />
        </div>
      </div>
      <Modal
        visible={!!editingMessage}
        title="Edit Message"
        onCancel={() => setEditingMessage(null)}
        footer={null}
      >
        {editingMessage && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleEdit}
            initialValues={{
              ...editingMessage,
              is_important: editingMessage?.is_important ?? false,
              is_viewed: editingMessage?.is_viewed ?? false,
            }}
          >
            <Form.Item
              name="message_id"
              label="Message ID"
              hidden
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="is_important"
              label="Mark as Important"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
            <Form.Item
              name="is_viewed"
              label="Mark as Viewed"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
      <Modal
        visible={!!viewingMessage}
        title="Message Details"
        onCancel={() => setViewingMessage(null)}
        footer={null}
      >
        {viewingMessage && (
          <div>
            <p><strong>Email:</strong> {viewingMessage.email}</p>
            <p><strong>Contact Number:</strong> {viewingMessage.contact_number}</p>
            <p><strong>Message:</strong> {viewingMessage.message}</p>
            <p><strong>Tags:</strong> {statusTags(viewingMessage)}</p>
            <p><strong>Product URL:</strong> <a href={`${FRONTEND_DOMAIN_NAME}${viewingMessage.product_url}`}>{DOMAIN_NAME}{viewingMessage.product_url}</a></p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Inbox;
