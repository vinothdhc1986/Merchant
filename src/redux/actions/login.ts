/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ActionConstants from '../constants';
import {
  loginApi,
  newSignUpApi,
  refreshTokenApi,
  logOutApi,
  saveNewPasswordApi,
  forgetPasswordApi,
  validateOtpApi,
  changePasswordApi,
  updateMerchantTRMStatus,
  clientSecretKeyApi,
  verifyCaptchaApi,
  getTRMRedirectUrlApi,
  validateInvitationApi,
  fetchLoginOtpApi,
  validateLoginOtpApi,
} from '../../api/login';

export const loginAction = (data) => {
  const payload = {
    serviceMethod: loginApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_LOGIN_SUCCESS,
    actionTypeFailure: ActionConstants.POST_LOGIN_FAILURE,
    actionTypeRequest: ActionConstants.POST_LOGIN_REQUEST,
    extra: {
      userEmail: data.EmailId,
    },
  };
  return { type: ActionConstants.POST_LOGIN_ACTION, payload };
};

export const clearLoginAction = () => {
  return { type: ActionConstants.POST_LOGIN_CLEAR };
};

export const newSignUpAction = (data) => {
  const payload = {
    serviceMethod: newSignUpApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_NEW_SIGN_UP_SUCCESS,
    actionTypeFailure: ActionConstants.POST_NEW_SIGN_UP_FAILURE,
    actionTypeRequest: ActionConstants.POST_NEW_SIGN_UP_REQUEST,
  };
  return { type: ActionConstants.POST_NEW_SIGN_UP_ACTION, payload };
};

export const clearNewSignUpAction = () => {
  return { type: ActionConstants.POST_NEW_SIGN_UP_CLEAR };
};

export const refreshTokenAction = (data) => {
  const payload = {
    serviceMethod: refreshTokenApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_REFRESH_TOKEN_SUCCESS,
    actionTypeFailure: ActionConstants.POST_REFRESH_TOKEN_FAILURE,
    actionTypeRequest: ActionConstants.POST_REFRESH_TOKEN_REQUEST,
    hideLoader: true,
  };
  return { type: ActionConstants.POST_REFRESH_TOKEN_ACTION, payload };
};

export const logOutAction = (data) => {
  const payload = {
    serviceMethod: logOutApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_LOGOUT_SUCCESS,
    actionTypeFailure: ActionConstants.POST_LOGOUT_FAILURE,
    actionTypeRequest: ActionConstants.POST_LOGOUT_REQUEST,
  };
  return { type: ActionConstants.POST_LOGOUT_ACTION, payload };
};

export const clearLogOutAction = () => {
  return { type: ActionConstants.POST_LOGOUT_CLEAR };
};

export const changePasswordAction = (data) => {
  const payload = {
    serviceMethod: changePasswordApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_CHANGE_PASSWORD_SUCCESS,
    actionTypeFailure: ActionConstants.POST_CHANGE_PASSWORD_FAILURE,
    actionTypeRequest: ActionConstants.POST_CHANGE_PASSWORD_REQUEST,
  };
  return { type: ActionConstants.POST_CHANGE_PASSWORD_ACTION, payload };
};

export const clearChangePasswordAction = () => {
  return { type: ActionConstants.POST_CHANGE_PASSWORD_CLEAR };
};

export const forgetPasswordAction = (data) => {
  const payload = {
    serviceMethod: forgetPasswordApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_FORGET_PASSWORD_SUCCESS,
    actionTypeFailure: ActionConstants.POST_FORGET_PASSWORD_FAILURE,
    actionTypeRequest: ActionConstants.POST_FORGET_PASSWORD_REQUEST,
    extra: {
      userEmail: data.EmailId,
    },
  };
  return { type: ActionConstants.POST_FORGET_PASSWORD_ACTION, payload };
};

export const clearForgetPasswordAction = () => {
  return { type: ActionConstants.POST_FORGET_PASSWORD_CLEAR };
};

export const validateOtpAction = (data) => {
  const payload = {
    serviceMethod: validateOtpApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_VALIDATE_OTP_SUCCESS,
    actionTypeFailure: ActionConstants.POST_VALIDATE_OTP_FAILURE,
    actionTypeRequest: ActionConstants.POST_VALIDATE_OTP_REQUEST,
  };
  return { type: ActionConstants.POST_VALIDATE_OTP_ACTION, payload };
};

export const clearValidateOtpAction = () => {
  return { type: ActionConstants.POST_VALIDATE_OTP_CLEAR };
};

export const saveNewPasswordAction = (data) => {
  const payload = {
    serviceMethod: saveNewPasswordApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_SAVE_NEW_PASSWORD_SUCCESS,
    actionTypeFailure: ActionConstants.POST_SAVE_NEW_PASSWORD_FAILURE,
    actionTypeRequest: ActionConstants.POST_SAVE_NEW_PASSWORD_REQUEST,
  };
  return { type: ActionConstants.POST_SAVE_NEW_PASSWORD_ACTION, payload };
};

export const clearSaveNewPasswordAction = () => {
  return { type: ActionConstants.POST_SAVE_NEW_PASSWORD_CLEAR };
};

export const setMerchantInfoAction = (data) => {
  return { type: ActionConstants.SET_MERCHANT_INFO, payload: { data } };
};

export const clearMerchantInfoAction = (data) => {
  return { type: ActionConstants.CLEAR_MERCHANT_INFO, payload: { data } };
};

export const updateMerchantTRMStatusAction = (data: {
  status: boolean;
  MerchantId: number;
}) => {
  const payload = {
    serviceMethod: updateMerchantTRMStatus.bind(null, data),
    actionTypeSuccess: ActionConstants.PUT_UPDATE_MERCHANT_TRM_STATUS_SUCCESS,
    actionTypeFailure: ActionConstants.PUT_UPDATE_MERCHANT_TRM_STATUS_FAILURE,
    actionTypeRequest: ActionConstants.PUT_UPDATE_MERCHANT_TRM_STATUS_REQUEST,
    extra: { status: data.status },
  };
  return {
    type: ActionConstants.PUT_UPDATE_MERCHANT_TRM_STATUS_ACTION,
    payload,
  };
};

export const clearUpdateMerchantTRMStatusAction = () => {
  return { type: ActionConstants.PUT_UPDATE_MERCHANT_TRM_STATUS_CLEAR };
};

export const getClientSecretKeyAction = () => {
  const payload = {
    serviceMethod: clientSecretKeyApi.bind(null),
    actionTypeSuccess: ActionConstants.CLIENT_SECRET_KEY_SUCCESS,
    actionTypeFailure: ActionConstants.CLIENT_SECRET_KEY_FAILURE,
    actionTypeRequest: ActionConstants.CLIENT_SECRET_KEY_REQUEST,
  };
  return { type: ActionConstants.CLIENT_SECRET_KEY_ACTION, payload };
};

export const verifyCaptchaAction = (data) => {
  const payload = {
    serviceMethod: verifyCaptchaApi.bind(null, data),
    actionTypeSuccess: ActionConstants.CAPTCHA_VERIFY_SUCCESS,
    actionTypeFailure: ActionConstants.CAPTCHA_VERIFY_FAILURE,
    actionTypeRequest: ActionConstants.CAPTCHA_VERIFY_REQUEST,
  };
  return { type: ActionConstants.CAPTCHA_VERIFY_ACTION, payload };
};

export const clearVerifyCaptchaAction = () => {
  return { type: ActionConstants.CAPTCHA_VERIFY_CLEAR };
};

export const setShowExpiryTokenNotificationAction = (show: boolean) => {
  return {
    type: ActionConstants.SET_EXPIRY_TOKEN_NOTIFICATION,
    payload: { show },
  };
};

export const getTRMRedirectUrlAction = () => {
  const payload = {
    serviceMethod: getTRMRedirectUrlApi.bind(null),
    actionTypeSuccess: ActionConstants.GET_TRM_REDIRECT_URL_SUCCESS,
    actionTypeFailure: ActionConstants.GET_TRM_REDIRECT_URL_FAILURE,
    actionTypeRequest: ActionConstants.GET_TRM_REDIRECT_URL_REQUEST,
  };
  return { type: ActionConstants.GET_TRM_REDIRECT_URL, payload };
};

export const clearTRMRedirectUrlStateAction = () => {
  return { type: ActionConstants.GET_TRM_REDIRECT_URL_CLEAR };
};

export const validateInvitationAction = (data: {
  token: string;
  isAdmin: boolean;
}) => {
  const payload = {
    serviceMethod: validateInvitationApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_VALIDATE_INVITATION_URL_SUCCESS,
    actionTypeFailure: ActionConstants.GET_VALIDATE_INVITATION_URL_FAILURE,
    actionTypeRequest: ActionConstants.GET_VALIDATE_INVITATION_URL_REQUEST,
  };
  return { type: ActionConstants.GET_VALIDATE_INVITATION_URL, payload };
};

export const clearValidateInvitationAction = () => {
  return { type: ActionConstants.GET_VALIDATE_INVITATION_URL_CLEAR };
};

export const setIsTimerComplete = (isTimerComplete: boolean) => {
  return {
    type: ActionConstants.SET_IS_TIMER_COMPTLETE,
    payload: { isTimerComplete },
  };
};

export const setUserDataAction = (data: { [key: string]: any }) => ({
  type: ActionConstants.SET_USER_DATA,
  payload: {
    data: data || {},
  },
});

export const fetchLoginOtpAction = (data: {
  email: string;
  isAdmin: boolean;
  type: string;
}) => {
  const payload = {
    serviceMethod: fetchLoginOtpApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_LOGIN_OTP_SUCCESS,
    actionTypeFailure: ActionConstants.GET_LOGIN_OTP_FAILURE,
    actionTypeRequest: ActionConstants.GET_LOGIN_OTP_REQUEST,
  };
  return { type: ActionConstants.GET_LOGIN_OTP, payload };
};

export const clearFetchLoginOtpAction = () => {
  return { type: ActionConstants.GET_LOGIN_OTP_CLEAR };
};

export const resendLoginOtpAction = (data: {
  email: string;
  isAdmin: boolean;
  type: string;
}) => {
  const payload = {
    serviceMethod: fetchLoginOtpApi.bind(null, data),
    actionTypeSuccess: ActionConstants.RESEND_LOGIN_OTP_SUCCESS,
    actionTypeFailure: ActionConstants.RESEND_LOGIN_OTP_FAILURE,
    actionTypeRequest: ActionConstants.RESEND_LOGIN_OTP_REQUEST,
  };
  return { type: ActionConstants.RESEND_LOGIN_OTP, payload };
};

export const clearResendLoginOtpAction = () => {
  return { type: ActionConstants.RESEND_LOGIN_OTP_CLEAR };
};

export const validateLoginOtpAction = (data: {
  email: string;
  isAdmin: boolean;
  otp: string;
  otpToken: string;
}) => {
  const payload = {
    serviceMethod: validateLoginOtpApi.bind(null, data),
    actionTypeSuccess: ActionConstants.VALIDATE_LOGIN_OTP_SUCCESS,
    actionTypeFailure: ActionConstants.VALIDATE_LOGIN_OTP_FAILURE,
    actionTypeRequest: ActionConstants.VALIDATE_LOGIN_OTP_REQUEST,
  };
  return { type: ActionConstants.VALIDATE_LOGIN_OTP, payload };
};

export const clearValidateLoginOtpAction = () => {
  return { type: ActionConstants.VALIDATE_LOGIN_OTP_CLEAR };
};
