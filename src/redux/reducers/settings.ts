import actionConstants from '../constants/';

const getActiveWebhookEvents = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const getMerchentSettings = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const updateMerchentGeneralSettings = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const updateMerchentWebhookData = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const activeUsers = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
  activeUserCount: 0,
};

const allPermissions = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const allRoles = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const createNewUserState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const updateUserState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const deleteUserState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const createNewRoleState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  responseCode: 0,
  data: {},
  errorMessage: '',
};

const resendInvitationState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const getCheckoutThemeState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const updateCheckoutThemeState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const initialState = {
  activeWebhookEvents: { ...getActiveWebhookEvents },
  merchentSettings: { ...getMerchentSettings },
  updateGeneralSettings: { ...updateMerchentGeneralSettings },
  updateMerchentWebhook: { ...updateMerchentWebhookData },
  activeUsersList: { ...activeUsers },
  allPermissions: { ...allPermissions },
  allRoles: { ...allRoles },
  createNewUserState: { ...createNewUserState },
  createNewRoleState: { ...createNewRoleState },
  updateUserState: { ...updateUserState },
  deleteUserState: { ...deleteUserState },
  resendInvitationState: { ...resendInvitationState },
  getCheckoutThemeState: { ...getCheckoutThemeState },
  updateCheckoutThemeState: { ...updateCheckoutThemeState },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case actionConstants.GET_ACTIVE_WEBHOOK_EVENTS_REQUEST:
      return {
        ...state,
        activeWebhookEvents: {
          ...state.activeWebhookEvents,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_ACTIVE_WEBHOOK_EVENTS_SUCCESS:
      return {
        ...state,
        activeWebhookEvents: {
          ...state.activeWebhookEvents,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_ACTIVE_WEBHOOK_EVENTS_FAILURE:
      return {
        ...state,
        activeWebhookEvents: {
          ...state.activeWebhookEvents,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_ACTIVE_WEBHOOK_EVENTS_CLEAR:
      return {
        ...state,
        activeWebhookEvents: {
          ...initialState.activeWebhookEvents,
          data: {},
        },
      };

    case actionConstants.GET_MERCHENT_SETTINGS_REQUEST:
      return {
        ...state,
        merchentSettings: {
          ...state.merchentSettings,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_MERCHENT_SETTINGS_SUCCESS:
      return {
        ...state,
        merchentSettings: {
          ...state.merchentSettings,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_MERCHENT_SETTINGS_FAILURE:
      return {
        ...state,
        merchentSettings: {
          ...state.merchentSettings,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_MERCHENT_SETTINGS_CLEAR:
      return {
        ...state,
        merchentSettings: {
          ...initialState.merchentSettings,
          data: {},
        },
      };

    case actionConstants.UPDATE_MERCHENT_GENERAL_SETTINGS_REQUEST:
      return {
        ...state,
        updateGeneralSettings: {
          ...state.updateGeneralSettings,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.UPDATE_MERCHENT_GENERAL_SETTINGS_SUCCESS:
      return {
        ...state,
        updateGeneralSettings: {
          ...state.updateGeneralSettings,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.UPDATE_MERCHENT_GENERAL_SETTINGS_FAILURE:
      return {
        ...state,
        updateGeneralSettings: {
          ...state.updateGeneralSettings,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.UPDATE_MERCHENT_GENERAL_SETTINGS_CLEAR:
      return {
        ...state,
        updateGeneralSettings: {
          ...initialState.updateGeneralSettings,
          data: {},
        },
      };

    case actionConstants.UPDATE_MERCHENT_WEBHOOK_REQUEST:
      return {
        ...state,
        updateMerchentWebhook: {
          ...state.updateMerchentWebhook,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.UPDATE_MERCHENT_WEBHOOK_SUCCESS:
      return {
        ...state,
        updateMerchentWebhook: {
          ...state.updateMerchentWebhook,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.UPDATE_MERCHENT_WEBHOOK_FAILURE:
      return {
        ...state,
        updateMerchentWebhook: {
          ...state.updateMerchentWebhook,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.UPDATE_MERCHENT_WEBHOOK_CLEAR:
      return {
        ...state,
        updateMerchentWebhook: {
          ...initialState.updateMerchentWebhook,
          data: {},
        },
      };

    case actionConstants.GET_ACTIVE_USERS_LIST_REQUEST:
      return {
        ...state,
        activeUsersList: {
          ...state.activeUsersList,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_ACTIVE_USERS_LIST_SUCCESS:
      return {
        ...state,
        activeUsersList: {
          ...state.activeUsersList,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
          activeUserCount: action.payload?.body?.active_user_count ?? 0,
        },
      };

    case actionConstants.GET_ACTIVE_USERS_LIST_FAILURE:
      return {
        ...state,
        activeUsersList: {
          ...state.activeUsersList,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_ACTIVE_USERS_LIST_CLEAR:
      return {
        ...state,
        activeUsersList: {
          ...activeUsers,
          data: {},
        },
      };

    case actionConstants.GET_ALL_ROLES_REQUEST:
      return {
        ...state,
        allRoles: {
          ...state.allRoles,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_ALL_ROLES_SUCCESS:
      return {
        ...state,
        allRoles: {
          ...state.allRoles,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_ALL_ROLES_FAILURE:
      return {
        ...state,
        allRoles: {
          ...state.allRoles,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_ALL_ROLES_CLEAR:
      return {
        ...state,
        allRoles: {
          ...allRoles,
        },
      };

    case actionConstants.GET_ALL_PERMISSIONS_LIST_REQUEST:
      return {
        ...state,
        allPermissions: {
          ...state.allPermissions,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_ALL_PERMISSIONS_LIST_SUCCESS:
      return {
        ...state,
        allPermissions: {
          ...state.allPermissions,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_ALL_PERMISSIONS_LIST_FAILURE:
      return {
        ...state,
        allPermissions: {
          ...state.allPermissions,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_ALL_PERMISSIONS_LIST_CLEAR:
      return {
        ...state,
        allPermissions: {
          ...allPermissions,
        },
      };

    case actionConstants.POST_CREATE_NEW_USER_REQUEST:
      return {
        ...state,
        createNewUserState: {
          ...state.createNewUserState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.POST_CREATE_NEW_USER_SUCCESS:
      return {
        ...state,
        createNewUserState: {
          ...state.createNewUserState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          assignedRoleId: action.payload.extra?.assignedRoleId ?? "",
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.POST_CREATE_NEW_USER_FAILURE:
      return {
        ...state,
        createNewUserState: {
          ...state.createNewUserState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.POST_CREATE_NEW_USER_CLEAR:
      return {
        ...state,
        createNewUserState: {
          ...createNewUserState,
        },
      };

    case actionConstants.POST_CREATE_NEW_ROLE_REQUEST:
      return {
        ...state,
        createNewRoleState: {
          ...state.createNewRoleState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          responseCode: 0,
        },
      };

    case actionConstants.POST_CREATE_NEW_ROLE_SUCCESS:
      return {
        ...state,
        createNewRoleState: {
          ...state.createNewRoleState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          responseCode: action.payload?.body?.RESPONSE_CODE ?? 0,
        },
      };

    case actionConstants.POST_CREATE_NEW_ROLE_FAILURE:
      return {
        ...state,
        createNewRoleState: {
          ...state.createNewRoleState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          responseCode: action.payload?.body?.RESPONSE_CODE ?? 0,
        },
      };

    case actionConstants.POST_CREATE_NEW_ROLE_CLEAR:
      return {
        ...state,
        createNewRoleState: {
          ...createNewRoleState,
        },
      };

    case actionConstants.POST_UPDATE_USER_DETAILS_REQUEST:
      return {
        ...state,
        updateUserState: {
          ...state.updateUserState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.POST_UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        updateUserState: {
          ...state.updateUserState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.POST_UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        updateUserState: {
          ...state.updateUserState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.POST_UPDATE_USER_DETAILS_CLEAR:
      return {
        ...state,
        updateUserState: {
          ...updateUserState,
        },
      };

    case actionConstants.DELETE_USER_REQUEST:
      return {
        ...state,
        deleteUserState: {
          ...state.deleteUserState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteUserState: {
          ...state.deleteUserState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.DELETE_USER_FAILURE:
      return {
        ...state,
        deleteUserState: {
          ...state.deleteUserState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.DELETE_USER_CLEAR:
      return {
        ...state,
        deleteUserState: {
          ...deleteUserState,
        },
      };

    case actionConstants.POST_RESEND_INVITATION_REQUEST:
      return {
        ...state,
        resendInvitationState: {
          ...state.resendInvitationState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.POST_RESEND_INVITATION_SUCCESS:
      return {
        ...state,
        resendInvitationState: {
          ...state.resendInvitationState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
        },
      };

    case actionConstants.POST_RESEND_INVITATION_FAILURE:
      return {
        ...state,
        resendInvitationState: {
          ...state.resendInvitationState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorMessage: action.payload?.body?.error_message,
        },
      };

    case actionConstants.POST_RESEND_INVITATION_CLEAR:
      return {
        ...state,
        resendInvitationState: {
          ...resendInvitationState,
        },
      };

    case actionConstants.GET_CHECKOUT_THEME_REQUEST:
      return {
        ...state,
        getCheckoutThemeState: {
          ...state.getCheckoutThemeState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_CHECKOUT_THEME_SUCCESS:
      return {
        ...state,
        getCheckoutThemeState: {
          ...state.getCheckoutThemeState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_CHECKOUT_THEME_FAILURE:
      return {
        ...state,
        getCheckoutThemeState: {
          ...state.getCheckoutThemeState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_CHECKOUT_THEME_CLEAR:
      return {
        ...state,
        getCheckoutThemeState: {
          ...getCheckoutThemeState,
        },
      };

    case actionConstants.POST_UPDATE_CHECKOUT_THEME_REQUEST:
      return {
        ...state,
        updateCheckoutThemeState: {
          ...state.updateCheckoutThemeState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.POST_UPDATE_CHECKOUT_THEME_SUCCESS:
      return {
        ...state,
        updateCheckoutThemeState: {
          ...state.updateCheckoutThemeState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.POST_UPDATE_CHECKOUT_THEME_FAILURE:
      return {
        ...state,
        updateCheckoutThemeState: {
          ...state.updateCheckoutThemeState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.POST_UPDATE_CHECKOUT_THEME_CLEAR:
      return {
        ...state,
        updateCheckoutThemeState,
      };

    default:
      return state;
  }
}
