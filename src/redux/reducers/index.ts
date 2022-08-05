import { combineReducers } from 'redux';

import loginReducer from './login';
import loaderReducer from './loader';
import signupReducer from './signup';
import sidebarReducer from './sidebar';
import smartRoutingReducer from './smartRouting';
import settingsReducer from './settings';
import validationReducer from './validationErrors';
import paymentReducer from './payment';
import refundReducer from './refund';
import overviewReducer from './overview';
import analyticsReducer from './analytics';
import paymentLinksReducer from './paymentLinks';
import MerchantListingReducer from './merchantListing';
import adminCustomRouting from './adminCustomRouting';
import payoutsReducer from './payouts';

const reducer = combineReducers({
  loginReducer,
  loaderReducer,
  signupReducer,
  sidebarReducer,
  smartRoutingReducer,
  settingsReducer,
  validationReducer,
  paymentReducer,
  refundReducer,
  overviewReducer,
  analyticsReducer,
  paymentLinksReducer,
  MerchantListingReducer,
  adminCustomRouting,
  payoutsReducer,
});

export default reducer;
