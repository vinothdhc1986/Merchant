import React, { FC, useEffect, useState } from 'react';
import imgURL from '../../../../../lib/imgURL';
import CustomModalRow from '../../../../../components/CustomModalRow';
import Button from '../../../../../components/Button';
import CustomRadioGroup from '../../../../../components/CustomRadioGroup';
import DateTimePicker from '../../../../../components/DateTimePicker';
import Props from './typings';
import { add, format } from 'date-fns';

const SchedulePayout: FC<Props> = (props): JSX.Element => {
  const [schedulePayoutType, setSchedulePayoutType] = useState('');
  const [showExpiryDatePicker, setShowExpiryDatePicker] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState(
    add(new Date(), {
      days: 1,
    })
  );

  useEffect(() => {
    if (props.savedSchedulePayoutDetails) {
      setSchedulePayoutType(props.savedSchedulePayoutDetails.scheduleType);
      setScheduleDateTime(props.savedSchedulePayoutDetails.scheduleDateTime);
    }
  }, [props.savedSchedulePayoutDetails]);

  return (
    <React.Fragment>
      <div className='content' id='schedule-container'>
        <div className='back-button' onClick={() => props.onBackClick()}>
          <img src={imgURL['back-arrow-blue']} alt='Back' /> Back
        </div>
        <CustomModalRow
          label={'Schedule Payout'}
          value={
            <CustomRadioGroup
              options={[
                { label: 'Initiate Now', value: 'initiateNow' },
                { label: 'Schedule for Later', value: 'scheduleForLater' },
              ]}
              groupType='inline'
              value={schedulePayoutType}
              onChange={(value: string) => {
                setSchedulePayoutType(value);
              }}
              labelClassName='radio-label'
            />
          }
          isRequired
        />
        {schedulePayoutType === 'scheduleForLater' && (
          <>
            <CustomModalRow
              label={'Schedule Date'}
              value={
                <DateTimePicker
                  onVisibleChange={(show) => setShowExpiryDatePicker(show)}
                  visible={showExpiryDatePicker}
                  value={new Date(scheduleDateTime)}
                  placement='bottomLeft'
                  handleDateChange={(date) => {
                    setScheduleDateTime(date);
                  }}
                  minDate={add(new Date(), {
                    days: 1,
                  })}
                  parentId='schedule-container'
                >
                  <div className='form-control calnderInput'>
                    {
                      <React.Fragment>
                        {format(scheduleDateTime, 'yyyy-MM-dd hh:mm aa')}
                        <img src={imgURL['grey-calendar-icon']} />
                      </React.Fragment>
                    }
                  </div>
                </DateTimePicker>
              }
            />
          </>
        )}
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
            props.onProceed({ schedulePayoutType, scheduleDateTime });
          }}
          enable={
            schedulePayoutType === 'initiateNow' ||
            schedulePayoutType === 'scheduleForLater'
          }
        />
      </div>
    </React.Fragment>
  );
};

export default SchedulePayout;
