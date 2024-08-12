import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { API_SEND_MESSAGE } from '../api/api_message';

const ContactForm = ({ product_id }) => {
  const [form] = Form.useForm();

  // Function to handle form submission
  const onFinish = async (values) => {
const url = new URL(window.location.href);
    const formData = { ...values, product_url:url.pathname};

    try {
      // Send form data to the API
      await API_SEND_MESSAGE(formData)
      form.resetFields();
    } catch (error) {
      message.error('Failed to send message');
    }
  };

  // Custom validation rule for ensuring either contact_number or email is provided
  const validateContactOrEmail = (_, value) => {
    const { contact_number, email } = form.getFieldsValue();
    if (!contact_number && !email) {
      return Promise.reject('Either contact number or email is required');
    }
    return Promise.resolve();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ contact_number: '', email: '', message: '' }}
      className='pt-2'
    >
   
   <div className="row">
    <div className="col-11 col-md-6 ">
    <Form.Item
        name="contact_number"
        label="Contact Number"
        rules={[
          {
            validator: validateContactOrEmail,
          },
        ]}
      >
        <Input placeholder="Enter your contact number" />
      </Form.Item>
    </div>
    <div className="col-11 col-md-6">
    <Form.Item
        name="email"
        label="Email"
        rules={[ { type: 'email', message: 'The input is not a valid email', },  {  validator: validateContactOrEmail, }, ]} >
        <Input placeholder="Enter your email" />
      </Form.Item>

    </div>
   </div>
     

     
      <Form.Item
        name="message"
        
        label="Message"
        rules={[
          {
            required: true,
            message: 'Message is required',
          },
          {
            
            max:500,
            message:"Message size must be less than 500 characters"
          }
        ]}
      >
        <Input.TextArea rows={4} placeholder="Enter your message" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
