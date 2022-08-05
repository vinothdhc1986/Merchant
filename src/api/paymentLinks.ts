/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { getMerchantIdFromStore } from 'lib/helper';
import apiEndpoints from '../lib/apiEndpoints';
import apiCall from './apiCall';

export const getPaymentLinksListApi = (data: {
  merchantId: string;
  pageNo?: string | number;
  limit?: string | number;
  payload?: Record<string, string>;
}): any => {
  const { pageNo, limit, payload } = data;
  const buff = new Buffer(JSON.stringify(payload));
  const base64data = buff.toString('base64');
  return apiCall({
    method: 'get',
    endpoint: `${apiEndpoints.GET_PAYMENT_LINKS_LIST(
      getMerchantIdFromStore()
    )}`,
    query: {
      pageNo,
      limit,
      payload: base64data,
    },
  });
};

export const createPaymentLinkApi = (payload: any): any => {
  return apiCall({
    method: 'post',
    endpoint: `${apiEndpoints.CREATE_PAYMENT_LINK}`,
    payload: {
      ...payload,
    },
  });
};

// Refund Bulk Upload History
export const getBulkUploadHistoryApi = (query: {
  pageNo: number;
  limit: number;
  payload: string;
}): any => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_PAYMENT_LINK_BULK_UPLOAD_HISTORY,
    query,
  });
};

// Status code
export const getStatusCodeApi = (): any => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_PAYMENT_LINK_STATUS_CODE,
  });
};
