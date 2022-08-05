import React, { FC } from 'react';
import Props from './typing';
import './style.scss';
import AppliedFilters from 'components/AppliedFilters';

const PendingListFilter: FC<Props> = (props): JSX.Element => {
  const {
    filterTitle,
    handleClickPendingFilter,
    handleRemovePendingFilter,
    filtersList,
    appliedPendingFiltersList,
  } = props;
  return (
    <>
      <div className='pending-list-filter'>
        <label>{`${filterTitle} `}</label>
        {filtersList.map((item, i) => (
          <React.Fragment key={`${item.label}-${i}`}>
            {appliedPendingFiltersList.includes(item.key) ? (
              <AppliedFilters
                isPendingListFilter={!!appliedPendingFiltersList.length}
                appliedPendingFiltersList={[`${item.label}`]}
                hideClearAllBtn={true}
                removePendingListFilterHandler={() =>
                  handleRemovePendingFilter(item.key)
                }
              />
            ) : (
              <div
                className={'filter-label'}
                onClick={() => handleClickPendingFilter(item.key)}
              >
                {`${item.label} (${item.pendingRecords})`}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default PendingListFilter;
