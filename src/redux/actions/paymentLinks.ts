/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import ActionConstants from '../constants';
import {
  getPaymentLinksListApi,
  createPaymentLinkApi,
  getBulkUploadHistoryApi,
  getStatusCodeApi,
} from '../../api/paymentLinks';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getPaymentLinksListAction = (data) => {
  const payload = {
    serviceMethod: getPaymentLinksListApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_PAYMENT_LINKS_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_PAYMENT_LINKS_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_PAYMENT_LINKS_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_PAYMENT_LINKS_LIST, payload };
};

export const createPaymentLinkAction = (data: any): any => {
  const payload = {
    serviceMethod: createPaymentLinkApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_CREATE_PAYMENT_LINK_SUCCESS,
    actionTypeFailure: ActionConstants.POST_CREATE_PAYMENT_LINK_FAILURE,
    actionTypeRequest: ActionConstants.POST_CREATE_PAYMENT_LINK_REQUEST,
  };
  return { type: ActionConstants.POST_CREATE_PAYMENT_LINK, payload };
};

export const clearCreatePaymentLinkAction = () => {
  return { type: ActionConstants.POST_CREATE_PAYMENT_LINK_CLEAR };
};

// Payment Link Bulk Upload History
export const getBulkUploadHistoryAction = (query: {
  pageNo: number;
  limit: number;
  payload: string;
}) => {
  const payload = {
    serviceMethod: getBulkUploadHistoryApi.bind(null, query),
    actionTypeSuccess:
      ActionConstants.GET_PAYMENT_LINK_BULK_UPLOAD_HISTORY_SUCCESS,
    actionTypeFailure:
      ActionConstants.GET_PAYMENT_LINK_BULK_UPLOAD_HISTORY_FAILURE,
    actionTypeRequest:
      ActionConstants.GET_PAYMENT_LINK_BULK_UPLOAD_HISTORY_REQUEST,
  };
  return {
    type: ActionConstants.GET_PAYMENT_LINK_BULK_UPLOAD_HISTORY_ACTION,
    payload,
  };
};

// Payment Link Status Code
export const getPaymentLinkStatusCodeAction = () => {
  const payload = {
    serviceMethod: getStatusCodeApi.bind(null),
    actionTypeSuccess:
      ActionConstants.GET_PAYMENT_LINK_STATUS_CODE_SUCCESS,
    actionTypeFailure:
      ActionConstants.GET_PAYMENT_LINK_STATUS_CODE_FAILURE,
    actionTypeRequest:
      ActionConstants.GET_PAYMENT_LINK_STATUS_CODE_REQUEST,
  };
  return {
    type: ActionConstants.GET_PAYMENT_LINK_STATUS_CODE_ACTION,
    payload,
  };
};
