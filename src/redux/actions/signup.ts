/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ActionConstants from '../constants';
import { signupApi } from '../../api/signup';

export const signupAction = (data) => {
  const payload = {
    serviceMethod: signupApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_SIGN_UP_SUCCESS,
    actionTypeFailure: ActionConstants.POST_SIGN_UP_FAILURE,
    actionTypeRequest: ActionConstants.POST_SIGN_UP_REQUEST,
  };
  return { type: ActionConstants.POST_SIGN_UP_ACTION, payload };
};

export const clearSignUpAction = () => {
  return { type: ActionConstants.POST_SIGN_UP_CLEAR };
};
