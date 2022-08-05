export interface ResetPasswordProps {
  onCancelClick: () => void;
  onSaveClick: () => void;
  saveNewPasswordAction: CallableFunction;
  saveNewPasswordState: {
    isSuccess: boolean;
    isPasswordChanged: boolean;
    isFailure: boolean;
    message: string;
    opCode : number | string;
  };
  forgetPasswordState: {
    otpToken: string;
  };
  clearSaveNewPasswordAction: CallableFunction;
  clearForgetPasswordAction: CallableFunction;
  clearValidateOtpAction: CallableFunction;
  validationErrors;
  isAdmin: boolean;
  verifyCaptchaAction: CallableFunction;
  captchaVerifyState: { isSuccess: boolean; isFailure: boolean };
  clearVerifyCaptchaAction: CallableFunction;
}
