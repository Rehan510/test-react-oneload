import React from 'react';
import Dialog from '../Dialog/Dialog';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
const BalanceDialog = ({ setIsShowPopup, isShowPopup, customerModal }) => {
  const { billDetail } = useSelector((state) => state.telemartSlice);
  const PopupBody = () => {
    return (
      <div className="balance-heading ">
        <p>
          You are about to pay <strong>PKR {get(billDetail, 'totalAmountPay', 0)}</strong> for items Purchase
        </p>
      </div>
    );
  };

  const PopupAction = () => {
    return (
      <>
        <button
          className="balance-cancel-button"
          onClick={() => {
            setIsShowPopup(false);
          }}>
          Cancel
        </button>
        <button className="balance-confirm-button" onClick={customerModal}>
          Confirm
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
        className="balance-dialog-button"
        onHide={() => {
          setIsShowPopup(false);
        }}
        body={<PopupBody />}
        actions={<PopupAction />}
      />
    </>
  );
};

export default BalanceDialog;
