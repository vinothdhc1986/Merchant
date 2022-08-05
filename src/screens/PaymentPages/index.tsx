import React, { FC } from 'react';
import { connect } from 'react-redux';
import PaymentPageCard from '../../components/PaymentPageCard';
import SubHeader from 'components/SubHeader';
import imgURL from '../../lib/imgURL';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import Props from './typing';
import './style.scss';

const cardsList = [
  {
    stepNo: 1,
    content: `Choose a custom template or select from our preset templates for a variety of use cases.`,
  },
  {
    stepNo: 2,
    content: `Enter information to publish on your payment page. Get payments based on flat pricing or breakup.`,
  },
  {
    stepNo: 3,
    content: `Publish your payment page, share it with your customers, and receive payments from them on the page`,
  },
];

const PaymentPages: FC<Props> = (props): JSX.Element => {
  return (
    <React.Fragment>
      <div className='payment-pages-container'>
        <SubHeader
          title='Payment Pages on Plural'
          description='Collect payments with ease using customizable payment pages. Choose from our array of templates. From hosting an event and selling a product online to accepting donations and fees, choose from an array of templates and create pages using Plural Edge instantly!'
          showIcon={true}
          svgIcon='payment-pages-white-icon'
          svgDetail='Payment Pages'
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
              onClick={() => {
                if (!props.isAdmin)
                  pushClevertapEvent(
                    clevertapEventConfigList.PAYMENT_PAGES_REDIRECTED
                  );
                process.env.REACT_APP_EDGE_DASHBOARD_LINK &&
                  window.open(process.env.REACT_APP_EDGE_DASHBOARD_LINK);
              }}
            >
              Manage Payment Pages <img src={imgURL['right-arrow']} alt=' ' />{' '}
            </button>
            <span>
              You will be redirected to Plural Edge Dashboard. You need to be
              registered on Edge to use this feature.
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ loginReducer }) => ({
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps)(PaymentPages);
