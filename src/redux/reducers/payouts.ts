import actionConstants from '../constants/';
import { PAYOUT_LISTING_NO_RECORD_ERROR_CODE } from '../../lib/constants';

const defaultState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  errorCode: 0,
  errorMessage: '',
};

const addNewBeneficiaryState = {
  ...defaultState,
};

const beneficiaryListState = {
  ...defaultState,
};

const approveBeneficiaryState = {
  ...defaultState,
};

const rejectBeneficiaryState = {
  ...defaultState,
};

const getBeneficiaryByCodeState = {
  ...defaultState,
};

const addIndividualPayoutState = {
  ...defaultState,
};

const individualPayoutListState = {
  ...defaultState,
};

const approveIndividualPayoutState = {
  ...defaultState,
};

const rejectIndividualPayoutState = {
  ...defaultState,
};

const cancelApproveIndividualPayoutState = {
  ...defaultState,
};

const deactivateBeneficiaryState = {
  ...defaultState,
};

const updatePayoutModuleStatusState = {
  ...defaultState,
};

const bulkPayoutListState = {
  ...defaultState,
};

const getTransactionFailState = {
  ...defaultState,
  data: '',
};

const overviewData = {
  pendingIndividualPayoutCount: 0,
  pendingSchduledPayoutCount: 0,
  pendingVerificationCount: 0,
  todayCashflow: {
    addedAmount: 0,
    debitedAmount: 0,
    balanceAmount: 0,
  },
  statusSummary: {},
  transactionSummary: [],
  isError: false,
};

const payoutAccountBalanceState = {
  balance: 0,
  virtualAccountNumber: '',
  ifscCode: '',
  isLoading: false,
  isFailure: false,
  errorMessage: '',
};

const remitterAccountsListState = {
  ...defaultState,
};

const addRemitterAccountState = {
  ...defaultState,
};

const updateRemitterAccountState = {
  ...defaultState,
};

const bankListState = {
  ...defaultState,
  data: [],
};

const merchantKycEntityTypesListState = {
  ...defaultState,
  data: [],
};

const getMerchantKycDetailsState = {
  ...defaultState,
  data: [],
};

const updateMerchantKycDetailsState = {
  ...defaultState,
  data: [],
};

const initialState = {
  addNewBeneficiaryState: { ...addNewBeneficiaryState },
  beneficiaryListState: { ...beneficiaryListState },
  approveBeneficiaryState: { ...approveBeneficiaryState },
  rejectBeneficiaryState: { ...rejectBeneficiaryState },
  getBeneficiaryByCodeState: { ...getBeneficiaryByCodeState },
  addIndividualPayoutState: { ...addIndividualPayoutState },
  individualPayoutListState: { ...individualPayoutListState },
  approveIndividualPayoutState: { ...approveIndividualPayoutState },
  rejectIndividualPayoutState: { ...rejectIndividualPayoutState },
  deactivateBeneficiaryState: { ...deactivateBeneficiaryState },
  bulkPayoutListState: { ...bulkPayoutListState },
  updatePayoutModuleStatusState: { ...updatePayoutModuleStatusState },
  cancelApproveIndividualPayoutState: { ...cancelApproveIndividualPayoutState },
  overviewData: { ...overviewData },
  payoutAccountBalanceState: { ...payoutAccountBalanceState },
  remitterAccountsListState: { ...remitterAccountsListState },
  addRemitterAccountState: { ...addRemitterAccountState },
  updateRemitterAccountState: { ...updateRemitterAccountState },
  bankListState: { ...bankListState },
  merchantKycEntityTypesListState: { ...merchantKycEntityTypesListState },
  getMerchantKycDetailsState: { ...getMerchantKycDetailsState },
  updateMerchantKycDetailsState: { ...updateMerchantKycDetailsState },
  getTransactionFailState: { ...getTransactionFailState },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function payoutsReducer(state = initialState, action) {
  switch (action.type) {
    case actionConstants.POST_ADD_NEW_BENEFICIARY_REQUEST:
      return {
        ...state,
        addNewBeneficiaryState: {
          ...state.addNewBeneficiaryState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
        },
      };

    case actionConstants.POST_ADD_NEW_BENEFICIARY_SUCCESS:
      return {
        ...state,
        addNewBeneficiaryState: {
          ...state.addNewBeneficiaryState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          body: action.payload.body,
        },
      };

    case actionConstants.POST_ADD_NEW_BENEFICIARY_FAILURE:
      return {
        ...state,
        addNewBeneficiaryState: {
          ...state.addNewBeneficiaryState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
        },
      };

    case actionConstants.POST_ADD_NEW_BENEFICIARY_CLEAR:
      return {
        ...state,
        addNewBeneficiaryState,
      };

    case actionConstants.GET_BENEFICIARY_LIST_REQUEST:
      return {
        ...state,
        beneficiaryListState: {
          ...state.beneficiaryListState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
        },
      };

    case actionConstants.GET_BENEFICIARY_LIST_SUCCESS:
      return {
        ...state,
        beneficiaryListState: {
          ...state.beneficiaryListState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body,
          successMessage: action.payload.body.successMessage,
        },
      };

    case actionConstants.GET_BENEFICIARY_LIST_FAILURE:
      return {
        ...state,
        beneficiaryListState: {
          ...state.beneficiaryListState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
          data: [],
        },
      };

    case actionConstants.GET_BENEFICIARY_LIST_CLEAR:
      return {
        ...state,
        beneficiaryListState,
      };

    case actionConstants.POST_APPROVE_BENEFICIARY_REQUEST:
      return {
        ...state,
        approveBeneficiaryState: {
          ...state.approveBeneficiaryState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
        },
      };

    case actionConstants.POST_APPROVE_BENEFICIARY_SUCCESS:
      return {
        ...state,
        approveBeneficiaryState: {
          ...state.approveBeneficiaryState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body.data,
          successMessage: action.payload.body.successMessage,
        },
      };

    case actionConstants.POST_APPROVE_BENEFICIARY_FAILURE:
      return {
        ...state,
        approveBeneficiaryState: {
          ...state.approveBeneficiaryState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
        },
      };

    case actionConstants.POST_APPROVE_BENEFICIARY_CLEAR:
      return {
        ...state,
        approveBeneficiaryState,
      };

    case actionConstants.POST_REJECT_BENEFICIARY_REQUEST:
      return {
        ...state,
        rejectBeneficiaryState: {
          ...state.rejectBeneficiaryState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
        },
      };

    case actionConstants.POST_REJECT_BENEFICIARY_SUCCESS:
      return {
        ...state,
        rejectBeneficiaryState: {
          ...state.rejectBeneficiaryState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body.data,
          successMessage: action.payload.body.successMessage,
        },
      };

    case actionConstants.POST_REJECT_BENEFICIARY_FAILURE:
      return {
        ...state,
        rejectBeneficiaryState: {
          ...state.rejectBeneficiaryState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
        },
      };

    case actionConstants.POST_REJECT_BENEFICIARY_CLEAR:
      return {
        ...state,
        rejectBeneficiaryState,
      };

    case actionConstants.GET_BENEFICIARY_BY_BENEFICIARY_CODE_REQUEST:
      return {
        ...state,
        getBeneficiaryByCodeState: {
          ...state.getBeneficiaryByCodeState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
          data: '',
          successMessage: '',
        },
      };

    case actionConstants.GET_BENEFICIARY_BY_BENEFICIARY_CODE_SUCCESS:
      return {
        ...state,
        getBeneficiaryByCodeState: {
          ...state.getBeneficiaryByCodeState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body.data,
          successMessage: action.payload.body.successMessage,
        },
      };

    case actionConstants.GET_BENEFICIARY_BY_BENEFICIARY_CODE_FAILURE:
      return {
        ...state,
        getBeneficiaryByCodeState: {
          ...state.getBeneficiaryByCodeState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
        },
      };

    case actionConstants.GET_BENEFICIARY_BY_BENEFICIARY_CODE_CLEAR:
      return {
        ...state,
        getBeneficiaryByCodeState,
      };

    case actionConstants.POST_ADD_INDIVIDUAL_PAYOUT_REQUEST:
      return {
        ...state,
        addIndividualPayoutState: {
          ...state.addIndividualPayoutState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
        },
      };

    case actionConstants.POST_ADD_INDIVIDUAL_PAYOUT_SUCCESS:
      return {
        ...state,
        addIndividualPayoutState: {
          ...state.addIndividualPayoutState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body.data,
          successMessage: action.payload.body.successMessage,
        },
      };

    case actionConstants.POST_ADD_INDIVIDUAL_PAYOUT_FAILURE:
      return {
        ...state,
        addIndividualPayoutState: {
          ...state.addIndividualPayoutState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
        },
      };

    case actionConstants.POST_ADD_INDIVIDUAL_PAYOUT_CLEAR:
      return {
        ...state,
        addIndividualPayoutState,
      };

    case actionConstants.GET_INDIVIDUAL_PAYOUTS_LIST_REQUEST:
      return {
        ...state,
        individualPayoutListState: {
          ...state.individualPayoutListState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
        },
      };

    case actionConstants.GET_INDIVIDUAL_PAYOUTS_LIST_SUCCESS:
      return {
        ...state,
        individualPayoutListState: {
          ...state.individualPayoutListState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          body: action.payload.body,
          successMessage: action.payload.body.successMessage,
        },
      };

    case actionConstants.GET_INDIVIDUAL_PAYOUTS_LIST_FAILURE:
      return {
        ...state,
        individualPayoutListState: {
          ...state.individualPayoutListState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
          // No matching record found
          ...(action?.payload?.body?.errorCode ===
            PAYOUT_LISTING_NO_RECORD_ERROR_CODE && { body: {} }),
        },
      };

    case actionConstants.GET_INDIVIDUAL_PAYOUTS_LIST_CLEAR:
      return {
        ...state,
        individualPayoutListState,
      };

    case actionConstants.POST_APPROVE_INDIVIDUAL_PAYOUT_REQUEST:
      return {
        ...state,
        approveIndividualPayoutState: {
          ...state.approveIndividualPayoutState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
        },
      };

    case actionConstants.POST_APPROVE_INDIVIDUAL_PAYOUT_SUCCESS:
      return {
        ...state,
        approveIndividualPayoutState: {
          ...state.approveIndividualPayoutState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body.data,
          successMessage: action.payload.body.successMessage,
        },
      };

    case actionConstants.POST_APPROVE_INDIVIDUAL_PAYOUT_FAILURE:
      return {
        ...state,
        approveIndividualPayoutState: {
          ...state.approveIndividualPayoutState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
        },
      };

    case actionConstants.POST_APPROVE_INDIVIDUAL_PAYOUT_CLEAR:
      return {
        ...state,
        approveIndividualPayoutState,
      };

    case actionConstants.POST_REJECT_INDIVIDUAL_PAYOUT_REQUEST:
      return {
        ...state,
        rejectIndividualPayoutState: {
          ...state.rejectIndividualPayoutState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
        },
      };

    case actionConstants.POST_REJECT_INDIVIDUAL_PAYOUT_SUCCESS:
      return {
        ...state,
        rejectIndividualPayoutState: {
          ...state.rejectIndividualPayoutState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body.data,
          successMessage: action.payload.body.successMessage,
        },
      };

    case actionConstants.POST_REJECT_INDIVIDUAL_PAYOUT_FAILURE:
      return {
        ...state,
        rejectIndividualPayoutState: {
          ...state.rejectIndividualPayoutState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
        },
      };

    case actionConstants.POST_REJECT_INDIVIDUAL_PAYOUT_CLEAR:
      return {
        ...state,
        rejectIndividualPayoutState,
      };

    case actionConstants.POST_CANCEL_APPROVED_INDIVIDUAL_PAYOUT_REQUEST:
      return {
        ...state,
        cancelApproveIndividualPayoutState: {
          ...state.cancelApproveIndividualPayoutState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
        },
      };

    case actionConstants.POST_CANCEL_APPROVED_INDIVIDUAL_PAYOUT_SUCCESS:
      return {
        ...state,
        cancelApproveIndividualPayoutState: {
          ...state.cancelApproveIndividualPayoutState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body.data,
          successMessage: action.payload.body.successMessage,
        },
      };

    case actionConstants.POST_CANCEL_APPROVED_INDIVIDUAL_PAYOUT_FAILURE:
      return {
        ...state,
        cancelApproveIndividualPayoutState: {
          ...state.cancelApproveIndividualPayoutState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
        },
      };

    case actionConstants.POST_CANCEL_APPROVED_INDIVIDUAL_PAYOUT_CLEAR:
      return {
        ...state,
        cancelApproveIndividualPayoutState,
      };

    case actionConstants.PUT_DEACTIVATE_BENEFICIARY_REQUEST:
      return {
        ...state,
        deactivateBeneficiaryState: {
          ...state.deactivateBeneficiaryState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
        },
      };

    case actionConstants.PUT_DEACTIVATE_BENEFICIARY_SUCCESS:
      return {
        ...state,
        deactivateBeneficiaryState: {
          ...state.deactivateBeneficiaryState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body.data,
          successMessage: action.payload.body.successMessage,
        },
      };

    case actionConstants.PUT_DEACTIVATE_BENEFICIARY_FAILURE:
      return {
        ...state,
        deactivateBeneficiaryState: {
          ...state.deactivateBeneficiaryState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
        },
      };

    case actionConstants.PUT_DEACTIVATE_BENEFICIARY_CLEAR:
      return {
        ...state,
        deactivateBeneficiaryState,
      };

    case actionConstants.GET_BULK_PAYOUT_LIST_REQUEST:
      return {
        ...state,
        bulkPayoutListState: {
          ...state.bulkPayoutListState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
        },
      };

    case actionConstants.GET_BULK_PAYOUT_LIST_SUCCESS:
      return {
        ...state,
        bulkPayoutListState: {
          ...state.bulkPayoutListState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          body: action.payload.body,
          successMessage: action.payload.body.successMessage,
        },
      };

    case actionConstants.GET_BULK_PAYOUT_LIST_FAILURE:
      return {
        ...state,
        bulkPayoutListState: {
          ...state.bulkPayoutListState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
          // No matching record found
          ...(action?.payload?.body?.errorCode ===
            PAYOUT_LISTING_NO_RECORD_ERROR_CODE && { body: {} }),
        },
      };

    case actionConstants.GET_BULK_PAYOUT_LIST_CLEAR:
      return {
        ...state,
        bulkPayoutListState,
      };

    case actionConstants.PUT_UPDATE_PAYOUT_MODULE_STATUS_REQUEST:
      return {
        ...state,
        updatePayoutModuleStatusState: {
          ...updatePayoutModuleStatusState,
          isLoading: true,
        },
      };

    case actionConstants.PUT_UPDATE_PAYOUT_MODULE_STATUS_SUCCESS:
      return {
        ...state,
        updatePayoutModuleStatusState: {
          ...updatePayoutModuleStatusState,
          isSuccess: true,
        },
      };

    case actionConstants.PUT_UPDATE_PAYOUT_MODULE_STATUS_FAILURE:
      return {
        ...state,
        updatePayoutModuleStatusState: {
          ...updatePayoutModuleStatusState,
          isFailure: true,
        },
      };
    case actionConstants.PUT_UPDATE_PAYOUT_MODULE_STATUS_CLEAR:
      return {
        ...state,
        updatePayoutModuleStatusState: {
          ...updatePayoutModuleStatusState,
        },
      };

    case actionConstants.GET_PAYOUT_OVERVIEW_PENDING_SUMMARY_REQUEST:
      return {
        ...state,
        overviewData: {
          ...state.overviewData,
          isError: false,
        },
      };

    case actionConstants.GET_PAYOUT_OVERVIEW_PENDING_SUMMARY_SUCCESS:
      return {
        ...state,
        overviewData: {
          ...state.overviewData,
          pendingIndividualPayoutCount:
            action?.payload?.body?.data?.pendingPayNowPayoutCount ??
            state.overviewData.pendingIndividualPayoutCount,
          pendingSchduledPayoutCount:
            action?.payload?.body?.data?.pendingPayLaterPayoutCount ??
            state.overviewData.pendingSchduledPayoutCount,
          pendingVerificationCount:
            action?.payload?.body?.data?.pendingVerificationCount ??
            state.overviewData.pendingVerificationCount,
          todayCashflow: {
            addedAmount:
              action?.payload?.body?.data?.todayCashflow?.addedAmount ??
              state.overviewData.todayCashflow.addedAmount,
            debitedAmount:
              action?.payload?.body?.data?.todayCashflow?.debitedAmount ??
              state.overviewData.todayCashflow.debitedAmount,
            balanceAmount:
              action?.payload?.body?.data?.todayCashflow?.balanceAmount ??
              state.overviewData.todayCashflow.balanceAmount,
          },
        },
      };

    case actionConstants.GET_PAYOUT_OVERVIEW_PENDING_SUMMARY_FAILURE:
      return {
        ...state,
        overviewData: {
          ...state.overviewData,
          isError: true,
        },
      };

    case actionConstants.GET_PAYOUT_OVERVIEW_STATUS_SUMMARY_REQUEST:
      return {
        ...state,
        overviewData: {
          ...state.overviewData,
          isError: false,
        },
      };

    case actionConstants.GET_PAYOUT_OVERVIEW_STATUS_SUMMARY_SUCCESS:
      return {
        ...state,
        overviewData: {
          ...state.overviewData,
          statusSummary: action.payload?.body?.data ?? {},
        },
      };

    case actionConstants.GET_PAYOUT_OVERVIEW_STATUS_SUMMARY_FAILURE:
      return {
        ...state,
        overviewData: {
          ...state.overviewData,
          isError: true,
        },
      };

    case actionConstants.GET_PAYOUT_OVERVIEW_TRANSACTION_SUMMARY_REQUEST:
      return {
        ...state,
        overviewData: {
          ...state.overviewData,
          isError: false,
        },
      };

    case actionConstants.GET_PAYOUT_OVERVIEW_TRANSACTION_SUMMARY_SUCCESS:
      return {
        ...state,
        overviewData: {
          ...state.overviewData,
          transactionSummary: Array.isArray(
            action.payload?.body?.data?.barSummaryList
          )
            ? action.payload.body.data.barSummaryList
            : state.overviewData.transactionSummary,
        },
      };

    case actionConstants.GET_PAYOUT_OVERVIEW_TRANSACTION_SUMMARY_FAILURE:
      return {
        ...state,
        overviewData: {
          ...state.overviewData,
          isError: true,
        },
      };

    case actionConstants.CLEAR_PAYOUT_OVERVIEW_ERROR_STATE:
      return {
        ...state,
        overviewData: {
          ...state.overviewData,
          isError: false,
        },
      };

    case actionConstants.GET_PAYOUT_ACCOUNT_BALANCE_REQUEST:
      return {
        ...state,
        payoutAccountBalanceState: {
          ...state.payoutAccountBalanceState,
          isLoading: true,
          isFailure: false,
          errorMessage: '',
        },
      };

    case actionConstants.GET_PAYOUT_ACCOUNT_BALANCE_SUCCESS:
      return {
        ...state,
        payoutAccountBalanceState: {
          ...payoutAccountBalanceState,
          balance:
            action.payload?.body?.data?.balance ??
            state.payoutAccountBalanceState.balance,
          virtualAccountNumber:
            action.payload?.body?.data?.virtualAccount ??
            state.payoutAccountBalanceState.virtualAccountNumber,
          ifscCode:
            action.payload?.body?.data?.ifscCode ??
            state.payoutAccountBalanceState.ifscCode,
          isLoading: false,
        },
      };

    case actionConstants.GET_PAYOUT_ACCOUNT_BALANCE_FAILURE:
      return {
        ...state,
        payoutAccountBalanceState: {
          ...state.payoutAccountBalanceState,
          isLoading: false,
          isFailure: true,
          errorMessage: action.payload?.body?.errorMessage ?? '',
        },
      };

    case actionConstants.GET_PAYOUT_ACCOUNT_BALANCE_CLEAR:
      return {
        ...state,
        payoutAccountBalanceState: {
          ...payoutAccountBalanceState,
        },
      };

    case actionConstants.GET_PAYOUT_REMITTER_ACCOUNTS_LIST_REQUEST:
      return {
        ...state,
        remitterAccountsListState: {
          ...state.remitterAccountsListState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
        },
      };

    case actionConstants.GET_PAYOUT_REMITTER_ACCOUNTS_LIST_SUCCESS:
      return {
        ...state,
        remitterAccountsListState: {
          ...state.remitterAccountsListState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          body: action.payload.body,
          successMessage: action.payload.body.successMessage,
        },
      };

    case actionConstants.GET_PAYOUT_REMITTER_ACCOUNTS_LIST_FAILURE:
      return {
        ...state,
        remitterAccountsListState: {
          ...state.remitterAccountsListState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
          // No matching record found
          ...(action?.payload?.body?.errorCode ===
            PAYOUT_LISTING_NO_RECORD_ERROR_CODE && { body: {} }),
        },
      };

    case actionConstants.GET_PAYOUT_REMITTER_ACCOUNTS_LIST_CLEAR:
      return {
        ...state,
        remitterAccountsListState,
      };

    case actionConstants.POST_ADD_PAYOUT_REMITTER_ACCOUNT_REQUEST:
      return {
        ...state,
        addRemitterAccountState: {
          ...state.addRemitterAccountState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
        },
      };

    case actionConstants.POST_ADD_PAYOUT_REMITTER_ACCOUNT_SUCCESS:
      return {
        ...state,
        addRemitterAccountState: {
          ...state.addRemitterAccountState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          body: action.payload.body,
          successMessage: action.payload.body.successMessage,
        },
      };

    case actionConstants.POST_ADD_PAYOUT_REMITTER_ACCOUNT_FAILURE:
      return {
        ...state,
        addRemitterAccountState: {
          ...state.addRemitterAccountState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
        },
      };

    case actionConstants.POST_ADD_PAYOUT_REMITTER_ACCOUNT_CLEAR:
      return {
        ...state,
        addRemitterAccountState,
      };

    case actionConstants.POST_UPDATE_PAYOUT_REMITTER_ACCOUNT_REQUEST:
      return {
        ...state,
        updateRemitterAccountState: {
          ...state.updateRemitterAccountState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
        },
      };

    case actionConstants.POST_UPDATE_PAYOUT_REMITTER_ACCOUNT_SUCCESS:
      return {
        ...state,
        updateRemitterAccountState: {
          ...state.updateRemitterAccountState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          body: action.payload.body,
          successMessage: action.payload.body.successMessage,
        },
      };

    case actionConstants.POST_UPDATE_PAYOUT_REMITTER_ACCOUNT_FAILURE:
      return {
        ...state,
        updateRemitterAccountState: {
          ...state.updateRemitterAccountState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
        },
      };

    case actionConstants.POST_UPDATE_PAYOUT_REMITTER_ACCOUNT_CLEAR:
      return {
        ...state,
        updateRemitterAccountState,
      };

    case actionConstants.GET_PAYOUT_BANK_LIST_REQUEST:
      return {
        ...state,
        bankListState: {
          ...state.bankListState,
          isLoading: true,
          isFailure: false,
          isSuccess: false,
        },
      };

    case actionConstants.GET_PAYOUT_BANK_LIST_SUCCESS:
      return {
        ...state,
        bankListState: {
          ...bankListState,
          isSuccess: true,
          data: Array.isArray(action.payload?.body)
            ? action.payload?.body.map(
                (bankData: { bank_id: string; bank_name: string }) => ({
                  label: bankData.bank_name,
                  value: bankData.bank_id,
                })
              )
            : [],
          isLoading: false,
        },
      };

    case actionConstants.GET_PAYOUT_BANK_LIST_FAILURE:
      return {
        ...state,
        bankListState: {
          ...state.bankListState,
          isFailure: true,
          isSuccess: false,
          isLoading: false,
        },
      };

    case actionConstants.GET_PAYOUT_BANK_LIST_CLEAR:
      return {
        ...state,
        bankListState: {
          ...bankListState,
        },
      };

    case actionConstants.GET_MERCHANT_KYC_DETAILS_REQUEST:
      return {
        ...state,
        getMerchantKycDetailsState: {
          ...state.getMerchantKycDetailsState,
          isLoading: true,
          isFailure: false,
          isSuccess: false,
        },
      };

    case actionConstants.GET_MERCHANT_KYC_DETAILS_SUCCESS:
      return {
        ...state,
        getMerchantKycDetailsState: {
          ...state.getMerchantKycDetailsState,
          isSuccess: true,
          data: action.payload?.body?.data,
          isLoading: false,
        },
      };

    case actionConstants.GET_MERCHANT_KYC_DETAILS_FAILURE:
      return {
        ...state,
        getMerchantKycDetailsState: {
          ...state.getMerchantKycDetailsState,
          isFailure: true,
          isSuccess: false,
          isLoading: false,
          errorCode: action?.payload?.body?.errorCode,
          errorMessage: action?.payload?.body?.errorMessage,
        },
      };

    case actionConstants.GET_MERCHANT_KYC_DETAILS_CLEAR:
      return {
        ...state,
        getMerchantKycDetailsState: {
          ...getMerchantKycDetailsState,
        },
      };

    case actionConstants.GET_MERCHANT_KYC_ENTITY_TYPES_LIST_REQUEST:
      return {
        ...state,
        merchantKycEntityTypesListState: {
          ...state.merchantKycEntityTypesListState,
          isLoading: true,
          isFailure: false,
          isSuccess: false,
        },
      };

    case actionConstants.GET_MERCHANT_KYC_ENTITY_TYPES_LIST_SUCCESS:
      return {
        ...state,
        merchantKycEntityTypesListState: {
          ...state.merchantKycEntityTypesListState,
          isSuccess: true,
          data: action.payload?.body?.data,
          isLoading: false,
        },
      };

    case actionConstants.GET_MERCHANT_KYC_ENTITY_TYPES_LIST_FAILURE:
      return {
        ...state,
        merchantKycEntityTypesListState: {
          ...state.merchantKycEntityTypesListState,
          isFailure: true,
          isSuccess: false,
          isLoading: false,
          errorCode: action?.payload?.body?.errorCode,
          errorMessage: action?.payload?.body?.errorMessage,
        },
      };

    case actionConstants.GET_MERCHANT_KYC_ENTITY_TYPES_LIST_CLEAR:
      return {
        ...state,
        merchantKycEntityTypesListState: {
          ...merchantKycEntityTypesListState,
        },
      };

    case actionConstants.POST_UPDATE_MERCHANT_KYC_DETAILS_REQUEST:
      return {
        ...state,
        updateMerchantKycDetailsState: {
          ...state.updateMerchantKycDetailsState,
          isLoading: true,
          isFailure: false,
          isSuccess: false,
        },
      };

    case actionConstants.POST_UPDATE_MERCHANT_KYC_DETAILS_SUCCESS:
      return {
        ...state,
        updateMerchantKycDetailsState: {
          ...state.updateMerchantKycDetailsState,
          isSuccess: true,
          data: action.payload?.body?.data,
          isLoading: false,
        },
      };

    case actionConstants.POST_UPDATE_MERCHANT_KYC_DETAILS_FAILURE:
      return {
        ...state,
        updateMerchantKycDetailsState: {
          ...state.updateMerchantKycDetailsState,
          isFailure: true,
          isSuccess: false,
          isLoading: false,
          errorCode: action?.payload?.body?.errorCode,
          errorMessage: action?.payload?.body?.errorMessage,
        },
      };

    case actionConstants.POST_UPDATE_MERCHANT_KYC_DETAILS_CLEAR:
      return {
        ...state,
        updateMerchantKycDetailsState: {
          ...updateMerchantKycDetailsState,
        },
      };
    case actionConstants.GET_PAYOUT_TRANSACTION_FAILED_MSG_REQUEST:
      return {
        ...state,
        getTransactionFailState: {
          ...state.getTransactionFailState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          errorCode: 0,
          errorMessage: '',
          data: '',
        },
      };

    case actionConstants.GET_PAYOUT_TRANSACTION_FAILED_MSG_SUCCESS:
      return {
        ...state,
        getTransactionFailState: {
          ...state.getTransactionFailState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: action.payload.body.data,
        },
      };

    case actionConstants.GET_PAYOUT_TRANSACTION_FAILED_MSG_FAILURE:
      return {
        ...state,
        getTransactionFailState: {
          ...state.getTransactionFailState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          errorCode: action.payload.body.errorCode,
          errorMessage: action.payload.body.errorMessage,
        },
      };

    case actionConstants.GET_PAYOUT_TRANSACTION_FAILED_MSG_CLEAR:
      return {
        ...state,
        getTransactionFailState,
      };

    default:
      return state;
  }
}
