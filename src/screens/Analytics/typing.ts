interface Props {
  analyticsState: {
    isSuccess: boolean;
    isFailure: boolean;
    message: string;
    analyticsURL: string;
    MerchantName?: string;
  };
  loginState: {
    isAdmin: boolean;
    MerchantId: number;
  };
  analyticsAction: CallableFunction;
  clearAnalyticsAction: CallableFunction;
  validationErrors;
}

export default Props;
