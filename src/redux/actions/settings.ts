/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ActionConstants from '../constants';
import {
  getActiveWebhookEventsApi,
  getMerchentSettingsApi,
  updateMerchentGeneralSettingsApi,
  updateMerchentWebhookApi,
  getActiveUsersApi,
  getAllRolesApi,
  getAllPermissionsApi,
  createNewUserApi,
  createNewRoleApi,
  updateUserDetailsApi,
  deleteUserApi,
  resendInvitationApi,
  getCheckoutThemeApi,
  updateCheckoutThemeApi,
} from '../../api/settings';

export const getActiveWebhookEventsAction = (data) => {
  const payload = {
    serviceMethod: getActiveWebhookEventsApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_ACTIVE_WEBHOOK_EVENTS_SUCCESS,
    actionTypeFailure: ActionConstants.GET_ACTIVE_WEBHOOK_EVENTS_FAILURE,
    actionTypeRequest: ActionConstants.GET_ACTIVE_WEBHOOK_EVENTS_REQUEST,
  };
  return { type: ActionConstants.GET_ACTIVE_WEBHOOK_EVENTS, payload };
};

export const clearActiveWebhookEvents = () => {
  return { type: ActionConstants.GET_ACTIVE_WEBHOOK_EVENTS_CLEAR };
};

export const getMerchentSettingsAction = (data) => {
  const payload = {
    serviceMethod: getMerchentSettingsApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_MERCHENT_SETTINGS_SUCCESS,
    actionTypeFailure: ActionConstants.GET_MERCHENT_SETTINGS_FAILURE,
    actionTypeRequest: ActionConstants.GET_MERCHENT_SETTINGS_REQUEST,
  };
  return { type: ActionConstants.GET_MERCHENT_SETTINGS, payload };
};

export const clearMerchentSettingsAction = () => {
  return { type: ActionConstants.GET_MERCHENT_SETTINGS_CLEAR };
};

export const updateMerchentGeneralSettingsAction = (data) => {
  const payload = {
    serviceMethod: updateMerchentGeneralSettingsApi.bind(null, data),
    actionTypeSuccess: ActionConstants.UPDATE_MERCHENT_GENERAL_SETTINGS_SUCCESS,
    actionTypeFailure: ActionConstants.UPDATE_MERCHENT_GENERAL_SETTINGS_FAILURE,
    actionTypeRequest: ActionConstants.UPDATE_MERCHENT_GENERAL_SETTINGS_REQUEST,
  };
  return { type: ActionConstants.UPDATE_MERCHENT_GENERAL_SETTINGS, payload };
};

export const clearUpdateGeneralSettingsAction = () => {
  return { type: ActionConstants.UPDATE_MERCHENT_GENERAL_SETTINGS_CLEAR };
};

export const updateMerchentWebhookAction = (data) => {
  const payload = {
    serviceMethod: updateMerchentWebhookApi.bind(null, data),
    actionTypeSuccess: ActionConstants.UPDATE_MERCHENT_WEBHOOK_SUCCESS,
    actionTypeFailure: ActionConstants.UPDATE_MERCHENT_WEBHOOK_FAILURE,
    actionTypeRequest: ActionConstants.UPDATE_MERCHENT_WEBHOOK_REQUEST,
  };
  return { type: ActionConstants.UPDATE_MERCHENT_WEBHOOK, payload };
};

export const clearUpdateMerchentWebhookAction = () => {
  return { type: ActionConstants.UPDATE_MERCHENT_WEBHOOK_CLEAR };
};

// User Management Actions
export const getActiveUsersAction = (data) => {
  const payload = {
    serviceMethod: getActiveUsersApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_ACTIVE_USERS_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_ACTIVE_USERS_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_ACTIVE_USERS_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_ACTIVE_USERS_LIST, payload };
};

export const clearActiveUsersAction = () => {
  return { type: ActionConstants.GET_ACTIVE_USERS_LIST_CLEAR };
};

export const getAllRolesAction = (data) => {
  const payload = {
    serviceMethod: getAllRolesApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_ALL_ROLES_SUCCESS,
    actionTypeFailure: ActionConstants.GET_ALL_ROLES_FAILURE,
    actionTypeRequest: ActionConstants.GET_ALL_ROLES_REQUEST,
  };
  return { type: ActionConstants.GET_ALL_ROLES, payload };
};

export const clearAllRolesAction = () => {
  return { type: ActionConstants.GET_ALL_ROLES_CLEAR };
};

export const getAllPermissionsAction = (data) => {
  const payload = {
    serviceMethod: getAllPermissionsApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_ALL_PERMISSIONS_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_ALL_PERMISSIONS_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_ALL_PERMISSIONS_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_ALL_PERMISSIONS_LIST, payload };
};

export const clearAllPermissionsAction = () => {
  return { type: ActionConstants.GET_ALL_PERMISSIONS_LIST_CLEAR };
};

export const createNewUserAction = (data) => {
  const payload = {
    serviceMethod: createNewUserApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_CREATE_NEW_USER_SUCCESS,
    actionTypeFailure: ActionConstants.POST_CREATE_NEW_USER_FAILURE,
    actionTypeRequest: ActionConstants.POST_CREATE_NEW_USER_REQUEST,
    extra: {
      assignedRoleId: data?.role_id ?? '',
    },
  };
  return { type: ActionConstants.POST_CREATE_NEW_USER, payload };
};

export const clearCreateNewUserStateAction = () => {
  return { type: ActionConstants.POST_CREATE_NEW_USER_CLEAR };
};

export const updateUserDetailsAction = (data) => {
  const payload = {
    serviceMethod: updateUserDetailsApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_UPDATE_USER_DETAILS_SUCCESS,
    actionTypeFailure: ActionConstants.POST_UPDATE_USER_DETAILS_FAILURE,
    actionTypeRequest: ActionConstants.POST_UPDATE_USER_DETAILS_REQUEST,
  };
  return { type: ActionConstants.POST_UPDATE_USER_DETAILS, payload };
};

export const clearUpdateUserStateAction = () => {
  return { type: ActionConstants.POST_UPDATE_USER_DETAILS_CLEAR };
};

export const deleteUserAction = (data) => {
  const payload = {
    serviceMethod: deleteUserApi.bind(null, data),
    actionTypeSuccess: ActionConstants.DELETE_USER_SUCCESS,
    actionTypeFailure: ActionConstants.DELETE_USER_FAILURE,
    actionTypeRequest: ActionConstants.DELETE_USER_REQUEST,
  };
  return { type: ActionConstants.DELETE_USER, payload };
};

export const clearDeleteUserAction = () => {
  return { type: ActionConstants.DELETE_USER_CLEAR };
};

export const createNewRoleAction = (data) => {
  const payload = {
    serviceMethod: createNewRoleApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_CREATE_NEW_ROLE_SUCCESS,
    actionTypeFailure: ActionConstants.POST_CREATE_NEW_ROLE_FAILURE,
    actionTypeRequest: ActionConstants.POST_CREATE_NEW_ROLE_REQUEST,
  };
  return { type: ActionConstants.POST_CREATE_NEW_ROLE, payload };
};

export const clearCreateNewRoleStateAction = () => {
  return { type: ActionConstants.POST_CREATE_NEW_ROLE_CLEAR };
};

export const resendInvitationAction = (data) => {
  const payload = {
    serviceMethod: resendInvitationApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_RESEND_INVITATION_SUCCESS,
    actionTypeFailure: ActionConstants.POST_RESEND_INVITATION_FAILURE,
    actionTypeRequest: ActionConstants.POST_RESEND_INVITATION_REQUEST,
  };
  return { type: ActionConstants.POST_RESEND_INVITATION, payload };
};

export const clearResendInvitationAction = () => {
  return { type: ActionConstants.POST_RESEND_INVITATION_CLEAR };
};

// Checkout Theme Actions
export const getCheckoutThemeAction = (data) => {
  const payload = {
    serviceMethod: getCheckoutThemeApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_CHECKOUT_THEME_SUCCESS,
    actionTypeFailure: ActionConstants.GET_CHECKOUT_THEME_FAILURE,
    actionTypeRequest: ActionConstants.GET_CHECKOUT_THEME_REQUEST,
  };
  return { type: ActionConstants.GET_CHECKOUT_THEME, payload };
};

export const clearGetCheckoutThemeAction = () => {
  return { type: ActionConstants.GET_CHECKOUT_THEME_CLEAR };
};

export const updateCheckoutThemeAction = (data) => {
  const payload = {
    serviceMethod: updateCheckoutThemeApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_UPDATE_CHECKOUT_THEME_SUCCESS,
    actionTypeFailure: ActionConstants.POST_UPDATE_CHECKOUT_THEME_FAILURE,
    actionTypeRequest: ActionConstants.POST_UPDATE_CHECKOUT_THEME_REQUEST,
  };
  return { type: ActionConstants.POST_UPDATE_CHECKOUT_THEME, payload };
};

export const clearUpdateCheckoutThemeAction = () => {
  return { type: ActionConstants.POST_UPDATE_CHECKOUT_THEME_CLEAR };
};
