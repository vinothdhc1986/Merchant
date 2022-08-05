export interface BeneListingPayloadType {
  pageNo: number;
  orderBy?: string;
  sortBy?: string;
  filters?: {
    merchantDetails: {
      selectKey: string;
      inputValue: string;
    };
    bankDetails: {
      selectKey: string;
      inputValue: string;
    };
  };
  fromDate?: string | Date;
  toDate?: string | Date;
  listType?: string;
  status?: string;
}

export type TabOptionsType = 'EDIT' | 'MASTER';

interface Props {
  loginState: {
    isAdmin: boolean;
    MerchantId: number;
  };
  beneficiaryListState;
  approveBeneficiaryState;
  rejectBeneficiaryState;
  addNewBeneficiaryState;
  addNewBeneficiaryAction: CallableFunction;
  beneficiaryListAction: CallableFunction;
  approveBeneficiaryAction: CallableFunction;
  rejectBeneficiaryAction: CallableFunction;
  clearAddNewBeneficiaryAction: CallableFunction;
  clearBeneficiaryListAction: CallableFunction;
  clearApproveBeneficiaryAction: CallableFunction;
  clearRejectBeneficiaryAction: CallableFunction;
  deactivateBeneficiaryAction: CallableFunction;
  clearDeactivateBeneficiaryAction: CallableFunction;
  validationErrors;
  beneficiaryList;
  totalRecords: number;
  deactivateBeneficiaryState;
  pendingRecords: number;
  downloadCsvAction: CallableFunction;
}

export default Props;
