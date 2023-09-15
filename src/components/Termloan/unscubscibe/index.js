import React, { useEffect, useState } from 'react';
import UnsubscribeModal from '../error-modal/UnsubscribeModal';
import { get } from 'lodash';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { setSelectedTab } from '../../../reducers/termloans';
import axios from 'axios';
import { statusCode } from 'utils/helpers';
import KaundaMainModal from '../error-modal/KaundaMainModal';
import config from 'config/config';
import { toast } from 'react-toastify';
import '../../../assets/termloan/css/styles.min.css'
const Unsubscribe = () => {
  const { loanInfo, userDetail } = useSelector((state) => state.termAndLoanService);
  const [showModal, setShowModal] = useState(false);
  const [isCommentCompShow, setIsCommentCompShow] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const [changeTextModal, setChangeTextModal] = useState(false);
  const [InnerModalText, setInnerModalText] = useState('');
  const [changeRadioText, setChangeRadioText] = useState('I don’t understand how to use the product');
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (get(loanInfo, 'loanDueAmount', 0) >= 0) {
      setShowModal(true);
    }
  }, [loanInfo]);
  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(setSelectedTab('dashboard'));
  };

  const handleRadioChange = (event) => {
    setChangeRadioText(event.target.value);
  };

  const handleProceedModal = () => {
    if (get(loanInfo, 'loanDueAmount', 0) > 0) {
      setChangeTextModal(true);
    } else {
      setIsCommentCompShow(true);
      setShowModal(false);
    }
  };

  const commentHandler = (e) => {
    setUserComment(e.target.value);
  };

  const handleOTpOut = async () => {
    try {
      const data = await axios.post(`/oneload-termloan-api/loan-opt-out`);
      const error = statusCode[get(data, 'data.error', true)];
      if (!error) {
        let resp = get(data, 'data.data.result', null);
        setInnerModalText(get(resp, 'description', null));
        setShowUnsubscribeModal(true);
      }
    } catch (error) {
      let message = get(error, 'response.data.message', 'Something went Wrong Please Try Again Letter');
      toast.dismiss();
      toast.error(message);
    }
  };

  const handleFeedback = async () => {
    try {
      const data = await axios.post(`/oneload-termloan-api/feedback`, {
        feedback: changeRadioText === 'Others' ? userComment : changeRadioText,
        name: get(userDetail, 'userNumber', 'null')
      });
      const error = statusCode[get(data, 'data.error', true)];
      if (!error) {
        let resp = get(data, 'data.data.result', null);
        console.log(resp);
      }
    } catch (error) {
      let message = get(error, 'response.data.message', 'Something went Wrong Please Try Again Letter');
      toast.dismiss();
      toast.error(message);
    }
  };

  const handleUnSubscribe = () => {
    handleOTpOut();
    handleFeedback();
  };

  const unSubscribeCloseModal = () => {
    setShowUnsubscribeModal(false);
    window.parent.location.href = config.homeUrl;
  };

  const radioLabels = [
    'I don’t understand how to use the product',
    'I don’t really need it',
    'The service charges are too high',
    'My limit is too low',
    'I don’t like the borrow money',
    'Others'
  ];
  return (
    <div className="unsubscribe-wrapper">
      {isCommentCompShow && (
        <>
          <p>Before you leave, can you tell us why you want to Unsubscribe?</p>
          <div>
            {radioLabels.map((index) => (
              <div key={`default-radio-${index}`} className="mb-2 d-flex align-item-center">
                <input
                  type="radio"
                  id={`default-radio-${index}`}
                  name="radio-group"
                  value={index}
                  onChange={handleRadioChange}
                  checked={index === changeRadioText}
                />
                <label className="ms-1 radio-button-label" htmlFor={`default-radio-${index}`}>
                  {index}
                </label>
              </div>
            ))}
          </div>
          <Form.Control
            as="textarea"
            value={userComment}
            placeholder="Leave us a comment"
            onChange={commentHandler}
            className="leave-comment"
            disabled={changeRadioText !== 'Others'}
            rows={3}
          />
          <Button className="unsubscribe-button" onClick={handleUnSubscribe}>
            Unsubscribe
          </Button>
        </>
      )}
      <UnsubscribeModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleProceedModal={handleProceedModal}
        changeTextModal={changeTextModal}>
        {changeTextModal ? (
          <>Ap unsubscribe nahi kar skte jab tak apka outstanding balance Rs 0.00 na ho.</>
        ) : (
          <>
            Are you sure you want to Unsubscribe?
            <br /> <br />
            <b> Outstanding Balance: {get(loanInfo, 'loanDueAmount',"0").toLocaleString()}  </b>
            {get(loanInfo, 'loanDueAmount', 0) > 0 && (
              <>
                <br />
                <br />
                Apke outstanding balance ki adaigi kai lie <br /> cash in ki gayi raqam ki katoti ki jaye gi.
              </>
            )}
          </>
        )}
      </UnsubscribeModal>
      <KaundaMainModal
        showModal={showUnsubscribeModal}
        handleCloseModal={unSubscribeCloseModal}
        modalClass="unSubscribeModal">
        {InnerModalText}
      </KaundaMainModal>
    </div>
  );
};

export default Unsubscribe;
