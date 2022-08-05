import apiEndpoints from '../lib/apiEndpoints';
import apiCall from './apiCall';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const signupApi = (payload) => {
  return apiCall({
    method: 'post',
    payload,
    endpoint: apiEndpoints.SIGN_UP,
    isAuthEndPoint: true,
  });
};
