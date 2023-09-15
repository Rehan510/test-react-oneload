import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

const PaymentInstallments = ({
  changePlanHandler,
  cardData,
  changePayment,
  handleRadioChange,
  repaymentAmountHandler,
  totalAmount,
  partialPayment,
  handleAmountChange
}) => {
  return (
    <div className="repayment-wrapper">
      <div className="status-card p-0">
        <ul className="more-info">
          <li>
            <strong className="total-amount">Total Amount</strong>
            <span>Rs {get(cardData, 'totalLoanAmount', "0").toLocaleString()}</span>
          </li>
          <li>
            <strong>Principal Amount</strong>
            <span>Rs {get(cardData, 'principleAmount', "0").toLocaleString()}</span>
          </li>

          <details>
            <summary className="d-flex justify-content-between">
              <strong>Service Charges</strong>
              <span>Rs {get(cardData, 'serviceCharges', "0").toLocaleString()}</span>
            </summary>
            <div className="ms-3">
              <li>
                <strong>Regular Fee</strong>
                <span>Rs {get(cardData, 'regularFee', "0").toLocaleString()}</span>
              </li>
              <li>
                <strong>Processing Fee</strong>
                <span>Rs {get(cardData, 'processingFee', "0").toLocaleString()}</span>
              </li>
            </div>
          </details>
          <li>
            <strong>Late Fee</strong>
            <span>Rs {get(cardData, 'lateFee', "0").toLocaleString()}</span>
          </li>
          <li>
            <strong>Due Date</strong>
            <span>{moment(get(cardData, 'dueDate', new Date())).format('DD/MM/YYYY')} 23:59:59</span>
          </li>
        </ul>
      </div>

      <div className="d-flex gap-4 mt-4">
        {['Full Repayment', 'Partial Repayment'].map((res) => (
          <div key={`default-radio-${res}`} className="mb-3 d-flex align-items-center">
            <input
              type="radio"
              id={`default-radio-${res}`}
              name="radio-group"
              value={res}
              onChange={handleRadioChange}
              checked={res === changePayment}
            />
            <label className="ms-1 radio-button-label" htmlFor={`default-radio-${res}`}>
              {res}
            </label>
          </div>
        ))}
      </div>
      {changePayment !== 'Full Repayment' && (
        <>
          <div className="installment-amount">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                onChange={handleAmountChange}
                value={partialPayment}
                type="text"
                maxLength={'15'}
                placeholder="Enter amount here"
              />
            </Form.Group>
          </div>
          <div className="total-amount1 mt-4">
            <p className="amount">Total Outstanding Amount</p>
            <p className="amount-rs">Rs {totalAmount}</p>
          </div>
        </>
      )}
      <div className="mt-5">
        <Button className="back-button" onClick={changePlanHandler}>
          Back
        </Button>
        <Button className="next-button" onClick={repaymentAmountHandler}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaymentInstallments;
