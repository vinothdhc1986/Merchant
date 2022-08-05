import { MerchantIdType } from 'lib/typing';

export interface Props {
  loginState: {
    isAdmin: boolean;
    MerchantId: number;
  };
  validationErrors;
  getIndividualPayoutsListAction: CallableFunction;
  clearIndividualPayoutsListAction: CallableFunction;
  approveIndividualPayoutAction: CallableFunction;
  rejectIndividualPayoutAction: CallableFunction;
  clearApproveIndividualPayoutAction: CallableFunction;
  clearRejectIndividualPayoutAction: CallableFunction;
  approveIndividualPayoutState;
  rejectIndividualPayoutState;
  totalRecords: number;
  individualPayoutList;
  pendingPayLaterPayoutCount: number;
  pendingPayNowPayoutCount: number;
  cancelApprovedIndividualPayoutAction: CallableFunction;
  clearCancelApprovedIndividualPayoutAction: CallableFunction;
  cancelApproveIndividualPayoutState;
  downloadCsvAction: CallableFunction;
  getTransactionFailMsgAction: (data: {
    merchantId: MerchantIdType;
    payoutId: string;
  }) => void;
  getTransactionFailState;
  clearGetTransactionFailMsgAction: CallableFunction;
}

export type ListTypeProp = 'EDIT' | 'MASTER';

export type ConfirmModalType = 'APPROVE' | 'CANCEL';

export interface FailedTransactionDtls {
  instructionIdentification: string;
  errorMsg: string;
}

export interface ConfirmModalPropType {
  modalType: ConfirmModalType | '';
  isConfirmModal: boolean;
  confirmModalTitle: string;
  confirmModalContent: string;
}
export interface PayoutListingPayloadType {
  pageNo: number;
  orderBy?: string;
  sortBy?: string;
  filters?: {
    merchantDetails: {
      selectKey: string;
      inputValue: string;
    };
  };
  fromDate?: string | Date;
  toDate?: string | Date;
  listType?: string;
  status?: string;
  payType?: string;
}
