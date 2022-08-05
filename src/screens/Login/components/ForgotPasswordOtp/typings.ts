export interface OtpProps {
  length: number;
  formData: FormData;
  onBackClick: () => void;
  onNextClick: () => void;
  validateOtpAction;
  validateOtpState;
  forgetPasswordState;
  forgetPasswordAction;
  validationErrors;
}
interface FormData {
  email?: string;
}
