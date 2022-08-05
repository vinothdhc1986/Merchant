
export interface GetPaymentListApiPayloadType {
  fromDate: string | Date;
  toDate: string | Date;
  pageNo: number;
  filters?: any;
  sortBy?: string;
  orderBy?: string;
}

interface Props {
  getPaymentListAaction: CallableFunction;
  PaymentListRecords;
  orderTransactionDetails;
  getOrderTransactionDetailsAction: CallableFunction;
  isorderTransactionDetailsFetching: boolean;
  totalRecords: number;
  createRefundAction: CallableFunction;
  allGatewaysList;
  getAllOrderStatusList;
  getGatewayListAction: CallableFunction;
  getAllOrdersStatusAction: CallableFunction;
  createRefund;
  clearRefundAction: CallableFunction;
  validationErrors;
  downloadCsvAction: ({ url: string }) => void;
  isAdmin: boolean;
}

export default Props;
