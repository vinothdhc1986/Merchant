export interface ListPayload {
  startDate: Date | string;
  endDate: Date | string;
  filename: string;
  pageNo: number | string;
  sortBy: string;
  orderBy: string;
}

export interface DateRangeType {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface Props {
  getRefundBulkUploadHistoryListAction: CallableFunction;
  bulkHistoryRecords;
  totalRecords: number;
  clearDownloadBulkHistoryFileAction: CallableFunction;
  downloadCsvAction: ({ url: string }) => void;
  isAdmin: boolean;
}

export default Props;
