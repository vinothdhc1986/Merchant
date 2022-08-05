import React, { FC } from 'react';
import imgURL from '../../lib/imgURL';
import Props from './typing';
import './style.scss';

const AppliedFilters: FC<Props> = (props): JSX.Element => {
  const {
    appliedFiltersList,
    clearAllHandler,
    removeFilterHandler,
    hideClearAllBtn,
    removePendingListFilterHandler,
    appliedPendingFiltersList,
    isPendingListFilter,
  } = props;
  return (
    <React.Fragment>
      <div className='filter-applied'>
        <ul>
          {isPendingListFilter
            ? appliedPendingFiltersList?.length &&
              appliedPendingFiltersList?.map((item, index) => (
                <li key={index}>
                  {`${item}`}
                  <button
                    onClick={() => {
                      removePendingListFilterHandler &&
                        removePendingListFilterHandler();
                    }}
                  >
                    <img src={imgURL['filter-close']} alt='close' />
                  </button>
                </li>
              ))
            : appliedFiltersList?.length &&
              appliedFiltersList.map((item, index) => (
                <li key={index}>
                  {`${item.keyName}:`}
                  <label>&nbsp;{item.value}</label>
                  <button
                    onClick={() => {
                      removeFilterHandler({
                        keyName: item.keyName,
                        value: item.value,
                      });
                    }}
                  >
                    <img src={imgURL['filter-close']} alt='close' />
                  </button>
                </li>
              ))}

          {!hideClearAllBtn && (
            <button className='clear-all' onClick={clearAllHandler}>
              Clear All
            </button>
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default AppliedFilters;
