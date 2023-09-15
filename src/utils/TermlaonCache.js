import React, { useEffect, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetail } from '../reducers/termloans';
import config from '../config/config';
const TermloanCache = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  const user = queryParams.get('user');
  const kyc = queryParams.get('userKyc');
  const accountType = queryParams.get('userType');
  const termLoanUser = queryParams.get('isTermLoanUser');

  const dispatch = useDispatch();

  localStorage.setItem('token', token);
  localStorage.setItem('accountType', accountType);
  localStorage.setItem('kyc', kyc);
  localStorage.setItem('user', user);

  if (accountType?.toLowerCase() !== 'retailer' || termLoanUser !== 'true') {
    window.parent.location.href = config.homeUrl;
  }

  if (!token || token === 'null') {
    window.parent.location.href = config.redirectUrl;
  }

  const getUserDetail = useCallback(async () => {
    const useDetails = {
      userNumber: user,
      userToken: token
    };
    dispatch(setUserDetail(useDetails));
  }, [dispatch, token, user]);

  useEffect(() => {
    getUserDetail();
  }, [getUserDetail]);

  return <></>;
};

export default memo(TermloanCache);
