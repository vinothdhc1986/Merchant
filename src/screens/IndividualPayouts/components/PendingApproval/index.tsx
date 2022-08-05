import React, { FC } from 'react';
//import notify from '../../lib/notifiy';
import Props from './typing';
import './style.scss';

const PendingApprovals: FC<Props> = (): JSX.Element => {
  return (
    <React.Fragment>
      <div className='pending-approval'>
        <span>Pending for Approval</span>
        <a>Individual(28)</a>
        <a>Bulk(3)</a>
      </div>
    </React.Fragment>
  );
};

export default PendingApprovals;
