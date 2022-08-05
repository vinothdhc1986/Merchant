/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, ForkEffect } from 'redux-saga/effects';
import ActionConstants from '../constants/';
import workerSaga from './workerSaga';

// ------------------------------------
// Watchers
// ------------------------------------
export default function* refundWatcher(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(ActionConstants.GET_REFUND_LIST, workerSaga);
  yield takeLatest(ActionConstants.POST_CREATE_REFUND, workerSaga);
  yield takeLatest(
    ActionConstants.GET_REFUND_BULK_UPLOAD_HISTORY_LIST,
    workerSaga
  );
  yield takeLatest(ActionConstants.GET_ALL_REFUND_STATUS_LIST, workerSaga);

}
