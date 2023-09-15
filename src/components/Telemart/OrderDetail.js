import React from 'react';
import { get, isEmpty, isNil, isNull } from 'lodash';
import { Card } from 'react-bootstrap';
import Moment from 'moment';

const OrderDetail = ({ orderDetail, setIsOrderDetail }) => {
  const backOrder = () => {
    setIsOrderDetail(false);
  };
  const getTotal = (data) => {
    let shipping = isNull(get(data, 'totalDeliveryCharges', null)) ? 0 : get(data, 'totalDeliveryCharges', null);
    let pf = isNull(get(data, 'totalPlatformFee', 0)) ? 0 : get(data, 'totalPlatformFee', null);
    let total = isNull(get(data, 'totalPrice', null)) ? 0 : get(data, 'totalPrice', null);
    let serviceChr = isNull(get(data, 'totalServiceCharges', null)) ? 0 : get(data, 'totalServiceCharges', null);
    return shipping + pf + total + serviceChr;
  };
  return (
    <>
      <div className="container-fluid pb-3">
        <div className="order-quantity-details row">
          <div className="order-details col-lg-12">
            <h1 className="order-quantity-heading">Order # {get(orderDetail, 'orderId', null)}</h1>

            {get(orderDetail, 'orderItems', []).map((item, index) => (
              <>
                <Card className="order-quantity-container p-1 mt-3" key={`orrf${index}`}>
                  <Card.Img variant="top" className="order-details-image" src={item.productImageUrl} />
                  <Card.Body>
                    <Card.Text className="order-name">{`${item.productTitle}`}</Card.Text>

                    <Card.Text>
                      <span className="actual-price">{`Rs. ${item.productPrice}`}</span>
                      {isNil(item.actualPrice) ? '' : <span className="off-price">{`Rs. ${item.actualPrice}`}</span>}
                    </Card.Text>

                    <Card.Text>
                      <span className="quantity-name">Quantity</span>
                      <span className="quantity-number">{item.productQuantity}</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </>
            ))}
          </div>
          <div className="order-summary  mt-3">
            <p className="border-bottom"></p>

            <h1 className="order-summary-heading mt-3 mb-4">Order Summary</h1>
            <div className="order-details">
              <h5 className="rates">
                Ordered on <span>{Moment(get(orderDetail, 'orderDatetime', '')).format('Do MMM YYYY')}</span>
              </h5>
              <h5 className="rates">
                Delivered on{' '}
                <span>
                  {isNull(get(orderDetail, 'deliverTime', null)) ? 'N/A' : get(orderDetail, 'deliverTime', null)}
                </span>
              </h5>
              <h5 className="rates">
                Carrier Name{' '}
                <span>
                  {' '}
                  {isEmpty(get(orderDetail, 'carrierName', null)) ? 'N/A' : get(orderDetail, 'carrierName', null)}
                </span>
              </h5>
              <h5 className="rates">
                Tracking ID{' '}
                <span>
                  {isNull(get(orderDetail, 'trackingNumber', null)) ? 'N/A' : get(orderDetail, 'trackingNumber', null)}
                </span>
              </h5>
              <h5 className="rates">
                Status
                <span className="order-status badge bg-success">
                  {isEmpty(get(orderDetail, 'orderStatusName', null))
                    ? 'N/A'
                    : get(orderDetail, 'orderStatusName', null)}
                </span>
              </h5>
              <h5 className="rates">
                Reference # <span>{get(orderDetail, 'partnerOrderId', null)}</span>
              </h5>
              <h5 className="rates">
                Shipping Charges <span>Rs {get(orderDetail, 'totalDeliveryCharges', null)}</span>
              </h5>
              <h5 className="rates">
                Platform Charges <span>Rs {get(orderDetail, 'totalPlatformFee', null)}</span>
              </h5>
              {/* <h5 className="rates">
                Service Charges{' '}
                <span>
                  Rs{' '}
                  {isNull(get(orderDetail, 'totalServiceCharges', null))
                    ? '0.00'
                    : get(orderDetail, 'totalServiceCharges', null)}
                </span>
              </h5> */}
              <h5 className="border-bottom"></h5>
              <h5 className="rates">
                Subtotal {get(orderDetail, 'orderItems', []).length} <span>Rs {getTotal(orderDetail)}</span>
              </h5>
              <button className="order-quantity-button mt-3" onClick={backOrder}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderDetail;
