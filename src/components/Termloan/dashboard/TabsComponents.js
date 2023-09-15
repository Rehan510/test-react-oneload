import React from 'react';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard';
import RequestCash from '../request-cash';
import Repayments from '../repayments';
import Unsubscribe from '../unscubscibe';
import FaqsAccordion from '../faqs';
const TabsComponents = () => {
  const { selectedTab } = useSelector((state) => state.termAndLoanService);

  const table = {
    dashboard: <Dashboard />,
    requestcash: <RequestCash />,
    repayments: <Repayments />,
    faqs: <FaqsAccordion />,
    unsubscribe: <Unsubscribe />
  };
  return <div className="tab-container ">{table[selectedTab]}</div>;
};
export default TabsComponents;
