import React, { FC } from 'react';
import Props from './typing';
import './style.scss';

const PaymentPageCard: FC<Props> = (props): JSX.Element => {
  const { stepNumber, content } = props;
  return (
    <React.Fragment>
      <div className="step-block">
        <div className="step">
          <span>STEP</span> {stepNumber}
        </div>
        <p>{content}</p>
      </div>
    </React.Fragment>
  );
};

export default PaymentPageCard;
