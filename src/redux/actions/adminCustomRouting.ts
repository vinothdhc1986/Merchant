/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ActionConstants from '../constants';
import {
  getAdminCustomRoutingListApi,
  getAdminPriorityLogicApi,
  approveOrRejectLogicApi,
  updateAdminPriorityLogicApi,
  getAutoSuggestSearchListApi,
} from '../../api/adminCustomRouting';

export const getAdminCustomRoutingListAction = (data) => {
  const payload = {
    serviceMethod: getAdminCustomRoutingListApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_ADMIN_CUSTOM_ROUTING_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_ADMIN_CUSTOM_ROUTING_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_ADMIN_CUSTOM_ROUTING_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_ADMIN_CUSTOM_ROUTING_LIST, payload };
};

export const getAdminPriorityLogicAction = (data) => {
  const payload = {
    serviceMethod: getAdminPriorityLogicApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_ADMIN_PRIORITY_LOGIC_SUCCESS,
    actionTypeFailure: ActionConstants.GET_ADMIN_PRIORITY_LOGIC_FAILURE,
    actionTypeRequest: ActionConstants.GET_ADMIN_PRIORITY_LOGIC_REQUEST,
  };
  return { type: ActionConstants.GET_ADMIN_PRIORITY_LOGIC, payload };
};

export const approveOrRejectLogicAction = (data) => {
  const payload = {
    serviceMethod: approveOrRejectLogicApi.bind(null, data),
    actionTypeSuccess: ActionConstants.PUT_APPROVE_OR_REJECT_LOGIC_SUCCESS,
    actionTypeFailure: ActionConstants.PUT_APPROVE_OR_REJECT_LOGIC_FAILURE,
    actionTypeRequest: ActionConstants.PUT_APPROVE_OR_REJECT_LOGIC_REQUEST,
  };
  return { type: ActionConstants.PUT_APPROVE_OR_REJECT_LOGIC, payload };
};

export const clearApproveOrRejectLogicState = () => {
  return { type: ActionConstants.PUT_APPROVE_OR_REJECT_LOGIC_CLEAR };
};

export const updateAdminPriorityLogicAction = (data) => {
  const payload = {
    serviceMethod: updateAdminPriorityLogicApi.bind(null, data),
    actionTypeSuccess: ActionConstants.UPDATE_ADMIN_PRIORITY_LOGIC_SUCCESS,
    actionTypeFailure: ActionConstants.UPDATE_ADMIN_PRIORITY_LOGIC_FAILURE,
    actionTypeRequest: ActionConstants.UPDATE_ADMIN_PRIORITY_LOGIC_REQUEST,
  };
  return { type: ActionConstants.UPDATE_ADMIN_PRIORITY_LOGIC, payload };
};

export const clearUpdateAdminPriorityLogicState = () => {
  return { type: ActionConstants.UPDATE_ADMIN_PRIORITY_LOGIC_CLEAR };
};

export const getAutoSuggestSearchListAction = (data) => {
  const payload = {
    serviceMethod: getAutoSuggestSearchListApi.bind(null, data),
    actionTypeSuccess:
      ActionConstants.GET_ADMIN_CUSTOM_ROUTING_AUTO_SUGGEST_LIST_SUCCESS,
    actionTypeFailure:
      ActionConstants.GET_ADMIN_CUSTOM_ROUTING_AUTO_SUGGEST_LIST_FAILURE,
    actionTypeRequest:
      ActionConstants.GET_ADMIN_CUSTOM_ROUTING_AUTO_SUGGEST_LIST_REQUEST,
    hideLoader: true,
  };
  return {
    type: ActionConstants.GET_ADMIN_CUSTOM_ROUTING_AUTO_SUGGEST_LIST,
    payload,
  };
};

export const clearAutoSuggestSearchListAction = () => {
  return {
    type: ActionConstants.GET_ADMIN_CUSTOM_ROUTING_AUTO_SUGGEST_LIST_CLEAR,
  };
};
