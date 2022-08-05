import React, { FC } from 'react';
import './style.scss';
import Props from './typing';

const Modal: FC<Props> = (props): JSX.Element => {
  const { ModalBody, modalWrapperClass, modalBodyProps, onBackdropClick } =
    props;
  return (
    <React.Fragment>
      <div className={`modal modal-dialog-centered ${modalWrapperClass}`}>
        <div className="overlay" onClick={onBackdropClick}></div>
        <div className="modal-dialog">
          <div className="modal-content">
            <ModalBody {...modalBodyProps} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
