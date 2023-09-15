import { get } from 'lodash';
import React from 'react';
import '../../../assets/termloan/css/styles.min.css'

const StatusCard = ({ status, responseData }) => {
  return (
    <div className="status-card p-0">
      <ul className="more-info">
        <li>
          <strong>Status</strong>
          <span className={`status-${status !== 'Eligible' ? 'error' : 'tag'}`}>{status}</span>
        </li>
        <li>
          <strong>Total Credit Limit</strong>
          <span>{get(responseData, 'eligibleAmount', "0").toLocaleString()} PKR</span>
        </li>
        <li>
          <strong>Remaining Credit Limit</strong>
          <span>{get(responseData, 'availableLoanAmount', "0").toLocaleString()} PKR</span>
        </li>
        <li>
          <strong>Outstanding Balance</strong>
          <span>{get(responseData, 'loanOutstandingAmount', "0").toLocaleString()} PKR</span>
        </li>
      </ul>
    </div>
  );
};

export default StatusCard;
