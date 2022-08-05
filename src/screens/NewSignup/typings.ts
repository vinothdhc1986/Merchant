interface SignUpProps {
  signupAction: CallableFunction;
  clearSignUpAction: CallableFunction;
  signupState: {
    isSuccess: boolean;
    isFailure: boolean;
    opCode: number | string;
  };
  validationErrors;
  verifyCaptchaAction: CallableFunction;
  clearVerifyCaptchaAction: CallableFunction;
  captchaVerifyState: { isSuccess: boolean; isFailure: boolean };
}

export default SignUpProps;
