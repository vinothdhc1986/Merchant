/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, ForkEffect } from 'redux-saga/effects';
import ActionConstants from '../constants/';
import workerSaga from './workerSaga';

// ------------------------------------
// Watchers
// ------------------------------------
export default function* paymentLinksWatcher(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(ActionConstants.GET_PAYMENT_LINKS_LIST, workerSaga);
  yield takeLatest(ActionConstants.POST_CREATE_PAYMENT_LINK, workerSaga);
  yield takeLatest(
    ActionConstants.GET_PAYMENT_LINK_BULK_UPLOAD_HISTORY_ACTION,
    workerSaga
  );
  yield takeLatest(
    ActionConstants.GET_PAYMENT_LINK_STATUS_CODE_ACTION,
    workerSaga
  );
}
