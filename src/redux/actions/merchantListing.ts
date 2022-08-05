/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ActionConstants from '../constants';
import {
  getMerchantListApi,
  merchantSearchApi,
} from '../../api/merchantListing';

export const getMerchantListAction = (data) => {
  const payload = {
    serviceMethod: getMerchantListApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_MERCHANT_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_MERCHANT_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_MERCHANT_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_MERCHANT_LIST, payload };
};

export const merchantSearchAction = (data) => {
  const payload = {
    serviceMethod: merchantSearchApi.bind(null, data),
    actionTypeSuccess: ActionConstants.MERCHANT_SEARCH_SUCCESS,
    actionTypeFailure: ActionConstants.MERCHANT_SEARCH_FAILURE,
    actionTypeRequest: ActionConstants.MERCHANT_SEARCH_REQUEST,
    hideLoader: true,
  };
  return { type: ActionConstants.MERCHANT_SEARCH, payload };
};
