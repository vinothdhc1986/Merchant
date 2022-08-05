/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ActionConstants from '../constants';
import { validationErrorsApi } from '../../api/validationErrors';

export const validationErrorAction = (data) => {
  const payload = {
    serviceMethod: validationErrorsApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_VALIDATION_ERRORS_SUCCESS,
    actionTypeFailure: ActionConstants.POST_VALIDATION_ERRORS_FAILURE,
    actionTypeRequest: ActionConstants.POST_VALIDATION_ERRORS_REQUEST,
  };
  return { type: ActionConstants.POST_VALIDATION_ERRORS_ACTION, payload };
};

export const clearValidationErrorAction = () => {
  return { type: ActionConstants.POST_VALIDATION_ERRORS_CLEAR };
};
