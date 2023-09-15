import { get } from 'lodash';
import moment from 'moment/moment';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const TotalCashReq = ({ changeCompHandler, totalDays }) => {
  const { applyLoanData } = useSelector((state) => state.termAndLoanService);

  return (
    <div>
      <div className="status-card p-0">
        <ul className="more-info">
          <li>
            <strong>Total Amount</strong>
            <span>Rs {get(applyLoanData, 'totalLoanAmount', "0").toLocaleString()}</span>
          </li>
          <li>
            <strong>Principle Amount</strong>
            <span>Rs {get(applyLoanData, 'principleLoanAmount', "0").toLocaleString()}</span>
          </li>
          <li>
            <strong>Service Charges</strong>
            <span>Rs {get(applyLoanData, 'loanServiceCharge', "0").toLocaleString()}</span>
          </li>
          <li>
            <strong>Chosen Plan</strong>
            <span>{get(totalDays, 'value', "0").toLocaleString()} days</span>
          </li>
          <li>
            <strong>Due Date</strong>
            <span>{moment(get(applyLoanData, 'loanDueDate', new Date())).format('DD/MM/YYYY')} 23:59:59</span>
          </li>
        </ul>
      </div>
      <p className="claimer-detail mt-4">
        <b>
          Disclaimer:
          <br />
        </b>
        Muqarar tareekh kai baad late fees lagu ho gi.
      </p>

      <Button className="next-button mt-5" onClick={() => changeCompHandler('otpScreen')}>
        Next
      </Button>
    </div>
  );
};

export default TotalCashReq;
