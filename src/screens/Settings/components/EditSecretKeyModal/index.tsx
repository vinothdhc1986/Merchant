import React, { FC, useState } from 'react';
import EditSecretkeyModalProps from './typing';
import Button from '../../../../components/Button';
import FilterModal from '../../../../components/Modal';
import '../../styles.scss';

const RenderModalBody: FC<EditSecretkeyModalProps> = (props): JSX.Element => {
  const { handleCancel, handleSave, secretKeyValue } = props;
  const [secretKey, setSecretKey] = useState<string>(secretKeyValue || '');
  const handleSecretKey = (e) => {
    setSecretKey(e.target.value);
  };

  return (
    <div className='edit-secret-key-modal'>
      <h3>Edit Secret Key</h3>
      {/* <p>Some description</p> */}
      <div className='modal-body'>
        <div className='filter-row'>
          <label>Secret Key</label>
          <div className='value-box'>
            <input
              type='text'
              value={secretKey}
              className='form-control'
              onChange={handleSecretKey}
              placeholder='Secret Key'
            />
          </div>
        </div>
        <p>
          Any changes in secret key need to be updated in your integration with
          us in 24h
        </p>
        <div className='action-button text-right'>
          <Button
            btnStyleClass='secondry-button'
            label='Cancel'
            onClick={() => handleCancel()}
            enable
          />
          <Button
            btnStyleClass='primary-button'
            label='Save Changes'
            onClick={() => handleSave(secretKey)}
            enable
          />
        </div>
      </div>
    </div>
  );
};

const EditSecretKeyModal: FC<EditSecretkeyModalProps> = (
  props
): JSX.Element => {
  return (
    <FilterModal ModalBody={RenderModalBody} modalBodyProps={{ ...props }} onBackdropClick={()=>props.handleCancel()}/>
  );
};

export default EditSecretKeyModal;
