interface Props {
  clearUpdateMerchantTRMStatusAction: CallableFunction;
  updateMerchantTRMStatusAction: CallableFunction;
  merchantTRMEnabled: boolean;
  merchantData: {
    merchantId: string;
  };
  updateTRMStatusState: {
    isSuccess: boolean;
    isFailure: boolean;
  };
  validationErrorState: {
    TRM_STATUS_UPDATE_SUCCESS: string;
    TRM_STATUS_UPDATE_FAILURE: string;
  };
}

export default Props;
