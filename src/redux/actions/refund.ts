/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ActionConstants from '../constants';
import {
  getRefundListApi,
  createRefundApi,
  getRefundBulkUploadHistoryListApi,
  getAllRefundStatusApi
} from '../../api/refund';

export const getRefundListAction = (data) => {
  const payload = {
    serviceMethod: getRefundListApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_REFUND_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_REFUND_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_REFUND_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_REFUND_LIST, payload };
};

export const createRefundAction = (data) => {
  const payload = {
    serviceMethod: createRefundApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_CREATE_REFUND_SUCCESS,
    actionTypeFailure: ActionConstants.POST_CREATE_REFUND_FAILURE,
    actionTypeRequest: ActionConstants.POST_CREATE_REFUND_REQUEST,
  };
  return { type: ActionConstants.POST_CREATE_REFUND, payload };
};

export const clearRefundAction = () => {
  return { type: ActionConstants.POST_CREATE_REFUND_CLEAR };
};
// Refund Bulk Upload History
export const getRefundBulkUploadHistoryListAction = (data) => {
  const payload = {
    serviceMethod: getRefundBulkUploadHistoryListApi.bind(null, data),
    actionTypeSuccess:
      ActionConstants.GET_REFUND_BULK_UPLOAD_HISTORY_LIST_SUCCESS,
    actionTypeFailure:
      ActionConstants.GET_REFUND_BULK_UPLOAD_HISTORY_LIST_FAILURE,
    actionTypeRequest:
      ActionConstants.GET_REFUND_BULK_UPLOAD_HISTORY_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_REFUND_BULK_UPLOAD_HISTORY_LIST, payload };
};

export const getAllRefundStatusAction = (data) => {
  const payload = {
    serviceMethod: getAllRefundStatusApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_ALL_REFUND_STATUS_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_ALL_REFUND_STATUS_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_ALL_REFUND_STATUS_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_ALL_REFUND_STATUS_LIST, payload };
};
