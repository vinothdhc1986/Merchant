/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import apiEndpoints from '../lib/apiEndpoints';
import apiCall from './apiCall';

export const getPaymentListApi = (
  data: {
    merchantId: string;
    pageNo?: string | number;
    limit?: string | number;
    payload?: Record<string, string>;
  },
  transactionType = '1'
): any => {
  const { merchantId, pageNo, limit, payload } = data;
  return apiCall({
    method: 'post',
    endpoint: `${apiEndpoints.GET_PAYMENT_LIST}/${transactionType}/${merchantId}`,
    query: {
      pageNo,
      limit,
    },
    payload: {
      ...payload,
    },
  });
};

export const getOrderTransactionDetailsApi = (data: {
  OrderId: string | number;
  MerchantId: string | number;
  TransactionId: string | number;
  TxnType: string | number;
}): void => {
  return apiCall({
    method: 'post',
    endpoint: `${apiEndpoints.PAYMENT_GET_ORDER_TRANSACTION_DETAILS}`,
    payload: data,
  });
};

export const getAllGatewaysApi = () => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_ALL_GATEWAYS,
  });
};

export const getAllOrdersStatusApi = () => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_ALL_TRANSACTION_STATUS
  });
};
