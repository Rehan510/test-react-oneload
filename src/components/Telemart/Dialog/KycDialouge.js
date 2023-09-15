import React from 'react';
import Logo from '../../../assets/images/oneload-logo.jpg';
import Dialog from './Dialog';
const KycDialouge = ({ isShowPopup1, closeKycDialouge, customerModal, propertyToShow }) => {
  const PopupBody = () => {
    return (
      <div className="accept-modal mt-3">
        <img src={Logo} alt="tickIcon" width="90px" />
        <h3>
          <b>{`${propertyToShow} not found`}</b>
        </h3>
        <p>{`Please update your ${propertyToShow}  to proceed further`}</p>
      </div>
    );
  };

  const PopupAction = () => {
    return (
      <>
        <button onClick={closeKycDialouge} className="kyc-close">
          Close
        </button>
        <button className="kyc-setting ms-3" onClick={customerModal}>
          Go to Account Settings
        </button>
      </>
    );
  };

  return (
    <>
      <Dialog
        size="md"
        contentClassName="border-none"
        show={isShowPopup1}
        onHide={closeKycDialouge}
        body={<PopupBody />}
        actions={<PopupAction />}
      />
    </>
  );
};

export default KycDialouge;
