import React, { FC, useState } from 'react';
import FilterModal from 'components/Modal';
import CustomRadioGroup from 'components/CustomRadioGroup';
import statusChangeProps from './typing';

const RenderModalBody: FC<statusChangeProps> = (props): JSX.Element => {
  const [isActive, setIsActive] = useState(props.currentStatus);

  const handleCancel = () => {
    props.handleCancel();
  };

  const handleSave = () => {
    props.handleSave(isActive);
  };

  return (
    <div className='gateway-status-change-modal'>
      <h3>Change Status</h3>
      <p>The status will get updated instantly after placing this request.</p>
      <div className='modal-body'>
        <h6>Select Action</h6>
        <CustomRadioGroup
          options={[
            { label: 'Activate', value: true },
            { label: 'Deactivate', value: false },
          ]}
          value={isActive}
          onChange={(value) => setIsActive(value)}
          labelClassName='label-class'
        />
        <div className='action-button text-right'>
          <button className='secondry-button' onClick={handleCancel}>
            Cancel
          </button>
          <button className='primary-button' onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const GatewayStatusChangeModal: FC<statusChangeProps> = (
  props
): JSX.Element => {
  return (
    <FilterModal
      ModalBody={RenderModalBody}
      modalBodyProps={{ ...props }}
      onBackdropClick={() => props.handleCancel}
    />
  );
};

export default GatewayStatusChangeModal;
