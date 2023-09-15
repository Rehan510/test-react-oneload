import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PaymentInstallments from './PaymentInstallments';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize, get } from 'lodash';
import moment from 'moment';
import axios from 'axios';
import KaundaMainModal from '../error-modal/KaundaMainModal';
import { toast } from 'react-toastify';
import { setSelectedTab } from '../../../reducers/termloans';
import config from 'config/config';
import '../../../assets/termloan/css/styles.min.css'
const Repayments = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalBodyText, setModalBodyText] = useState(null);
  const [partialPayment, setPartialPayment] = useState('');
  const [isShowInstallmentPlan, setIsShowInstallmentPlan] = useState(true);
  const [changePayment, setChangePayment] = useState('Full Repayment');
  const handleRadioChange = (event) => {
    setChangePayment(event.target.value);
  };
  const { loanInfo } = useSelector((state) => state.termAndLoanService);
  let checkText = 'Darj karda raqam apky outstanding balance say zada hai';
  const dispatch = useDispatch();

  const handleSelect = (index) => {
    setSelectedCard(index);
  };
  const changePlanHandler = () => {
    setIsShowInstallmentPlan(!isShowInstallmentPlan);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    if (modalBodyText !== checkText) {
      dispatch(setSelectedTab('dashboard'));
      window.location.reload(true);
      window.parent.location.href = config.readyCashRedirect;
    }
  };

  const handleAmountChange = (event) => {
    const newValue = event.target.value;
    if (/^\d*\.?\d{0,2}$/.test(newValue) || newValue === '') {
      console.log('in if');
      setPartialPayment(newValue);
    } else {
      toast.dismiss();
      toast.error('Enter a valid numeric value with up to 2 decimal places.');
    }
  };

  const repaymentAmountHandler = async () => {
    if (partialPayment && partialPayment > selectedCard.totalLoanAmount) {
      toast.dismiss();
      setShowModal(true);
      setModalBodyText(checkText);
      return;
    }
    let resp;
    try {
      const data = await axios.post(`/oneload-termloan-api/loan-payment`, {
        loanId: selectedCard.loanId,
        paymentAmount: changePayment === 'Full Repayment' ? selectedCard.totalLoanAmount : partialPayment
      });
      if (!get(data, 'data.data.statusCode', true)) {
        resp = get(data, 'data.data.result.description', null);
      } else {
        resp = get(data, 'data.data.statusDescription', null);
      }
      setModalBodyText(resp);
      setShowModal(true);
    } catch (error) {
      let message = get(error, 'response.data.message', 'Something went Wrong Please Try Again Letter');
      toast.dismiss();
      toast.error(message);
    }
  };

  return (
    <div>
      {isShowInstallmentPlan ? (
        <>
          <div>
            <div className="status-card p-0">
              <ul className="more-info">
                <li>
                  <strong>Principal Amount</strong>
                  <span>{get(loanInfo, 'principalAmount',"0").toLocaleString()} PKR</span>
                </li>
                <li>
                  <strong>Status</strong>
                  <span className={loanInfo.status === 'ELIGIBLE' ? 'green-tag' : 'error-tag'}>
                    {capitalize(get(loanInfo, 'status', null))}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {get(loanInfo, 'outstandingLoanDTO', [])?.map((item, index) => (
            <div className="repayment-wrapper" key={index} onClick={() => handleSelect(item)}>
              <div className="status-card p-0">
                <ul className={`more-info ${selectedCard === item ? 'selected-card' : ''}`} key={index}>
                  <li>
                    <strong className="total-amount">Total Amount</strong>
                    <span>Rs {get(item, 'totalLoanAmount', "0").toLocaleString()} </span>
                  </li>
                  <li>
                    <strong>Principal Amount</strong>
                    <span>Rs {get(item, 'principleAmount', "0").toLocaleString()} </span>
                  </li>

                  <details>
                    <summary className="d-flex justify-content-between">
                      <strong>Service Charges</strong>
                      <span>Rs {get(item, 'serviceCharges', "0").toLocaleString()} </span>
                    </summary>
                    <div className="ms-3">
                      <li>
                        <strong>Regular Fee</strong>
                        <span>Rs {get(item, 'regularFee', "0").toLocaleString()}  </span>
                      </li>
                      <li>
                        <strong>Processing Fee</strong>
                        <span>Rs {get(item, 'processingFee', "0").toLocaleString()} </span>
                      </li>
                    </div>
                  </details>
                  <li>
                    <strong>Late Fee</strong>
                    <span>Rs {get(item, 'lateFee', "0").toLocaleString()} </span>
                  </li>
                  <li>
                    <strong>Due Date</strong>
                    <span>{moment(get(item, 'dueDate', new Date())).format('DD/MM/YYYY')} 23:59:59</span>
                  </li>
                  <li>
                    {console.log(item.status)}
                    <strong className="status-tag">Status</strong>
                    <span className={item.status === 'In Time' ? 'green-tag' : 'error-tag'}>
                      {get(item, 'status', null)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
          <Button disabled={selectedCard == null} onClick={changePlanHandler} className="repay-loan-button">
            Repay Loan
          </Button>
        </>
      ) : (
        <PaymentInstallments
          changePayment={changePayment}
          handleRadioChange={handleRadioChange}
          changePlanHandler={changePlanHandler}
          partialPayment={partialPayment}
          cardData={selectedCard}
          repaymentAmountHandler={repaymentAmountHandler}
          totalAmount={get(selectedCard, 'totalLoanAmount', 0)}
          handleAmountChange={handleAmountChange}
        />
      )}
      <KaundaMainModal showModal={showModal} handleCloseModal={handleCloseModal}>
        {modalBodyText}
      </KaundaMainModal>
    </div>
  );
};

export default Repayments;
