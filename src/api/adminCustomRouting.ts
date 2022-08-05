/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import apiEndpoints from '../lib/apiEndpoints';
import apiCall from './apiCall';

export const getAdminCustomRoutingListApi = (payload) => {
  const { base64data, pageNo, limit } = payload;
  const queryPayload = {
    pageNo: pageNo || 1,
    limit: limit || 10,
    payload: base64data,
  };
  if (!base64data) {
    delete queryPayload.payload;
  }
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_ADMIN_CUSTOM_ROUTING_LIST,
    query: { ...queryPayload },
  });
};

export const getAdminPriorityLogicApi = (payload) => {
  const { configId } = payload;
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_ADMIN_PRIORITY_LOGIC,
    query: { configId },
  });
};

export const approveOrRejectLogicApi = (payload) => {
  const { configId, approvedStatusId } = payload;
  return apiCall({
    method: 'put',
    endpoint: apiEndpoints.PUT_APPROVE_OR_REJECT_LOGIC,
    payload: {
      config_id: configId,
      approved_status_id: approvedStatusId,
    },
  });
};

export const updateAdminPriorityLogicApi = (payload) => {
  const { configId, customRoutingLogicBase64 } = payload;
  return apiCall({
    method: 'put',
    endpoint: apiEndpoints.UPDATE_ADMIN_PRIORITY_LOGIC,
    payload: {
      config_id: configId,
      customized_logic: customRoutingLogicBase64,
    },
  });
};

export const getAutoSuggestSearchListApi = (payload) => {
  const { searchPattern } = payload;
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_ADMIN_CUSTOM_ROUTING_AUTO_SUGGEST_LIST,
    query: {
      searchPattern,
    },
  });
};
