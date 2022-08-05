/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, ForkEffect } from 'redux-saga/effects';
import ActionConstants from '../constants/';
import workerSaga from './workerSaga';

// ------------------------------------
// Watchers
// ------------------------------------
export default function* loginWatcher(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(ActionConstants.POST_LOGIN_ACTION, workerSaga);
  yield takeLatest(ActionConstants.POST_FORGET_PASSWORD_ACTION, workerSaga);
  yield takeLatest(ActionConstants.POST_VALIDATE_OTP_ACTION, workerSaga);
  yield takeLatest(ActionConstants.POST_SAVE_NEW_PASSWORD_ACTION, workerSaga);
  yield takeLatest(ActionConstants.POST_LOGOUT_ACTION, workerSaga);
  yield takeLatest(ActionConstants.POST_CHANGE_PASSWORD_ACTION, workerSaga);
  yield takeLatest(ActionConstants.POST_REFRESH_TOKEN_ACTION, workerSaga);
  yield takeLatest(ActionConstants.POST_NEW_SIGN_UP_ACTION, workerSaga);
  yield takeLatest(
    ActionConstants.PUT_UPDATE_MERCHANT_TRM_STATUS_ACTION,
    workerSaga
  );
  yield takeLatest(ActionConstants.CLIENT_SECRET_KEY_ACTION, workerSaga);
  yield takeLatest(ActionConstants.CAPTCHA_VERIFY_ACTION, workerSaga);
  yield takeLatest(ActionConstants.GET_TRM_REDIRECT_URL, workerSaga);
  yield takeLatest(ActionConstants.GET_VALIDATE_INVITATION_URL, workerSaga);
  yield takeLatest(ActionConstants.GET_LOGIN_OTP, workerSaga);
  yield takeLatest(ActionConstants.RESEND_LOGIN_OTP, workerSaga);
  yield takeLatest(ActionConstants.VALIDATE_LOGIN_OTP, workerSaga);
}
