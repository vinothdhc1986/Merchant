
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ActionConstants from '../constants';
import {
  getGatewayListApi,
  getPreferenceScoreListApi,
  getAllCardBrandApi,
  getAllIssuerNamesApi,
  createPreferencRouteApi,
  deletePreferencRouteApi,
  viewSimpleRoutingLogicApi,
  getUnmappedGatewaysListApi,
  getGatewayConfigurationsApi,
  saveGatewayApi,
  getPreferenceGatewayApi,
  saveCustomLogicApi,
  getActivePriorityLogicApi,
  updatePreferenceApi,
  getPriorityLogicListApi,
  changeGatewayStatusApi,
  deletePriorityLogicApi,
} from '../../api/smartRouting';

export const getGatewayListAction = (
  merchantId: string,
  sortData: {
    orderBy: string;
    order: string;
  }
) => {
  const payload = {
    serviceMethod: getGatewayListApi.bind(null, merchantId, sortData),
    actionTypeSuccess: ActionConstants.GET_GATEWAY_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_GATEWAY_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_GATEWAY_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_GATEWAY_LIST_ACTION, payload };
};

export const clearGatewayListAction = () => {
  return { type: ActionConstants.GET_GATEWAY_LIST_CLEAR };
};

export const getUnmappedGatewayListAction = (merchantId: string) => {
  const payload = {
    serviceMethod: getUnmappedGatewaysListApi.bind(null, merchantId),
    actionTypeSuccess: ActionConstants.GET_UNMAPPED_GATEWAY_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_UNMAPPED_GATEWAY_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_UNMAPPED_GATEWAY_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_UNMAPPED_GATEWAY_LIST_ACTION, payload };
};

export const clearUnmappedGatewayListAction = () => {
  return { type: ActionConstants.GET_UNMAPPED_GATEWAY_LIST_CLEAR };
};

export const getGatewayConfigurationsAction = (
  gateway: string,
  merchantId: string | number,
  mode: boolean
) => {
  const payload = {
    serviceMethod: getGatewayConfigurationsApi.bind(
      null,
      gateway,
      merchantId,
      mode
    ),
    actionTypeSuccess: ActionConstants.GET_GATEWAY_CONFIGURATIONS_SUCCESS,
    actionTypeFailure: ActionConstants.GET_GATEWAY_CONFIGURATIONS_FAILURE,
    actionTypeRequest: ActionConstants.GET_GATEWAY_CONFIGURATIONS_REQUEST,
  };
  return { type: ActionConstants.GET_GATEWAY_CONFIGURATIONS_ACTION, payload };
};

export const setGatewayParams = (payload: any) => {
  return { type: ActionConstants.SET_GATEWAY_CONFIGURATIONS_PARAMS, payload };
};

export const clearGatewayConfigurationsAction = () => {
  return { type: ActionConstants.GET_GATEWAY_CONFIGURATIONS_CLEAR };
};

export const saveGatewayAction = (data) => {
  const payload = {
    serviceMethod: saveGatewayApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_SAVE_GATEWAY_SUCCESS,
    actionTypeFailure: ActionConstants.POST_SAVE_GATEWAY_FAILURE,
    actionTypeRequest: ActionConstants.POST_SAVE_GATEWAY_REQUEST,
    genericErrorHandling: false,
  };
  return { type: ActionConstants.POST_SAVE_GATEWAY_ACTION, payload };
};

export const clearSaveGatewayAction = () => {
  return { type: ActionConstants.POST_SAVE_GATEWAY_CLEAR };
};

export const getPreferenceGatewayAction = (merchantId: string) => {
  const payload = {
    serviceMethod: getPreferenceGatewayApi.bind(null, merchantId),
    actionTypeSuccess: ActionConstants.GET_PREFERENCE_GATEWAY_SUCCESS,
    actionTypeFailure: ActionConstants.GET_PREFERENCE_GATEWAY_FAILURE,
    actionTypeRequest: ActionConstants.GET_PREFERENCE_GATEWAY_REQUEST,
  };
  return { type: ActionConstants.GET_PREFERENCE_GATEWAY_ACTION, payload };
};

export const clearPreferenceGatewayAction = () => {
  return { type: ActionConstants.GET_PREFERENCE_GATEWAY_CLEAR };
};

export const saveCustomLogicAction = (data) => {
  const payload = {
    serviceMethod: saveCustomLogicApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_SAVE_CUSTOM_LOGIC_SUCCESS,
    actionTypeFailure: ActionConstants.POST_SAVE_CUSTOM_LOGIC_FAILURE,
    actionTypeRequest: ActionConstants.POST_SAVE_CUSTOM_LOGIC_REQUEST,
  };
  return { type: ActionConstants.POST_SAVE_CUSTOM_LOGIC_ACTION, payload };
};

export const clearSaveCustomLogicAction = () => {
  return { type: ActionConstants.POST_SAVE_CUSTOM_LOGIC_CLEAR };
};

export const getActivePriorityLogicAction = (merchantId: string | number) => {
  const payload = {
    serviceMethod: getActivePriorityLogicApi.bind(null, merchantId),
    actionTypeSuccess: ActionConstants.GET_ACTIVE_PRIORITY_LOGIC_SUCCESS,
    actionTypeFailure: ActionConstants.GET_ACTIVE_PRIORITY_LOGIC_FAILURE,
    actionTypeRequest: ActionConstants.GET_ACTIVE_PRIORITY_LOGIC_REQUEST,
  };
  return { type: ActionConstants.GET_ACTIVE_PRIORITY_LOGIC_ACTION, payload };
};

export const clearActivePriorityLogicAction = () => {
  return { type: ActionConstants.GET_ACTIVE_PRIORITY_LOGIC_CLEAR };
};

export const updatePreferenceScoreAction = (
  preference: string,
  merchantId: string | number
) => {
  const payload = {
    serviceMethod: updatePreferenceApi.bind(null, preference, merchantId),
    actionTypeSuccess: ActionConstants.UPDATE_PREFERENCE_SCORE_SUCCESS,
    actionTypeFailure: ActionConstants.UPDATE_PREFERENCE_SCORE_FAILURE,
    actionTypeRequest: ActionConstants.UPDATE_PREFERENCE_SCORE_REQUEST,
    genericErrorHandling: false,
  };
  return { type: ActionConstants.UPDATE_PREFERENCE_SCORE_ACTION, payload };
};

export const clearUpdatePreferenceAction = () => {
  return { type: ActionConstants.UPDATE_PREFERENCE_SCORE_CLEAR };
};

export const getPriorityLogicListAction = (
  merchantId: string,
  sortData: {
    orderBy: string;
    order: string;
  }
) => {
  const payload = {
    serviceMethod: getPriorityLogicListApi.bind(null, merchantId, sortData),
    actionTypeSuccess: ActionConstants.GET_PRIORITY_LOGIC_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_PRIORITY_LOGIC_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_PRIORITY_LOGIC_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_PRIORITY_LOGIC_LIST_ACTION, payload };
};

export const clearGetPriorityLogicListAction = () => {
  return { type: ActionConstants.GET_PRIORITY_LOGIC_LIST_CLEAR };
};

export const getBinListAction = (
  merchantId: number,
  sortData: {
    orderBy: string;
    order: string;
  }
) => {
  const payload = {
    serviceMethod: getPreferenceScoreListApi.bind(
      null,
      merchantId,
      'bin',
      sortData
    ),
    actionTypeSuccess: ActionConstants.GET_PREFERENCE_SCORE_BIN_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_PREFERENCE_SCORE_BIN_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_PREFERENCE_SCORE_BIN_LIST_REQUEST,
  };
  return {
    type: ActionConstants.GET_PREFERENCE_SCORE_BIN_LIST_ACTION,
    payload,
  };
};

export const clearBinListAction = () => {
  return { type: ActionConstants.GET_PREFERENCE_SCORE_BIN_LIST_CLEAR };
};

export const getIssuerListAction = (
  merchantId: number,
  sortData: {
    orderBy: string;
    order: string;
  }
) => {
  const payload = {
    serviceMethod: getPreferenceScoreListApi.bind(
      null,
      merchantId,
      'issuer',
      sortData
    ),
    actionTypeSuccess: ActionConstants.GET_PREFERENCE_SCORE_ISSUER_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_PREFERENCE_SCORE_ISSUER_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_PREFERENCE_SCORE_ISSUER_LIST_REQUEST,
  };
  return {
    type: ActionConstants.GET_PREFERENCE_SCORE_ISSUER_LIST_ACTION,
    payload,
  };
};

export const clearIssuerListAction = () => {
  return { type: ActionConstants.GET_PREFERENCE_SCORE_ISSUER_LIST_CLEAR };
};

export const getCardListAction = (
  merchantId: number,
  sortData: {
    orderBy: string;
    order: string;
  }
) => {
  const payload = {
    serviceMethod: getPreferenceScoreListApi.bind(
      null,
      merchantId,
      'cardBrand',
      sortData
    ),
    actionTypeSuccess:
      ActionConstants.GET_PREFERENCE_SCORE_CARD_BRAND_LIST_SUCCESS,
    actionTypeFailure:
      ActionConstants.GET_PREFERENCE_SCORE_CARD_BRAND_LIST_FAILURE,
    actionTypeRequest:
      ActionConstants.GET_PREFERENCE_SCORE_CARD_BRAND_LIST_REQUEST,
  };
  return {
    type: ActionConstants.GET_PREFERENCE_SCORE_CARD_BRAND_LIST_ACTION,
    payload,
  };
};

export const clearCardListAction = () => {
  return { type: ActionConstants.GET_PREFERENCE_SCORE_CARD_BRAND_LIST_CLEAR };
};

export const getCardBrandNamesAction = () => {
  const payload = {
    serviceMethod: getAllCardBrandApi.bind(null),
    actionTypeSuccess: ActionConstants.GET_ALL_CARD_BRAND_NAMES_SUCCESS,
    actionTypeFailure: ActionConstants.GET_ALL_CARD_BRAND_NAMES_FAILURE,
    actionTypeRequest: ActionConstants.GET_ALL_CARD_BRAND_NAMES_REQUEST,
  };
  return { type: ActionConstants.GET_ALL_CARD_BRAND_NAMES_ACTION, payload };
};

export const clearCardBrandNamesAction = () => {
  return { type: ActionConstants.GET_ALL_CARD_BRAND_NAMES_CLEAR };
};

export const getIssuerNamesAction = () => {
  const payload = {
    serviceMethod: getAllIssuerNamesApi.bind(null),
    actionTypeSuccess: ActionConstants.GET_ALL_ISSUER_NAME_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_ALL_ISSUER_NAME_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_ALL_ISSUER_NAME_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_ALL_ISSUER_NAME_LIST_ACTION, payload };
};

export const clearIssuerNamesAction = () => {
  return { type: ActionConstants.GET_ALL_ISSUER_NAME_LIST_CLEAR };
};

export const createPreferenceScoreAction = (data) => {
  const PREFERENCE_SCORE_TYPE_KEY_MAPPING = {
    bin: 'ISIN',
    issuer: 'IssuerName',
    card: 'CardBrandName',
    transaction: 'transaction',
  };
  const apiPayload = {
    [PREFERENCE_SCORE_TYPE_KEY_MAPPING[data.type]]: data.titleValue,
    GatewayName: data.gateway,
    PreferenceScore: data.preferenceScore,
    merchantId: data.merchantId,
  };
  if (data?.isUpdated) {
    apiPayload['IsUpdate'] = 1;
  }
  const payload = {
    serviceMethod: createPreferencRouteApi.bind(null, data.type, apiPayload),
    actionTypeSuccess: ActionConstants.POST_CREATE_PREFERENCE_SCORE_SUCCESS,
    actionTypeFailure: ActionConstants.POST_CREATE_PREFERENCE_SCORE_FAILURE,
    actionTypeRequest: ActionConstants.POST_CREATE_PREFERENCE_SCORE_REQUEST,
    extra: { ...data },
  };
  return { type: ActionConstants.POST_CREATE_PREFERENCE_SCORE_ACTION, payload };
};

export const clearCreatePreferenceScoreAction = () => {
  return { type: ActionConstants.POST_CREATE_PREFERENCE_SCORE_CLEAR };
};

export const deletePreferenceScoreAction = (data) => {
  const PREFERENCE_SCORE_TYPE_KEY_MAPPING = {
    bin: 'ISIN',
    issuer: 'IssuerName',
    card: 'CardBrandName',
    transaction: 'transaction',
  };
  const payload = {
    serviceMethod: deletePreferencRouteApi.bind(null, data.type, {
      [PREFERENCE_SCORE_TYPE_KEY_MAPPING[data.type]]: data.titleValue,
      GatewayName: data.gateway,
      PreferenceScore: data.preferenceScore,
      merchantId: data.merchantId,
    }),
    actionTypeSuccess: ActionConstants.POST_DELETE_PREFERENCE_SCORE_SUCCESS,
    actionTypeFailure: ActionConstants.POST_DELETE_PREFERENCE_SCORE_FAILURE,
    actionTypeRequest: ActionConstants.POST_DELETE_PREFERENCE_SCORE_REQUEST,
  };
  return { type: ActionConstants.POST_DELETE_PREFERENCE_SCORE_ACTION, payload };
};

export const clearDeletePreferenceScoreAction = () => {
  return { type: ActionConstants.POST_DELETE_PREFERENCE_SCORE_CLEAR };
};

export const getActiveSimpleRoutingLogicAction = (merchantId: number) => {
  const payload = {
    serviceMethod: viewSimpleRoutingLogicApi.bind(null, merchantId),
    actionTypeSuccess: ActionConstants.GET_VIEW_SIMPLE_ROUTING_LOGIC_SUCCESS,
    actionTypeFailure: ActionConstants.GET_VIEW_SIMPLE_ROUTING_LOGIC_FAILURE,
    actionTypeRequest: ActionConstants.GET_VIEW_SIMPLE_ROUTING_LOGIC_REQUEST,
  };
  return {
    type: ActionConstants.GET_VIEW_SIMPLE_ROUTING_LOGIC_ACTION,
    payload,
  };
};

export const clearGetActiveSimpleRoutingLogicAction = () => {
  return { type: ActionConstants.GET_VIEW_SIMPLE_ROUTING_LOGIC_CLEAR };
};

export const changeGatewayStatusAction = (data) => {
  const payload = {
    serviceMethod: changeGatewayStatusApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_CHANGE_GATEWAY_STATUS_SUCCESS,
    actionTypeFailure: ActionConstants.POST_CHANGE_GATEWAY_STATUS_FAILURE,
    actionTypeRequest: ActionConstants.POST_CHANGE_GATEWAY_STATUS_REQUEST,
  };
  return { type: ActionConstants.POST_CHANGE_GATEWAY_STATUS_ACTION, payload };
};

export const clearChangeGatewayStatusAction = () => {
  return { type: ActionConstants.POST_CHANGE_GATEWAY_STATUS_CLEAR };
};

export const deletePriorityLogicAction = (
  configId: number,
  merchantId: number
) => {
  const payload = {
    serviceMethod: deletePriorityLogicApi.bind(null, configId, merchantId),
    actionTypeSuccess: ActionConstants.DELETE_PRIORITY_LOGIC_SUCCESS,
    actionTypeFailure: ActionConstants.DELETE_PRIORITY_LOGIC_FAILURE,
    actionTypeRequest: ActionConstants.DELETE_PRIORITY_LOGIC_REQUEST,
  };
  return { type: ActionConstants.DELETE_PRIORITY_LOGIC_ACTION, payload };
};

export const clearDeletePriorityLogicAction = () => {
  return { type: ActionConstants.DELETE_PRIORITY_LOGIC_CLEAR };
};
