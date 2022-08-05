
export interface GetRefundListApiPayloadType {
  fromDate: string | Date;
  toDate: string | Date;
  pageNo: number;
  filters?: any;
  sortBy?: string;
  orderBy?: string;
}

interface Props {
  getRefundListAction: CallableFunction;
  refundListRecords;
  orderTransactionDetails;
  getOrderTransactionDetailsAction: CallableFunction;
  isorderTransactionDetailsFetching: boolean;
  totalRecords: number;
  getGatewayListAction: CallableFunction;
  allGatewaysList;
  getAllRefundStatusAction: CallableFunction;
  getAllRefundStatusList;
  downloadCsvAction: ({ url: string }) => void;
  isAdmin: boolean;
}

export default Props;
