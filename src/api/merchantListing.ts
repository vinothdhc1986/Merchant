
import apiEndpoints from '../lib/apiEndpoints';
import apiCall from './apiCall';
import { getBase64Data } from '../lib/helper';

export const getMerchantListApi = (data: {
  pageNo?: string | number;
  limit?: string | number;
  payload?: Record<string, string>;
}): any => {
  const { pageNo, limit, payload } = data;
  return apiCall({
    method: 'get',
    endpoint: `${apiEndpoints.GET_MERCHANT_LIST}`,
    query: {
      pageNo,
      limit,
      payload: getBase64Data(payload),
    },
    payload: {
      ...payload,
    },
  });
};

export const merchantSearchApi = (data: {
  limit?: string | number;
  searchPattern?: string | number;
}): any => {
  const { limit, searchPattern } = data;
  return apiCall({
    method: 'get',
    endpoint: `${apiEndpoints.MERCHANT_SEARCH}`,
    query: {
      limit,
      searchPattern,
    },
  });
};
