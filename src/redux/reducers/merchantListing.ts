import actionConstants from '../constants/';

const getmerchantList = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const getMerchantSearch = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: [],
  errorMessage: '',
};

const initialState = {
  merchantList: { ...getmerchantList },
  merchantSearch: { ...getMerchantSearch },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function MerchantListingReducer(state = initialState, action) {
  switch (action.type) {
    case actionConstants.GET_MERCHANT_LIST_REQUEST:
      return {
        ...state,
        merchantList: {
          ...state.merchantList,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };
    case actionConstants.GET_MERCHANT_LIST_SUCCESS:
      return {
        ...state,
        merchantList: {
          ...state.merchantList,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_MERCHANT_LIST_FAILURE:
      return {
        ...state,
        merchantList: {
          ...state.merchantList,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_MERCHANT_LIST_CLEAR:
      return {
        ...state,
        merchantList: {
          ...initialState.merchantList,
          data: {},
        },
      };

    case actionConstants.MERCHANT_SEARCH_REQUEST:
      return {
        ...state,
        merchantSearch: {
          ...state.merchantSearch,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };
    case actionConstants.MERCHANT_SEARCH_SUCCESS:
      return {
        ...state,
        merchantSearch: {
          ...state.merchantSearch,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.MERCHANT_SEARCH_FAILURE:
      return {
        ...state,
        merchantSearch: {
          ...state.merchantSearch,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.MERCHANT_SEARCH_CLEAR:
      return {
        ...state,
        merchantSearch: {
          ...initialState.merchantSearch,
          data: [],
        },
      };
    default:
      return state;
  }
}
