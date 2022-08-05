/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, ForkEffect } from 'redux-saga/effects';
import ActionConstants from '../constants/';
import workerSaga from './workerSaga';

// ------------------------------------
// Watchers
// ------------------------------------
export default function* adminCustomRoutingWatcher(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(ActionConstants.GET_ADMIN_CUSTOM_ROUTING_LIST, workerSaga);

  yield takeLatest(ActionConstants.GET_ADMIN_PRIORITY_LOGIC, workerSaga);
  yield takeLatest(ActionConstants.PUT_APPROVE_OR_REJECT_LOGIC, workerSaga);
  yield takeLatest(ActionConstants.UPDATE_ADMIN_PRIORITY_LOGIC, workerSaga);
  yield takeLatest(
    ActionConstants.GET_ADMIN_CUSTOM_ROUTING_AUTO_SUGGEST_LIST,
    workerSaga
  );
}
