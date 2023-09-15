import React from 'react';
import { get, isNil } from 'lodash';
import { useSelector } from 'react-redux';
const SummaryCard = ({ data }) => {
  const { cartItems } = useSelector((state) => state.telemartSlice);

  return (
    <div className="order-summary">
      <p className="order-heading">Order Summary</p>
      <div className="leftDetails">
        <p className="summary-heading">PRICE DETAILS</p>
        <hr />
        <div className="des-detail">
          <p className="rates">
            Subtotal ({cartItems.length} Items) <span>Rs {get(data, 'subTotal', 0)}</span>
          </p>
          <p className="rates">
            Delivery Charges <span>Rs {get(data, 'delieveryCharges', 0)} </span>
          </p>
          <p className="rates">
            Platform Charges <span>Rs {isNil(data['platfromFee']) ? 0 : data['platfromFee']}</span>
          </p>
          <p className="rates">
            Service Charges <span>Rs {isNil(data['serviceCharges']) ? 0 : data['serviceCharges']}</span>
          </p>
          <hr className="new2" />
          <p className="rates">
            Amount Payable <span>Rs {get(data, 'amountPayable', 0)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
