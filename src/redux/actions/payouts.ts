/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ActionConstants from '../constants';
import {
  AddRemitterAccountPayloadType,
  MerchantIdType,
  UpdateRemitterAccountPayloadType,
  UpdateKycDetailsRequestPayloadType,
} from '../../lib/typing';
import {
  addIndividualPayoutApi,
  addNewBeneficiaryApi,
  approveBeneficiaryAPI,
  approveIndividualPayoutAPI,
  beneficiaryListAPI,
  getBeneficiaryByCodeAPI,
  getIndividualPayoutsListAPI,
  rejectBeneficiaryAPI,
  rejectIndividualPayoutAPI,
  deactivateBeneficiaryAPI,
  bulkPayoutListAPI,
  updateMerchantPayoutModuleStatusApi,
  cancelApprovedIndividualPayoutAPI,
  getOverviewPendingSummaryApi,
  getOverviewStatusSummaryApi,
  getOverviewTrsansactionSummaryApi,
  getMerchantBalanceApi,
  remitterAccountsListApi,
  addRemitterAccountApi,
  updateRemitterAccountApi,
  getBankListApi,
  getMerchantKycEntityTypesListApi,
  getMerchantKycDetailsApi,
  updateMerchantKycDetailsApi,
  getTransactionFailMsgApi,
} from '../../api/payouts';

export const addNewBeneficiaryAction = (data: {
  //address: [''],
  merchantId: string;
  beneAction: string;
  beneType: string;
  bankName: string;
  ifscCode: string;
  mobileNo: string;
  beneName: string;
  beneAccountNo: string;
  emailId: string;
  modificationStatus: string;
  paymentType: string;
  upiHandle: string;
}) => {
  const payload = {
    serviceMethod: addNewBeneficiaryApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_ADD_NEW_BENEFICIARY_SUCCESS,
    actionTypeFailure: ActionConstants.POST_ADD_NEW_BENEFICIARY_FAILURE,
    actionTypeRequest: ActionConstants.POST_ADD_NEW_BENEFICIARY_REQUEST,
  };
  return { type: ActionConstants.POST_ADD_NEW_BENEFICIARY, payload };
};

export const clearAddNewBeneficiaryAction = () => {
  return { type: ActionConstants.POST_ADD_NEW_BENEFICIARY_CLEAR };
};

export const beneficiaryListAction = (data) => {
  const payload = {
    serviceMethod: beneficiaryListAPI.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_BENEFICIARY_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_BENEFICIARY_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_BENEFICIARY_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_BENEFICIARY_LIST, payload };
};

export const clearBeneficiaryListAction = () => {
  return { type: ActionConstants.GET_BENEFICIARY_LIST_CLEAR };
};

export const approveBeneficiaryAction = (data: {
  approveBeneficiaries: [string | null];
  merchantId: string;
}) => {
  const payload = {
    serviceMethod: approveBeneficiaryAPI.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_APPROVE_BENEFICIARY_SUCCESS,
    actionTypeFailure: ActionConstants.POST_APPROVE_BENEFICIARY_FAILURE,
    actionTypeRequest: ActionConstants.POST_APPROVE_BENEFICIARY_REQUEST,
  };
  return { type: ActionConstants.POST_APPROVE_BENEFICIARY, payload };
};

export const clearApproveBeneficiaryAction = () => {
  return { type: ActionConstants.POST_APPROVE_BENEFICIARY_CLEAR };
};

export const rejectBeneficiaryAction = (data: {
  rejectBeneficiaries: any;
  merchantId: string;
}) => {
  const payload = {
    serviceMethod: rejectBeneficiaryAPI.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_REJECT_BENEFICIARY_SUCCESS,
    actionTypeFailure: ActionConstants.POST_REJECT_BENEFICIARY_FAILURE,
    actionTypeRequest: ActionConstants.POST_REJECT_BENEFICIARY_REQUEST,
  };
  return { type: ActionConstants.POST_REJECT_BENEFICIARY, payload };
};

export const clearRejectBeneficiaryAction = () => {
  return { type: ActionConstants.POST_REJECT_BENEFICIARY_CLEAR };
};

export const getIndividualPayoutsListAction = (data: {
  merchantId: string;
  listType: 'EDIT' | 'MASTER';
  pageNumber: number;
  pageSize: number;
  sorting: string;
  order: string;
}) => {
  const payload = {
    serviceMethod: getIndividualPayoutsListAPI.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_INDIVIDUAL_PAYOUTS_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_INDIVIDUAL_PAYOUTS_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_INDIVIDUAL_PAYOUTS_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_INDIVIDUAL_PAYOUTS_LIST, payload };
};

export const clearIndividualPayoutsListAction = () => {
  return { type: ActionConstants.GET_INDIVIDUAL_PAYOUTS_LIST_CLEAR };
};

export const getBeneficiaryByCodeAction = (data: {
  merchantId: string;
  beneficiaryCode: string;
}) => {
  const payload = {
    serviceMethod: getBeneficiaryByCodeAPI.bind(null, data),
    actionTypeSuccess:
      ActionConstants.GET_BENEFICIARY_BY_BENEFICIARY_CODE_SUCCESS,
    actionTypeFailure:
      ActionConstants.GET_BENEFICIARY_BY_BENEFICIARY_CODE_FAILURE,
    actionTypeRequest:
      ActionConstants.GET_BENEFICIARY_BY_BENEFICIARY_CODE_REQUEST,
    hideLoader: true,
  };
  return { type: ActionConstants.GET_BENEFICIARY_BY_BENEFICIARY_CODE, payload };
};

export const clearGetBeneficiaryByCodeAction = () => {
  return { type: ActionConstants.GET_BENEFICIARY_BY_BENEFICIARY_CODE_CLEAR };
};

export const addNewIndividualPayoutAction = (data: {
  amount: number;
  beneficiaryCode: string;
  merchantId: string;
  paymentType: string;
  remarks: string;
  payLater: boolean;
  payDate?: string;
  payTime?: string;
}) => {
  const payload = {
    serviceMethod: addIndividualPayoutApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_ADD_INDIVIDUAL_PAYOUT_SUCCESS,
    actionTypeFailure: ActionConstants.POST_ADD_INDIVIDUAL_PAYOUT_FAILURE,
    actionTypeRequest: ActionConstants.POST_ADD_INDIVIDUAL_PAYOUT_REQUEST,
    //hideLoader: true,
  };
  return { type: ActionConstants.POST_ADD_INDIVIDUAL_PAYOUT, payload };
};

export const clearAddIndividualPayoutAction = () => {
  return { type: ActionConstants.POST_ADD_INDIVIDUAL_PAYOUT_CLEAR };
};

export const approveIndividualPayoutAction = (data: {
  approvePayouts: [string | null];
  merchantId: string;
}) => {
  const payload = {
    serviceMethod: approveIndividualPayoutAPI.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_APPROVE_INDIVIDUAL_PAYOUT_SUCCESS,
    actionTypeFailure: ActionConstants.POST_APPROVE_INDIVIDUAL_PAYOUT_FAILURE,
    actionTypeRequest: ActionConstants.POST_APPROVE_INDIVIDUAL_PAYOUT_REQUEST,
  };
  return { type: ActionConstants.POST_APPROVE_INDIVIDUAL_PAYOUT, payload };
};

export const clearApproveIndividualPayoutAction = () => {
  return { type: ActionConstants.POST_APPROVE_INDIVIDUAL_PAYOUT_CLEAR };
};

export const rejectIndividualPayoutAction = (data: {
  rejectPayouts: any;
  merchantId: string;
}) => {
  const payload = {
    serviceMethod: rejectIndividualPayoutAPI.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_REJECT_INDIVIDUAL_PAYOUT_SUCCESS,
    actionTypeFailure: ActionConstants.POST_REJECT_INDIVIDUAL_PAYOUT_FAILURE,
    actionTypeRequest: ActionConstants.POST_REJECT_INDIVIDUAL_PAYOUT_REQUEST,
  };
  return { type: ActionConstants.POST_REJECT_INDIVIDUAL_PAYOUT, payload };
};

export const clearRejectIndividualPayoutAction = () => {
  return { type: ActionConstants.POST_REJECT_INDIVIDUAL_PAYOUT_CLEAR };
};

export const deactivateBeneficiaryAction = (data: {
  beneficiaryCode: string;
  merchantId: string;
}) => {
  const payload = {
    serviceMethod: deactivateBeneficiaryAPI.bind(null, data),
    actionTypeSuccess: ActionConstants.PUT_DEACTIVATE_BENEFICIARY_SUCCESS,
    actionTypeFailure: ActionConstants.PUT_DEACTIVATE_BENEFICIARY_FAILURE,
    actionTypeRequest: ActionConstants.PUT_DEACTIVATE_BENEFICIARY_REQUEST,
  };
  return { type: ActionConstants.PUT_DEACTIVATE_BENEFICIARY, payload };
};

export const clearDeactivateBeneficiaryAction = () => {
  return { type: ActionConstants.PUT_DEACTIVATE_BENEFICIARY_CLEAR };
};

export const bulkPayoutListAction = (data) => {
  const payload = {
    serviceMethod: bulkPayoutListAPI.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_BULK_PAYOUT_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_BULK_PAYOUT_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_BULK_PAYOUT_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_BULK_PAYOUT_LIST, payload };
};

export const clearBulkPayoutListAction = () => {
  return { type: ActionConstants.GET_BULK_PAYOUT_LIST_CLEAR };
};

export const updateMerchantPayoutModuleStatusAction = ({
  status,
  merchantId,
  email,
  name,
  bankId,
}: {
  status: boolean;
  merchantId: string;
  email: string;
  name: string;
  bankId: string;
}) => {
  const payload = {
    serviceMethod: updateMerchantPayoutModuleStatusApi.bind(null, {
      status,
      merchantId,
      email,
      name,
      bankId,
    }),
    actionTypeSuccess: ActionConstants.PUT_UPDATE_PAYOUT_MODULE_STATUS_SUCCESS,
    actionTypeFailure: ActionConstants.PUT_UPDATE_PAYOUT_MODULE_STATUS_FAILURE,
    actionTypeRequest: ActionConstants.PUT_UPDATE_PAYOUT_MODULE_STATUS_REQUEST,
    genericErrorHandling: false,
  };
  return {
    type: ActionConstants.PUT_UPDATE_PAYOUT_MODULE_STATUS,
    payload,
  };
};

export const clearPayoutModuleStatusAction = () => {
  return { type: ActionConstants.PUT_UPDATE_PAYOUT_MODULE_STATUS_CLEAR };
};

export const getOverviewPendingSummaryAction = (
  merchantId: string | number
) => {
  const payload = {
    serviceMethod: getOverviewPendingSummaryApi.bind(null, merchantId),
    actionTypeSuccess:
      ActionConstants.GET_PAYOUT_OVERVIEW_PENDING_SUMMARY_SUCCESS,
    actionTypeFailure:
      ActionConstants.GET_PAYOUT_OVERVIEW_PENDING_SUMMARY_FAILURE,
    actionTypeRequest:
      ActionConstants.GET_PAYOUT_OVERVIEW_PENDING_SUMMARY_REQUEST,
  };
  return { type: ActionConstants.GET_PAYOUT_OVERVIEW_PENDING_SUMMARY, payload };
};

export const getOverviewStatusSummaryAction = (
  merchantId: string | number,
  filter: string
) => {
  const payload = {
    serviceMethod: getOverviewStatusSummaryApi.bind(null, merchantId, filter),
    actionTypeSuccess:
      ActionConstants.GET_PAYOUT_OVERVIEW_STATUS_SUMMARY_SUCCESS,
    actionTypeFailure:
      ActionConstants.GET_PAYOUT_OVERVIEW_STATUS_SUMMARY_FAILURE,
    actionTypeRequest:
      ActionConstants.GET_PAYOUT_OVERVIEW_STATUS_SUMMARY_REQUEST,
  };
  return { type: ActionConstants.GET_PAYOUT_OVERVIEW_STATUS_SUMMARY, payload };
};

export const getOverviewTransactionSummaryAction = (
  merchantId: string | number,
  filter: string
) => {
  const payload = {
    serviceMethod: getOverviewTrsansactionSummaryApi.bind(
      null,
      merchantId,
      filter
    ),
    actionTypeSuccess:
      ActionConstants.GET_PAYOUT_OVERVIEW_TRANSACTION_SUMMARY_SUCCESS,
    actionTypeFailure:
      ActionConstants.GET_PAYOUT_OVERVIEW_TRANSACTION_SUMMARY_FAILURE,
    actionTypeRequest:
      ActionConstants.GET_PAYOUT_OVERVIEW_TRANSACTION_SUMMARY_REQUEST,
  };
  return {
    type: ActionConstants.GET_PAYOUT_OVERVIEW_TRANSACTION_SUMMARY,
    payload,
  };
};

export const cancelApprovedIndividualPayoutAction = (data: {
  payoutIds: string[];
  merchantId: string;
}) => {
  const payload = {
    serviceMethod: cancelApprovedIndividualPayoutAPI.bind(null, data),
    actionTypeSuccess:
      ActionConstants.POST_CANCEL_APPROVED_INDIVIDUAL_PAYOUT_SUCCESS,
    actionTypeFailure:
      ActionConstants.POST_CANCEL_APPROVED_INDIVIDUAL_PAYOUT_FAILURE,
    actionTypeRequest:
      ActionConstants.POST_CANCEL_APPROVED_INDIVIDUAL_PAYOUT_REQUEST,
  };
  return {
    type: ActionConstants.POST_CANCEL_APPROVED_INDIVIDUAL_PAYOUT,
    payload,
  };
};

export const clearCancelApprovedIndividualPayoutAction = () => {
  return {
    type: ActionConstants.POST_CANCEL_APPROVED_INDIVIDUAL_PAYOUT_CLEAR,
  };
};

export const clearOverviewErrorStateAction = () => {
  return {
    type: ActionConstants.CLEAR_PAYOUT_OVERVIEW_ERROR_STATE,
  };
};

export const getAccountBalanceAction = (merchantId: string | number) => {
  const payload = {
    serviceMethod: getMerchantBalanceApi.bind(null, merchantId),
    actionTypeSuccess: ActionConstants.GET_PAYOUT_ACCOUNT_BALANCE_SUCCESS,
    actionTypeFailure: ActionConstants.GET_PAYOUT_ACCOUNT_BALANCE_FAILURE,
    actionTypeRequest: ActionConstants.GET_PAYOUT_ACCOUNT_BALANCE_REQUEST,
    hideLoader: true,
    genericErrorHandling: false,
  };
  return {
    type: ActionConstants.GET_PAYOUT_ACCOUNT_BALANCE,
    payload,
  };
};

export const clearAccountBalanceStateAction = () => {
  return {
    type: ActionConstants.GET_PAYOUT_ACCOUNT_BALANCE_CLEAR,
  };
};

export const remitterAccountsListAction = (data: {
  merchantId: string | number;
}) => {
  const payload = {
    serviceMethod: remitterAccountsListApi.bind(null, data),
    actionTypeSuccess:
      ActionConstants.GET_PAYOUT_REMITTER_ACCOUNTS_LIST_SUCCESS,
    actionTypeFailure:
      ActionConstants.GET_PAYOUT_REMITTER_ACCOUNTS_LIST_FAILURE,
    actionTypeRequest:
      ActionConstants.GET_PAYOUT_REMITTER_ACCOUNTS_LIST_REQUEST,
  };
  return { type: ActionConstants.GET_PAYOUT_REMITTER_ACCOUNTS_LIST, payload };
};

export const clearRemitterAccountsListAction = () => {
  return { type: ActionConstants.GET_PAYOUT_REMITTER_ACCOUNTS_LIST_CLEAR };
};

export const addRemitterAccountAction = (
  data: AddRemitterAccountPayloadType
) => {
  const payload = {
    serviceMethod: addRemitterAccountApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_ADD_PAYOUT_REMITTER_ACCOUNT_SUCCESS,
    actionTypeFailure: ActionConstants.POST_ADD_PAYOUT_REMITTER_ACCOUNT_FAILURE,
    actionTypeRequest: ActionConstants.POST_ADD_PAYOUT_REMITTER_ACCOUNT_REQUEST,
  };
  return { type: ActionConstants.POST_ADD_PAYOUT_REMITTER_ACCOUNT, payload };
};

export const clearAddRemitterAccountAction = () => {
  return { type: ActionConstants.POST_ADD_PAYOUT_REMITTER_ACCOUNT_CLEAR };
};

export const updateRemitterAccountAction = (
  data: UpdateRemitterAccountPayloadType
) => {
  const payload = {
    serviceMethod: updateRemitterAccountApi.bind(null, data),
    actionTypeSuccess:
      ActionConstants.POST_UPDATE_PAYOUT_REMITTER_ACCOUNT_SUCCESS,
    actionTypeFailure:
      ActionConstants.POST_UPDATE_PAYOUT_REMITTER_ACCOUNT_FAILURE,
    actionTypeRequest:
      ActionConstants.POST_UPDATE_PAYOUT_REMITTER_ACCOUNT_REQUEST,
  };
  return { type: ActionConstants.POST_UPDATE_PAYOUT_REMITTER_ACCOUNT, payload };
};

export const clearUpdateRemitterAccountAction = () => {
  return { type: ActionConstants.POST_UPDATE_PAYOUT_REMITTER_ACCOUNT_CLEAR };
};
export const getBankListAction = () => {
  const payload = {
    serviceMethod: getBankListApi.bind(null),
    actionTypeSuccess: ActionConstants.GET_PAYOUT_BANK_LIST_SUCCESS,
    actionTypeFailure: ActionConstants.GET_PAYOUT_BANK_LIST_FAILURE,
    actionTypeRequest: ActionConstants.GET_PAYOUT_BANK_LIST_REQUEST,
  };
  return {
    type: ActionConstants.GET_PAYOUT_BANK_LIST,
    payload,
  };
};

export const clearBankListAction = () => {
  return {
    type: ActionConstants.GET_PAYOUT_BANK_LIST_CLEAR,
  };
};

export const getMerchantKycDetailsAction = (data: {
  merchantId: MerchantIdType;
}) => {
  const payload = {
    serviceMethod: getMerchantKycDetailsApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_MERCHANT_KYC_DETAILS_SUCCESS,
    actionTypeFailure: ActionConstants.GET_MERCHANT_KYC_DETAILS_FAILURE,
    actionTypeRequest: ActionConstants.GET_MERCHANT_KYC_DETAILS_REQUEST,
  };
  return {
    type: ActionConstants.GET_MERCHANT_KYC_DETAILS,
    payload,
  };
};

export const clearGetMerchantKycDetailsAction = () => {
  return {
    type: ActionConstants.GET_MERCHANT_KYC_DETAILS_CLEAR,
  };
};

export const getMerchantKycEntityTypesListAction = () => {
  const payload = {
    serviceMethod: getMerchantKycEntityTypesListApi.bind(null),
    actionTypeSuccess:
      ActionConstants.GET_MERCHANT_KYC_ENTITY_TYPES_LIST_SUCCESS,
    actionTypeFailure:
      ActionConstants.GET_MERCHANT_KYC_ENTITY_TYPES_LIST_FAILURE,
    actionTypeRequest:
      ActionConstants.GET_MERCHANT_KYC_ENTITY_TYPES_LIST_REQUEST,
  };
  return {
    type: ActionConstants.GET_MERCHANT_KYC_ENTITY_TYPES_LIST,
    payload,
  };
};

export const clearGetMerchantKycEntityTypesListAction = () => {
  return {
    type: ActionConstants.GET_MERCHANT_KYC_ENTITY_TYPES_LIST_CLEAR,
  };
};

export const updateMerchantKycDetailsAction = (
  data: UpdateKycDetailsRequestPayloadType
) => {
  const payload = {
    serviceMethod: updateMerchantKycDetailsApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_UPDATE_MERCHANT_KYC_DETAILS_SUCCESS,
    actionTypeFailure: ActionConstants.POST_UPDATE_MERCHANT_KYC_DETAILS_FAILURE,
    actionTypeRequest: ActionConstants.POST_UPDATE_MERCHANT_KYC_DETAILS_REQUEST,
  };
  return {
    type: ActionConstants.POST_UPDATE_MERCHANT_KYC_DETAILS,
    payload,
  };
};

export const clearUpdateMerchantKycDetailsAction = () => {
  return {
    type: ActionConstants.POST_UPDATE_MERCHANT_KYC_DETAILS_CLEAR,
  };
};

export const getTransactionFailMsgAction = (data: {
  payoutId: string;
  merchantId: MerchantIdType;
}) => {
  const payload = {
    serviceMethod: getTransactionFailMsgApi.bind(null, data),
    actionTypeSuccess:
      ActionConstants.GET_PAYOUT_TRANSACTION_FAILED_MSG_SUCCESS,
    actionTypeFailure:
      ActionConstants.GET_PAYOUT_TRANSACTION_FAILED_MSG_FAILURE,
    actionTypeRequest:
      ActionConstants.GET_PAYOUT_TRANSACTION_FAILED_MSG_REQUEST,
    hideLoader: true,
  };
  return {
    type: ActionConstants.GET_PAYOUT_TRANSACTION_FAILED_MSG,
    payload,
  };
};

export const clearGetTransactionFailMsgAction = () => {
  return {
    type: ActionConstants.GET_PAYOUT_TRANSACTION_FAILED_MSG_CLEAR,
  };
};
