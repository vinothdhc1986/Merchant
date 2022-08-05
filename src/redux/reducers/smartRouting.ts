import actionConstants from "../constants/";

const gatewayListState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  list: [],
  errorMessage: "",
};

const unmappedGatewayListState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  list: [],
  errorMessage: "",
};

const gatewayConfigurationsState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: [],
  errorMessage: "",
};

const saveGatewayState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  errorMessage: "",
};

const preferenceGatewayState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: [],
  errorMessage: "",
};

const saveCustomLogicState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  errorMessage: "",
};

const changeGatewayStatusState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  responseCode: 0,
  responseMessage: "",
};

const activePriorityLogicState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  logic: "",
  active: false,
  errorMessage: "",
};

const updatePreferenceScoreState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  responseCode: 0,
  responseMessage: "",
};

const priorityLogicListState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  list: [],
  errorMessage: "",
};

const binListState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  list: [],
  errorMessage: "",
};

const issuerListState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  list: [],
  errorMessage: "",
};

const cardBrandListState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  list: [],
  errorMessage: "",
};

const allCardBrandNameState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  list: [],
  errorMessage: "",
};

const allIssuerNameState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  list: [],
  errorMessage: "",
};

const createPreferenceScoreState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  responseCode: 0,
  responseMessage: "",
  extra: {},
};

const deletePreferenceScoreState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  responseCode: 0,
  responseMessage: "",
};

const simpleRoutingLogicState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  logic: "",
  active: false,
  responseCode: 0,
  responseMessage: "",
};

const deletePriorityLogicState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  responseCode: 0,
  responseMessage: "",
};

const initialState = {
  gatewayListState: { ...gatewayListState },
  unmappedGatewayListState: { ...unmappedGatewayListState },
  gatewayConfigurationsState: { ...gatewayConfigurationsState },
  saveGatewayState: { ...saveGatewayState },
  preferenceGatewayState: { ...preferenceGatewayState },
  saveCustomLogicState: { ...saveCustomLogicState },
  activePriorityLogicState: { ...activePriorityLogicState },
  updatePreferenceScoreState: { ...updatePreferenceScoreState },
  priorityLogicListState: { ...priorityLogicListState },
  binListState: { ...binListState },
  issuerListState: { ...issuerListState },
  cardBrandListState: { ...cardBrandListState },
  allCardBrandNameState: { ...allCardBrandNameState },
  allIssuerNameState: { ...allIssuerNameState },
  createPreferenceScoreState: { ...createPreferenceScoreState },
  deletePreferenceScoreState: { ...deletePreferenceScoreState },
  simpleRoutingLogicState: { ...simpleRoutingLogicState },
  changeGatewayStatusState: { ...changeGatewayStatusState },
  deletePriorityLogicState: { ...deletePriorityLogicState },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    // Get Mapped Gateway List
    case actionConstants.GET_GATEWAY_LIST_REQUEST:
      return {
        ...state,
        gatewayListState: {
          ...state.gatewayListState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_GATEWAY_LIST_SUCCESS:
      return {
        ...state,
        gatewayListState: {
          ...state.gatewayListState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          list: action.payload.body,
        },
      };

    case actionConstants.GET_GATEWAY_LIST_FAILURE:
      return {
        ...state,
        gatewayListState: {
          ...state.gatewayListState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_GATEWAY_LIST_CLEAR:
      return {
        ...state,
        gatewayListState,
      };

    // Get Unmapped Gateway List
    case actionConstants.GET_UNMAPPED_GATEWAY_LIST_REQUEST:
      return {
        ...state,
        unmappedGatewayListState: {
          ...state.unmappedGatewayListState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_UNMAPPED_GATEWAY_LIST_SUCCESS:
      return {
        ...state,
        unmappedGatewayListState: {
          ...state.unmappedGatewayListState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          list: action.payload.body,
        },
      };

    case actionConstants.GET_UNMAPPED_GATEWAY_LIST_FAILURE:
      return {
        ...state,
        unmappedGatewayListState: {
          ...state.unmappedGatewayListState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_UNMAPPED_GATEWAY_LIST_CLEAR:
      return {
        ...state,
        unmappedGatewayListState,
      };

    // Get Gateway Configurations
    case actionConstants.GET_GATEWAY_CONFIGURATIONS_REQUEST:
      return {
        ...state,
        gatewayConfigurationsState: {
          ...state.gatewayConfigurationsState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_GATEWAY_CONFIGURATIONS_SUCCESS:
      return {
        ...state,
        gatewayConfigurationsState: {
          ...state.gatewayConfigurationsState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
        },
      };

    case actionConstants.GET_GATEWAY_CONFIGURATIONS_FAILURE:
      return {
        ...state,
        gatewayConfigurationsState: {
          ...state.gatewayConfigurationsState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_GATEWAY_CONFIGURATIONS_CLEAR:
      return {
        ...state,
        gatewayConfigurationsState,
      };

    case actionConstants.SET_GATEWAY_CONFIGURATIONS_PARAMS:
      return {
        ...state,
        params: action.payload.params,
      };

    case actionConstants.POST_SAVE_GATEWAY_REQUEST:
      return {
        ...state,
        saveGatewayState: {
          ...state.saveGatewayState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.POST_SAVE_GATEWAY_SUCCESS:
      return {
        ...state,
        saveGatewayState: {
          ...state.saveGatewayState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
        },
      };

    case actionConstants.POST_SAVE_GATEWAY_FAILURE:
      return {
        ...state,
        saveGatewayState: {
          ...state.saveGatewayState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.error_code,
          errorMessage: action.payload.body.error_message,
        },
      };

    case actionConstants.POST_SAVE_GATEWAY_CLEAR:
      return {
        ...state,
        saveGatewayState: {
          ...saveGatewayState,
          // errorCode: action.payload.OpCode,
        },
      };

    // Get Preference Gateway
    case actionConstants.GET_PREFERENCE_GATEWAY_REQUEST:
      return {
        ...state,
        preferenceGatewayState: {
          ...state.preferenceGatewayState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_PREFERENCE_GATEWAY_SUCCESS:
      return {
        ...state,
        preferenceGatewayState: {
          ...state.preferenceGatewayState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
        },
      };

    case actionConstants.GET_PREFERENCE_GATEWAY_FAILURE:
      return {
        ...state,
        preferenceGatewayState: {
          ...state.preferenceGatewayState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_PREFERENCE_GATEWAY_CLEAR:
      return {
        ...state,
        preferenceGatewayState,
      };

    // Save Custom Logic
    case actionConstants.POST_SAVE_CUSTOM_LOGIC_REQUEST:
      return {
        ...state,
        saveCustomLogicState: {
          ...state.saveCustomLogicState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.POST_SAVE_CUSTOM_LOGIC_SUCCESS:
      return {
        ...state,
        saveCustomLogicState: {
          ...state.saveCustomLogicState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
        },
      };

    case actionConstants.POST_SAVE_CUSTOM_LOGIC_FAILURE:
      return {
        ...state,
        saveCustomLogicState: {
          ...state.saveCustomLogicState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.error_code,
          errorMessage: action.payload.body.error_message,
        },
      };

    case actionConstants.POST_SAVE_CUSTOM_LOGIC_CLEAR:
      return {
        ...state,
        saveCustomLogicState: {
          ...saveCustomLogicState,
          // errorCode: action.payload.OpCode,
        },
      };

    // Get Active Priority Logic
    case actionConstants.GET_ACTIVE_PRIORITY_LOGIC_REQUEST:
      return {
        ...state,
        activePriorityLogicState: {
          ...state.activePriorityLogicState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
        },
      };

    case actionConstants.GET_ACTIVE_PRIORITY_LOGIC_SUCCESS:
      return {
        ...state,
        activePriorityLogicState: {
          ...state.activePriorityLogicState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          responseCode: action.payload.body.error_code,
          responseMessage: action.payload.body.error_message,
          logic: action.payload.body.Logic,
          active: action.payload.body.IsActive,
        },
      };

    case actionConstants.GET_ACTIVE_PRIORITY_LOGIC_FAILURE:
      return {
        ...state,
        activePriorityLogicState: {
          ...state.activePriorityLogicState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          responseCode: action.payload.body.error_code,
          responseMessage: action.payload.body.error_message,
          logic: "",
          active: false,
        },
      };

    case actionConstants.GET_ACTIVE_PRIORITY_LOGIC_CLEAR:
      return {
        ...state,
        activePriorityLogicState,
      };

    // Update Preference Score
    case actionConstants.UPDATE_PREFERENCE_SCORE_REQUEST:
      return {
        ...state,
        updatePreferenceScoreState: {
          ...state.updatePreferenceScoreState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
        },
      };

    case actionConstants.UPDATE_PREFERENCE_SCORE_SUCCESS:
      return {
        ...state,
        updatePreferenceScoreState: {
          ...state.updatePreferenceScoreState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          responseCode: action.payload.body.response_code,
          responseMessage: action.payload.body.response_message,
        },
      };

    case actionConstants.UPDATE_PREFERENCE_SCORE_FAILURE:
      return {
        ...state,
        updatePreferenceScoreState: {
          ...state.updatePreferenceScoreState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          responseCode: action.payload.body.error_code,
          responseMessage: action.payload.body.error_message,
        },
      };

    case actionConstants.UPDATE_PREFERENCE_SCORE_CLEAR:
      return {
        ...state,
        updatePreferenceScoreState,
      };

    // Get Priority Logic List
    case actionConstants.GET_PRIORITY_LOGIC_LIST_REQUEST:
      return {
        ...state,
        priorityLogicListState: {
          ...state.priorityLogicListState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_PRIORITY_LOGIC_LIST_SUCCESS:
      return {
        ...state,
        priorityLogicListState: {
          ...state.priorityLogicListState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          list: action.payload.body,
        },
      };

    case actionConstants.GET_PRIORITY_LOGIC_LIST_FAILURE:
      return {
        ...state,
        priorityLogicListState: {
          ...state.priorityLogicListState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_PRIORITY_LOGIC_LIST_CLEAR:
      return {
        ...state,
        priorityLogicListState,
      };

    // Get Mapped Bin Preference Score List
    case actionConstants.GET_PREFERENCE_SCORE_BIN_LIST_REQUEST:
      return {
        ...state,
        binListState: {
          ...state.binListState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_PREFERENCE_SCORE_BIN_LIST_SUCCESS:
      return {
        ...state,
        binListState: {
          ...state.binListState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          list: action.payload.body,
        },
      };

    case actionConstants.GET_PREFERENCE_SCORE_BIN_LIST_FAILURE:
      return {
        ...state,
        binListState: {
          ...state.binListState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_PREFERENCE_SCORE_BIN_LIST_CLEAR:
      return {
        ...state,
        binListState,
      };

    // Get Mapped Issuer Preference Score List
    case actionConstants.GET_PREFERENCE_SCORE_ISSUER_LIST_REQUEST:
      return {
        ...state,
        issuerListState: {
          ...state.issuerListState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_PREFERENCE_SCORE_ISSUER_LIST_SUCCESS:
      return {
        ...state,
        issuerListState: {
          ...state.issuerListState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          list: action.payload.body,
        },
      };

    case actionConstants.GET_PREFERENCE_SCORE_ISSUER_LIST_FAILURE:
      return {
        ...state,
        issuerListState: {
          ...state.issuerListState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_PREFERENCE_SCORE_ISSUER_LIST_CLEAR:
      return {
        ...state,
        issuerListState,
      };

    // Get Mapped Card Brand Preference Score List
    case actionConstants.GET_PREFERENCE_SCORE_CARD_BRAND_LIST_REQUEST:
      return {
        ...state,
        cardBrandListState: {
          ...state.cardBrandListState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_PREFERENCE_SCORE_CARD_BRAND_LIST_SUCCESS:
      return {
        ...state,
        cardBrandListState: {
          ...state.cardBrandListState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          list: action.payload.body,
        },
      };

    case actionConstants.GET_PREFERENCE_SCORE_CARD_BRAND_LIST_FAILURE:
      return {
        ...state,
        cardBrandListState: {
          ...state.cardBrandListState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_PREFERENCE_SCORE_CARD_BRAND_LIST_CLEAR:
      return {
        ...state,
        cardBrandListState,
      };

    // Get All Card Brand Name List
    case actionConstants.GET_ALL_CARD_BRAND_NAMES_REQUEST:
      return {
        ...state,
        allCardBrandNameState: {
          ...state.allCardBrandNameState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_ALL_CARD_BRAND_NAMES_SUCCESS:
      return {
        ...state,
        allCardBrandNameState: {
          ...state.allCardBrandNameState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          list: action.payload.body,
        },
      };

    case actionConstants.GET_ALL_CARD_BRAND_NAMES_FAILURE:
      return {
        ...state,
        allCardBrandNameState: {
          ...state.allCardBrandNameState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_ALL_CARD_BRAND_NAMES_CLEAR:
      return {
        ...state,
        allCardBrandNameState,
      };

    // Get All Issuer Name List
    case actionConstants.GET_ALL_ISSUER_NAME_LIST_REQUEST:
      return {
        ...state,
        allIssuerNameState: {
          ...state.allIssuerNameState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_ALL_ISSUER_NAME_LIST_SUCCESS:
      return {
        ...state,
        allIssuerNameState: {
          ...state.allIssuerNameState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          list: action.payload.body,
        },
      };

    case actionConstants.GET_ALL_ISSUER_NAME_LIST_FAILURE:
      return {
        ...state,
        allIssuerNameState: {
          ...state.allIssuerNameState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_ALL_ISSUER_NAME_LIST_CLEAR:
      return {
        ...state,
        allIssuerNameState,
      };

    // Create Preference Score
    case actionConstants.POST_CREATE_PREFERENCE_SCORE_REQUEST:
      return {
        ...state,
        createPreferenceScoreState: {
          ...state.createPreferenceScoreState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
        },
      };

    case actionConstants.POST_CREATE_PREFERENCE_SCORE_SUCCESS:
      return {
        ...state,
        createPreferenceScoreState: {
          ...state.createPreferenceScoreState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          responseCode: action.payload.body.response_code,
          responseMessage: action.payload.body.response_message,
          extra: action.payload.extra,
        },
      };

    case actionConstants.POST_CREATE_PREFERENCE_SCORE_FAILURE:
      return {
        ...state,
        createPreferenceScoreState: {
          ...state.createPreferenceScoreState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          responseCode: action.payload.body.error_code,
          responseMessage: action.payload.body.error_message,
          extra: action.payload.extra,
        },
      };

    case actionConstants.POST_CREATE_PREFERENCE_SCORE_CLEAR:
      return {
        ...state,
        createPreferenceScoreState,
      };

    // Delete Preference Score
    case actionConstants.POST_DELETE_PREFERENCE_SCORE_REQUEST:
      return {
        ...state,
        deletePreferenceScoreState: {
          ...state.deletePreferenceScoreState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
        },
      };

    case actionConstants.POST_DELETE_PREFERENCE_SCORE_SUCCESS:
      return {
        ...state,
        deletePreferenceScoreState: {
          ...state.deletePreferenceScoreState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          responseCode: action.payload.body.error_code,
          responseMessage: action.payload.body.error_message,
        },
      };

    case actionConstants.POST_DELETE_PREFERENCE_SCORE_FAILURE:
      return {
        ...state,
        deletePreferenceScoreState: {
          ...state.deletePreferenceScoreState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          responseCode: action.payload.body.error_code,
          responseMessage: action.payload.body.error_message,
        },
      };

    case actionConstants.POST_DELETE_PREFERENCE_SCORE_CLEAR:
      return {
        ...state,
        deletePreferenceScoreState,
      };

    // View Simple Routing Logic
    case actionConstants.GET_VIEW_SIMPLE_ROUTING_LOGIC_REQUEST:
      return {
        ...state,
        simpleRoutingLogicState: {
          ...state.simpleRoutingLogicState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
        },
      };

    case actionConstants.GET_VIEW_SIMPLE_ROUTING_LOGIC_SUCCESS:
      return {
        ...state,
        simpleRoutingLogicState: {
          ...state.simpleRoutingLogicState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          responseCode: action.payload.body.error_code,
          responseMessage: action.payload.body.error_message,
          logic: action.payload.body.Logic,
          active: action.payload.body.IsActive,
        },
      };

    case actionConstants.GET_VIEW_SIMPLE_ROUTING_LOGIC_FAILURE:
      return {
        ...state,
        simpleRoutingLogicState: {
          ...state.simpleRoutingLogicState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          responseCode: action.payload.body.error_code,
          responseMessage: action.payload.body.error_message,
          logic: "",
          active: false,
        },
      };

    case actionConstants.GET_VIEW_SIMPLE_ROUTING_LOGIC_CLEAR:
      return {
        ...state,
        simpleRoutingLogicState,
      };

    // Change Gateway Status
    case actionConstants.POST_CHANGE_GATEWAY_STATUS_REQUEST:
      return {
        ...state,
        changeGatewayStatusState: {
          ...state.changeGatewayStatusState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.POST_CHANGE_GATEWAY_STATUS_SUCCESS:
      return {
        ...state,
        changeGatewayStatusState: {
          ...state.changeGatewayStatusState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          responseCode: action.payload.body.response_code,
          responseMessage: action.payload.body.response_message,
        },
      };

    case actionConstants.POST_CHANGE_GATEWAY_STATUS_FAILURE:
      return {
        ...state,
        changeGatewayStatusState: {
          ...state.changeGatewayStatusState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          responseCode: action.payload.body.error_code,
          responseMessage: action.payload.body.error_message,
        },
      };

    case actionConstants.POST_CHANGE_GATEWAY_STATUS_CLEAR:
      return {
        ...state,
        changeGatewayStatusState: {
          ...changeGatewayStatusState,
          // errorCode: action.payload.OpCode,
        },
      };

    // Delete Priority Logic
    case actionConstants.DELETE_PRIORITY_LOGIC_REQUEST:
      return {
        ...state,
        deletePriorityLogicState: {
          ...state.deletePriorityLogicState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
        },
      };

    case actionConstants.DELETE_PRIORITY_LOGIC_SUCCESS:
      return {
        ...state,
        deletePriorityLogicState: {
          ...state.deletePriorityLogicState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          responseCode: action.payload.body.response_code,
          responseMessage: action.payload.body.response_message,
        },
      };

    case actionConstants.DELETE_PRIORITY_LOGIC_FAILURE:
      return {
        ...state,
        deletePriorityLogicState: {
          ...state.deletePriorityLogicState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          responseCode: action.payload.body.error_code,
          responseMessage: action.payload.body.error_message,
        },
      };

    case actionConstants.DELETE_PRIORITY_LOGIC_CLEAR:
      return {
        ...state,
        deletePriorityLogicState,
      };

    default:
      return state;
  }
}
