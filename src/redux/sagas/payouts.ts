/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, ForkEffect } from 'redux-saga/effects';
import ActionConstants from '../constants';
import workerSaga from './workerSaga';

// ------------------------------------
// Watchers
// ------------------------------------
export default function* payoutsWatcher(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(ActionConstants.POST_ADD_NEW_BENEFICIARY, workerSaga);
  yield takeLatest(ActionConstants.GET_BENEFICIARY_LIST, workerSaga);
  yield takeLatest(ActionConstants.POST_APPROVE_BENEFICIARY, workerSaga);
  yield takeLatest(ActionConstants.POST_REJECT_BENEFICIARY, workerSaga);
  yield takeLatest(
    ActionConstants.GET_BENEFICIARY_BY_BENEFICIARY_CODE,
    workerSaga
  );
  yield takeLatest(ActionConstants.POST_ADD_INDIVIDUAL_PAYOUT, workerSaga);
  yield takeLatest(ActionConstants.GET_INDIVIDUAL_PAYOUTS_LIST, workerSaga);
  yield takeLatest(ActionConstants.POST_APPROVE_INDIVIDUAL_PAYOUT, workerSaga);
  yield takeLatest(ActionConstants.POST_REJECT_INDIVIDUAL_PAYOUT, workerSaga);
  yield takeLatest(ActionConstants.PUT_DEACTIVATE_BENEFICIARY, workerSaga);
  yield takeLatest(ActionConstants.GET_BULK_PAYOUT_LIST, workerSaga);
  yield takeLatest(ActionConstants.PUT_UPDATE_PAYOUT_MODULE_STATUS, workerSaga);
  yield takeLatest(
    ActionConstants.GET_PAYOUT_OVERVIEW_PENDING_SUMMARY,
    workerSaga
  );
  yield takeLatest(
    ActionConstants.GET_PAYOUT_OVERVIEW_STATUS_SUMMARY,
    workerSaga
  );
  yield takeLatest(
    ActionConstants.GET_PAYOUT_OVERVIEW_TRANSACTION_SUMMARY,
    workerSaga
  );
  yield takeLatest(
    ActionConstants.POST_CANCEL_APPROVED_INDIVIDUAL_PAYOUT,
    workerSaga
  );
  yield takeLatest(ActionConstants.GET_PAYOUT_ACCOUNT_BALANCE, workerSaga);
  yield takeLatest(
    ActionConstants.GET_PAYOUT_REMITTER_ACCOUNTS_LIST,
    workerSaga
  );
  yield takeLatest(
    ActionConstants.POST_ADD_PAYOUT_REMITTER_ACCOUNT,
    workerSaga
  );
  yield takeLatest(
    ActionConstants.POST_UPDATE_PAYOUT_REMITTER_ACCOUNT,
    workerSaga
  );
  yield takeLatest(
    ActionConstants.GET_PAYOUT_TRANSACTION_FAILED_MSG,
    workerSaga
  );
  yield takeLatest(ActionConstants.GET_PAYOUT_BANK_LIST, workerSaga);
  yield takeLatest(ActionConstants.GET_MERCHANT_KYC_DETAILS, workerSaga);
  yield takeLatest(
    ActionConstants.GET_MERCHANT_KYC_ENTITY_TYPES_LIST,
    workerSaga
  );
  yield takeLatest(
    ActionConstants.POST_UPDATE_MERCHANT_KYC_DETAILS,
    workerSaga
  );
}
