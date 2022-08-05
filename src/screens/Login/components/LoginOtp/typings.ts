export interface OtpProps {
  email: string;
  timerState: {
    isTimerComplete: boolean;
  };
  fetchLoginOtpAction: CallableFunction;
  resendLoginOtpAction: CallableFunction;
  validateLoginOtpAction: CallableFunction;
  clearResendLoginOtpAction: CallableFunction;
  clearValidateLoginOtpAction: CallableFunction;
  logOutAction: CallableFunction;
  clearLoginAction: CallableFunction;
  validationErrors;
  loginOTPState;
  validateOtpState: {
    isFailure: boolean;
    errorCode: string | number;
    errorMessage: string;
    otpExpired: boolean;
  };
  loginState: {
    UserEmail?: string;
    isAdmin: boolean;
    showOtpScreen: boolean;
  };
}
