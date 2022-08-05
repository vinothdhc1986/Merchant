import actionConstants from '../constants/';

const validationErrorState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  opCode: 0,
  message: '',
  validationErrors: {
    //  Note: All the new validation error messages
    //  will be added here and then will be transferred to API
    SOMETHING_WENT_WRONG: 'Something went wrong, please try again',
    ACCOUNT_IS_BLOCKED: 'This account is blocked',
    TRM_STATUS_UPDATE_SUCCESS: 'TRM status updated successfully',
    TRM_STATUS_UPDATE_FAILURE: 'TRM status change failed',
    PASSWORD_EXPIRED: 'Your Password is expired.',
    PASSWORD_EXPIRY_WARNING:
      'Your password will expire in ${passwordExpireDays} days',
    INCORRECT_OTP: 'Incorrect OTP',
    PASSWORD_CHANGED: 'Password changed successfully.',
    SIGNUP_SUCCESS: 'Signup was successful.',
    REQUIRED_FIELD: 'This is a required field',
    PAYMENT_LINK_DATE_TIME_RANGE:
      'Payment link schedule time should be earlier than link expiry time',
    PAYMENT_LINK_CREATED_SUCCESSFULLY: 'Payment link created successfully',
    REFUND_INITIATE_SUCCESS_DESCRIPTION:
      'Refund has been initiated for Transaction ID ${transactionId}',
    REFUND_INITIATE_SUCCESS: 'Refund Initiated',
    TOKEN_EXPIRED: 'Token expired',
    PASSWORD_SAVED: 'Password saved successfully.',
    STATUS_UPDATED_SUCCESSFULLY: 'Status Updated Successfully!',
    STATUS_UPDATED_SUCCESSFULLY_DESCRIPTION:
      'Your status has been updated successfully.',
    REQUEST_NOT_PROCESSED:
      'Your request could not be processed. Please try later.',
    FETCHING_GATEWAYS_FAILED: 'Fetching Gateways Failed',
    GATEWAY_CREATED_SUCCESSFULLY: 'Gateway Created Successfully!',
    GATEWAY_CREATED_SUCCESSFULLY_DESCRIPTION:
      'Payment Gateway ID ${gatewayId} was created successfully',
    GATEWAY_CREATION_FAILED: 'Gateway Creation Failed!',
    GATEWAY_UPDATED_SUCCESSFULLY: 'Gateway Updated Successfully!',
    GATEWAY_UPDATED_SUCCESSFULLY_DESCRIPTION:
      'Payment Gateway ID ${gatewayId} was updated successfully',
    GATEWAY_UPDATE_FAILED: 'Gateway Updation Failed!',
    SMART_ROUTING_BIN_ROUTE_DELETE: 'Bin Routing Deleted',
    SMART_ROUTING_BIN_ROUTE_DELETE_DESCRIPTION:
      'Bin Route was deleted successfully',
    SMART_ROUTING_BRAND_ROUTE_DELETE: 'Brand Routing Deleted',
    SMART_ROUTING_BRAND_ROUTE_DELETE_DESCRIPTION:
      'Card Brand Routing was deleted successfully',
    SMART_ROUTING_ISSUER_ROUTE_DELETE: 'Issuer Routing Deleted',
    SMART_ROUTING_ISSUER_ROUTE_DELETE_DESCRIPTION:
      'Issuer Route was deleted successfully',
    SMART_ROUTING_BIN_ROUTING_CREATED_SUCCESS: 'Bin Routing Created',
    SMART_ROUTING_BIN_ROUTING_CREATED_SUCCESS_DESCRIPTION:
      'Bin Route was created successfully',
    SMART_ROUTING_BIN_ROUTING_CREATED_FAILURE: 'Bin Routing Creation Failed',
    SMART_ROUTING_BIN_ROUTING_UPDATED_SUCCESS: 'Bin Routing Updated',
    SMART_ROUTING_BIN_ROUTING_UPDATED_SUCCESS_DESCRIPTION:
      'Bin Route was updated successfully',
    SMART_ROUTING_BRAND_ROUTING_CREATED_SUCCESS: 'Brand Routing Created',
    SMART_ROUTING_BRAND_ROUTING_CREATED_SUCCESS_DESCRIPTION:
      'Card Brand Routing was created successfully',
    SMART_ROUTING_BRAND_ROUTING_CREATED_FAILURE:
      'Brand Routing Creation Failed',
    SMART_ROUTING_BRAND_ROUTING_UPDATED_SUCCESS: 'Brand Routing Updated',
    SMART_ROUTING_BRAND_ROUTING_UPDATED_SUCCESS_DESCRIPTION:
      'Card Brand Routing was updated successfully',
    SMART_ROUTING_ISSUER_ROUTING_CREATED_SUCCESS: 'Issuer Routing Created',
    SMART_ROUTING_ISSUER_ROUTING_CREATED_SUCCESS_DESCRIPTION:
      'Issuer Route was created successfully',
    SMART_ROUTING_ISSUER_ROUTING_CREATED_FAILURE:
      'Issuer Routing Creation Failed',
    SMART_ROUTING_ISSUER_ROUTING_UPDATED_SUCCESS: 'Issuer Routing Updated',
    SMART_ROUTING_ISSUER_ROUTING_UPDATED_SUCCESS_DESCRIPTION:
      'Issuer Route was updated successfully',
    SMART_ROUTING_PRIORITY_LOGIC_UPDATE_SUCCESS: 'Priority Logic Updated',
    SMART_ROUTING_PRIORITY_LOGIC_UPDATE_SUCCESS_DESCRIPTION:
      'Priority Logic was updated succesfully.',
    SMART_ROUTING_FETCHING_ACTIVE_PRIORITY_LOGIC_FAILED:
      'Fetching Active Priority Logic Failed',
    SMART_ROUTING_PRIORITY_LOGIC_DELETE_SUCCESS: 'Priority Logic Deleted',
    SMART_ROUTING_PRIORITY_LOGIC_DELETE_SUCCESS_DESCRIPTION:
      'Priority Logic was deleted succesfully.',
    SMART_ROUTING_PRIORITY_LOGIC_DELETE_FAILED:
      'Priority Logic Deletion Failed',
    RECORDS_UPLOADED_SUCCESSFULLY: 'Records Uploaded Successfully',
    INVALID_FILE_TYPE_CSV:
      '${fileName} is not a valid file type. Please choose a csv file.',
    INVALID_FILE_NAME:
      'File Name should contain alphabets, numbers, hyphen or underscore only.',
    EMAIL_ADDRESS_OR_PASSWORD_IS_INCORRECT:
      'Either email or password is incorrect',
    INVALID_CREDENTIALS: 'Invalid credentials',
    PAYMENT_LINK_EXPIRY_DATE_TIME_VALIDATION:
      'Link expiry time should greater than link creation time',
    SMART_ROUTING_PREFERENCE_MAPPING_ALREADY_EXISTS:
      'Preference score mapping already exists',
    MAX_DATE_RANGE_MESSAGE: 'Date range cannot exceed 3 months',
    TOKEN_NOT_VALID: 'Token is no longer valid',
    PASSWORD_ALREADY_SET: 'Password is already set for your account',
    PREVIOUS_LINK_STILL_VALID: 'Previous link is still valid',
    INVALID_REQUEST: 'Request is invalid',
    CAPTCHA_LOADING_FAILED:
      'Please check your internet connection and reload to get a reCAPTCHA challenge.',
    RESEND_OTP: 'Please try resending OTP',
    USER_IS_TERMINATED: 'User is terminated, please reset your password',
    INCORRECT_VERIFICATION_CODE:
      'This doesn’t match the Code we sent. Check again?',
    INCORRECT_VERIFICATION_CODE_FOR_FIVE_TIMES:
      'You have entered incorrect code for 5 times. Please resend code!',
    MAX_OTP_ATTEMPTS_LIMIT_REACHED:
      'You have exceeded maximum limit of resend OTP, please try after 24 hours.',
    MAX_RESET_PASSWORD_LIMIT_REACHED:
      'You can reset your password only thrice in 24 hours. Please try again later.',
    LOGIN_OTP_EXPIRED: 'Verification code is expired, Please resend code!',
    REMAINING_ATTEMPTS:
      'Incorrect password. You have ${remainingAttempts} attempts remaining.',
    IFSC_CODE_MAX_LENGTH: 'IFSC code can not be more than 11 char',
    ACCOUNT_NO_MAX_LENGTH: 'Account no can not be more than 32 char',
    ONLY_ALPHANUMERIC_ALLOWED: 'Only alphanumeric are allowed',
    BANK_NAME_MAX_LENGTH: 'Bank name can not be more than 50 char',
    ACCOUNT_NAME_MAX_LENGTH: 'Account name can not be more than 64 char',
    ONLY_ALPHABETS_ALLOWED: 'Only Alphabets are allowed',
    BENEFICIARY_ALREADY_DISABLED: 'Beneficiary already disabled',
    BENEFICIARY_NOT_FOUND: 'Beneficiary not found',
    ACCOUNT_NO_MATCH_ERROR: 'Both account no. need to be same',
    INVALID_EMAIL: 'Invalid Email',
    INVALID_PHONE_NUMBER: 'Invalid Phone Number',
    INVALID_BENEFICIARY_NAME: 'Invalid Beneficiary Name',
    INVALID_IFSC_CODE: 'Invalid IFSC code',
    BENEFICIARY_ALREADY_FAILED: 'Beneficiary has already been failed',
    INVALID_PAN: 'Invalid PAN',
  },
};

const initialState = {
  validationErrorState: { ...validationErrorState },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function validationReducer(state = initialState, action) {
  switch (action.type) {
    case actionConstants.POST_VALIDATION_ERRORS_REQUEST:
      return {
        ...state,
        validationErrorState: {
          ...state.validationErrorState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          opCode: 0,
          message: '',
        },
      };

    case actionConstants.POST_VALIDATION_ERRORS_SUCCESS:
      return {
        ...state,
        validationErrorState: {
          ...state.validationErrorState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          validationErrors: {
            ...state.validationErrorState.validationErrors,
            ...action.payload.body,
          },
          opCode: 0,
          message: '',
        },
      };

    case actionConstants.POST_VALIDATION_ERRORS_FAILURE:
      return {
        ...state,
        validationErrorState: {
          ...state.validationErrorState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          opCode: action.payload.body.error_code,
          message: action.payload.body.error_message,
        },
      };

    case actionConstants.POST_VALIDATION_ERRORS_CLEAR:
      return {
        ...state,
        validationErrorState,
      };
    default:
      return state;
  }
}
