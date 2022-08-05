/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import apiEndpoints from "../lib/apiEndpoints";
import apiCall from "./apiCall";

export const getGatewayListApi = (merchantId: string, sortData: {
  orderBy: string;
  order: string;
}) => {
  return apiCall({
    method: "get",
    endpoint: apiEndpoints.GATEWAY_LIST(merchantId),
    ...(sortData?.order && sortData?.orderBy && {
      query: {
        orderBy: sortData.orderBy,
        order: sortData.order
      }
    })
  });
};

export const getUnmappedGatewaysListApi = (merchantId: string) => {
  return apiCall({
    method: "get",
    endpoint: apiEndpoints.UNMAPPED_GATEWAY_LIST(merchantId),
  });
};

export const getGatewayConfigurationsApi = (
  gateway: string,
  merchantId: string | number,
  mode: boolean,
) => {
  return apiCall({
    method: "get",
    endpoint: apiEndpoints.GATEWAY_CONFIGURATIONS(gateway, merchantId, mode),
  });
};

export const saveGatewayApi = (payload) => {
  return apiCall({
    method: "post",
    payload,
    endpoint: apiEndpoints.SAVE_GATEWAY,
  });
};

export const getPreferenceGatewayApi = (merchantId: string | number) => {
  return apiCall({
    method: "get",
    endpoint: apiEndpoints.PREFERNCE_GATEWAY(merchantId),
  });
};

export const saveCustomLogicApi = (payload) => {
  return apiCall({
    method: "post",
    payload,
    endpoint: apiEndpoints.SAVE_CUSTOM_LOGIC,
  });
};

export const getActivePriorityLogicApi = (merchantId: string | number) => {
  return apiCall({
    method: "get",
    endpoint: apiEndpoints.ACTIVE_PRIORITY_LOGIC(merchantId),
  });
};

export const updatePreferenceApi = (
  preference: string,
  merchantId: string | number
) => {
  return apiCall({
    method: "get",
    endpoint: apiEndpoints.UPDATE_PREFERNCES(preference, merchantId),
  });
};

export const getPriorityLogicListApi = (merchantId: string, sortData: {
  orderBy: string;
  order: string;
}) => {
  return apiCall({
    method: "get",
    endpoint: apiEndpoints.PRIORITY_LOGICS_LIST(merchantId),
    ...(sortData?.order && sortData?.orderBy && {
      query: {
        orderBy: sortData.orderBy,
        order: sortData.order
      }
    })
  });
};

export const getPreferenceScoreListApi = (
  merchantId: number,
  preferenceType: "bin" | "issuer" | "cardBrand",
  sortData: {
    orderBy: string;
    order: string;
  }) => {
  const preferenceTypeRouteMapping = {
    bin: "ISIN",
    issuer: "Issuer",
    cardBrand: "CardBrand",
  };
  return apiCall({
    method: "get",
    endpoint: apiEndpoints.SMART_ROUTING_PREFERENCE_SCORES_LIST(
      merchantId,
      preferenceTypeRouteMapping[preferenceType]
    ),
    ...(sortData?.order && sortData?.orderBy && {
      query: {
        orderBy: sortData.orderBy,
        order: sortData.order
      }
    })
  });
};

export const getAllCardBrandApi = () => {
  return apiCall({
    method: "get",
    endpoint: apiEndpoints.GET_ALL_CARD_BRAND_NAMES,
  });
};

export const getAllIssuerNamesApi = () => {
  return apiCall({
    method: "get",
    endpoint: apiEndpoints.GET_ALL_ISSUER_NAMES,
  });
};

export const createPreferencRouteApi = (
  preferenceType: "bin" | "issuer" | "card",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data
) => {
  const preferenceTypeRouteMapping = {
    bin: "ISIN",
    issuer: "Issuer",
    card: "CardBrand",
  };
  return apiCall({
    method: "post",
    endpoint: apiEndpoints.SMART_ROUTING_CREATE_PREFERENCE_SCORES(
      preferenceTypeRouteMapping[preferenceType]
    ),
    payload: data,
  });
};

export const deletePreferencRouteApi = (
  preferenceType: "bin" | "issuer" | "card",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data
) => {
  const preferenceTypeRouteMapping = {
    bin: "ISIN",
    issuer: "Issuer",
    card: "CardBrand",
  };
  return apiCall({
    method: "post",
    endpoint: apiEndpoints.SMART_ROUTING_DELETE_PREFERENCE_SCORES(
      preferenceTypeRouteMapping[preferenceType]
    ),
    payload: data,
  });
};

export const viewSimpleRoutingLogicApi = (merchantId: number) => {
  return apiCall({
    method: "get",
    endpoint: apiEndpoints.VIEW_SIMPLE_ROUTING_LOGIC(merchantId),
  });
};

export const changeGatewayStatusApi = (payload) => {
  return apiCall({
    method: "post",
    payload,
    endpoint: apiEndpoints.CHANGE_GATEWAY_STATUS,
  });
};

export const deletePriorityLogicApi = (configId: number, merchantId: number) => {
  return apiCall({
    method: "delete",
    endpoint: apiEndpoints.DELETE_PRIORITY_LOGIC(configId, merchantId),
  });
};
