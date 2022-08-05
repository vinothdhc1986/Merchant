type strAndNum = string | number;

export interface TotalTransactionsDatasetUnitType {
  key: string;
  dateString?: string;
  failureAmount: strAndNum;
  failureCount: strAndNum;
  successAmount: strAndNum;
  successCount: strAndNum;
  totalTransactionAmount: strAndNum;
  totalTransactionCount: strAndNum;
}

export interface GatewayOptionsListType {
  label: string;
  value: string;
}

export interface PlatformDatasetListType {
  name: string;
  value: number;
  index: number;
  color: string;
}

export interface PaymentMethodsListType {
  key: string;
  label: string;
  bgClass: string;
  icon: string;
  percentage: number;
}

interface Props {
  getTodayTransactionsDataAction: CallableFunction;
  transactionData;
  refundData;
  getOverviewDataAction: CallableFunction;
  paymentModesData;
  platformData;
  getGatewayListAction: CallableFunction;
  allGatewaysList;
  transactionAccordingToDateTime;
  clearOverviewStateAction: CallableFunction;
  todayDate: string;
}

export default Props;
