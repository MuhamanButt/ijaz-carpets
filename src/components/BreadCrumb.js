import React from 'react';
import { Breadcrumb } from 'antd'; 
import { useNavigate } from 'react-router-dom';
import './styles/BreadCrumb.css'; // Import the CSS file

const BreadCrumb = ({ items }) => {
  const navigate = useNavigate();
  return (
    <div className="breadcrumb-container">
      <Breadcrumb className="breadcrumb" data-aos="fade-right">
        {items.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.url ? (
              <a onClick={() => navigate(item.url)} style={{ textDecoration: "none" }}>
                {item.title}
              </a>
            ) : (
              item.title
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
