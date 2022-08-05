/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, ForkEffect } from "redux-saga/effects";
import ActionConstants from "../constants/";
import workerSaga from "./workerSaga";

// ------------------------------------
// Watchers
// ------------------------------------
export default function* smartRoutingWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(ActionConstants.GET_GATEWAY_LIST_ACTION, workerSaga);
  yield takeLatest(ActionConstants.GET_UNMAPPED_GATEWAY_LIST_ACTION, workerSaga);
  yield takeLatest(ActionConstants.GET_GATEWAY_CONFIGURATIONS_ACTION, workerSaga);
  yield takeLatest(ActionConstants.POST_SAVE_GATEWAY_ACTION, workerSaga);
  yield takeLatest(ActionConstants.GET_PREFERENCE_GATEWAY_ACTION, workerSaga);
  yield takeLatest(ActionConstants.POST_SAVE_CUSTOM_LOGIC_ACTION, workerSaga);
  yield takeLatest(ActionConstants.GET_ACTIVE_PRIORITY_LOGIC_ACTION, workerSaga);
  yield takeLatest(ActionConstants.UPDATE_PREFERENCE_SCORE_ACTION, workerSaga);
  yield takeLatest(ActionConstants.GET_PRIORITY_LOGIC_LIST_ACTION, workerSaga);
  yield takeLatest(ActionConstants.GET_PREFERENCE_SCORE_BIN_LIST_ACTION, workerSaga);
  yield takeLatest(ActionConstants.GET_PREFERENCE_SCORE_ISSUER_LIST_ACTION, workerSaga);
  yield takeLatest(ActionConstants.GET_PREFERENCE_SCORE_CARD_BRAND_LIST_ACTION, workerSaga);
  yield takeLatest(ActionConstants.GET_ALL_CARD_BRAND_NAMES_ACTION, workerSaga);
  yield takeLatest(ActionConstants.GET_ALL_ISSUER_NAME_LIST_ACTION, workerSaga);
  yield takeLatest(ActionConstants.POST_CREATE_PREFERENCE_SCORE_ACTION, workerSaga);
  yield takeLatest(ActionConstants.POST_DELETE_PREFERENCE_SCORE_ACTION, workerSaga);
  yield takeLatest(ActionConstants.GET_VIEW_SIMPLE_ROUTING_LOGIC_ACTION, workerSaga);
  yield takeLatest(ActionConstants.POST_CHANGE_GATEWAY_STATUS_ACTION, workerSaga);
  yield takeLatest(ActionConstants.DELETE_PRIORITY_LOGIC_ACTION, workerSaga);
}
