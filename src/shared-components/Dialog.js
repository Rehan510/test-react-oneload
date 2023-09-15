import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const CustomDialog = ({
  className,
  show,
  onHide,
  title,
  btnAction,
  btnLabel,
  children,
  closeBtnLabel,
  hideFooterButton,
  modalFooterStyle
}) => {
  return (
    <Modal show={show} onHide={onHide} className="confirmation-dialog ">
      <Modal.Header className={className} closeButton>
        {title}
      </Modal.Header>
      <Modal.Body className="text-center">{children}</Modal.Body>
      {!hideFooterButton && (
        <Modal.Footer className={modalFooterStyle}>
          <Button variant="secondary" onClick={onHide}>
            {closeBtnLabel}
          </Button>
          <Button variant="primary" onClick={() => btnAction()}>
            {btnLabel}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};
