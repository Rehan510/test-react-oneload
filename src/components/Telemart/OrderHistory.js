import React, { useCallback, useState, useEffect } from 'react';
import { Tabs } from 'antd';
import CompletedOrders from './CompletedOrders';
import axios from 'axios';
import { get } from 'lodash';
import Spinner from './Spinner';
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isOrderDetail, setIsOrderDetail] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const onChange = (key) => {
    setOrderDetail(null);
    setIsOrderDetail(false);
  };

  const getOrderDetail = async (orderD) => {
    let resp = [];

    try {
      const data = await axios.post('/oneload-telemart-api/get-order-products', { orderId: orderD.orderId });
      const error = get(data, 'data.error', true);
      if (!error) {
        resp = get(data, 'data.data', []);
      }
      setOrderDetail({ ...orderD, orderItems: resp ,totalPlatformFee:20});
    } catch (error) {
      setOrderDetail(null);
    }
    setIsLoading(false);
  };
  const handleOrderDetail = (data) => {
    getOrderDetail(data);
    setIsOrderDetail(true);
    setIsLoading(true);
  };

  const getOrdersHistory = useCallback(async (dateString) => {
    let resp = [];
    setOrders([]);
    try {
      const data = await axios.post('/oneload-telemart-api/get-orders', {
        createdDateTime: dateString ? dateString : undefined,
        sort: 'DESC'
      });
      const error = get(data, 'data.error', true);
      if (!error) {
        resp = get(data, 'data.data', []);
      }
      setOrders(resp);
    } catch (error) {
      setOrders([]);
    }
    setIsLoading(false);
  }, []);
  const filterOrders = useCallback(
    (status) => {
      const data = orders.filter((o) => o.orderStatusId === status);
      return data;
    },
    [orders]
  );
  useEffect(() => {
    getOrdersHistory();
  }, [getOrdersHistory]);

  const handleCalender = (dateString) => {
    getOrdersHistory(dateString);
  };

  const items = [
    {
      key: 'all',
      label: `All`,
      children: (
        <CompletedOrders
          orders={orders}
          isOrderDetail={isOrderDetail}
          handleOrderDetail={handleOrderDetail}
          orderDetail={orderDetail}
          handleCalender={handleCalender}
          setIsOrderDetail={setIsOrderDetail}
          isChip={true}
        />
      )
    },
    {
      key: 'pending',
      label: `Pending`,
      children: (
        <CompletedOrders
          color={'#FF773B'}
          orders={filterOrders(1)}
          isOrderDetail={isOrderDetail}
          handleOrderDetail={handleOrderDetail}
          orderDetail={orderDetail}
          handleCalender={handleCalender}
          setIsOrderDetail={setIsOrderDetail}
          isChip={false}
        />
      )
    },
    {
      key: 'processing',
      label: `Processing`,
      children: (
        <CompletedOrders
          orders={filterOrders(2)}
          isOrderDetail={isOrderDetail}
          handleOrderDetail={handleOrderDetail}
          orderDetail={orderDetail}
          handleCalender={handleCalender}
          setIsOrderDetail={setIsOrderDetail}
          isChip={false}
        />
      )
    },
    {
      key: 'shipped',
      label: `Shipped`,
      children: (
        <CompletedOrders
          orders={filterOrders(3)}
          isOrderDetail={isOrderDetail}
          handleOrderDetail={handleOrderDetail}
          orderDetail={orderDetail}
          handleCalender={handleCalender}
          setIsOrderDetail={setIsOrderDetail}
          isChip={false}
        />
      )
    },

    {
      key: 'cancel/refund',
      label: `Cancel/Refund`,
      children: (
        <CompletedOrders
          orders={filterOrders(4)}
          isOrderDetail={isOrderDetail}
          handleOrderDetail={handleOrderDetail}
          orderDetail={orderDetail}
          handleCalender={handleCalender}
          setIsOrderDetail={setIsOrderDetail}
          isChip={false}
        />
      )
    },
    {
      key: 'Reconfirmation/Hold',
      label: `Reconfirmation/Hold`,
      children: (
        <CompletedOrders
          orders={filterOrders(5)}
          isOrderDetail={isOrderDetail}
          handleOrderDetail={handleOrderDetail}
          orderDetail={orderDetail}
          handleCalender={handleCalender}
          setIsOrderDetail={setIsOrderDetail}
          isChip={false}
        />
      )
    }
    // {
    //   key: 'refund',
    //   label: `Refund`,
    //   children: (
    //     <CompletedOrders
    //       orders={filterOrders('Cancel & Refund')}
    //       isOrderDetail={isOrderDetail}
    //       handleOrderDetail={handleOrderDetail}
    //       orderDetail={orderDetail}
    //       handleCalender={handleCalender}
    //       setIsOrderDetail={setIsOrderDetail}
    //     />
    //   )
    // }
  ];
  return (
    <>
      <div className="container-fluid">
        <Spinner status={loading} />
        <Tabs defaultActiveKey="all" items={items} onChange={onChange} />
      </div>
    </>
  );
};
export default OrderHistory;
