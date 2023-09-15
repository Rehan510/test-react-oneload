import React, { useState } from 'react';
import StatusCard from '../Info-cards/StatusCard';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Select from 'react-select';
import KaundaMainModal from '../error-modal/KaundaMainModal';
import DescriptionCard from '../Info-cards/DescriptionCard';
import axios from 'axios';
import { statusCode } from 'utils/helpers';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { setApplyLoanData } from '../../../reducers/termloans';

const EligibleReadyCash = ({ cardStatus, setChangeTab, loanInfo, setSelectedOption, selectedOption }) => {
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const handleShowModal = async () => {
    if (amount > loanInfo?.availableLoanAmount) {
      setShowModal(true);
      return;
    }
    if(amount<1){
      toast.dismiss();
      toast.error("Please enter an amount of more than Rs.1");
      return;
    }
    try {
      const data = await axios.post('/oneload-termloan-api/apply-loan-request', {
        loanAmount: amount,
        serviceDays: selectedOption.value,
        amountForFeeCalculation: amount
      });
      const error = statusCode[get(data, 'data.error', true)];
      if (!error) {
        let resp = get(data, 'data.data.result', null);
        dispatch(setApplyLoanData(resp));
        setChangeTab('totalCash');
      }
    } catch (error) {
      let message = get(error, 'response.data.message', 'Something went Wrong Please Try Again Letter');
      toast.dismiss();
      toast.error(message);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAmountChange = (event) => {
    const newValue = event.target.value;
    if (/^\d*\.?\d{0,2}$/.test(newValue) || newValue === '') {
      setAmount(newValue);
    } else {
      toast.dismiss();
      toast.error('Enter a valid numeric value with up to 2 decimal places.');
    }
  };

  const isButtonDisabled = !amount || !selectedOption;

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const options = [
    { value: '14', label: '14' },
    { value: '30', label: '30' }
  ];

  console.log({cardStatus})
  return (
    <>
      <StatusCard status={cardStatus} responseData={loanInfo} />
      {cardStatus === 'Eligible' || cardStatus ==="Flagged" ? (
        <div className="request-cash-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              onChange={handleAmountChange}
              value={amount}
              type="text"
              maxLength={'15'}
              placeholder="Enter amount here"
            />
          </Form.Group>
          <Form.Group className="mb-3 days-selector">
            <Form.Label>No. of Days</Form.Label>
            <Select
              placeholder="No. of Days"
              className="react-select-menu"
              classNamePrefix="react-select"
              value={selectedOption}
              onChange={handleChange}
              options={options}
            />
          </Form.Group>
          <Button className="mt-3 next-button" disabled={isButtonDisabled} onClick={handleShowModal}>
            Next
          </Button>
        </div>
      ) : (
        <DescriptionCard />
      )}
      <KaundaMainModal showModal={showModal} handleCloseModal={handleCloseModal}>
        Apki darj karda raqam apki faraham <br /> karda limit sai ziada hai
        <br />
        <br /> (042) 111 115 623 <br />
        +92 300 0843007
        <br />
      </KaundaMainModal>
    </>
  );
};

export default EligibleReadyCash;
