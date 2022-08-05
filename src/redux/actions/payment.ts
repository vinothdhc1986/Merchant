/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ActionConstants from '../constants';
import {
  getPaymentListApi,
  getOrderTransactionDetailsApi,
  getAllGatewaysApi,
  getAllOrdersStatusApi,
} from '../../api/payment';

export const getPaymentListAaction = (data) => {
  const payload = {
    serviceMethod: getPaymentListApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_PAYMENT_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_PAYMENT_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_PAYMENT_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_PAYMENT_LIST, payload };
};

export const getOrderTransactionDetailsAction = (data) => {
  const payload = {
    serviceMethod: getOrderTransactionDetailsApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_PAYMENT_ORDER_DETAILS_SUCCESS,
    actionTypeFailure: ActionConstants.GET_PAYMENT_ORDER_DETAILS_FAILURE,
    actionTypeRequest: ActionConstants.GET_PAYMENT_ORDER_DETAILS_REQUEST,
  };
  return { type: ActionConstants.GET_PAYMENT_ORDER_DETAILS, payload };
};

// export const getTransactionDetailsAction = (data) => {
//   const payload = {
//     serviceMethod: getTransactionDetailsApi.bind(null, data),
//     actionTypeSuccess: ActionConstants.GET_PAYMENT_LIST_SUCCESS,
//     actionTypeFailure: ActionConstants.GET_PAYMENT_LIST_FAILURE,
//     actionTypeRequest: ActionConstants.GET_PAYMENT_LIST_REQUEST,
//   };
//   return { type: ActionConstants.GET_PAYMENT_LIST, payload };
// };

export const getAllGatewaysAction = () => {
  const payload = {
    serviceMethod: getAllGatewaysApi.bind(null),
    actionTypeSuccess: ActionConstants.GET_ALL_GATEWAYS_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_ALL_GATEWAYS_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_ALL_GATEWAYS_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_ALL_GATEWAYS_LIST, payload };
};

export const getAllOrdersStatusAction = (data) => {
  const payload = {
    serviceMethod: getAllOrdersStatusApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_ALL_ORDER_STATUS_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_ALL_ORDER_STATUS_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_ALL_ORDER_STATUS_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_ALL_ORDER_STATUS_LIST, payload };
};
