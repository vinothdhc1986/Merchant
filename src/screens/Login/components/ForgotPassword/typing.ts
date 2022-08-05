export interface ForgotPasswordProps {
  onCancelClick: () => void;
  formData: FormData;
  onSendOtpClick: (obj: FormData) => void;
  forgetPasswordState;
  forgetPasswordAction;
  validationErrors;
  isAdmin: boolean;
}
interface FormData {
  email?: string;
}
