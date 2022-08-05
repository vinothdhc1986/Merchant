import actionConstants from '../constants/';

const customRoutingList = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const adminPriorityLogicState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: '',
  errorMessage: '',
};

const approveOrRejectLogicState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: '',
  errorMessage: '',
};

const updateAdminPriorityLogicState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: '',
  errorMessage: '',
};

const autoSuggestListState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: [],
  errorMessage: '',
};

const initialState = {
  customRoutingList: { ...customRoutingList },
  adminPriorityLogicState: { ...adminPriorityLogicState },
  approveOrRejectLogicState: { ...approveOrRejectLogicState },
  updateAdminPriorityLogicState: { ...updateAdminPriorityLogicState },
  autoSuggestListState: { ...autoSuggestListState },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function adminCustomRouting(state = initialState, action) {
  switch (action.type) {
    case actionConstants.GET_ADMIN_CUSTOM_ROUTING_LIST_REQUEST:
      return {
        ...state,
        customRoutingList: {
          ...state.customRoutingList,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
        },
      };

    case actionConstants.GET_ADMIN_CUSTOM_ROUTING_LIST_SUCCESS:
      return {
        ...state,
        customRoutingList: {
          ...state.customRoutingList,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
        },
      };

    case actionConstants.GET_ADMIN_CUSTOM_ROUTING_LIST_FAILURE:
      return {
        ...state,
        customRoutingList: {
          ...state.customRoutingList,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_ADMIN_CUSTOM_ROUTING_LIST_CLEAR:
      return {
        ...state,
        customRoutingList,
      };

    case actionConstants.GET_ADMIN_PRIORITY_LOGIC_REQUEST:
      return {
        ...state,
        adminPriorityLogicState: {
          ...state.adminPriorityLogicState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
        },
      };

    case actionConstants.GET_ADMIN_PRIORITY_LOGIC_SUCCESS:
      return {
        ...state,
        adminPriorityLogicState: {
          ...state.adminPriorityLogicState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
        },
      };

    case actionConstants.GET_ADMIN_PRIORITY_LOGIC_FAILURE:
      return {
        ...state,
        adminPriorityLogicState: {
          ...state.adminPriorityLogicState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_ADMIN_PRIORITY_LOGIC_CLEAR:
      return {
        ...state,
        adminPriorityLogicState,
      };

    case actionConstants.PUT_APPROVE_OR_REJECT_LOGIC_REQUEST:
      return {
        ...state,
        approveOrRejectLogicState: {
          ...state.approveOrRejectLogicState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
        },
      };

    case actionConstants.PUT_APPROVE_OR_REJECT_LOGIC_SUCCESS:
      return {
        ...state,
        approveOrRejectLogicState: {
          ...state.approveOrRejectLogicState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
        },
      };

    case actionConstants.PUT_APPROVE_OR_REJECT_LOGIC_FAILURE:
      return {
        ...state,
        approveOrRejectLogicState: {
          ...state.approveOrRejectLogicState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.PUT_APPROVE_OR_REJECT_LOGIC_CLEAR:
      return {
        ...state,
        approveOrRejectLogicState,
      };

    case actionConstants.UPDATE_ADMIN_PRIORITY_LOGIC_REQUEST:
      return {
        ...state,
        updateAdminPriorityLogicState: {
          ...state.updateAdminPriorityLogicState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
        },
      };

    case actionConstants.UPDATE_ADMIN_PRIORITY_LOGIC_SUCCESS:
      return {
        ...state,
        updateAdminPriorityLogicState: {
          ...state.updateAdminPriorityLogicState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
        },
      };

    case actionConstants.UPDATE_ADMIN_PRIORITY_LOGIC_FAILURE:
      return {
        ...state,
        updateAdminPriorityLogicState: {
          ...state.updateAdminPriorityLogicState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.UPDATE_ADMIN_PRIORITY_LOGIC_CLEAR:
      return {
        ...state,
        updateAdminPriorityLogicState,
      };

    case actionConstants.GET_ADMIN_CUSTOM_ROUTING_AUTO_SUGGEST_LIST_REQUEST:
      return {
        ...state,
        autoSuggestListState: {
          ...state.autoSuggestListState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
        },
      };

    case actionConstants.GET_ADMIN_CUSTOM_ROUTING_AUTO_SUGGEST_LIST_SUCCESS:
      return {
        ...state,
        autoSuggestListState: {
          ...state.autoSuggestListState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
        },
      };

    case actionConstants.GET_ADMIN_CUSTOM_ROUTING_AUTO_SUGGEST_LIST_FAILURE:
      return {
        ...state,
        autoSuggestListState: {
          ...state.autoSuggestListState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_ADMIN_CUSTOM_ROUTING_AUTO_SUGGEST_LIST_CLEAR:
      return {
        ...state,
        autoSuggestListState,
      };

    default:
      return {
        ...state,
      };
  }
}
