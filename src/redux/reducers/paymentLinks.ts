import actionConstants from '../constants/';

const getPaymentLinksList = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const createPaymentLinkState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  responseCode: 0,
  responseMessage: '',
};

const bulkUploadHistoryState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: [],
  errorMessage: '',
};

const statusCodeMappingState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: [],
  errorMessage: '',
};

const initialState = {
  paymentLinksList: { ...getPaymentLinksList },
  createPaymentLinkState: { ...createPaymentLinkState },
  bulkUploadHistoryState: { ...bulkUploadHistoryState },
  statusCodeMappingState: { ...statusCodeMappingState },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function paymentLinksReducer(state = initialState, action) {
  switch (action.type) {
    case actionConstants.GET_PAYMENT_LINKS_LIST_REQUEST:
      return {
        ...state,
        paymentLinksList: {
          ...state.paymentLinksList,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };
    case actionConstants.GET_PAYMENT_LINKS_LIST_SUCCESS:
      return {
        ...state,
        paymentLinksList: {
          ...state.paymentLinksList,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_PAYMENT_LINKS_LIST_FAILURE:
      return {
        ...state,
        paymentLinksList: {
          ...state.paymentLinksList,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_PAYMENT_LINKS_LIST_CLEAR:
      return {
        ...state,
        paymentLinksList: {
          ...initialState.paymentLinksList,
          data: {},
        },
      };

    // Create Payment Link
    case actionConstants.POST_CREATE_PAYMENT_LINK_REQUEST:
      return {
        ...state,
        createPaymentLinkState: {
          ...state.createPaymentLinkState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          responseCode: 0,
          responseMessage: '',
        },
      };
    case actionConstants.POST_CREATE_PAYMENT_LINK_SUCCESS:
      return {
        ...state,
        createPaymentLinkState: {
          ...state.createPaymentLinkState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          responseCode: action.payload?.body?.response_code ?? 0,
          responseMessage: action.payload?.body?.response_message ?? '',
        },
      };

    case actionConstants.POST_CREATE_PAYMENT_LINK_FAILURE:
      return {
        ...state,
        createPaymentLinkState: {
          ...state.createPaymentLinkState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          responseCode: action.payload?.body?.error_code ?? 0,
          responseMessage: action.payload?.body?.error_message ?? '',
        },
      };

    case actionConstants.POST_CREATE_PAYMENT_LINK_CLEAR:
      return {
        ...state,
        createPaymentLinkState: {
          ...initialState.createPaymentLinkState,
          data: {},
        },
      };

    case actionConstants.GET_PAYMENT_LINK_BULK_UPLOAD_HISTORY_REQUEST:
      return {
        ...state,
        bulkUploadHistoryState: {
          ...state.bulkUploadHistoryState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_PAYMENT_LINK_BULK_UPLOAD_HISTORY_SUCCESS:
      return {
        ...state,
        bulkUploadHistoryState: {
          ...state.bulkUploadHistoryState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_PAYMENT_LINK_BULK_UPLOAD_HISTORY_FAILURE:
      return {
        ...state,
        bulkUploadHistoryState: {
          ...state.bulkUploadHistoryState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_PAYMENT_LINK_BULK_UPLOAD_HISTORY_CLEAR:
      return {
        ...state,
        bulkUploadHistoryState: {
          ...initialState.bulkUploadHistoryState,
          data: [],
        },
      };

    case actionConstants.GET_PAYMENT_LINK_STATUS_CODE_REQUEST:
      return {
        ...state,
        statusCodeMappingState: {
          ...state.statusCodeMappingState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_PAYMENT_LINK_STATUS_CODE_SUCCESS:
      return {
        ...state,
        statusCodeMappingState: {
          ...state.statusCodeMappingState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
        },
      };

    case actionConstants.GET_PAYMENT_LINK_STATUS_CODE_FAILURE:
      return {
        ...state,
        statusCodeMappingState: {
          ...state.statusCodeMappingState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
        },
      };

    case actionConstants.GET_PAYMENT_LINK_STATUS_CODE_CLEAR:
      return {
        ...state,
        statusCodeMappingState: {
          ...initialState.statusCodeMappingState,
          data: [],
        },
      };
    default:
      return state;
  }
}
