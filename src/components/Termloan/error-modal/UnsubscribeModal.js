import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../../assets/termloan/css/styles.min.css'
function UnsubscribeModal({ showModal, handleCloseModal, children, handleProceedModal, changeTextModal }) {
  return (
    <Modal show={showModal} className="unique-modal" backdrop="static" onHide={handleCloseModal} centered>
      <div className="overlay">
        <Modal.Header className="border-0 pt-3 m-0" closeButton></Modal.Header>
        <Modal.Body className="text-center  pb-3 pt-0">{children}</Modal.Body>
        <Modal.Footer className="border-0 justify-content-center pt-0 pb-1">
          {!changeTextModal && (
            <Button variant="secondary" className="modal-proceed-button" onClick={handleProceedModal}>
              Proceed
            </Button>
          )}
          <Button variant="secondary" className="modal-cancel-button" onClick={handleCloseModal}>
            {changeTextModal ? 'Close' : 'Cancel'}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default UnsubscribeModal;
