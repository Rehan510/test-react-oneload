import React from 'react';
import { Button } from 'react-bootstrap';
import Logo from '../../../assets/images/oneload-logo.jpg';
import Dialog from './Dialog';
import { useDispatch } from 'react-redux';
const BuyerDialog = ({ handleShowPopup, isShowPopup, customerModal, selfModal }) => {
  const dispatch = useDispatch();

  const PopupBody = () => {
    return (
      <div className="accept-modal">
        <div>
          <img src={Logo} alt="tickIcon" width="100px" />
        </div>
        <h6 className="pt-3">
          <b>Select Buyer</b>
        </h6>
        <p>Please Select for whom you are buying</p>
      </div>
    );
  };

  //   const customerModal = () => {
  //     // handleShowPopup(false);
  //     handleShowPopupsss(true);
  //     // dispatch(setIsSelfBuyer(false));
  //     // dispatch(setSelectedScreen('customer-detail-form'));
  //   };

  const PopupAction = () => {
    return (
      <>
        <button onClick={selfModal} className="buyer-dialouge-self-button">
          Self
        </button>
        <button className="buyer-dialouge-customer-button" onClick={customerModal}>
          Customer
        </button>
      </>
    );
  };

  return (
    <>
      <Dialog
        size="md"
        contentClassName="border-none"
        show={isShowPopup}
        onHide={() => {
          handleShowPopup(false);
        }}
        body={<PopupBody />}
        actions={<PopupAction />}
      />
    </>
  );
};

export default BuyerDialog;
