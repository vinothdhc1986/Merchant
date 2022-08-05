interface Props {
  loginAction: CallableFunction;
  clearLoginAction: CallableFunction;
  loginState: {
    isSuccess: boolean;
    isTokenFailure: boolean;
    isFailure: boolean;
    opCode: string | number;
    message: string;
    PasswordExpireDays: number;
    isUserAuthenticated: boolean;
    isAdmin: boolean;
    showOtpScreen: boolean;
    loginTimeLeft: number;
    UserEmail: string | undefined;
    remainingAttempts: number;
  };
  validationErrors;
  forgetPasswordAction: CallableFunction;
  clearForgetPasswordAction: CallableFunction;
  clearValidateOtpAction: CallableFunction;
  verifyCaptchaAction: CallableFunction;
  captchaVerifyState: { isSuccess: boolean; isFailure: boolean };
  clearVerifyCaptchaAction: CallableFunction;
  setUserDataAction: (data: { [key: string]: any }) => void;
}

export default Props;
