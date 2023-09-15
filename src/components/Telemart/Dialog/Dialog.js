import React from 'react';
import Modal from 'react-bootstrap/Modal';
const Dialog = (props) => {
  const { title, body, actions } = props;
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center border-top-0">
        {actions}
      </Modal.Footer>
    </Modal>
  );
};

export default Dialog;
