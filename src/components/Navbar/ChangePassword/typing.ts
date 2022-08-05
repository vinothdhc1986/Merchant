interface Props {
  cancelHandler: () => void;
  changePasswordAction: CallableFunction;
  changePasswordState;
  validationErrors;
  clearChangePasswordAction: CallableFunction;
  isAdmin: boolean;
}

export default Props;
