import React, { useState } from 'react';
import TotalCashReq from './TotalCashReq';
import OtpInput from './OtpScreen';
import EligibleReadyCash from './EligibleReadyCash';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize, get } from 'lodash';
import axios from 'axios';
import { statusCode } from 'utils/helpers';
import KaundaMainModal from '../error-modal/KaundaMainModal';
import { setSelectedTab } from '../../../reducers/termloans';
import { toast } from 'react-toastify';
import config from 'config/config';
import '../../../assets/termloan/css/styles.min.css'
const RequestCash = () => {
  const { loanInfo, applyLoanData, userDetail } = useSelector((state) => state.termAndLoanService);

  // const [cardStatus, setCardStatus] = useState('Eligible');
  const [changeTab, setChangeTab] = useState('cardInfo');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [countState, setCountState] = useState(0);
  const [otpErrorMessage, setOtpErrorMessage] = useState(null);
  const [modalBodyText, setModalBodyText] = useState('');
  const dispatch = useDispatch();

  const changeCompHandler = async (apiUrl) => {
    try {
      const data = await axios.post(`/${apiUrl}`, {
        mobileNumber: get(userDetail, 'userNumber', 'null'),
        otpId: 0,
        transactionId: 0
      });
      let resp;
      const error = statusCode[get(data, 'data.data.statusCode', true)];
      if (!error) {
        resp = get(data, 'data.data.result', null);
        setChangeTab('otpScreen');
      } else {
        let message = get(data, 'data.data.statusDescription', null);
        setOtpErrorMessage(message);
        setCountState(4);
      }
    } catch (error) {
      let message = get(error, 'response.data.message', 'Something went Wrong Please Try Again Letter');
      toast.dismiss();
      toast.error(message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(setSelectedTab('dashboard'));
    window.location.reload(true);
    window.parent.location.href = config.readyCashRedirect;
  };

  const applyLoanConfirmAmount = async (text) => {
    try {
      const data = await axios.post('/oneload-termloan-api/apply-loan-confirm', {
        loanId: get(applyLoanData, 'loanId', null),
        transactionReference: get(applyLoanData, 'transactionReference', null)
      });
      const error = get(data, 'data.data.statusCode', true);
      if (!error) {
        setModalBodyText(text);
        setShowModal(true);
        setCountState(4);
        setOtpErrorMessage(null);
      } else {
        console.log('error');
      }
    } catch (error) {
      let message = get(error, 'response.data.message', 'Something went Wrong Please Try Again Letter');
      toast.dismiss();
      toast.error(message);
    }
  };

  const verifyOtpHandler = async (otp) => {
    let usersOtpNumber = otp.join('');
    let resp;
    try {
      const data = await axios.post('/oneload-termloan-api/verify-otp', {
        mobileNumber: get(userDetail, 'userNumber', 'null'),
        otp: usersOtpNumber
      });
      const error = statusCode[get(data, 'data.data.statusCode', true)];
      if (!error) {
        resp = get(data, 'data.data.statusDescription', null);
        applyLoanConfirmAmount(resp);
      } else {
        resp = get(data, 'data.data.statusDescription', null);
        setCountState((prv) => prv + 1);
        setOtpErrorMessage(resp);
        if (countState === 3) {
          setOtpErrorMessage('Too many wrong attempts , please try again later');
          setModalBodyText(resp);
          setShowModal(true);
        }
      }
    } catch (error) {
      let message = get(error, 'response.data.message', 'Something went Wrong Please Try Again Letter');
      toast.dismiss();
      toast.error(message);
    }
  };

  const changeComponent = {
    cardInfo: (
      <EligibleReadyCash
        cardStatus={capitalize(get(loanInfo, 'status', ''))}
        loanInfo={loanInfo}
        setChangeTab={setChangeTab}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
      />
    ),
    totalCash: <TotalCashReq totalDays={selectedOption} changeCompHandler={() => changeCompHandler('oneload-termloan-api/generate-otp')} />,
    otpScreen: (
      <OtpInput
        changeCompHandler={changeCompHandler}
        otpErrorMessage={otpErrorMessage}
        verifyOtpHandler={verifyOtpHandler}
        countState={countState}
      />
    )
  };

  return (
    <div>
      {changeComponent[changeTab]}
      <KaundaMainModal showModal={showModal} handleCloseModal={handleCloseModal}>
        {modalBodyText}
      </KaundaMainModal>
    </div>
  );
};

export default RequestCash;
