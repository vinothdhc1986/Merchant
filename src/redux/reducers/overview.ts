import actionConstants from '../constants/';

const todayTransactionsState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const overviewState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const initialState = {
  todayTransactionsState: { ...todayTransactionsState },
  overviewState: { ...overviewState },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function overview(state = initialState, action) {
  switch (action.type) {
    case actionConstants.GET_TODAY_TRANSACTIONS_DATA_REQUEST:
      return {
        ...state,
        todayTransactionsState: {
          ...state.todayTransactionsState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
        },
      };

    case actionConstants.GET_TODAY_TRANSACTIONS_DATA_SUCCESS:
      return {
        ...state,
        todayTransactionsState: {
          ...state.todayTransactionsState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
        },
      };

    case actionConstants.GET_TODAY_TRANSACTIONS_DATA_FAILURE:
      return {
        ...state,
        todayTransactionsState: {
          ...state.todayTransactionsState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_TODAY_TRANSACTIONS_DATA_CLEAR:
      return {
        ...state,
        todayTransactionsState,
      };

    case actionConstants.GET_OVERVIEW_DATA_REQUEST:
      return {
        ...state,
        overviewState: {
          ...state.overviewState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
        },
      };

    case actionConstants.GET_OVERVIEW_DATA_SUCCESS:
      return {
        ...state,
        overviewState: {
          ...state.overviewState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
        },
      };

    case actionConstants.GET_OVERVIEW_DATA_FAILURE:
      return {
        ...state,
        overviewState: {
          ...state.overviewState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_OVERVIEW_DATA_CLEAR:
      return {
        ...state,
        overviewState,
      };

    default:
      return {
        ...state,
      };
  }
}
