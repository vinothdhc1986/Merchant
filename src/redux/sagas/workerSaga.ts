/* eslint-disable no-console */
import { put, call } from 'redux-saga/effects';
import notify from '../../lib/notifiy';
import actionConstants from '../constants';
import { COMMON_ERROR_CODES } from '../../lib/constants';
import store from '../store';
// ------------------------------------
// Common Worker Saga
// ------------------------------------

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* workerSaga(action) {
  const {
    serviceMethod,
    actionTypeSuccess,
    actionTypeFailure,
    actionTypeRequest,
    extra,
    callback,
    genericErrorHandling = true,
    hideLoader,
  } = action.payload;
  try {
    yield put({
      type: actionTypeRequest,
      payload: extra,
    });
    if (!hideLoader) {
      yield put({
        type: actionConstants.START_LOADER,
        payload: { actionType: actionTypeRequest },
      });
    }

    const apiResponse = yield call(serviceMethod);
    const { body } = apiResponse;

    if (!hideLoader) {
      yield put({
        type: actionConstants.STOP_LOADER,
        payload: { actionType: actionTypeRequest },
      });
    }

    yield put({
      type: actionTypeSuccess,
      payload: { body, extra },
    });
    if (callback) callback();
  } catch (error) {
    yield put({
      type: actionConstants.STOP_LOADER,
      payload: { actionType: actionTypeRequest },
    });
    if (error && error.response && error.response.body) {
      yield put({
        type: actionTypeFailure,
        payload: { body: error.response.body, extra },
      });
      // Common Generic Error Handling
      if (
        COMMON_ERROR_CODES[error.response.body.error_code] &&
        genericErrorHandling
      ) {
        notify({
          // description: store.getState().validationErrors.SOMETHING_WENT_WRONG,
          type: 'error',
          message: 
          store.getState().validationReducer.validationErrorState
            .validationErrors.SOMETHING_WENT_WRONG || 'Something went wrong! Please try again.',
          description: '',
        });
      }
    } else {
      notify({
        description:
          store.getState().validationReducer.validationErrorState
            .validationErrors.SOMETHING_WENT_WRONG || 'Something went wrong! Please try again.',
        duration: 1,
        type: 'error',
        message: 'Error',
      });
      console.error(error);
    }
  }
}
