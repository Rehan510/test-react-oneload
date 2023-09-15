import React, { useState } from 'react';
import SummaryCard from './SummaryCard';
import BuyerDialog from './Dialog/BuyerDialog';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItems';
import CustomerDetailFrom from './CustomerDetailFrom';
import CustomerDetail from './CustomerDetail';
import TransactionDetail from './TransactionDetail';
import { get, isNil } from 'lodash';
import { getProductPrice } from '../../utils/helpers';
import KycDialouge from './Dialog/KycDialouge';
import config from '../../config/config';
import axios from 'axios';
import { toast } from 'react-toastify';
import BalanceDialog from './Dialog/BalnceDialog';
import Spinner from '../../components/Telemart/Spinner';
import {
  setSelectedScreen,
  setIsSelfBuyer,
  setCustomerDetail,
  setTransationDetail,
  setUpdateCartItems
} from '../../reducers/telemart';
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const navigate = useNavigate();
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isKycPopup, setIsKycPopup] = useState(false);
  const [isBalancePopup, setIsBalancePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogMsg, setDialogMsg] = useState('');
  const { selectedScreen, cartItems, userDetail, isSelfBuyer, billDetail, customer } = useSelector(
    (state) => state.telemartSlice
  );
  const handleShowPopup = (status) => {
    setIsShowPopup(status);
  };

  const kycStatus = {
    2: 'submitted',
    3: 'approved'
  };
  const getBalance = async () => {
    setLoading(true);
    let balance = 0;
    try {
      const data = await axios.post('/oneload-telemart-api/balance', {
        loggedinUsername: get(userDetail, 'userName', ''),
        channelId: 'WEB',
        subChannel: 'ONELOAD'
      });
      const error = get(data, 'data.error', true);
      if (!error) {
        balance = get(data, 'data.data', 0);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

    return balance;
  };

  const handleSubmit = async () => {
    toast.dismiss();
    const userBalance = await getBalance();
    if (userBalance > get(billDetail, 'totalAmountPay', 0)) {
      setIsBalancePopup(true);
    } else {
      toast.error("You don't have sufficient balance");
    }
  };

  const kycStatusHandler = () => {
    return kycStatus[get(userDetail, 'userKycStatus', null)];
  };

  const checkUserDetail = (isCustomer = false) => {
    const customerBuyer = {
      Kyc: kycStatusHandler() === 'approved' || kycStatusHandler() === 'submitted',
      Address: isNil(userDetail['address']) ? null : userDetail['address']
    };
    const selfBuyer = {
      Email: isNil(userDetail['email']) ? null : userDetail['email'],
      CnicNo: isNil(userDetail['cnicNumber']) ? null : userDetail['cnicNumber'],
      ...customerBuyer
    };
    const dataCheck = isCustomer ? customerBuyer : selfBuyer;
    const propertyToShow = Object.keys(dataCheck).find((key) => !dataCheck[key]);
    setDialogMsg(propertyToShow);
    return propertyToShow;
  };
  const customerModal = () => {
    if (!checkUserDetail(true)) {
      setIsShowPopup(false);
      // setIsShowPopup1(true);
      dispatch(setIsSelfBuyer(false));
      dispatch(setCustomerDetail(null));
      dispatch(setSelectedScreen('customer-detail-form'));
      return;
    }
    setIsKycPopup(true);
  };

  const handleBackBtn = () => {
    let screen = isSelfBuyer ? 'cart-items' : 'customer-detail-form';
    dispatch(setSelectedScreen(screen));
  };
  const confirmPayment = async () => {
    setLoading(true);
    let resp = null;
    toast.dismiss();
    const productForPlaceOrderDTOS = cartItems.map((data) => {
      return {
        productId: data.productId,
        productQuantity: data.quantity,
        productPrice: getProductPrice(data),
        attributes: []
      };
    });
    let payload = {
      productForPlaceOrderDTOS: productForPlaceOrderDTOS,
      comment: 'oneload telemart',
      isSelfOrder: isSelfBuyer,
      cityId: get(userDetail, 'businessCityId', '')
    };
    let contactNo = get(customer, 'phoneNumber', '').replace(/^./, '+92');
    if (!isSelfBuyer) {
      payload.oneloadCustomer = {
        name: get(customer, 'name', ''),
        email: get(customer, 'email', ''),
        mobile: contactNo,
        cnic: get(customer, 'cnic', '')
      };
    }

    try {
      const data = await axios.post('/oneload-telemart-api/place-order', payload, {
        headers: { channelId: 'WEB' }
      });
      const error = get(data, 'data.error', true);

      if (!error) {
        resp = get(data, 'data.data', null);
        setIsBalancePopup(false);
        toast.success('Congrats your order has been placed', { theme: 'colored', autoClose: 250 });
        dispatch(setTransationDetail(resp));
        const userId = localStorage.getItem('user');
        localStorage.setItem(`cartItems${userId}`, JSON.stringify([]));
        dispatch(setUpdateCartItems([]));
        dispatch(setSelectedScreen('transaction-detail'));
        dispatch(setCustomerDetail(null));
      } else {
        toast.error('Sorry, Something went wrong.Please try again later', { theme: 'colored', autoClose: 400 });
        dispatch(setTransationDetail(null));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setIsBalancePopup(false);
      dispatch(setTransationDetail(null));
      toast.error('something went wrong', { theme: 'colored' });
    }
  };

  const customerModalBalanceCheck = () => {
    confirmPayment();
  };

  const getTotalByProduct = (array) => {
    const data = array.map((v) => {
      return {
        ...v,
        total: getProductPrice(v) * v.quantity
      };
    });
    return data;
  };
  const getTotalPrice = (array) => {
    const data = getTotalByProduct(array);
    const sum = data.reduce((accumulator, object) => {
      return accumulator + object.total;
    }, 0);
    return sum;
  };
  const amountPayable = () => {
    const amout =
      getTotalPrice(cartItems) +
      get(userDetail, 'shippingCharges', 0) +
      get(userDetail, 'platformFee', 0) +
      get(userDetail, 'serviceCharges', 0);
    return amout;
  };

  const closeKycDialouge = () => {
    setIsKycPopup(false);
    setIsShowPopup(false);
  };

  const selfModal = () => {
    if (!checkUserDetail()) {
      handleShowPopup(false);
      dispatch(setIsSelfBuyer(true));
      dispatch(setSelectedScreen('customer-detail'));
      return;
    }
    setIsKycPopup(true);
  };

  const handleGoToSetting = () => {
    setIsKycPopup(false);
    setIsShowPopup(false);
    window.parent.location.href = config.setttingUrl;
  };

  const screens = {
    'cart-items': <CartItem />,
    'customer-detail-form': <CustomerDetailFrom />,
    'customer-detail': <CustomerDetail />,
    'transaction-detail': <TransactionDetail />
  };

  const CartItemsBtn = () => {
    return (
      <>
        <Button
          variant="light"
          className="continue-shopping me-3"
          onClick={() => {
            navigate('/telemart/home');
          }}>
          CONTINUE SHOPPING
        </Button>
        {cartItems.length > 0 ? (
          <Button
            className="checkout-button"
            onClick={() => {
              handleShowPopup(true);
            }}>
            CHECKOUT
          </Button>
        ) : null}
      </>
    );
  };

  const CustomerDetailBtn = () => {
    return (
      <>
        <Button
          type="button"
          className="btn btn-primary me-3 custom-back-button"
          onClick={() => {
            handleBackBtn();
          }}>
          Back
        </Button>
        <Button type="button" className="btn custom-next-button" onClick={handleSubmit}>
          Confirm Payment
        </Button>
      </>
    );
  };

  const screensBtn = {
    'cart-items': <CartItemsBtn />,
    'customer-detail-form': <></>,
    'customer-detail': <CustomerDetailBtn />,
    'transaction-detail': <></>
  };

  return (
    <section className="cart-items">
      <Spinner status={loading} />
      <KycDialouge
        isShowPopup1={isKycPopup}
        closeKycDialouge={closeKycDialouge}
        customerModal={handleGoToSetting}
        propertyToShow={dialogMsg}
      />
      <BalanceDialog
        setIsShowPopup={setIsBalancePopup}
        customerModal={customerModalBalanceCheck}
        isShowPopup={isBalancePopup}
      />
      <BuyerDialog
        handleShowPopup={handleShowPopup}
        customerModal={customerModal}
        isShowPopup={isShowPopup}
        selfModal={selfModal}
      />

      <div className="container-fluid">
        <div className="customerDetail row">
          <div className="col-md-6">{get(screens, selectedScreen, null)}</div>
          <div className="col-md-6 ">
            <div className="cart-order-cart">
              {cartItems.length > 0 ? (
                <SummaryCard
                  data={{
                    subTotal: getTotalPrice(cartItems),
                    amountPayable: amountPayable(),
                    delieveryCharges: get(userDetail, 'shippingCharges', 0),
                    platfromFee: get(userDetail, 'platformFee', 0),
                    serviceCharges: get(userDetail, 'serviceCharges', 0)
                  }}
                />
              ) : null}
              <div className="button-group mt-3">{get(screensBtn, selectedScreen, null)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
