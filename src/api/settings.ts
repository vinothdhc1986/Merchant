/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import apiEndpoints from '../lib/apiEndpoints';
import apiCall from './apiCall';

export const getActiveWebhookEventsApi = (payload) => {
  const { merchantId } = payload;
  return apiCall({
    method: 'get',
    endpoint: `${apiEndpoints.GET_ACTIVE_WEBHOOK_EVENTS}/${merchantId}`,
  });
};

export const getMerchentSettingsApi = (payload) => {
  const { merchantId } = payload;
  return apiCall({
    method: 'get',
    endpoint: `${apiEndpoints.GET_MERCHENT_SETTINGS}/${merchantId}`,
  });
};

export const updateMerchentGeneralSettingsApi = (payload) => {
  return apiCall({
    method: 'post',
    payload,
    endpoint: apiEndpoints.UPDATE_MERCHENT_GENERAL_SETTINGS,
  });
};

export const updateMerchentWebhookApi = (payload) => {
  return apiCall({
    method: 'post',
    payload,
    endpoint: apiEndpoints.UPDATE_MERCHENT_WEBHOOK,
  });
};

/**
 * User Management APIs
 */
export const getActiveUsersApi = (data: {
  merchantId: string | number;
  pageNo?: string | number;
  limit?: string | number;
  sortBy?: string | null;
  orderBy?: string | null;
  isAdmin?: boolean;
}) => {
  const { merchantId, pageNo, limit, sortBy, orderBy, isAdmin } = data;
  let endpoint = `${apiEndpoints.GET_ACTIVE_USERS}/${merchantId}`;
  isAdmin && merchantId === 0
    ? (endpoint = `${apiEndpoints.ADMIN_GET_ACTIVE_USERS}`)
    : '';
  return apiCall({
    method: 'get',
    endpoint: endpoint,
    query: {
      pageNo,
      limit,
      sortBy,
      orderBy,
    },
  });
};

export const getAllRolesApi = (data: {
  merchantId: number | string;
  isAdmin?: boolean;
}) => {
  const { merchantId, isAdmin } = data;

  let endpoint = `${apiEndpoints.GET_ALL_ROLES}/${merchantId}`;
  isAdmin && merchantId === 0
    ? (endpoint = `${apiEndpoints.ADMIN_GET_ALL_ROLES}`)
    : '';

  return apiCall({
    method: 'get',
    endpoint: endpoint,
  });
};

export const getAllPermissionsApi = (data: {
  merchantId: number | string;
  isAdmin?: boolean;
}) => {
  const { merchantId, isAdmin } = data;

  let endpoint = apiEndpoints.GET_ALL_PERMISSIONS_LIST;
  isAdmin && merchantId === 0
    ? (endpoint = `${apiEndpoints.ADMIN_GET_ALL_PERMISSIONS_LIST}`)
    : '';
  return apiCall({
    method: 'get',
    endpoint: endpoint,
  });
};

export const createNewRoleApi = (payload) => {
  let endpoint = apiEndpoints.CREATE_NEW_ROLE;
  payload.isAdmin ? (endpoint = `${apiEndpoints.ADMIN_CREATE_NEW_ROLE}`) : '';
  return apiCall({
    method: 'post',
    payload,
    endpoint: endpoint,
  });
};

export const createNewUserApi = (payload) => {
  let endpoint = apiEndpoints.CREATE_NEW_USER;
  payload.isAdmin && payload.merchant_id === 0
    ? (endpoint = `${apiEndpoints.ADMIN_CREATE_NEW_USER}`)
    : '';
  return apiCall({
    method: 'post',
    payload,
    endpoint: endpoint,
  });
};

export const updateUserDetailsApi = (payload) => {
  let endpoint = apiEndpoints.UPDATE_USER_DETAILS;
  payload.isAdmin && payload.merchantId === 0
    ? (endpoint = `${apiEndpoints.ADMIN_UPDATE_USER_DETAILS}`)
    : '';

  return apiCall({
    method: 'post',
    payload,
    endpoint: endpoint,
  });
};

export const deleteUserApi = (payload) => {
  const { user_id, isAdmin, merchantId } = payload;
  let endpoint = apiEndpoints.DELETE_USER;
  isAdmin && merchantId === 0
    ? (endpoint = `${apiEndpoints.ADMIN_DELETE_USER}`)
    : '';
  return apiCall({
    method: 'delete',
    payload,
    endpoint: `${endpoint}/${user_id}`,
  });
};

export const resendInvitationApi = (payload: {
  isAdmin: boolean;
  merchantId: number;
  userId: number;
}) => {
  const { isAdmin, merchantId } = payload;
  let endpoint = apiEndpoints.RESEND_INVITATION;
  isAdmin && merchantId === 0
    ? (endpoint = `${apiEndpoints.ADMIN_RESEND_INVITATION}`)
    : '';
  return apiCall({
    method: 'post',
    payload,
    endpoint: `${endpoint}`,
  });
};

// Checkout Theme
export const getCheckoutThemeApi = (payload: {
  merchantId: string | number;
}) => {
  const { merchantId } = payload;
  return apiCall({
    method: 'get',
    endpoint: `${apiEndpoints.GET_CHECKOUT_THEME}/${merchantId}`,
  });
};

export const updateCheckoutThemeApi = (payload: {
  theme_color: number;
  logo_url: string;
  merchant_id: number | string;
}) => {
  return apiCall({
    method: 'post',
    payload,
    endpoint: `${apiEndpoints.UPDATE_CHECKOUT_THEME}`,
  });
};
