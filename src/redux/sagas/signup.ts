/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, ForkEffect } from 'redux-saga/effects';
import ActionConstants from '../constants';
import workerSaga from './workerSaga';

// ------------------------------------
// Watchers
// ------------------------------------
export default function* signupWatcher(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(ActionConstants.POST_SIGN_UP_ACTION, workerSaga);
}
