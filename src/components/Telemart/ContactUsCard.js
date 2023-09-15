import React from 'react';
import { Card } from 'react-bootstrap';
import EmailIcon from '../../assets/images/email_icon.svg';
import CallIcon from '../../assets/images/call_icon.svg';
const Contactuscard = () => {
  return (
    <Card className="refund-card-container p-3 ms-3">
      <div>
        <p className="refund-heading-text mb-1 ">For Refunds and Cancellations:</p>
        <p className="contact-order">Please contact Telemart directly with you order No.</p>
      </div>
      <div>
        <div className="support-container mt-2">
          <img src={EmailIcon} className="me-3 mt-2" alt="EmailIcon" height="20px" width="28px" />
          <div>
            <p className="e-support mb-1">Email Support</p>
            <a className="e-mail" href="mailto: info@telemart.pk">
              info@telemart.pk
            </a>
          </div>
        </div>
        <div className="support-container mt-3">
          <img src={CallIcon} className="me-3 mt-2" alt="CallIcon" height="25px" width="24px" />
          <div>
            <p className="e-support mb-1">Call Support</p>
            <a className="e-mail " href="tel:92 21 111662453">
              92 21 111662453
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Contactuscard;
