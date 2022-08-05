interface Props {
  handleClose: () => void;
  createPaymentLinkAction: CallableFunction;
  clearCreatePaymentLinkAction: CallableFunction;
  createPaymentLinkState;
  handleRefreshListing: CallableFunction;
  validationErrors;
  isAdmin: boolean;
}

export default Props;
