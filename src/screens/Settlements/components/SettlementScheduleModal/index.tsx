import React, { FC } from 'react';
import Props from './typing';
import Button from '../../../../components/Button';
import FilterModal from '../../../../components/Modal';
import './styles.scss';

const RenderModalBody: FC<Props> = (props): JSX.Element => {
  return (
    <div className='settlement-schedule-modal'>
      <h3>Settlement Schedule</h3>
      <p>Your payments get settled to your account in</p>
      <div className='modal-body'>
        <div className='filter-row'>
          <label>Domestic Payments</label>

          <div className='value-box'>T + 3 Days</div>
        </div>
        <div className='filter-row'>
          <label>International Payments</label>

          <div className='value-box'>T + N Days</div>
        </div>
        <p>
          T is the date of payment capture. Weekends are not counted as working
          days.
        </p>
        <div className='action-button text-right'>
          <Button
            btnStyleClass='secondry-button'
            onClick={() => props.handleMoreInfo()}
            label='More Info'
            enable
          />
          <Button
            btnStyleClass='primary-button'
            label='Close'
            onClick={() => props.handleCancel()}
            enable
          />
        </div>
      </div>
    </div>
  );
};

const SettlementScheduleModal: FC<Props> = (props): JSX.Element => {
  return (
    <FilterModal ModalBody={RenderModalBody} modalBodyProps={{ ...props }} onBackdropClick={()=>props.handleCancel()}/>
  );
};

export default SettlementScheduleModal;
