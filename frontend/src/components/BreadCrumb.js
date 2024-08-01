import React, { useEffect } from 'react';
import { Breadcrumb } from 'antd'; 
import { useNavigate } from 'react-router-dom';
const BreadCrumb = ({ items }) => {
    const navigate=useNavigate()
  return (

    <Breadcrumb className='mb-3'>
      {items.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.url ? <a onClick={()=>navigate(item.url)} style={{textDecoration:"none"}}>{item.title}</a> : item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumb;
