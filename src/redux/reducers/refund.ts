import actionConstants from '../constants/';

const getRefundList = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: {},
  errorMessage: '',
};

const createRefund = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  errorMessage: '',
};

const refundBulkUploadHistoryState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: [],
  errorMessage: '',
};

const getAllRefundStatusList = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  data: [],
  errorMessage: '',
};

const initialState = {
  refundList: { ...getRefundList },
  createRefund: { ...createRefund },
  refundBulkUploadHistoryState: { ...refundBulkUploadHistoryState },
  getAllRefundStatusList: { ...getAllRefundStatusList }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function refundReducer(state = initialState, action) {
  switch (action.type) {
    case actionConstants.GET_REFUND_LIST_REQUEST:
      return {
        ...state,
        refundList: {
          ...state.refundList,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_REFUND_LIST_SUCCESS:
      return {
        ...state,
        refundList: {
          ...state.refundList,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_REFUND_LIST_FAILURE:
      return {
        ...state,
        refundList: {
          ...state.refundList,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_REFUND_LIST_CLEAR:
      return {
        ...state,
        refundList: {
          ...initialState.refundList,
          data: {},
        },
      };
    case actionConstants.POST_CREATE_REFUND_REQUEST:
      return {
        ...state,
        createRefund: {
          ...state.createRefund,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_REFUND_BULK_UPLOAD_HISTORY_LIST_REQUEST:
      return {
        ...state,
        refundBulkUploadHistoryState: {
          ...state.refundBulkUploadHistoryState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_REFUND_BULK_UPLOAD_HISTORY_LIST_SUCCESS:
      return {
        ...state,
        refundBulkUploadHistoryState: {
          ...state.refundBulkUploadHistoryState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_REFUND_BULK_UPLOAD_HISTORY_LIST_FAILURE:
      return {
        ...state,
        refundBulkUploadHistoryState: {
          ...state.refundBulkUploadHistoryState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_REFUND_BULK_UPLOAD_HISTORY_LIST_CLEAR:
      return {
        ...state,
        refundBulkUploadHistoryState: {
          ...initialState.refundBulkUploadHistoryState,
          data: [],
        },
      };

    case actionConstants.POST_CREATE_REFUND_SUCCESS:
      return {
        ...state,
        createRefund: {
          ...state.createRefund,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
        },
      };

    case actionConstants.POST_CREATE_REFUND_FAILURE:
      return {
        ...state,
        createRefund: {
          ...state.createRefund,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.error_code,
          errorMessage: action.payload.body.error_message,
        },
      };

    case actionConstants.POST_CREATE_REFUND_CLEAR:
      return {
        ...state,
        createRefund: {
          ...createRefund,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_ALL_REFUND_STATUS_LIST_REQUEST:
      return {
        ...state,
        getAllRefundStatusList: {
          ...state.getAllRefundStatusList,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
        },
      };

    case actionConstants.GET_ALL_REFUND_STATUS_LIST_SUCCESS:
      return {
        ...state,
        getAllRefundStatusList: {
          ...state.getAllRefundStatusList,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_ALL_REFUND_STATUS_LIST_FAILURE:
      return {
        ...state,
        getAllRefundStatusList: {
          ...state.getAllRefundStatusList,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          // errorCode: action.payload.OpCode,
        },
      };

    case actionConstants.GET_ALL_REFUND_STATUS_LIST_CLEAR:
      return {
        ...state,
        getAllRefundStatusList: {
          ...initialState.getAllRefundStatusList,
          data: [],
        },
      };
 

    default:
      return state;
  }
}
