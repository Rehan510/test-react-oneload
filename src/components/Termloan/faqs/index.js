import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import Accordion from 'react-bootstrap/Accordion';
import { statusCode } from 'utils/helpers';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import '../../../assets/termloan/css/styles.min.css'
const FaqsAccordion = () => {
  const [faqsData, setFaqsData] = useState([]);
  // Array of data for the Accordion items
  const getFaqs = useCallback(async () => {
    let resp = null;
    try {
      const data = await axios.get('/oneload-termloan-api/get-faqs');
      const error = statusCode[get(data, 'data.error', true)];
      if (!error) {
        resp = get(data, 'data.data.result', null);
      }
      setFaqsData(resp);
    } catch (error) {
      let message = get(error, 'response.data.message', 'Something went Wrong Please Try Again Letter');
      toast.dismiss();
      toast.error(message);
    }
  }, []);
  useEffect(() => {
    // getUserDetail();
    getFaqs();
    // getUserFav();
  }, [getFaqs]);

  return (
    <div className="accordion-wrapper mt-3">
      <Accordion>
        {faqsData?.map((item) => (
          <Accordion.Item className="mb-4" key={item.tlKunndaFaqsId} eventKey={item.tlKunndaFaqsId.toString()}>
            <Accordion.Header>{item.question}</Accordion.Header>
            <Accordion.Body>{item.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqsAccordion;
