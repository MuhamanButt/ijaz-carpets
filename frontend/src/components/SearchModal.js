import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';

const SearchModal = ({ isOpen, onClose }) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Drawer
      title="Search"
      placement="top"
      closable={true}
      onClose={() => {
        setOpen(false);
        if (onClose) onClose(); // Trigger parent close handler if provided
      }}
      open={open}
      height={200} // Set the height of the drawer
    >
      <p>Some search contents...</p>
      <p>Some more contents...</p>
      <p>Even more contents...</p>
    </Drawer>
  );
};

export default SearchModal;
