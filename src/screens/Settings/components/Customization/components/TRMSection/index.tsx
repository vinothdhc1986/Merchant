import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import CustomSwitch from '../../../../../../components/CustomSwitch';
import notify from '../../../../../../lib/notifiy';
import {
  clearUpdateMerchantTRMStatusAction,
  updateMerchantTRMStatusAction,
} from 'redux/actions/login';
import Props from './typing';

const TRMSection: FC<Props> = (props) => {
  useEffect(() => {
    return () => {
      props.clearUpdateMerchantTRMStatusAction();
    };
  }, []);

  useEffect(() => {
    const { isSuccess, isFailure } = props.updateTRMStatusState;
    if (isSuccess) {
      notify({
        message: 'Success',
        type: 'success',
        description: props.validationErrorState?.TRM_STATUS_UPDATE_SUCCESS,
      });
      props.clearUpdateMerchantTRMStatusAction();
    } else if (isFailure) {
      notify({
        message: 'Failure',
        type: 'error',
        description: props.validationErrorState?.TRM_STATUS_UPDATE_FAILURE,
      });
      props.clearUpdateMerchantTRMStatusAction();
    }
  }, [props.updateTRMStatusState]);
  return (
    <>
      <h5>TRM</h5>
      <CustomSwitch
        label={`${
          props.merchantTRMEnabled ? 'Disable' : 'Enable'
        } TRM Transactions`}
        onChange={(value) => {
          props.updateMerchantTRMStatusAction({
            status: value,
            iMerchantId: props.merchantData.merchantId,
          });
        }}
        checked={props.merchantTRMEnabled}
        className='customizations-toggle'
      />
    </>
  );
};

const mapStateToProps = ({ loginReducer, validationReducer }) => ({
  merchantTRMEnabled: loginReducer.loginState.merchantTRMEnabled,
  validationErrorState: validationReducer.validationErrorState.validationErrors,
  updateTRMStatusState: loginReducer.updateTRMStatusState,
  merchantData: {
    merchantId: loginReducer?.loginState?.MerchantId ?? '',
  },
});

export default connect(mapStateToProps, {
  clearUpdateMerchantTRMStatusAction,
  updateMerchantTRMStatusAction,
})(TRMSection);
