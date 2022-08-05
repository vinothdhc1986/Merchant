import apiEndpoints from '../lib/apiEndpoints';
import apiCall from './apiCall';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const loginApi = (payload) => {
  return apiCall({
    method: 'post',
    payload,
    endpoint: apiEndpoints.LOGIN,
    isAuthEndPoint: true,
  });
};

export const newSignUpApi = (payload: {
  NewPassword: string;
  Token: string;
}): void => {
  return apiCall({
    method: 'post',
    payload,
    endpoint: apiEndpoints.NEW_SIGN_UP,
    isAuthEndPoint: true,
  });
};

export const logOutApi = (): void => {
  return apiCall({
    method: 'post',
    endpoint: apiEndpoints.LOGOUT,
    isAuthEndPoint: true,
  });
};

export const refreshTokenApi = (): void => {
  return apiCall({
    method: 'post',
    endpoint: apiEndpoints.REFRESH_TOKEN,
    isAuthEndPoint: true,
  });
};

export const changePasswordApi = (data: {
  CurrentPassword: string;
  NewPassword: string;
}): void => {
  return apiCall({
    method: 'post',
    payload: data,
    endpoint: apiEndpoints.CHANGE_PASSWORD,
    isAuthEndPoint: true,
  });
};

export const saveNewPasswordApi = (data: {
  NewPassword: string;
  otpToken: string;
}): void => {
  return apiCall({
    method: 'post',
    payload: data,
    endpoint: apiEndpoints.SAVE_NEW_PASSWORD,
    isAuthEndPoint: true,
  });
};

export const forgetPasswordApi = (data: { EmailId: string }): void => {
  return apiCall({
    method: 'post',
    payload: data,
    endpoint: apiEndpoints.FORGET_PASSWORD,
    isAuthEndPoint: true,
  });
};

export const validateOtpApi = (data: {
  otpToken: string;
  otpValue: string | number;
}): void => {
  return apiCall({
    method: 'post',
    payload: data,
    endpoint: apiEndpoints.VALIDATE_OTP,
    isAuthEndPoint: true,
  });
};

export const updateMerchantTRMStatus = (data: {
  status: boolean;
  MerchantId: number;
}): void => {
  return apiCall({
    method: 'put',
    payload: data,
    endpoint: apiEndpoints.UPDATE_MERCHANT_TRM_STATUS,
  });
};

export const clientSecretKeyApi = (): void => {
  return apiCall({ method: 'get', endpoint: apiEndpoints.CLIENT_SECRET_KEY });
};

export const verifyCaptchaApi = (data: { captchaResponse: string }): void => {
  return apiCall({
    method: 'post',
    payload: data,
    endpoint: apiEndpoints.VERIFY_CAPTCHA_API,
  });
};

export const getTRMRedirectUrlApi = (): void =>
  apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_TRM_REDIRECT_URL,
  });

export const validateInvitationApi = (data: {
  token: string;
  isAdmin: boolean;
}): any => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.VALIDATE_REGISTER_TOKEN(data.token, data.isAdmin),
  });
};

export const fetchLoginOtpApi = (data: {
  email: string;
  isAdmin: boolean;
  type: string;
}): any => {
  const { email, isAdmin } = data;
  const payload = { email, isAdmin };
  const base64payload = btoa(JSON.stringify(payload));
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.FETCH_LOGIN_OTP,
    query: {
      payload: base64payload,
    },
  });
};

export const validateLoginOtpApi = (data: {
  email: string;
  isAdmin: boolean;
  otp: string;
  otpToken: string;
}): any => {
  return apiCall({
    method: 'post',
    endpoint: apiEndpoints.VALIDATE_LOGIN_OTP,
    payload: data,
  });
};
