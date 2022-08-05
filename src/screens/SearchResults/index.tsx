import React, { FC, useState } from 'react';
import Props from './typing';
import './style.scss';
import AppliedFilters from '../../components/AppliedFilters';
import {
  appliedFiltersList,
  TAB_CONSTANTS,
  paymentRecords,
  tableConstants,
} from './constants';
import Tabs from '../../components/Tabs';
import imgURL from '../../lib/imgURL';
import CustomTable from '../../components/CustomTable';

const SearchResults: FC<Props> = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<string>(
    TAB_CONSTANTS[0].value
  );
  // TODO: To be fixed
  // const renderTabContent = (tab: string): JSX.Element | null => {
  //   switch (tab) {
  //     case 'payment':
  //       return null;
  //     case 'refunds':
  //       return null;
  //     case 'settlements':
  //       return null;
  //     case 'subscription':
  //       return null;
  //     default:
  //       return null;
  //   }
  // };

  const clearAllHandler = () => {};
  return (
    <React.Fragment>
      <div className='heading-title'>
        <h3>Search Results</h3>
      </div>
      <AppliedFilters
        appliedFiltersList={appliedFiltersList}
        clearAllHandler={clearAllHandler}
      />
      <Tabs
        options={TAB_CONSTANTS}
        value={selectedTab}
        onChange={(value) => setSelectedTab(value)}
      />
      <div className='tabContentSection'>
        <div style={{ display: 'block' }}>
          <div className='result-count'>
            123 Results found in {selectedTab}
            <a onClick={() => {}}>
              View All in Payments{' '}
              <img src={imgURL['right-arrow-blue']} alt='' />{' '}
            </a>
          </div>
          <div className='table-section'>
            <CustomTable columns={tableConstants()} dataSource={paymentRecords} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchResults;
