import React, { FC } from 'react';
import Props from './typing';

const PaymentMethodProgressUnit: FC<Props> = (props) => {
  const { label, icon, percentage, bgClass } = props;
  return (
    <>
      <li className={bgClass}>
        <div className="icon">
          <img src={icon} alt="icon" />
        </div>
        <div className="card-slider">
          <h5>{label}</h5>
          <p className="range-slider">
            <span style={{ width: `${percentage}%` }}></span>
          </p>
        </div>
        <div className="value">{percentage}%</div>
      </li>
    </>
  );
};

export default PaymentMethodProgressUnit;
