import { getMerchantIdFromStore } from 'lib/helper';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { getOverviewPendingSummaryAction } from 'redux/actions/payouts';
import useRedirect from 'hooks/useRedirect';
import { UiRoutes } from 'lib/constants';
import { PAYOUT_REGULAR_LIST_TYPE, PAYOUT_SCHEDULE_LIST_TYPE } from 'screens/Payouts/constants';
import { PendingSummaryProps } from '../../typing';
import imgURL from 'lib/imgURL';

const PendingSummary: FC<PendingSummaryProps> = (props) => {
  const merchantId = getMerchantIdFromStore();

  const { push } = useRedirect();

  useEffect(() => {
    props.getOverviewPendingSummaryAction(merchantId);
  }, []);

  return (
    <>
      <div className='payouts-card overview-card'>
        <h3>PAYOUTS</h3>
        <p>Create a single or bulk payout securely</p>
        <div>
          <a
            onClick={() =>
              push(UiRoutes.INDIVIDUAL_PAYOUTS, {
                submitStatusApplied: PAYOUT_REGULAR_LIST_TYPE,
              })
            }
          >
            Individual ({props.pendingIndividualPayoutCount})
          </a>
          <a
            onClick={() =>
              push(UiRoutes.INDIVIDUAL_PAYOUTS, {
                submitStatusApplied: PAYOUT_SCHEDULE_LIST_TYPE,
              })
            }
          >
            Scheduled ({props.pendingSchduledPayoutCount})
          </a>
        </div>
      </div>
      <div className='beneficiaries-card overview-card'>
        <h3>BENEFICIARIES</h3>
        <p>Start Adding Vendors to Make Payouts</p>
        <div>
          <a
            onClick={() =>
              push(UiRoutes.BENEFICIARIES, {
                isSubmitStatusApplied: true,
              })
            }
          >
            Verification Needed ({props.pendingBeneficiaryCount})
          </a>
        </div>
      </div>
      <div className='cashflow-card overview-card'>
        <h3>{`TODAY’S CASHFLOW`}</h3>
        <div className='cashflow-wrapper'>
          <div>
            <img src={imgURL['payout-plus']} alt='plus' />
            <span>₹ {props.todayCashflow.added}</span>
          </div>
          <div>
            <img src={imgURL['payout-minus']} alt='minus' />
            <span>₹ {props.todayCashflow.debited}</span>
          </div>
          <div>
            <img src={imgURL['payout-equals']} alt='equals' />
            <span>₹ {props.todayCashflow.balance}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ payoutsReducer }) => ({
  pendingIndividualPayoutCount:
    payoutsReducer.overviewData.pendingIndividualPayoutCount,
  pendingBeneficiaryCount: payoutsReducer.overviewData.pendingVerificationCount,
  pendingSchduledPayoutCount:
    payoutsReducer.overviewData.pendingSchduledPayoutCount,
  todayCashflow: {
    added: payoutsReducer.overviewData.todayCashflow.addedAmount,
    debited: payoutsReducer.overviewData.todayCashflow.debitedAmount,
    balance: payoutsReducer.overviewData.todayCashflow.balanceAmount,
  },
});

export default connect(mapStateToProps, {
  getOverviewPendingSummaryAction,
})(PendingSummary);
