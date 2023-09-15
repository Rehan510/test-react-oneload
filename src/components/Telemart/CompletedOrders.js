import React from 'react';
import { Card } from 'react-bootstrap';
import Bucket from '../../assets/images/buckket.svg';
import { DatePicker } from 'antd';
import Badge from 'react-bootstrap/Badge';
import ContactUsCard from './ContactUsCard';
import OrderDetail from './OrderDetail';
import { get, isNull } from 'lodash';
import Moment from 'moment';

const CompletedOrders = ({
  orders,
  isOrderDetail,
  handleOrderDetail,
  orderDetail,
  handleCalender,
  setIsOrderDetail,
  isChip
}) => {
  const onChange = (date, dateString) => {
    // if (dateString) {
    handleCalender(dateString);
    // }
  };
  const disabledDate = (current) => {
    let data = false;
    if (current && current >= Moment().endOf('day')) {
      data = true;
    }
    if (current && current <= Moment().subtract(2, 'months')) {
      data = true;
    }
    return data;
  };

  const colors = {
    1: 'warning',
    2: 'success',
    3: 'success',
    4: 'danger',
    5: 'success'
  };
  const getTotal = (data) => {
    let shipping = isNull(get(data, 'totalDeliveryCharges', null)) ? 0 : get(data, 'totalDeliveryCharges', null);
    let pf = isNull(get(data, 'totalPlatformFee', 0)) ? 0 : get(data, 'totalPlatformFee', null);
    let total = isNull(get(data, 'totalPrice', null)) ? 0 : get(data, 'totalPrice', null);
    let serviceChr = isNull(get(data, 'totalServiceCharges', null)) ? 0 : get(data, 'totalServiceCharges', null);
    return shipping + pf + total + serviceChr;
  };
  const ordersHistory = () => {
    let history = (
      <>
        <div className="row">
          {orders?.map((orderData, index) => (
            <div className="col-12" key={`or${index}`}>
              <Card className="order-summary-container p-1 mt-3">
                <Card.Img variant="top" className="summary-image" src={Bucket} />
                <Card.Body
                  onClick={() => {
                    handleOrderDetail(orderData);
                  }}>
                  <Card.Text
                    className="order-tracking"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Order #{orderData.orderId}</span>
                    {isChip && (
                      <Badge className="order-status" bg={colors[get(orderData, 'orderStatusId', 'success')]}>
                        {orderData.orderStatusName}
                      </Badge>
                    )}
                  </Card.Text>
                  <Card.Text className="order-tracking">
                    <span>Reference # : {orderData.partnerOrderId}</span>
                  </Card.Text>

                  <Card.Text className="order-tracking">
                    <span> Tracking ID : {get(orderData, 'trackingNumber', null)}</span>
                  </Card.Text>
                  <Card.Text className="delivered-detail">
                    Order Placed : {Moment(get(orderData, 'orderDatetime', '')).format('Do MMM YYYY')}
                  </Card.Text>
                  <Card.Text
                    className="order-price"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                    <span>Total Amount : {getTotal(orderData)}</span>
                    <span className="order-price">({orderData.totalProducts} items)</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </>
    );
    if (orders.length < 1) {
      history = (
        <h5 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'grey' }}>
          No data found
        </h5>
      );
    }

    return history;
  };
  return (
    <>
      <div className="order-summary-detail row">
        <div className="order-details col-md-8 pb-3" style={{ maxHeight: '500px', height: '100%', overflowY: 'auto' }}>
          {isOrderDetail ? (
            <div>
              <OrderDetail orderDetail={orderDetail} setIsOrderDetail={setIsOrderDetail} />
            </div>
          ) : (
            <>
              <div className="input-group justify-content-end">
                <DatePicker className="custom-datepicker" disabledDate={disabledDate} onChange={onChange} />
              </div>
              {ordersHistory()}
            </>
          )}
        </div>
        <div className="col-md-4">
          <ContactUsCard />
        </div>
      </div>
    </>
  );
};
export default CompletedOrders;
