/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import apiEndpoints from '../lib/apiEndpoints';
import apiCall from './apiCall';
import {
  AddRemitterAccountPayloadType,
  MerchantIdType,
  UpdateRemitterAccountPayloadType,
  UpdateKycDetailsRequestPayloadType,
} from '../lib/typing';

export const addNewBeneficiaryApi = (payload: {
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
}): void => {
  return apiCall({
    method: 'post',
    payload,
    endpoint: apiEndpoints.ADD_NEW_BENEFICIARY,
    isPayoutsEndpoint: true,
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const beneficiaryListAPI = (payload: any): void => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_BENEFICIARY_LIST,
    isPayoutsEndpoint: true,
    query: {
      ...payload,
    },
  });
};

export const getBeneficiaryByCodeAPI = (payload: {
  merchantId: string;
  beneficiaryCode: string;
}): void => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_BENEFICIARY_BY_BENEFICIARY_CODE,
    isPayoutsEndpoint: true,
    query: {
      merchantId: payload.merchantId,
      beneficiaryCode: payload.beneficiaryCode,
    },
  });
};

export const approveBeneficiaryAPI = (payload: {
  approveBeneficiaries: [string | null];
  merchantId: string;
}): void => {
  return apiCall({
    method: 'post',
    endpoint: apiEndpoints.APPROVE_REJECT_BENEFICIARIES,
    isPayoutsEndpoint: true,
    payload,
  });
};

export const rejectBeneficiaryAPI = (payload: {
  rejectBeneficiaries: any;
  merchantId: string;
}): void => {
  return apiCall({
    method: 'post',
    endpoint: apiEndpoints.APPROVE_REJECT_BENEFICIARIES,
    isPayoutsEndpoint: true,
    payload,
  });
};

export const getIndividualPayoutsListAPI = (payload: {
  merchantId: string;
  listType: 'EDIT' | 'MASTER';
  pageNumber: number;
  pageSize: number;
  sorting: string;
  order: string;
}): void => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_INDIVIDUAL_PAYOUTS_LIST,
    isPayoutsEndpoint: true,
    query: {
      ...payload,
    },
  });
};

export const addIndividualPayoutApi = (payload: {
  amount: number;
  beneficiaryCode: string;
  merchantId: string;
  paymentType: string;
  remarks: string;
  payLater: boolean;
  payDate?: string;
  payTime?: string;
}): void => {
  return apiCall({
    method: 'post',
    payload,
    endpoint: apiEndpoints.ADD_NEW_INDIVIDUAL_PAYOUT,
    isPayoutsEndpoint: true,
  });
};

export const approveIndividualPayoutAPI = (payload: {
  approvePayouts: [string | null];
  merchantId: string;
}): void => {
  return apiCall({
    method: 'post',
    endpoint: apiEndpoints.APPROVE_REJECT_INDIVIDUAL_PAYOUT,
    isPayoutsEndpoint: true,
    payload,
  });
};

export const rejectIndividualPayoutAPI = (payload: {
  rejectPayouts: any;
  merchantId: string;
}): void => {
  return apiCall({
    method: 'post',
    endpoint: apiEndpoints.APPROVE_REJECT_INDIVIDUAL_PAYOUT,
    isPayoutsEndpoint: true,
    payload,
  });
};

export const deactivateBeneficiaryAPI = (payload: {
  beneficiaryCode: string;
  merchantId: string;
}): void => {
  return apiCall({
    method: 'post',
    endpoint: apiEndpoints.DEACTIVATE_BENEFICIARIES,
    isPayoutsEndpoint: true,
    query: { ...payload },
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const bulkPayoutListAPI = (payload: any): void => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_BULK_PAYOUT_LIST,
    isPayoutsEndpoint: true,
    query: {
      ...payload,
    },
  });
};

export const updateMerchantPayoutModuleStatusApi = (payload: {
  status: boolean;
  merchantId: string;
  email: string;
  name: string;
  bankId: string;
}): void => {
  const apiRequestPayload = {
    enable_payout: payload.status,
    merchant_id: payload.merchantId,
    user_id: payload.email,
    name: payload.name,
  };
  apiRequestPayload.enable_payout &&
    (apiRequestPayload['bank_id'] = payload.bankId);
  return apiCall({
    method: 'put',
    endpoint: apiEndpoints.UPDATE_MERCHANT_PAYOUT_MODULE_STATUS,
    payload: {
      ...apiRequestPayload,
    },
  });
};

export const cancelApprovedIndividualPayoutAPI = (payload: {
  payoutIds: string[];
  merchantId: string;
}): void => {
  return apiCall({
    method: 'post',
    endpoint: apiEndpoints.CANCEL_APPROVED_INDIVIDUAL_PAYOUT,
    isPayoutsEndpoint: true,
    query: {
      ...payload,
    },
  });
};

export const getOverviewPendingSummaryApi = (
  merchantId: string | number
): void => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_PAYOUT_OVERVIEW_PENDING_SUMMARY,
    isPayoutsEndpoint: true,
    query: { merchantId },
  });
};

export const getOverviewStatusSummaryApi = (
  merchantId: string | number,
  filter: string
): void => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_PAYOUT_OVERVIEW_STATUS_SUMMARY,
    isPayoutsEndpoint: true,
    query: { merchantId, filterDuration: filter },
  });
};

export const getOverviewTrsansactionSummaryApi = (
  merchantId: string | number,
  filter: string
): void => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_PAYOUT_OVERVIEW_TRANSACTION_SUMMARY,
    isPayoutsEndpoint: true,
    query: { merchantId, filterDuration: filter },
  });
};

export const getMerchantBalanceApi = (merchantId: string | number): void => {
  return apiCall({
    method: 'post',
    isPayoutsEndpoint: true,
    endpoint: apiEndpoints.GET_PAYOUT_MERCHANT_ACOUNT_BALANCE,
    query: { merchantId },
  });
};

export const remitterAccountsListApi = (payload: {
  merchantId: string | number;
}): void => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_PAYOUT_REMITTER_ACCOUNTS_LIST,
    isPayoutsEndpoint: true,
    query: {
      ...payload,
    },
  });
};

export const addRemitterAccountApi = (
  payload: AddRemitterAccountPayloadType
): void => {
  return apiCall({
    method: 'post',
    endpoint: apiEndpoints.ADD_PAYOUT_REMITTER_ACCOUNT,
    isPayoutsEndpoint: true,
    payload: {
      ...payload,
    },
  });
};

export const updateRemitterAccountApi = (
  payload: UpdateRemitterAccountPayloadType
): void => {
  return apiCall({
    method: 'post',
    endpoint: apiEndpoints.UPDATE_PAYOUT_REMITTER_ACCOUNT,
    isPayoutsEndpoint: true,
    payload: {
      ...payload,
    },
  });
};

export const getBankListApi = (): void => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_PAYOUT_BANK_LIST,
  });
};

export const getMerchantKycEntityTypesListApi = (): void => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_MERCHANT_KYC_ENTITY_TYPES_LIST,
    isPayoutsEndpoint: true,
  });
};

export const getMerchantKycDetailsApi = (payload: {
  merchantId: MerchantIdType;
}): void => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_MERCHANT_KYC_DETAILS,
    isPayoutsEndpoint: true,
    query: {
      ...payload,
    },
  });
};

export const updateMerchantKycDetailsApi = (
  payload: UpdateKycDetailsRequestPayloadType
): void => {
  return apiCall({
    method: 'post',
    endpoint: apiEndpoints.POST_UPDATE_MERCHANT_KYC_DETAILS,
    isPayoutsEndpoint: true,
    payload: {
      ...payload,
    },
  });
};
export const getTransactionFailMsgApi = (query: {
  merchantId: MerchantIdType;
  payoutId: string;
}): void => {
  return apiCall({
    method: 'get',
    endpoint: apiEndpoints.GET_PAYOUT_TRANSACTION_FAILED_MSG,
    isPayoutsEndpoint: true,
    query: {
      ...query,
    },
  });
};
