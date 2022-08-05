import React, { FC } from 'react';
import DateRange from '../DateRange';
import PayoutAccountBalance from 'components/PayoutAccountBalance';
import imgURL from '../../lib/imgURL';
import './style.scss';
import Props from './typing';
//import Button from '../Button';

const FilterRow: FC<Props> = (props): JSX.Element => {
  const { dateRangePicker, filterBy, accountBalance, download, faq } =
    props.filterRowProps;

  return (
    <div className='filter-row-component'>
      {dateRangePicker && (
        <DateRange
          cancelHandler={dateRangePicker.cancelHandler}
          saveHandler={(value) => dateRangePicker.saveHandler(value)}
          dateRange={dateRangePicker.dateRange}
          visible={dateRangePicker.visible}
          onVisibleChange={(visible: boolean) =>
            dateRangePicker.onVisibleChange(visible)
          }
        />
      )}

      <div className='filter-by'>
        {filterBy && (
          <button
            onClick={filterBy.handleClickFilterBtn}
            disabled={filterBy.disableToolbar}
            className={`filter-row-component-button ${
              filterBy.disableToolbar ? 'disable-element' : ''
            }`}
          >
            <img src={imgURL['filter-icon']} alt='Filter By' /> Filter By
          </button>
        )}
      </div>

      {accountBalance && <PayoutAccountBalance />}
      {faq && (
        <button className='filter-row-component-button'>
          <img src={imgURL['faq-icon']} alt='Download' /> FAQ
        </button>
      )}
      {download && (
        <button
          className='filter-row-component-button'
          onClick={download.onClick}
        >
          <img src={imgURL['download-icon']} alt='Download' /> Download
        </button>
      )}
    </div>
  );
};

export default FilterRow;
