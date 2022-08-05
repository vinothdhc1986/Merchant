import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import CustomSwitch from '../../../../../../components/CustomSwitch';
import Select from 'components/Select';
import notify from '../../../../../../lib/notifiy';
import {
  clearPayoutModuleStatusAction,
  updateMerchantPayoutModuleStatusAction,
  getBankListAction,
  clearBankListAction,
} from '../../../../../../redux/actions/payouts';
import RemitterAccounts from './RemitterAccounts';
import Props from './typing';
import './styles.scss';

const PayoutSection: FC<Props> = (props) => {
  useEffect(() => {
    props.getBankListAction();
    return () => {
      props.clearPayoutModuleStatusAction();
      props.clearBankListAction();
    };
  }, []);

  useEffect(() => {
    if (props.updatePayoutModuleStatusState.isSuccess) {
      notify({
        type: 'success',
        message: `Payout ${
          props.merchantPayoutEnabled ? 'Enabled' : 'Disabled'
        } Successfully`,
        description: '',
      });
    } else if (props.updatePayoutModuleStatusState.isFailure) {
      notify({
        type: 'error',
        message: props.validationErrors.SOMETHING_WENT_WRONG,
        description: '',
      });
    }
  }, [props.updatePayoutModuleStatusState]);

  return (
    <>
      <h5>Payout</h5>
      <CustomSwitch
        label={`${
          props.merchantPayoutEnabled ? 'Disable' : 'Enable'
        } Payout Module`}
        checked={props.merchantPayoutEnabled}
        onChange={(value: boolean) =>
          props.updateMerchantPayoutModuleStatusAction({
            ...props.merchantData,
            status: value,
            bankId: props.merchantPayoutBankId || props.bankList[0].value,
          })
        }
        className='customizations-toggle'
      />

      {props.merchantPayoutEnabled && (
        <>
          <div className='payout-bank-select-wrapper'>
            <label>Bank</label>
            <Select
              onChange={(value) =>
                props.updateMerchantPayoutModuleStatusAction({
                  ...props.merchantData,
                  status: props.merchantPayoutEnabled,
                  bankId: value,
                })
              }
              optionList={props.bankList}
              defaultValue={props.merchantPayoutBankId}
            />
          </div>
          <RemitterAccounts />
        </>
      )}
    </>
  );
};

const mapStateToProps = ({
  loginReducer,
  payoutsReducer,
  validationReducer,
}) => ({
  merchantPayoutEnabled: loginReducer.loginState.merchantPayoutEnabled,
  merchantData: {
    name: loginReducer?.loginState?.merchantName ?? '',
    merchantId: loginReducer?.loginState?.MerchantId ?? '',
    email: loginReducer?.loginState?.merchantEmailId ?? '',
  },
  updatePayoutModuleStatusState:
    payoutsReducer?.updatePayoutModuleStatusState ?? {},
  validationErrors: validationReducer.validationErrorState.validationErrors,
  merchantPayoutBankId: loginReducer.loginState.payoutBankId,
  bankList: payoutsReducer.bankListState.data,
});

export default connect(mapStateToProps, {
  clearPayoutModuleStatusAction,
  updateMerchantPayoutModuleStatusAction,
  getBankListAction,
  clearBankListAction,
})(PayoutSection);
