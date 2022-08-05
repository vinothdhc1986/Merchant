import { takeLatest, ForkEffect } from "redux-saga/effects";
import ActionConstants from "../constants/";
import workerSaga from "./workerSaga";

// ------------------------------------
// Watchers
// ------------------------------------
export default function* analyticsWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(ActionConstants.POST_ANALYTICS_ACTION, workerSaga);
}
