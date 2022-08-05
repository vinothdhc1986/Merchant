import React, { FC } from 'react';
import Props from './typing';
import imgURL from '../../../../lib/imgURL';
import './style.scss';

const NoAccess: FC<Props> = (props) => {
  return (
    <React.Fragment>
      <div class="imei-rquest-failed">
        <h4>You do not have access to Plans</h4>
        <p>Please contact your RM to get access to Plans and Subscriptions.</p>
        <button class="secondry-button">
          Learn More About Plans & Subscriptions{' '}
          <img src={imgURL['open-new-tab-blue']} alt="" />{' '}
        </button>
      </div>
    </React.Fragment>
  );
};

export default NoAccess;
