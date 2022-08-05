interface Props {
  newSignUpAction: CallableFunction;
  validationErrors;
  clearNewSignUpAction: CallableFunction;
  newSignUpState: {
    isSuccess: boolean;
    isFailure: boolean;
    opCode: string | number;
    message: string;
    isSignupCompleted: boolean;
  };
  verifyCaptchaAction: CallableFunction;
  captchaVerifyState: { isSuccess: boolean; isFailure: boolean };
  clearVerifyCaptchaAction: CallableFunction;
  validateInvitationAction: CallableFunction;
  clearValidateInvitationAction: CallableFunction;
  validateInvitationState: {
    isSuccess: boolean;
  };
}

export default Props;
