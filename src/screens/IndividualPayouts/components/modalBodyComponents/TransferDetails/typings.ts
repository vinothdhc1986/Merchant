interface Props {
  closeModal: CallableFunction;
  onProceed: CallableFunction;
  onBackClick: CallableFunction;
  validationErrors;
  savedTransferDetails?;
  isVPA: boolean;
}

export default Props;
