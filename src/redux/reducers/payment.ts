import actionConstants from '../constants/';

const getPaymentList = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const getOrderTransactionDetails = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};
const getAllGatewaysList = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: [],
  errorMessage: '',
};
const getAllOrderStatusList = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: [],
  errorMessage: '',
};

const initialState = {
  paymentList: { ...getPaymentList },
  orderTransactionDetails: { ...getOrderTransactionDetails },
  getAllOrderStatusList: { ...getAllOrderStatusList },
  getAllGatewaysList: { ...getAllGatewaysList },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case actionConstants.GET_PAYMENT_LIST_REQUEST:
      return {
        ...state,
        paymentList: {
          ...state.paymentList,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_PAYMENT_LIST_SUCCESS:
      return {
        ...state,
        paymentList: {
          ...state.paymentList,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_PAYMENT_LIST_FAILURE:
      return {
        ...state,
        paymentList: {
          ...state.paymentList,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_PAYMENT_LIST_CLEAR:
      return {
        ...state,
        paymentList: {
          ...initialState.paymentList,
          data: {},
        },
      };

    case actionConstants.GET_ALL_GATEWAYS_LIST_REQUEST:
      return {
        ...state,
        getAllGatewaysList: {
          ...state.getAllGatewaysList,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_ALL_GATEWAYS_LIST_SUCCESS:
      return {
        ...state,
        getAllGatewaysList: {
          ...state.getAllGatewaysList,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_ALL_GATEWAYS_LIST_FAILURE:
      return {
        ...state,
        getAllGatewaysList: {
          ...state.getAllGatewaysList,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_ALL_GATEWAYS_LIST_CLEAR:
      return {
        ...state,
        getAllGatewaysList: {
          ...initialState.getAllGatewaysList,
          data: [],
        },
      };
    case actionConstants.GET_ALL_ORDER_STATUS_LIST_REQUEST:
      return {
        ...state,
        getAllOrderStatusList: {
          ...state.getAllOrderStatusList,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_ALL_ORDER_STATUS_LIST_SUCCESS:
      return {
        ...state,
        getAllOrderStatusList: {
          ...state.getAllOrderStatusList,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_ALL_ORDER_STATUS_LIST_FAILURE:
      return {
        ...state,
        getAllOrderStatusList: {
          ...state.getAllOrderStatusList,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_ALL_ORDER_STATUS_LIST_CLEAR:
      return {
        ...state,
        getAllOrderStatusList: {
          ...initialState.getAllOrderStatusList,
          data: [],
        },
      };

    case actionConstants.GET_PAYMENT_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        orderTransactionDetails: {
          ...state.orderTransactionDetails,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_PAYMENT_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderTransactionDetails: {
          ...state.orderTransactionDetails,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_PAYMENT_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        orderTransactionDetails: {
          ...state.orderTransactionDetails,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_PAYMENT_ORDER_DETAILS_CLEAR:
      return {
        ...state,
        orderTransactionDetails: {
          ...initialState.orderTransactionDetails,
          data: {},
        },
      };
    default:
      return state;
  }
}
