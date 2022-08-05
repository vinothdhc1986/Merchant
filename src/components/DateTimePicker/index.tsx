import React, { FC, useState, useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'react-date-range';
import Popper from 'components/Popper';
import Select from 'components/Select';
import { hoursList, getMinunteList, meridiemList } from './constants';
import Props from './typing';
import './styles.scss';

const DatePicker: FC<Props> = (props): JSX.Element => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const handleDateChange = (date) => {
    setShowTimePicker(true);
    props.handleDateChange(date);
  };
  const onVisibleChange = (isVisible: boolean) => {
    if (showTimePicker && isVisible) {
      setShowTimePicker(false);
    }
    props.onVisibleChange(isVisible);
  };
  const selectedHour = useMemo(() => {
    return format(props.value, 'hh');
  }, [props.value.toString()]);

  const selectedMinute = useMemo(() => {
    return format(props.value, 'mm');
  }, [props.value.toString()]);

  const selectedMeridiem = useMemo(() => {
    return format(props.value, 'a');
  }, [props.value.toString()]);

  const handleTimeChange = useCallback(
    (value, fieldName) => {
      const dateTimeArray = props?.value?.toString()?.split(' ');
      const timeArray = dateTimeArray[4]?.split(':');
      if (fieldName === 'hour') {
        if (selectedMeridiem === 'PM') {
          timeArray[0] = ((parseInt(value, 10) + 12) % 24).toString();
        } else {
          timeArray[0] = value;
        }
      } else if (fieldName === 'minute') {
        timeArray[1] = value;
      } else if (fieldName === 'meridiem') {
        if (value === 'PM' && selectedMeridiem !== value) {
          timeArray[0] = ((parseInt(timeArray[0], 10) + 12) % 24).toString();
        } else if (value === 'AM' && selectedMeridiem !== value) {
          timeArray[0] = ((parseInt(timeArray[0], 10) - 12) % 24).toString();
        }
      }
      dateTimeArray[4] = timeArray.join(':');
      props.handleDateChange(new Date(dateTimeArray.join(' ')));
    },
    [props.value.toString(), props.handleDateChange]
  );

  return (
    <React.Fragment>
      <Popper
        onVisibleChange={onVisibleChange}
        visible={props.visible}
        autoAdjustOverflow={false}
        placement={props.placement}
        parentId={props.parentId}
        content={
          showTimePicker ? (
            <div className="plural-custom-time-picker">
              <div
                onClick={() => setShowTimePicker(false)}
                className=" time-picker-header"
              >
                <span className="selected-date">
                  {format(props.value, 'dd/MM/yyyy')}
                </span>
              </div>
              <div className="time-picker-body">
                <Select
                  onChange={(value) => handleTimeChange(value, 'hour')}
                  optionList={hoursList}
                  defaultValue={selectedHour}
                />
                <Select
                  onChange={(value) => handleTimeChange(value, 'minute')}
                  optionList={getMinunteList()}
                  defaultValue={selectedMinute}
                />
                <Select
                  onChange={(value) => handleTimeChange(value, 'meridiem')}
                  optionList={meridiemList}
                  value={selectedMeridiem}
                />
              </div>
            </div>
          ) : (
            <Calendar
              date={props.value}
              onChange={handleDateChange}
              minDate={props.minDate}
              maxDate={props.maxDate}
            />
          )
        }
      >
        {props.children}
      </Popper>
    </React.Fragment>
  );
};

export default DatePicker;
