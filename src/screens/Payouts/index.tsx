import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import SubHeader from '../../components/SubHeader';
import AboutHeader from '../../components/AboutHeader';
import PendingSummary from './components/PendingSummary';
import StatusSummary from './components/StatusSummary';
import TransactionSummary from './components/TransactionSummary';
import PayoutAccountBalance from 'components/PayoutAccountBalance';
import { clearOverviewErrorStateAction } from 'redux/actions/payouts';
import notify from 'lib/notifiy';
import Props from './typing';
import './style.scss';

const Payouts: FC<Props> = (props): JSX.Element => {
  const { isAdmin } = props.loginState;

  useEffect(() => {
    return () => {
      props.clearOverviewErrorStateAction();
    };
  }, []);

  useEffect(() => {
    if (props.overviewError) {
      notify({
        type: 'error',
        message: props.validationErrorState.SOMETHING_WENT_WRONG,
        description: '',
      });
    }
  }, [props.overviewError]);

  return (
    <React.Fragment>
      <div className='payouts-container'>
        {!isAdmin && (
          <AboutHeader
            title='About Payouts'
            content='View insights on how you’re using payouts with Plural here.'
          />
        )}
        <SubHeader
          title='Payouts'
          description='Check where your funds are going. You can also check your account balance here.'
          showIcon={true}
          svgIcon='payouts-subheader'
          svgDetail='Payouts'
          extraButtons={<PayoutAccountBalance />}
        />
        <div className='payout-overview-content'>
          <div className='row'>
            <PendingSummary />
          </div>
          <div className='row'>
            <TransactionSummary />
            <StatusSummary />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({
  loginReducer,
  payoutsReducer,
  validationReducer,
}) => ({
  loginState: loginReducer.loginState,
  overviewError: payoutsReducer.overviewData.isError,
  validationErrorState: validationReducer.validationErrorState.validationErrors,
});

export default connect(mapStateToProps, { clearOverviewErrorStateAction })(
  Payouts
);
