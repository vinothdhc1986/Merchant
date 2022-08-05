import React, { FC } from 'react';
import Props from './typing';
import Modal from '../Modal';
import Button from '../Button';
import imgURL from '../../lib/imgURL';
import './styles.scss';

const RenderModalBody: FC<Props> = (props): JSX.Element => {
  const { title, content, cancelText, confirmText } = props;
  const handleCancelClick = () => {
    props.handleCancel();
  };
  const handleConfirmClick = () => {
    props.handleSave();
  };
  return (
    <div>
      <h3>
        <img
          src={
            imgURL[
              props.iconType === 'warning' ? 'help-icon-colored' : 'error-close'
            ]
          }
          alt=""
        />{' '}
        {title}
      </h3>
      <p>{content}</p>
      <div className="modal-body">
        <div className="action-button text-right">
          <Button
            label={cancelText || 'Cancel'}
            onClick={handleCancelClick}
            enable
            btnStyleClass="secondry-button"
          />
          <Button
            label={confirmText || 'Yes'}
            onClick={handleConfirmClick}
            enable
            btnStyleClass="primary-button"
          />
        </div>
      </div>
    </div>
  );
};

const ConfirmationModal: FC<Props> = (props): JSX.Element => {
  return (
    <Modal
      ModalBody={RenderModalBody}
      modalWrapperClass={'confirmation-modal'}
      modalBodyProps={{ ...props }}
      onBackdropClick={() => props.handleCancel}
    />
  );
};

export default ConfirmationModal;
