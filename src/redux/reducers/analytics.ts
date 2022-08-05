import actionConstants from '../constants/';

const analyticsState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  opCode: 0,
  analyticsURL: '',
  MerchantName: '',
  MerchantId: '',
  message: '',
};

const initialState = {
  analyticsState: { ...analyticsState },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function analyticsReducer(state = initialState, action) {
  switch (action.type) {
    case actionConstants.POST_ANALYTICS_REQUEST:
      return {
        ...state,
        analyticsState: {
          ...state.analyticsState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          opCode: 0,
        },
      };

    case actionConstants.POST_ANALYTICS_SUCCESS:
      return {
        ...state,
        analyticsState: {
          ...state.analyticsState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          analyticsURL: action.payload.body.analytics_url,
          MerchantId: action.payload.body.merchant_id,
          MerchantName: action.payload.body.merchant_name,
        },
      };

    case actionConstants.POST_ANALYTICS_FAILURE:
      return {
        ...state,
        analyticsState: {
          ...state.analyticsState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          opCode: action.payload.body.error_code,
          message: action.payload.body.error_message,
          MerchantId: 0,
          analyticsURL: '',
          MerchantName: '',
        },
      };

    case actionConstants.POST_ANALYTICS_CLEAR:
      return {
        ...state,
        analyticsState: {
          isLoading: false,
          isSuccess: false,
          isFailure: false,
          opCode: 0,
          analyticsURL: '',
          MerchantName: '',
          MerchantId: '',
          message: '',
        },
      };

    default:
      return state;
  }
}
