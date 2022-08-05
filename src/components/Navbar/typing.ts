interface Props {
  isCollapsed: boolean;
  loginState: any;
  clearChangePasswordAction: CallableFunction;
  isAdmin: boolean;
  clearMerchantInfoAction: CallableFunction;
  validationErrorState;
  showTrmPortalLink: boolean;
  trmRedirectUrlState: {
    isSuccess: boolean;
    trmRedirectUrl: string;
    isFailure: boolean;
    responseMessage: string;
  };
  getTRMRedirectUrlAction: CallableFunction;
  clearTRMRedirectUrlStateAction: CallableFunction;
}

export default Props;
