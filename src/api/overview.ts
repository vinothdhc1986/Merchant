/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import apiEndpoints from '../lib/apiEndpoints';
import apiCall from './apiCall';

export const getTodayTransactionsDataApi = (payload) => {
  const { merchantId } = payload;
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_TODAY_TRANSACTIONS_DATA(merchantId),
  });
};

export const getOverviewSettlementDataApi = (payload) => {
  const { base64data, merchantId } = payload;
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_OVERVIEW_DATA(merchantId),
    query: {
      download: 'false',
      payload: base64data,
    },
  });
};
