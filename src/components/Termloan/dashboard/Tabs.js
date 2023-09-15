import React from 'react';
import { TermLoanTabs } from './dashboardTabs';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTab } from '../../../reducers/termloans';

const Tabs = () => {
  const dispatch = useDispatch();
  const { selectedTab } = useSelector((state) => state.termAndLoanService);
  const handleTab = (tab) => {
    dispatch(setSelectedTab(tab));
  };
  return (
    <nav className="nav-tabs">
      <ul className="nav nav-pills">
        {TermLoanTabs.map((tabs, index) => (
          <li
            className="nav-item"
            key={`${index}tabs`}
            onClick={() => {
              handleTab(tabs.key);
            }}>
            <span className={`nav-link ${selectedTab === tabs.key ? 'active' : ''}`}>
              <img alt={tabs.key} src={tabs.icon} className="nav-icon" />
              <label className="nav-label">{tabs.label}</label>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Tabs;
