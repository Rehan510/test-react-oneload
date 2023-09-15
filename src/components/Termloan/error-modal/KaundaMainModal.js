import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../../assets/termloan/css/styles.min.css'
function KaundaMainModal({ showModal, handleCloseModal, modalClass, btnPadding, children }) {
  return (
    <>
      <Modal
        show={showModal}
        className={modalClass ? modalClass : 'term-loan-modal'}
        backdrop="static"
        onHide={handleCloseModal}
        centered>
        <div className="overlay">
          <Modal.Header className="border-0 pt-3 m-0" closeButton></Modal.Header>
          <Modal.Body className="text-center  pb-3 pt-0">{children}</Modal.Body>
          <Modal.Footer className="border-0 justify-content-center pt-0 pb-1">
            <Button variant="secondary" className={`close-button ${btnPadding}`} onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default KaundaMainModal;
