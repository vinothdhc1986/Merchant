import { all } from 'redux-saga/effects';
import loginWatcher from './login';
import signupWatcher from './signup';
import smartRouting from './smartRouting';
import settings from './settings';
import payment from './payment';
import refund from './refund';
import overview from './overview';
import analyticsWatcher from './analytics';
import merchantListingWatcher from './merchantListing';
import validationErrorsWatcher from './validationErrors';
import paymentLinksWatcher from './paymentLinks';
import adminCustomRoutingWatcher from './adminCustomRouting';
import downloadCsvWatcher from './downloadCsv';
import payoutsWatcher from './payouts';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga() {
  yield all([
    loginWatcher(),
    signupWatcher(),
    smartRouting(),
    settings(),
    payment(),
    refund(),
    overview(),
    analyticsWatcher(),
    validationErrorsWatcher(),
    paymentLinksWatcher(),
    merchantListingWatcher(),
    adminCustomRoutingWatcher(),
    downloadCsvWatcher(),
    payoutsWatcher(),
  ]);
}
