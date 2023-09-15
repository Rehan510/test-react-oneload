import React, { useState, useEffect } from 'react';

import { Nav } from 'react-bootstrap';

import { sideBarItems, getCurrentPath } from './sideBarItems';

import { useNavigate, useLocation } from 'react-router-dom';

export const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState('customercomunication');
  useEffect(() => {
    setSelectedItem(getCurrentPath(location.pathname));
  }, [location.pathname]);
  const handleSideBarItem = (item) => {
    setSelectedItem(item.key);
    navigate(item.to);
  };

  return (
    <Nav className="sidebar">
      {sideBarItems.map((item, index) => (
        <Nav.Item
          className={item.key === selectedItem ? 'active' : ''}
          key={`${index}item`}
          onClick={() => handleSideBarItem(item)}>
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </Nav.Item>
      ))}
    </Nav>
  );
};
