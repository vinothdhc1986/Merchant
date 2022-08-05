import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CustomModalRow from 'components/CustomModalRow';
import Popper from 'components/Popper';
import {
  getAccountBalanceAction,
  clearAccountBalanceStateAction,
} from 'redux/actions/payouts';
import Props from './typing';
import imgURL from 'lib/imgURL';
import notify from 'lib/notifiy';
import { getMerchantIdFromStore, numberWithCommas } from 'lib/helper';
import './styles.scss';

const PayoutAccountBalance: FC<Props> = (props) => {
  const merchantId = getMerchantIdFromStore();
  const [showToolTip, setShowToolTip] = useState(false);

  useEffect(() => {
    props.getAccountBalanceAction(merchantId);
    return () => {
      props.clearAccountBalanceStateAction();
    };
  }, []);

  useEffect(() => {
    if (props.accountBalanceState.isFailure) {
      notify({
        type: 'error',
        message: props.validationErrorState.SOMETHING_WENT_WRONG,
        description: props.accountBalanceState.errorMessage,
      });
    }
  }, [props.accountBalanceState]);

  const tooltipContent = (
    <>
      <CustomModalRow
        label='Virtual Account No:'
        value={<b>{props.accountBalanceState.virtualAccountNumber}</b>}
      />
      <CustomModalRow
        label='IFSC:'
        value={<b>{props.accountBalanceState.ifscCode}</b>}
      />
    </>
  );

  return (
    <div className='payout-account-balance'>
      <label htmlFor='payout-account-balance-value' id='balance-label-name'>
        <img src={imgURL['account-balance-icon']} alt='Account Balance' />
        <Popper
          content={
            <div className='account-details-tooltip'>{tooltipContent}</div>
          }
          trigger={'hover'}
          visible={showToolTip}
          onVisibleChange={(visible) => setShowToolTip(visible)}
          parentId='balance-label-name'
        >
          <span className='cursor-pointer'>Account Details:</span>
        </Popper>
      </label>
      <div
        style={{
          minWidth:
            /*
             * 33 - sum of extra elements other than balance digits
             * 12 - width of a single digit in account balance
             */
            33 + 12 * props.accountBalanceState.balance.toString().length,
          justifyContent: props.accountBalanceState.isLoading
            ? 'center'
            : 'flex-start',
        }}
      >
        {props.accountBalanceState.isLoading ? (
          <img src={imgURL['loader']} alt='loader' />
        ) : (
          <>
            <span id='payout-account-balance-value'>
              ₹ {numberWithCommas(props.accountBalanceState.balance)}
            </span>
            <button onClick={() => props.getAccountBalanceAction(merchantId)}>
              <img alt='refresh-button' src={imgURL['grey-refresh-icon']} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ payoutsReducer, validationReducer }) => ({
  accountBalanceState: payoutsReducer.payoutAccountBalanceState,
  validationErrorState: validationReducer.validationErrorState.validationErrors,
});

export default connect(mapStateToProps, {
  getAccountBalanceAction,
  clearAccountBalanceStateAction,
})(PayoutAccountBalance);
