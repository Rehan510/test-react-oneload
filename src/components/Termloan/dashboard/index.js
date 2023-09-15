import React from 'react';
import Tabs from './Tabs';
import TabsComponents from './TabsComponents';
// import './assets/termloan/css/styles.min.css';
import '../../../assets/termloan/css/styles.min.css'
const TermLoan = () => {
  return (
    <div className="container mt-3">
      <Tabs />
      <TabsComponents />
    </div>
  );
};

export default TermLoan;
