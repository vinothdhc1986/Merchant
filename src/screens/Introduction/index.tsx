import React, { FC } from 'react';
import Props from './typing';
import './style.scss';
import imgURL from '../../lib/imgURL';

const Introduction: FC<Props> = (): JSX.Element => {
  return (
    <React.Fragment>
      <div className="payment-intro">
        <div className="heading-title">
          <h2>Payment</h2>
          <p>
            This is a summary of all your transactions across multiple payment
            gateways
          </p>
        </div>
        <div className="payment-process">
          <ul>
            <li>
              <img src={imgURL['card-icon']} alt="" /> View all payments made on
              the platform
            </li>
            <li>
              <img src={imgURL['refresh-icon']} alt="" /> Inititate Refunds
            </li>
            <li>
              <img src={imgURL['validate-icon']} alt=" " /> Validate IMEI Codes
              for your EMI Transactions
            </li>
          </ul>
        </div>
      </div>
      <div className="intro-button">
        <button className="primary-button ">
          Proceed <img src={imgURL['right-arrow']} alt=" " />{' '}
        </button>
      </div>
    </React.Fragment>
  );
};

export default Introduction;
