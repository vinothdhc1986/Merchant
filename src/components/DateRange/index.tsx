import React, { FC, useState, useEffect } from 'react';
import { addDays, format, subDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import Popper from '../../components/Popper';
import notify from 'lib/notifiy';
import Button from '../Button';
import store from 'redux/store';
import {
  getPrevMidNightTimeStamp,
  getNextMidNightTimeStamp,
  getDateRangeTitle,
} from '../../lib/helper';
import { DEFAULT_API_ERROR, MAX_DATE_RANGE_DAYS } from 'lib/constants';
import imgURL from 'lib/imgURL';
import Props from './typing';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './style.scss';

const NO_SELECTION_DATE_RANGE = {
  startDate: addDays(new Date(), 1),
  endDate: addDays(new Date(), 1),
  key: 'selection',
};

const DateRange: FC<Props> = (props): JSX.Element => {
  const { cancelHandler, saveHandler, visible, dateRange, onVisibleChange } =
    props;
  const [range, setRange] = useState(dateRange);

  useEffect(() => {
    if (visible) {
      setRange(dateRange);
    }
  }, [visible]);

  const handleChange = (value) => {
    value.selection.startDate = new Date(
      getPrevMidNightTimeStamp(new Date(value.selection.startDate).getTime())
    );

    const currentDate = new Date(
      getNextMidNightTimeStamp(new Date().getTime())
    );

    value.selection.endDate = new Date(
      getNextMidNightTimeStamp(new Date(value.selection.endDate).getTime())
    );

    if (currentDate < value.selection.endDate) {
      value.selection.endDate = currentDate;
    }
    setRange(value.selection);
  };

  const dateTitle = () => {
    return dateRange?.startDate && dateRange?.endDate
      ? getDateRangeTitle(dateRange.startDate, dateRange.endDate)
      : '';
  };

  return (
    <React.Fragment>
      <Popper
        onVisibleChange={onVisibleChange}
        visible={visible}
        autoAdjustOverflow={false}
        placement='bottomLeft'
        content={
          <div className='date-range-container'>
            <div className='range-clander'>
              <DateRangePicker
                className={range === null ? 'dateRangeWrapperClass' : ''}
                onChange={handleChange}
                showSelectionPreview={false}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={range === null ? [NO_SELECTION_DATE_RANGE] : [range]}
                direction='horizontal'
                maxDate={new Date()}
              />
            </div>
            <div className='action-button'>
              <Button
                btnStyleClass='secondry-button'
                label='Cancel'
                onClick={cancelHandler}
                enable={true}
              />
              {range !== null && (
                <Button
                  btnStyleClass='primary-button'
                  label={`View Transactions for 
                ${
                  range?.startDate
                    ? format(new Date(range.startDate), 'MMM d yyyy')
                    : ''
                } - ${
                    range?.endDate
                      ? format(new Date(range.endDate), 'MMM d yyyy')
                      : ''
                  }
                `}
                  onClick={() => {
                    if (
                      range &&
                      range.startDate <
                        subDays(new Date(range.endDate), MAX_DATE_RANGE_DAYS)
                    ) {
                      notify({
                        message:
                          store.getState()?.validationReducer
                            ?.validationErrorState?.validationErrors
                            ?.MAX_DATE_RANGE_MESSAGE ?? DEFAULT_API_ERROR,
                        type: 'error',
                        description: '',
                      });
                    } else {
                      range && saveHandler(range);
                    }
                  }}
                  enable={
                    !!range &&
                    new Date().setHours(24, 0, 0, 0) >
                      new Date(range.endDate).getTime()
                  }
                />
              )}
            </div>
          </div>
        }
      >
        {props.children || (
          <div
            className='daterange-field cursor-pointer'
            style={dateRange === null ? { width: '170px' } : {}}
          >
            {dateRange?.startDate && dateRange?.endDate
              ? `${dateTitle() ? dateTitle() + ' | ' : ''}${format(
                  new Date(dateRange.startDate),
                  'dd/MM/yyyy'
                )} - ${format(new Date(dateRange.endDate), 'dd/MM/yyyy')}`
              : 'Select Date Range'}
            <button className='arrow-bt'>
              <img
                src={visible ? imgURL['caret-up'] : imgURL['caret-down']}
                alt='Calendar'
              />
            </button>
          </div>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default DateRange;
