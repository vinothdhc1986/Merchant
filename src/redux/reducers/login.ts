import actionConstants from '../constants/';
import { LOGIN_CONSTANTS } from 'lib/constants';

const generateUserData = (body: { [key: string]: any } = {}) => ({
  token: body.Token,
  isUserAuthenticated: true,
  tokenExpiry: body.tokenExpiry,
  PasswordExpireDays: body.PasswordExpireDays,
  ThresholdRemainingDaysForPwdExpiryAlert:
    body.ThresholdRemainingDaysForPwdExpiryAlert,
  tokenExpiryInSec: body.tokenExpiryInSec,
  MerchantId: body?.isAdmin ? 0 : body.MerchantId,
  failedLoginTime: body.FAILED_LOGIN_TIME,
  lastLoggedIn: body.LAST_LOGGED_IN,
  UserFullName: body.UserFullName,
  UserEmail: body.emailId,
  isWaitingForAPIResponse: false,
  HardLogOutTime: body.HardLogOutTime,
  IdleTimeOutTime: body.IdleTimeOutTime,
  isAdmin: body?.isAdmin,
  userId: body?.userId,
  showTrmPortalLink: body?.isTrmEnabled || false,
  merchantName: JSON.parse(body?.data)?.MerchantName,
  merchantPayoutEnabled: body?.isPayoutEnabled ?? false,
});

const generatePermissionState = (body: { [key: string]: any } = {}) => {
  // Mapping user permissions to a object
  let userPermissionData;
  if (body?.data) {
    userPermissionData =
      JSON.parse(body.data)?.RolePermissionModel?.rolePermissionsParamsData ??
      [];
  }
  const userPermissionObject = {};
  userPermissionData.map((p) => {
    userPermissionObject[p.permissionName] = p.permissionName;
  });

  return {
    ...userPermissionObject,
  };
};

const loginState = {
  isLoading: false,
  isSuccess: false,
  isTokenSuccess: false,
  isTokenFailure: false,
  isFailure: false,
  opCode: 0,
  token: '',
  isUserAuthenticated: false,
  isTokenRefreshed: false,
  tokenExpiry: 0,
  tokenExpiryInSec: 0,
  message: '',
  PasswordExpireDays: 0,
  ThresholdRemainingDaysForPwdExpiryAlert: 0,
  MerchantId: 0,
  isWaitingForAPIResponse: true,
  HardLogOutTime: 0,
  IdleTimeOutTime: 0,
  isAdmin: false,
  userId: 0,
  merchantName: '',
  merchantTRMEnabled: false,
  showPasswordExpiryNotification: false,
  showTrmPortalLink: false,
  showOtpScreen: false,
  loginTimeLeft: 0,
  pushClevertapLoginContinueEvent: false,
  UserEmail: '',
  merchantEmailId: '',
  merchantPayoutEnabled: false,
  payoutBankId: '',
};

const permissionState = {};

const logOutState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  opCode: 0,
  isUserLoggedOut: false,
};

const forgetPasswordState = {
  otpToken: '',
  otpExpiryInSeconds: 0,
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  opCode: 0,
  message: '',
};

const validateOtpState = {
  isValid: false,
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  opCode: 0,
  message: '',
  showResendButton: false,
};

const validateLoginOtpState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  errorMessage: '',
  otpExpired: false,
};

const changePasswordState = {
  isPasswordChanged: false,
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  opCode: 0,
  message: '',
};

const saveNewPasswordState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  opCode: 0,
  isPasswordChanged: false,
};

const newSignUpState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  opCode: 0,
  isSignupCompleted: false,
};

const updateTRMStatusState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  opCode: 0,
};

const clientSecretKeyState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  data: '',
  message: '',
};

const captchaVerifyState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  data: '',
  response_code: 0,
  message: '',
};

const trmRedirectUrlState = {
  isSuccess: false,
  isFailure: false,
  trmRedirectUrl: '',
  responseCode: '',
  responseMessage: '',
};

const validateInvitationState = {
  isSuccess: false,
  isFailure: false,
  responseCode: '',
  responseMessage: '',
};

const timerState = {
  isTimerComplete: false,
};

const loginOTPState = {
  isSuccess: false,
  isFailure: false,
  otpToken: '',
  responseCode: '',
  responseMessage: '',
};

const initialState = {
  loginState: { ...loginState },
  logOutState: { ...logOutState },
  forgetPasswordState: { ...forgetPasswordState },
  validateOtpState: { ...validateOtpState },
  saveNewPasswordState: { ...saveNewPasswordState },
  changePasswordState: { ...changePasswordState },
  newSignUpState: { ...newSignUpState },
  permissionState: { ...permissionState },
  updateTRMStatusState: { ...updateTRMStatusState },
  clientSecretKeyState: { ...clientSecretKeyState },
  captchaVerifyState: { ...captchaVerifyState },
  trmRedirectUrlState: { ...trmRedirectUrlState },
  validateInvitationState: { ...validateInvitationState },
  timerState: { ...timerState },
  loginOTPState: { ...loginOTPState },
  validateLoginOtpState: { ...validateLoginOtpState },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case actionConstants.POST_LOGIN_REQUEST:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          opCode: 0,
          loginTimeLeft: 0,
          UserEmail: '',
          showOtpScreen: false,
        },
      };

    case actionConstants.POST_LOGIN_SUCCESS:
      if (action.payload.body.show_otp_page) {
        return {
          ...state,
          loginState: {
            ...state.loginState,
            isLoading: false,
            isSuccess: true,
            isFailure: false,
            showOtpScreen: true,
            UserEmail: action.payload.extra.userEmail,
          },
        };
      }
      return {
        ...state,
        loginState: {
          ...state.loginState,
          ...generateUserData(action.payload.body),
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          opCode: action.payload.body.OpCode,
          showPasswordExpiryNotification: true,
          pushClevertapLoginContinueEvent: true,
        },
        permissionState: {
          ...generatePermissionState(action.payload.body),
        },
      };

    case actionConstants.POST_LOGIN_FAILURE:
      if (
        action.payload.body.is_suspended &&
        action.payload.body.login_time_left > 0
      ) {
        return {
          ...state,
          loginState: {
            ...state.loginState,
            isLoading: false,
            isSuccess: false,
            isFailure: true,
            isUserAuthenticated: false,
            opCode: action.payload.body.error_code,
            message: action.payload.body.error_message,
            MerchantId: 0,
            isWaitingForAPIResponse: false,
            loginTimeLeft: action.payload.body.login_time_left,
            UserEmail: action.payload.extra.userEmail,
          },
        };
      }
      return {
        ...state,
        loginState: {
          ...state.loginState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          isUserAuthenticated: false,
          opCode: action.payload.body.error_code,
          message: action.payload.body.error_message,
          remainingAttempts: action.payload.body.remaining_attempts,
          MerchantId: 0,
          isWaitingForAPIResponse: false,
        },
      };
    case actionConstants.VALIDATE_LOGIN_OTP_REQUEST:
      return {
        ...state,
        validateLoginOtpState: {
          ...validateLoginOtpState,
          isLoading: true,
        },
      };

    case actionConstants.VALIDATE_LOGIN_OTP_SUCCESS:
      return {
        ...state,
        validateLoginOtpState: {
          ...validateLoginOtpState,
          isSuccess: true,
        },
        loginState: {
          ...state.loginState,
          ...generateUserData(action.payload.body),
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          opCode: action.payload.body.OpCode,
          showPasswordExpiryNotification: true,
          showOtpScreen: false,
        },
        permissionState: {
          ...generatePermissionState(action.payload.body),
        },
      };
    case actionConstants.VALIDATE_LOGIN_OTP_FAILURE:
      return {
        ...state,
        validateLoginOtpState: {
          ...validateLoginOtpState,
          isFailure: true,
          errorCode: action.payload.body.error_code,
          errorMessage: action.payload.body.error_message,
          otpExpired: action.payload.body.show_resend_button,
        },
        loginState: {
          ...state.loginState,
          loginTimeLeft: action.payload.body.login_time_left || 0,
          showOtpScreen: action.payload.body.is_suspended
            ? false
            : state.loginState.showOtpScreen,
        },
      };
    case actionConstants.SET_USER_DATA:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          ...action.payload.data,
        },
      };

    case actionConstants.POST_LOGIN_CLEAR:
      return {
        ...state,
        loginState: {
          ...loginState,
          isAdmin: state.loginState.isAdmin,
        },
      };

    case actionConstants.POST_NEW_SIGN_UP_REQUEST:
      return {
        ...state,
        newSignUpState: {
          ...state.newSignUpState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          opCode: 0,
          isSignupCompleted: false,
        },
      };

    case actionConstants.POST_NEW_SIGN_UP_SUCCESS:
      return {
        ...state,
        newSignUpState: {
          ...state.newSignUpState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          isSignupCompleted: action.payload.body,
        },
      };

    case actionConstants.POST_NEW_SIGN_UP_FAILURE:
      return {
        ...state,
        newSignUpState: {
          ...state.newSignUpState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          isSignupCompleted: false,
          opCode: action.payload.body.error_code,
          message: action.payload.body.error_message,
        },
      };

    case actionConstants.POST_NEW_SIGN_UP_CLEAR:
      return {
        ...state,
        newSignUpState,
      };

    case actionConstants.POST_REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          isLoading: true,
          isTokenSuccess: false,
          isTokenFailure: false,
        },
      };

    case actionConstants.POST_REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          ...generateUserData(action.payload.body),
          ...(action.payload.body.isAdmin && {
            MerchantId: state.loginState.MerchantId,
            merchantName: state.loginState.merchantName,
            merchantPayoutEnabled: state.loginState.merchantPayoutEnabled,
          }),
          isLoading: false,
          isTokenSuccess: true,
          isTokenFailure: false,
          isTokenRefreshed: true,
        },
        permissionState: { ...generatePermissionState(action.payload.body) },
      };

    case actionConstants.POST_REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          isLoading: false,
          isTokenSuccess: false,
          isTokenFailure: true,
          isUserAuthenticated: false,
          opCode: action.payload.body?.error_code,
          isTokenRefreshed: false,
          isWaitingForAPIResponse: false,
        },
      };

    case actionConstants.POST_REFRESH_TOKEN_CLEAR:
      return {
        ...state,
        loginState,
      };

    case actionConstants.POST_CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePasswordState: {
          ...state.changePasswordState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          opCode: 0,
          isPasswordChanged: false,
        },
      };

    case actionConstants.POST_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordState: {
          ...state.changePasswordState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          opCode: action.payload.body.error_code,
          isPasswordChanged: true,
        },
      };

    case actionConstants.POST_CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordState: {
          ...state.changePasswordState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          isPasswordChanged: false,
          opCode: action.payload.body.error_code,
          message: action.payload.body.error_message,
        },
      };

    case actionConstants.POST_CHANGE_PASSWORD_CLEAR:
      return {
        ...state,
        changePasswordState,
      };

    case actionConstants.POST_LOGOUT_REQUEST:
      return {
        ...state,
        logOutState: {
          ...state.logOutState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          opCode: 0,
          isUserLoggedOut: false,
        },
      };

    case actionConstants.POST_LOGOUT_SUCCESS:
      return {
        ...state,
        logOutState: {
          ...state.logOutState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          isUserLoggedOut: action.payload.body,
        },
      };

    case actionConstants.POST_LOGOUT_FAILURE:
      return {
        ...state,
        logOutState: {
          ...state.logOutState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          opCode: action.payload.body.error_code,
          message: action.payload.body.error_message,
        },
      };

    case actionConstants.POST_LOGOUT_CLEAR:
      return {
        ...state,
        logOutState,
      };

    case actionConstants.POST_SAVE_NEW_PASSWORD_REQUEST:
      return {
        ...state,
        saveNewPasswordState: {
          ...state.saveNewPasswordState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          opCode: 0,
          isPasswordChanged: false,
        },
      };

    case actionConstants.POST_SAVE_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        saveNewPasswordState: {
          ...state.saveNewPasswordState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          isPasswordChanged: action.payload.body,
        },
      };

    case actionConstants.POST_SAVE_NEW_PASSWORD_FAILURE:
      return {
        ...state,
        saveNewPasswordState: {
          ...state.saveNewPasswordState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          opCode: action.payload.body.error_code,
          message: action.payload.body.error_message,
        },
      };

    case actionConstants.POST_SAVE_NEW_PASSWORD_CLEAR:
      return {
        ...state,
        saveNewPasswordState,
      };

    case actionConstants.POST_FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        forgetPasswordState: {
          ...state.forgetPasswordState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          opCode: 0,
          message: '',
        },
      };

    case actionConstants.POST_FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        forgetPasswordState: {
          ...state.forgetPasswordState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          otpToken: action.payload.body.otpToken,
          otpExpiryInSeconds: action.payload.body.otpExpiryInSeconds,
          message: '',
        },
        validateOtpState: {
          ...state.validateOtpState,
          showResendButton: action.payload.body.show_resend_button ?? false,
        },
      };

    case actionConstants.POST_FORGET_PASSWORD_FAILURE:
      return {
        ...state,
        forgetPasswordState: {
          ...state.forgetPasswordState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          opCode: action.payload.body.error_code,
          message: action.payload.body.error_message,
        },
        loginState: {
          ...state.loginState,
          loginTimeLeft:
            action.payload.body.login_time_left ||
            state.loginState.loginTimeLeft,
          UserEmail:
            action.payload.body.login_time_left > 0
              ? action.payload.extra.userEmail
              : state.loginState.UserEmail,
        },
      };

    case actionConstants.POST_FORGET_PASSWORD_CLEAR:
      return {
        ...state,
        forgetPasswordState,
      };

    case actionConstants.POST_VALIDATE_OTP_REQUEST:
      return {
        ...state,
        validateOtpState: {
          ...state.validateOtpState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
          isValid: false,
          showResendButton: false,
        },
      };

    case actionConstants.POST_VALIDATE_OTP_SUCCESS:
      return {
        ...state,
        validateOtpState: {
          ...state.validateOtpState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          isValid: action.payload.body,
          message: '',
        },
      };

    case actionConstants.POST_VALIDATE_OTP_FAILURE:
      return {
        ...state,
        validateOtpState: {
          ...state.validateOtpState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          isValid: false,
          errorCode: action.payload.body.error_code,
          errorMessage: action.payload.body.error_message,
          showResendButton: action.payload.body.show_resend_button,
        },
      };

    case actionConstants.POST_VALIDATE_OTP_CLEAR:
      return {
        ...state,
        validateOtpState,
      };

    case actionConstants.SET_MERCHANT_INFO:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          MerchantId: action?.payload?.data?.merchantId,
          merchantName: action?.payload?.data?.merchantName,
          merchantTRMEnabled: action?.payload?.data?.isTRMEnabled,
          merchantEmailId: action?.payload?.data?.merchantEmailId ?? '',
          merchantPayoutEnabled: action?.payload?.data?.isPayoutEnabled ?? '',
          payoutBankId: action?.payload?.data?.payoutBankId ?? '',
        },
      };
    case actionConstants.CLEAR_MERCHANT_INFO:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          MerchantId: 0,
          merchantName: '',
          merchantEmailId: '',
          merchantPayoutEnabled: false,
          payoutBankId: '',
        },
      };

    // Update Merchant TRM Status
    case actionConstants.PUT_UPDATE_MERCHANT_TRM_STATUS_REQUEST:
      return {
        ...state,
        updateTRMStatusState: {
          ...state.updateTRMStatusState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          opCode: 0,
        },
        loginState: {
          ...state.loginState,
          merchantTRMEnabled: action.payload?.status,
        },
      };

    case actionConstants.PUT_UPDATE_MERCHANT_TRM_STATUS_SUCCESS:
      return {
        ...state,
        updateTRMStatusState: {
          ...state.updateTRMStatusState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          opCode: action.payload?.body?.response_code ?? 0,
        },
      };

    case actionConstants.PUT_UPDATE_MERCHANT_TRM_STATUS_FAILURE:
      return {
        ...state,
        updateTRMStatusState: {
          ...state.updateTRMStatusState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          opCode: action.payload?.body?.response_code ?? 0,
        },
        loginState: {
          ...state.loginState,
          merchantTRMEnabled: !action.payload?.extra?.status,
        },
      };

    case actionConstants.PUT_UPDATE_MERCHANT_TRM_STATUS_CLEAR:
      return {
        ...state,
        updateTRMStatusState,
      };
    case actionConstants.CLIENT_SECRET_KEY_REQUEST:
      return {
        ...state,
        clientSecretKeyState: {
          ...state.clientSecretKeyState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          message: '',
        },
      };
    case actionConstants.CLIENT_SECRET_KEY_SUCCESS:
      return {
        ...state,
        clientSecretKeyState: {
          ...state.clientSecretKeyState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body.secret,
          message: action.payload.body.response_message,
        },
      };
    case actionConstants.CLIENT_SECRET_KEY_FAILURE:
      return {
        ...state,
        clientSecretKeyState: {
          ...state.clientSecretKeyState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          data: '',
          message: action.payload.body.response_message,
        },
      };
    case actionConstants.CAPTCHA_VERIFY_REQUEST:
      return {
        ...state,
        captchaVerifyState: {
          ...state.captchaVerifyState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          message: '',
        },
      };
    case actionConstants.CAPTCHA_VERIFY_SUCCESS:
      return {
        ...state,
        captchaVerifyState: {
          ...state.captchaVerifyState,
          isLoading: false,
          isSuccess: action.payload.body.success,
          isFailure: !action.payload.body.success,
          data: action.payload.body.secret,
          message: action.payload.body.response_message,
        },
      };
    case actionConstants.CAPTCHA_VERIFY_FAILURE:
      return {
        ...state,
        captchaVerifyState: {
          ...state.captchaVerifyState,
          isLoading: false,
          isSuccess: action.payload.body.success,
          isFailure: true,
          data: '',
          message: action.payload.body.response_message,
        },
      };
    case actionConstants.CAPTCHA_VERIFY_CLEAR:
      return {
        ...state,
        captchaVerifyState,
      };
    case actionConstants.SET_EXPIRY_TOKEN_NOTIFICATION:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          showPasswordExpiryNotification: action.payload?.show,
        },
      };

    case actionConstants.GET_TRM_REDIRECT_URL_SUCCESS:
      return {
        ...state,
        trmRedirectUrlState: {
          ...trmRedirectUrlState,
          isSuccess: true,
          trmRedirectUrl: action.payload.body.redirectUrl,
          responseCode: action.payload.body.response_code,
          responseMessage: action.payload.body.response_message,
        },
      };
    case actionConstants.GET_TRM_REDIRECT_URL_FAILURE:
      return {
        ...state,
        trmRedirectUrlState: {
          ...trmRedirectUrlState,
          isFailure: true,
          responseCode: action.payload.body.error_code,
          responseMessage: action.payload.body.error_message,
        },
      };
    case actionConstants.GET_TRM_REDIRECT_URL_CLEAR:
      return {
        ...state,
        trmRedirectUrlState: {
          ...trmRedirectUrlState,
        },
      };
    case actionConstants.GET_VALIDATE_INVITATION_URL_REQUEST:
      return {
        ...state,
        validateInvitationState: {
          ...state.validateInvitationState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: '',
          errorMessage: '',
        },
      };

    case actionConstants.GET_VALIDATE_INVITATION_URL_SUCCESS:
      return {
        ...state,
        validateInvitationState: {
          ...state.validateInvitationState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          responseCode: action.payload.body.response_code,
          responseMessage: action.payload.body.response_message,
        },
      };

    case actionConstants.GET_VALIDATE_INVITATION_URL_FAILURE:
      return {
        ...state,
        validateInvitationState: {
          ...state.validateInvitationState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.error_code,
          errorMessage: action.payload.body.error_message,
        },
      };

    case actionConstants.GET_VALIDATE_INVITATION_URL_CLEAR:
      return {
        ...state,
        validateInvitationState,
      };

    case actionConstants.GET_LOGIN_OTP_REQUEST:
      return {
        ...state,
        loginOTPState: {
          ...state.loginOTPState,
          isSuccess: false,
          isFailure: false,
          errorCode: '',
          errorMessage: '',
          responseCode: '',
          responseMessage: '',
          otpToken: '',
          type: LOGIN_CONSTANTS.FETCH_LOGIN_OTP_API_TYPE_FETCH,
        },
      };

    case actionConstants.GET_LOGIN_OTP_SUCCESS:
      return {
        ...state,
        loginOTPState: {
          ...state.loginOTPState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          otpToken: action.payload.body.otp_token,
          responseCode: action.payload.body.response_code,
          responseMessage: action.payload.body.response_message,
          type: LOGIN_CONSTANTS.FETCH_LOGIN_OTP_API_TYPE_FETCH,
        },
      };

    case actionConstants.GET_LOGIN_OTP_FAILURE:
      return {
        ...state,
        loginOTPState: {
          ...state.loginOTPState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.error_code,
          errorMessage: action.payload.body.error_message,
          type: LOGIN_CONSTANTS.FETCH_LOGIN_OTP_API_TYPE_FETCH,
        },
        loginState: {
          ...state.loginState,
          loginTimeLeft: action.payload.body.login_time_left || 0,
          showOtpScreen: action.payload.body.is_suspended
            ? false
            : state.loginState.showOtpScreen,
        },
      };

    case actionConstants.GET_LOGIN_OTP_CLEAR:
      return {
        ...state,
        loginOTPState,
      };

    case actionConstants.RESEND_LOGIN_OTP_REQUEST:
      return {
        ...state,
        validateLoginOtpState: {
          ...validateLoginOtpState,
        },
        loginOTPState: {
          ...state.loginOTPState,
          isSuccess: false,
          isFailure: false,
          errorCode: '',
          errorMessage: '',
          responseCode: '',
          responseMessage: '',
          otpToken: '',
          type: LOGIN_CONSTANTS.FETCH_LOGIN_OTP_API_TYPE_RESEND,
        },
      };

    case actionConstants.RESEND_LOGIN_OTP_SUCCESS:
      return {
        ...state,
        loginOTPState: {
          ...state.loginOTPState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          otpToken: action.payload.body.otp_token,
          responseCode: action.payload.body.response_code,
          responseMessage: action.payload.body.response_message,
          type: LOGIN_CONSTANTS.FETCH_LOGIN_OTP_API_TYPE_RESEND,
        },
      };

    case actionConstants.RESEND_LOGIN_OTP_FAILURE:
      return {
        ...state,
        loginOTPState: {
          ...state.loginOTPState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.error_code,
          errorMessage: action.payload.body.error_message,
          loginTimeLeft: action.payload.body.login_time_left,
          type: LOGIN_CONSTANTS.FETCH_LOGIN_OTP_API_TYPE_RESEND,
        },
        loginState: {
          ...state.loginState,
          loginTimeLeft: action.payload.body.login_time_left || 0,
          showOtpScreen: action.payload.body.is_suspended
            ? false
            : state.loginState.showOtpScreen,
        },
      };

    case actionConstants.RESEND_LOGIN_OTP_CLEAR:
      return {
        ...state,
        loginOTPState,
      };

    case actionConstants.SET_IS_TIMER_COMPTLETE:
      return {
        ...state,
        timerState: {
          isTimerComplete: action.payload.isTimerComplete,
        },
      };

    case actionConstants.PUT_UPDATE_PAYOUT_MODULE_STATUS_SUCCESS:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          merchantPayoutEnabled:
            action.payload?.body?.is_payout_enabled ?? false,
          payoutBankId: action.payload?.body?.is_payout_enabled
            ? action.payload?.body?.bank_id
            : state.loginState.payoutBankId,
        },
      };
    default:
      return state;
  }
}
