import React from 'react';
import { Collapse } from 'antd';
import './styles/FAQ.css'
import { WechatWorkOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const FAQ = () => {
  return (
    <div className="row m-0 justify-content-center faq-component">
        <div className="col-11 col-md-8 p-0 home_component_heading">
            <h2 className="text-center">Frequently Asked Questions</h2>
      <Collapse defaultActiveKey={['1']} 
      accordion 
      
      bordered={false} >
        <Panel header="How long has IJAZ CARPETS been in business?" key="1" >
          <p>We've proudly served our customers for more than 45 years, starting our journey in 1979.</p>
        </Panel>
        <Panel header="What type of rugs do you offer?" key="2">
          <p>At IJAZ CARPETS, we focus on offering a diverse range of carpets, including Iranian, Turkish, and Pakistani styles, each showcasing distinct patterns, colors, and designs.</p>
        </Panel>
        <Panel header="Where can I find IJAZ CARPET's physical store?" key="3">
          <p>Shop # 318 Landa Bazaar, near Babu Hotel, Naulakha, Lahore, Pakistan </p>
        </Panel>
        <Panel header="Can you help with custom carpet orders?" key="4">
          <p>Absolutely! We can assist with custom orders including specific sizes, colors, and materials. Contact us to discuss your requirements and get a quote.</p>
        </Panel>
        <Panel header="How do I choose the right carpet for my space?" key="5">
          <p>Choosing the right carpet depends on factors like the room’s usage, foot traffic, desired comfort level, and aesthetic preferences. Our expert staff can guide you through the selection process to find the perfect carpet for your needs.</p>
        </Panel>
      </Collapse>
      </div>
      </div>
  );
};

export default FAQ;
