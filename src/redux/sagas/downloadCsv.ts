/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, ForkEffect, put, call } from 'redux-saga/effects';
import ActionConstants from '../constants/';
import { COMMON_ERROR_CODES } from '../../lib/constants';
import notify from 'lib/notifiy';
import store from 'redux/store';

// ------------------------------------
// Worker
// ------------------------------------
function* downloadCsvWorkerSaga(action) {
  const {
    serviceMethod,
    actionTypeRequest,
    extra,
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
        type: ActionConstants.START_LOADER,
        payload: { actionType: actionTypeRequest },
      });
    }

    const apiResponse = yield call(serviceMethod);

    const { text, headers } = apiResponse;

    // Downloading Csv
    if (text && headers) {
      const csvData = new Blob([text], { type: 'text/csv;' });
      const csvURL = window.URL.createObjectURL(csvData);
      const tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute(
        'download',
        extra?.fileName ||
          (headers['content-disposition']?.split('filename=')[1] ?? 'file.csv')
      );
      tempLink.click();
      tempLink.remove();
    } else {
      throw new Error('Data not found');
    }

    if (!hideLoader) {
      yield put({
        type: ActionConstants.STOP_LOADER,
        payload: { actionType: actionTypeRequest },
      });
    }
  } catch (error) {
    yield put({
      type: ActionConstants.STOP_LOADER,
      payload: { actionType: actionTypeRequest },
    });
    if (error && error.response && error.response.body) {
      // Common Generic Error Handling
      if (
        COMMON_ERROR_CODES[error.response.body.error_code] &&
        genericErrorHandling
      ) {
        notify({
          type: 'error',
          message:
            store.getState().validationReducer.validationErrorState
              .validationErrors.SOMETHING_WENT_WRONG ||
            'Something went wrong! Please try again.',
          description: '',
        });
      } else {
        notify({
          type: 'error',
          message:
            error?.response?.body?.errorMessage ||
            store.getState().validationReducer.validationErrorState
              .validationErrors.SOMETHING_WENT_WRONG,
          description: '',
        });
      }
    } else {
      notify({
        description:
          store.getState().validationReducer.validationErrorState
            .validationErrors.SOMETHING_WENT_WRONG ||
          'Something went wrong! Please try again.',
        duration: 1,
        type: 'error',
        message: 'Error',
      });
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

// ------------------------------------
// Watchers
// ------------------------------------
export default function* downloadCsvWatcher(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(
    ActionConstants.GET_DOWNLOAD_CSV_ACTION,
    downloadCsvWorkerSaga
  );
}
