import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserKyc } from './PrinterHtml';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
const TransactionDetail = () => {
  const navigate = useNavigate();
  const { transactionDetail } = useSelector((state) => state.telemartSlice);
  const printHTML = (data) => {
    if (!data) {
      return;
    }
    const htmlContent = UserKyc(data);
    const printWindow = window.open('', '', 'height=800px,width=900px');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, [600]);
  };
  return (
    <div className="container-fluid order-quantity-details transaction-detail">
      <strong>
        {' '}
        {`PKR ${get(
          transactionDetail,
          'amountPaid',
          ''
        )} have been successfully paid. Your order has been confirmed`}{' '}
      </strong>
      <div className="order-summary col-lg-5 ">
        <h1 className="order-summary-heading mt-3 mb-4">Transaction Details</h1>
        <div className="order-details">
          <h1 className="rates">
            Transaction Date <span>{get(transactionDetail, 'transactionDate', '')}</span>
          </h1>
          <h1 className="rates">
            Transaction Time <span>{get(transactionDetail, 'transactionTime', '')}</span>
          </h1>
          <h1 className="rates ">
            Transaction Ref No. <span>{get(transactionDetail, 'transactionRef', '')}</span>
          </h1>
          <h1 className="rates">
            Agent ID <span>{get(transactionDetail, 'agentId', '')}</span>
          </h1>
          <h1 className="rates">
            Order # <span>{get(transactionDetail, 'orderId', '')}</span>
          </h1>
          <h1 className="rates ">
            Amount <span> {get(transactionDetail, 'amountPaid', '')}</span>
          </h1>
          <h1 className="rates">
            Service <span>Telemart</span>
          </h1>
          {/* <h1 className="rates">
            Service Charges <span>{get(transactionDetail, 'serviceCharges', '0.00')}</span>
          </h1> */}
          <p className="transaction-border-bottom"></p>
          <h1 className="rates">
            Customer Name <span>{get(transactionDetail, 'customerName', '')}</span>
          </h1>
          <h1 className="rates">
            Customer Phone # <span>{get(transactionDetail, 'customerPhoneNumber', '')}</span>
          </h1>
          <h1 className="rates">
            CNIC <span>{get(transactionDetail, 'customerCNIC', '')}</span>
          </h1>
        </div>
        <div className="details-buttons mt-2">
          <Button className="back-button me-3" onClick={() => navigate('/telemart/home')}>
            Back
          </Button>
          <Button onClick={() => printHTML(transactionDetail)} className="print-button">
            Print
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
