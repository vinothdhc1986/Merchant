/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, ForkEffect } from 'redux-saga/effects';
import ActionConstants from '../constants/';
import workerSaga from './workerSaga';

// ------------------------------------
// Watchers
// ------------------------------------
export default function* settingsWatcher(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(ActionConstants.GET_ACTIVE_WEBHOOK_EVENTS, workerSaga);
  yield takeLatest(ActionConstants.GET_MERCHENT_SETTINGS, workerSaga);
  yield takeLatest(
    ActionConstants.UPDATE_MERCHENT_GENERAL_SETTINGS,
    workerSaga
  );
  yield takeLatest(ActionConstants.UPDATE_MERCHENT_WEBHOOK, workerSaga);
  yield takeLatest(ActionConstants.GET_ACTIVE_USERS_LIST, workerSaga);
  yield takeLatest(ActionConstants.GET_ALL_ROLES, workerSaga);
  yield takeLatest(ActionConstants.GET_ALL_PERMISSIONS_LIST, workerSaga);
  yield takeLatest(ActionConstants.POST_CREATE_NEW_ROLE, workerSaga);
  yield takeLatest(ActionConstants.POST_UPDATE_USER_DETAILS, workerSaga);
  yield takeLatest(ActionConstants.DELETE_USER, workerSaga);
  yield takeLatest(ActionConstants.POST_CREATE_NEW_USER, workerSaga);
  yield takeLatest(ActionConstants.POST_RESEND_INVITATION, workerSaga);
  yield takeLatest(ActionConstants.GET_CHECKOUT_THEME, workerSaga);
  yield takeLatest(ActionConstants.POST_UPDATE_CHECKOUT_THEME, workerSaga);
}
