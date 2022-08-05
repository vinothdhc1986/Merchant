/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, ForkEffect } from 'redux-saga/effects';
import ActionConstants from '../constants/';
import workerSaga from './workerSaga';

// ------------------------------------
// Watchers
// ------------------------------------
export default function* paymentWatcher(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(ActionConstants.GET_PAYMENT_LIST, workerSaga);
  yield takeLatest(ActionConstants.GET_ALL_GATEWAYS_LIST, workerSaga);
  yield takeLatest(ActionConstants.GET_ALL_ORDER_STATUS_LIST, workerSaga);
  yield takeLatest(ActionConstants.GET_PAYMENT_ORDER_DETAILS, workerSaga);
}
