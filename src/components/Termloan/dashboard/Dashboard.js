import React, { useCallback, useEffect, useState } from 'react';
import StatusCard from '../Info-cards/StatusCard';
import DescriptionCard from '../Info-cards/DescriptionCard';
import { statusCode } from 'utils/helpers';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { capitalize, get } from 'lodash';
import { setLoanInfo } from '../../../reducers/termloans';
import SuspendingLoading from '../Suspendingloading';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [cardStatus, setCardStatus] = useState('Eligible');
  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  const dispatch = useDispatch();

  const getTheStatusData = useCallback(async () => {
    let resp;
    try {
      const data = await axios.post('/oneload-termloan-api/loan-info', {
        loanAmount: '100',
        serviceType: 'ufone',
        amountForFeeCalculation: '1.0'
      });
      const error = statusCode[get(data, 'data.error', true)];
      if (!error) {
        resp = get(data, 'data.data.result', null);
        setCardData(resp);
        let status = capitalize(get(resp, 'status', ''));
        setCardStatus(status);
        dispatch(setLoanInfo(resp));
        setIsLoading(false);
      }
    } catch (error) {
      let message = get(error, 'response.data.message', 'Something went Wrong Please Try Again Letter');
      toast.dismiss();
      toast.error(message);
      setIsLoading(false);
      dispatch(setLoanInfo([]));
    }
    return;
  }, [dispatch]);
  useEffect(() => {
    getTheStatusData();
  }, [getTheStatusData]);

  if (isLoading) {
    return <SuspendingLoading />;
  }

  return (
    <div>
      <StatusCard status={cardStatus} responseData={cardData} />
      {cardStatus !== 'Eligible' && <DescriptionCard />}
    </div>
  );
};

export default Dashboard;
