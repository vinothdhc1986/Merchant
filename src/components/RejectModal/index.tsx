import React, { FC, useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import {
  MAX_REMARK_LENGTH,
  rejectReasonRegex,
} from 'screens/IndividualPayouts/individualPayouts.constants';
import Props from './typings';

const RenderModalBody: FC<Props> = (props) => {
  const [rejectReason, setRejectReason] = useState<string>('');

  const changeHandler = (e: React.ChangeEvent<any>) => {
    if (rejectReasonRegex.test(e.target.value)) setRejectReason(e.target.value);
  };

  return (
    <React.Fragment>
      <h2 className='title'>{props.title}</h2>
      <p className='description'>Please provide a reason for rejection</p>

      <textarea
        id='rejectReason'
        style={{ minHeight: '90px', marginBottom: '20px' }}
        className='form-control'
        placeholder='Enter rejection reason'
        //label='Full Name'
        name='rejectReason'
        value={rejectReason}
        onChange={(e) => changeHandler(e)}
        rows={5}
        maxLength={MAX_REMARK_LENGTH}
        cols={5}
      />

      <div className='modal-action-buttons'>
        <Button
          label='Close'
          btnStyleType='secondary'
          btnStyleClass='secondry-button'
          onClick={() => {
            props.closeModal();
          }}
          enable
        />

        <Button
          label={props.submitButtonLabel}
          btnStyleType='primary'
          btnStyleClass='primary-button'
          onClick={() => props.submitButtonHandler(rejectReason)}
          type='submit'
          enable={rejectReason.length > 0}
        />
      </div>
    </React.Fragment>
  );
};

const RejectModal: FC<Props> = (props): JSX.Element => {
  return (
    <React.Fragment>
      <Modal
        ModalBody={RenderModalBody}
        modalBodyProps={{ ...props }}
        onBackdropClick={() => props.closeModal()}
      />
    </React.Fragment>
  );
};

export default RejectModal;
