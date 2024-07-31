import React, { useEffect } from 'react';
import { Breadcrumb } from 'antd'; 

const BreadCrumb = ({ items }) => {
  return (

    <Breadcrumb className='mb-3'>
      {items.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.url ? <a href={item.url} style={{textDecoration:"none"}}>{item.title}</a> : item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumb;
