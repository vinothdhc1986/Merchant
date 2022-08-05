interface Props {
  closeModal: CallableFunction;
  validationErrors: {
    REQUIRED_FIELD: string;
  };
  clearGetBeneficiaryByCodeAction: CallableFunction;
  addIndividualPayoutState: {
    isSuccess: boolean;
    isFailure: boolean;
    errorMessage: string;
  };
  clearAddIndividualPayoutAction: CallableFunction;
  addNewIndividualPayoutAction: CallableFunction;
  fetchPayoutList: () => void;
}

export default Props;
