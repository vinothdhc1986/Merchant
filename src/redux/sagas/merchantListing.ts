/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, ForkEffect } from 'redux-saga/effects';
import ActionConstants from '../constants/';
import workerSaga from './workerSaga';

// ------------------------------------
// Watchers
// ------------------------------------
export default function* merchantListingWatcher(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(ActionConstants.GET_MERCHANT_LIST, workerSaga);
  yield takeLatest(ActionConstants.MERCHANT_SEARCH, workerSaga);
}
