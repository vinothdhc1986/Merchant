interface Props {
  loginState: {
    isAdmin: boolean;
    MerchantId: number;
  };
  overviewError: boolean;
  clearOverviewErrorStateAction: () => void;
  validationErrorState: {
    SOMETHING_WENT_WRONG: string;
  }
}

export default Props;

export interface PendingSummaryProps {
  pendingIndividualPayoutCount: number;
  pendingBeneficiaryCount: number;
  pendingSchduledPayoutCount: number;
  todayCashflow: {
    added: number;
    debited: number;
    balance: number;
  };
  getOverviewPendingSummaryAction: (merchantId: string | number) => void;
}

export interface StatusSummaryProps {
  statusSummary: {
    statuses: Array<{ status: string; count: number }>;
  };
  getOverviewStatusSummaryAction: (
    merchantId: string | number,
    filter: string
  ) => void;
}

export interface TransactionSummaryProps {
  getOverviewTransactionSummaryAction: (
    merchantId: string | number,
    filter: string
  ) => void;
  transactionSummary: Array<{ date: string; totalTransactionAmount: number }>;
}
