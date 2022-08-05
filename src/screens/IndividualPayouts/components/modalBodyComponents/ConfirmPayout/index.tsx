import { format } from 'date-fns';
import { numberWithCommas } from 'lib/helper';
import React, { FC } from 'react';
import Button from '../../../../../components/Button';
import CustomModalRow from '../../../../../components/CustomModalRow';
import imgUrl from '../../../../../lib/imgURL';
import Props from './typings';

const ConfirmPayout: FC<Props> = (props): JSX.Element => {
  return (
    <React.Fragment>
      <div className='content'>
        <div className='back-button' onClick={() => props.onBackClick()}>
          <img src={imgUrl['back-arrow-blue']} alt='Back' /> Back
        </div>
        <CustomModalRow
          label={'Beneficiary ID'}
          value={props.existingBeneficiaryDetails?.beneficiaryCode || '-'}
        />
        <CustomModalRow
          label={'Beneficiary Name'}
          value={props.existingBeneficiaryDetails?.beneficiaryName || '-'}
        />
        <CustomModalRow
          label={'Transfer Type'}
          value={props.transferTypeDetails.transferType || '-'}
        />
        <CustomModalRow
          label={'Amount'}
          value={
            `₹ ${numberWithCommas(props.transferTypeDetails.amount)}` || '-'
          }
        />
        <CustomModalRow
          label={'Schedule Type'}
          value={
            props.scheduleType === 'initiateNow'
              ? 'Initiate Now'
              : format(props.scheduleDateTime, 'yyyy-MM-dd hh:mm aa')
          }
        />
      </div>
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
          label='Proceed'
          btnStyleType='primary'
          btnStyleClass='primary-button'
          onClick={() => {
            props.onProceed();
          }}
          enable
        />
      </div>
    </React.Fragment>
  );
};

export default ConfirmPayout;
