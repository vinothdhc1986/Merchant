interface Props {
  closeModal: CallableFunction;
  onProceed: CallableFunction;
  onBackClick: CallableFunction;
  existingBeneficiaryDetails;
  transferTypeDetails;
  scheduleType: string;
  scheduleDateTime: Date;
}

export default Props;
