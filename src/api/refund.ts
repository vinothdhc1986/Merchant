/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import apiEndpoints from '../lib/apiEndpoints';
import apiCall from './apiCall';

export const getRefundListApi = (
  data: {
    merchantId: string;
    pageNo?: string | number;
    limit?: string | number;
    payload?: Record<string, string>;
    fromDate?: string;
    toDate?: string;
  },
  transactionType = '10'
): any => {
  const { merchantId, pageNo, limit, payload } = data;
  return apiCall({
    method: 'post',
    endpoint: apiEndpoints.GET_REFUND_LIST({ merchantId, transactionType }),
    query: {
      pageNo,
      limit,
    },
    payload: {
      ...payload,
    },
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createRefundApi = (payload): any => {
  return apiCall({
    method: 'post',
    payload,
    endpoint: apiEndpoints.CREATE_REFUND,
  });
};

// Refund Bulk Upload History
export const getRefundBulkUploadHistoryListApi = (payload: {
  start_date: string;
  end_date: string;
  file_name: string;
  page_no: number | string;
  limit: number | string;
  //merchant_id: 3413;
}): any => {
  return apiCall({
    method: 'post',
    endpoint: apiEndpoints.GET_REFUND_BULK_UPLOAD_HISTORY_LIST,
    payload,
  });
};

export const getAllRefundStatusApi = () => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_ALL_REFUND_STATUS
  });
};
