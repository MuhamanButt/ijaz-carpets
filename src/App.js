import React, { useState } from 'react';
import './App.css';
import ProjectRoutes from './utils/ProjectRoutes';
import { FloatButton, Button } from 'antd';
import { WhatsAppOutlined, CloseOutlined } from '@ant-design/icons';

function App() {
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    window.open('https://wa.me/923224922848', '_blank');
  };

  const handleTooltipClose = () => {
    setVisible(false);
  };

  return (
    <div className="Appnav">
      <ProjectRoutes />
      {visible && (
        <div className="message-container">
          <span className="message-text">How may I help you?</span>
          <Button 
            type="text" 
            icon={<CloseOutlined />} 
            onClick={handleTooltipClose} 
            className="close-button" 
          />
        </div>
      )}
      <FloatButton 
        icon={<WhatsAppOutlined style={{ color: "white" }} />} 
        onClick={handleClick} 
      />
    </div>
  );
}

export default App;
