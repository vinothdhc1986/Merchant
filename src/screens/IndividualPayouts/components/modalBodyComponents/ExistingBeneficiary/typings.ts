interface Props {
  closeModal: CallableFunction;
  onProceed: CallableFunction;
  onBackClick: CallableFunction;
  savedExistingBeneficiary?;
  getBeneficiaryByCodeAction: CallableFunction;
  getBeneficiaryByCodeState: {
    isSuccess: boolean;
    isFailure: boolean;
    data;
  };
  search: string;
  validationErrors: {
    ONLY_ALPHANUMERIC_ALLOWED: string;
    BENEFICIARY_NOT_FOUND: string;
    BENEFICIARY_ALREADY_DISABLED: string;
    BENEFICIARY_ALREADY_FAILED: string;
  };
}

export default Props;
