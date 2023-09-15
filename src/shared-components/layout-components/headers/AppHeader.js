import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import searchIcon from '../../../assets/images/searchIcon.svg';
import cartIcon from '../../../assets/images/cartIcon.png';
import CategoryDropDown from '../../../components/Telemart/CategoryDropDown';
import { useSelector, useDispatch } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import {
  setSelectedScreen,
  setBillDetail,
  setSearchProducts,
  setSimilarProducts,
  setSearchProductTotal,
  setSearchedProduct
} from '../../../reducers/telemart';
import { toast } from 'react-toastify';
import Spinner from '../../../components/Telemart/Spinner';
import axios from 'axios';
import { get, debounce } from 'lodash';
import { statusCode, getProductFinalPrice } from '../../../utils/helpers';
export const AppHeader = () => {
  const {
    cartItems,
    userDetail,
    searchProductLabel,
    searchProductCurrentPage,
    searchProductPageSize,
    searchedProduct
  } = useSelector((state) => state.telemartSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const api = useRef(null);
  const input = useRef(null);
  const clearButton = () => {
    input.current.value = '';
    dispatch(setSearchedProduct(null));
  };
  useEffect(() => {
    const delieveryCharges = get(userDetail, 'shippingCharges', 0);
    const platfromFee = get(userDetail, 'platformFee', 0);
    const serviceCharges = get(userDetail, 'serviceCharges', 0);
    const getTotalByProduct = (array) => {
      const data = array.map((v) => {
        return {
          ...v,
          total: getProductFinalPrice(v) * v.quantity
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
      const amout = getTotalPrice(cartItems) + delieveryCharges + serviceCharges + platfromFee;
      return amout;
    };
    dispatch(setBillDetail({ totalAmountPay: amountPayable(), totalPrice: getTotalPrice(cartItems) }));
  }, [dispatch, cartItems, userDetail]);

  const getSearchProduct = useCallback(async () => {
    if (!searchedProduct) {
      input.current.value = '';
      dispatch(setSearchProductTotal(1));
      return;
    }
    toast.dismiss();
    setLoading(true);

    if (api.current) {
      api.current.abort();
    }
    const controller = new AbortController();
    api.current = controller;
    let resp = [];
    try {
      const data = await axios.post(
        '/oneload-telemart-api/get-products',
        {
          productTitle: searchedProduct,
          pageNumber: searchProductCurrentPage - 1,
          pageSize: searchProductPageSize,
          sortingDirection: get(searchProductLabel, 'sort', undefined),
          fetchTypeName: get(searchProductLabel, 'fetchTypeName', undefined)
        },
        { signal: controller.signal }
      );
      const error = statusCode[get(data, 'data.error', true)];
      if (!error) {
        resp = get(data, 'data.data', []);
      }
      if (resp.length < 1) {
        toast.error('no result found', {
          theme: 'colored',
          autoClose: 200
        });
        setLoading(false);
        return;
      }
      dispatch(setSimilarProducts(resp));
      dispatch(setSearchProducts(resp));
      dispatch(setSearchProductTotal(get(data, 'data.totalElements', 1)));
      navigate('/telemart/searchProduct');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setSearchProducts([]));
      dispatch(setSearchProductTotal(1));
      dispatch(setSimilarProducts([]));
    }
  }, [searchedProduct, searchProductPageSize, searchProductCurrentPage, searchProductLabel, dispatch]);
  const handleCart = () => {
    toast.dismiss();
    if (cartItems.length < 1) {
      toast.error('Your cart is empty', {
        theme: 'colored',
        autoClose: 200
      });
      return;
    }
    dispatch(setSelectedScreen('cart-items'));
    navigate('/telemart/cart');
  };

  const handleChange = debounce((e) => dispatch(setSearchedProduct(e.target.value)), 300);

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      if (get(event, 'target.value', '').length > 0) {
        handleChange(event);
        event.target.blur();
      } else {
        toast.dismiss();
        toast.error('Please enter at least 1 letter', {
          theme: 'colored',
          autoClose: 300
        });
      }
    }
  };
  useEffect(() => {
    getSearchProduct();
  }, [getSearchProduct]);
  return (
    <header className="app-header">
      <div className="firstRow">
        {/* <div className="cate">    */}
        <CategoryDropDown />
        {/* </div> */}
        <Spinner status={loading} />

        <div className="SearchInput">
          <img className="searchicon" src={searchIcon} alt="SearchIcon" />
          <input
            type="text"
            ref={input}
            className="form-control"
            placeholder="Search for products, categories"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onKeyPress={(event) => {
              handleEnterKey(event);
            }}
          />
          {searchedProduct?.length >= 1 && <CloseOutlined onClick={clearButton} />}
        </div>
      </div>
      <div className="secondRow">
        <Button
          className="myorder-button"
          onClick={() => {
            navigate('orderHistory');
          }}
        >
          My Orders
        </Button>
        <div
          className="ca-button"
          onClick={() => {
            handleCart();
          }}
        >
          <img className="cart-icon" src={cartIcon} alt="CartIcon" />
          {cartItems.length > 0 ? <span className="cart-count">{cartItems.length}</span> : null}
          <Button className="cart-button">Cart</Button>
        </div>
      </div>
    </header>
  );
};
