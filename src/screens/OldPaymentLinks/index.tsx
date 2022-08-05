import React, { FC } from 'react';
import PaymentPageCard from '../../components/PaymentPageCard';
import imgURL from '../../lib/imgURL';
import Props from './typing';
import './style.scss';
import SubHeader from 'components/SubHeader';

const cardsList = [
  {
    stepNo: 1,
    content: `Enter details such as Amount, Invoice, Product Description, Customer E-mail & Mobile Number, Link Expiry Time, and other information. You can also choose to accept the payment in parts.`,
  },
  {
    stepNo: 2,
    content: `Send it to your customer via e-mail or SMS by clicking on the submit button.`,
  },
  {
    stepNo: 3,
    content: `Once the payment is made, you will receive the amount in your registered settlement bank account according to your settlement cycle with Pine Labs.`,
  },
];

const Settlements: FC<Props> = (): JSX.Element => {
  return (
    <React.Fragment>
      <div className='payment-links-container'>
        <SubHeader
          title='Payment Links on Plural'
          description='Payment Links help you receive payments from customers by sending them links via e-mail or SMS.'
          showIcon={true}
          svgIcon='payment-links-white-icon'
          svgDetail='Payment Links'
        />

        <div className='paymnet-steps'>
          {cardsList.map((item, index) => (
            <React.Fragment key={index}>
              <PaymentPageCard
                stepNumber={item.stepNo}
                content={item.content}
              />
            </React.Fragment>
          ))}
          <div className='intro-button'>
            <button
              className='primary-button '
              onClick={() =>
                process.env.REACT_APP_EDGE_DASHBOARD_LINK &&
                window.open(process.env.REACT_APP_EDGE_DASHBOARD_LINK)
              }
            >
              Manage Payment Links <img src={imgURL['right-arrow']} alt=' ' />{' '}
            </button>
            <span>
              You will be redirected to the Plural Gateway Dashboard. You need to
              be registered on Plural Gateway to use this feature.
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Settlements;
