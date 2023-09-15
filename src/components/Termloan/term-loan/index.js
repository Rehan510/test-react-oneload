import React, { useState, useEffect, useCallback } from 'react';
import KaundaMainModal from '../error-modal/KaundaMainModal';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import axios from 'axios';
import { statusCode } from 'utils/helpers';
import config from 'config/config';
import SuspendingLoading from '../Suspendingloading';
import '../../../assets/termloan/css/styles.min.css'
const TermsAndConditions = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCnicModal, setShowCnicModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [amountLimit, setAmountLimit] = useState('0');
  const [readyCashText, setReadyCashText] = useState(null);
  const [isAcceptCondition, setIsAcceptCondition] = useState(true);
  const [IsShowErrorText, setIsShowErrorText] = useState(false);
  const navigate = useNavigate();

  const getTheStatusData = useCallback(async () => {
    let resp;
    try {
      const data = await axios.post('/oneload-termloan-api/loan-info', {
        loanAmount: '100',
        serviceType: 'ufone',
        amountForFeeCalculation: '1.0'
      });
      const error = statusCode[get(data, 'data.data.statusCode', true)];
      if (!error) {
        resp = get(data, 'data.data.result.eligibleAmount', null);
        setAmountLimit(resp);
      } else {
        console.log('e');
      }
    } catch (error) {
      console.log(error);
      setAmountLimit("0");
      setIsShowErrorText(true);
      setShowCnicModal(true);
    }
    return;
  }, []);

  const getOtpInStatus = useCallback(async () => {
    let resp = null;
    try {
      const data = await axios.post('/oneload-termloan-api/check-opt-in-status');
      const error = statusCode[get(data, 'data.data.statusCode', true)];
      if (!error) {
        resp = get(data, 'data.data.result', null);
        if (resp.optInStatus && resp.kycStatus && !resp.cnicstatus) {
          navigate('/termloan/dashboard');
          return;
        }
        if (resp.cnicstatus) {
          setShowCnicModal(true);
          return;
        }
        if (!resp.kycStatus) {
          setShowModal(true);
          return;
        }
        await getTheStatusData();
        return;
      }
    } catch (error) {
      setShowModal(false);
      setIsShowErrorText(true);
      setShowCnicModal(true);
    }
  }, [navigate, getTheStatusData]);

  useEffect(() => {
    getOtpInStatus().then(() => {
      setIsLoading(false);
    });
  }, [getOtpInStatus]);

  const handleShowModal = async () => {
    if (!isAcceptCondition) {
      // setShowModal(true);
      let resp;
      try {
        const data = await axios.post('/oneload-termloan-api/loan-opt-in');
        const error = statusCode[get(data, 'data.error', true)];
        if (!error) {
          resp = get(data, 'data.data', null);
          let description = get(resp, 'result.description', 'Something went wrong');
          setReadyCashText(description);
          setShowModal(true);
        }
      } catch (error) {
        let message = get(error, 'response.data.message', 'Something went Wrong Please Try Again Letter');
        toast.dismiss();
        toast.error(message);
      }
      return;
    }
  };
  const handleCloseModal = () => {
    if (readyCashText) {
      navigate('/termloan/dashboard');
    } else {
      window.parent.location.href = config.setttingUrl;
    }
    setShowModal(false);
  };

  const handleCloseCnicModal = () => {
    setShowCnicModal(false);
    window.parent.location.href = config.homeUrl;
  };

  if (isLoading) {
    return <SuspendingLoading />;
  }

  return (
    <div className="container-fluid ">
      <div className="term-loan-warper p-2">
        <div className="limit-input mt-4">
          <p className="m-0">Ready Cash Limit</p>
          <p className="m-0">Rs {amountLimit.toLocaleString()}</p>
        </div>
        <div className="terms-description ">
          <b>Terms & Conditions:</b>
          <p className="mt-2">
            <ol>
              <li>
                Payable raqam muqarara due date par ada karnay say apka account block ya flag honay say bach sakta hai.
              </li>
              <li>
                Liyay gayay karzay ki raqam waqat par wapis karnay pay apko OneLoad say ziada limits k liyay ehal ho
                jatay hain.
              </li>
              <li>
                E-Load, Bills, bus ticktes, aur oneload ki baki services par ye Ready Cash service istimal ki jaa sakti
                hai.
              </li>
              <li>
                Karzay ki raqam par term khtam hony kay bad Ready Cash Late Charges lago hongay, jo kay ‘Dashboard’ se
                daikhay jaa saktay hain.
              </li>
              <li>
                Ready Cash ki bakaya jaat karzay ki raqam par muddat guzar jany kay bad raat 12 bajay Late Fees bhi lago
                hogi jo kay raat 12 bajay rozana li jaye gi.
              </li>
            </ol>
          </p>
        </div>
        <form>
          <div className="form-group ">
            <input type="checkbox" id="html" onChange={(e) => setIsAcceptCondition(!e.target.checked)} />
            <label htmlFor="html">Accept Terms & Conditions</label>
          </div>
        </form>
        <Button disabled={isAcceptCondition} className="register-terms-button" onClick={handleShowModal}>
          Register
        </Button>
      </div>
      <KaundaMainModal
        btnPadding={!readyCashText && 'mt-3 mb-4'}
        showModal={showModal}
        handleCloseModal={handleCloseModal}>
        {readyCashText ? (
          <>{readyCashText}</>
        ) : (
          <>
            Apki information jama nahi hoi ya tasdeeq kai <br /> marhale mai hai. <br />
            <br /> Mazeed malumaat kai lie helpline par call karain.
            <br /> (042) 111 115 623 <br />
            +92 300 0843007
          </>
        )}
      </KaundaMainModal>

      <KaundaMainModal showModal={showCnicModal} handleCloseModal={handleCloseCnicModal}>
        <>
          {IsShowErrorText ? (
            <>
              Service down hony ki waja say ap register nhi kar saktay <br />
              thori der bad koshish karyn ya hamari helpline pay call kryn
            </>
          ) : (
            <>
              Dear Customer
              <br />
              <br />
              Apky esi CNIC say ek aor account par ReadyCash
              <br />
              ki sahoulat pehly say hi mayyasar hai, jiski waja say
              <br />
              ap es service ko subscribe nhi kar saktay
              <br />
              <br />
              ReadyCash ki service ko apny es account say
              <br />
              munsalik karny kay lye hamari helpline par call karyn
            </>
          )}
          <br /> (042) 111 115 623 <br /> +92 300 0843007
        </>
      </KaundaMainModal>
    </div>
  );
};

export default TermsAndConditions;