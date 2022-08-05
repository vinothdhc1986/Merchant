export interface ListPayload {
  startDate: Date | string;
  endDate: Date | string;
  filename: string;
  pageNo: number;
  sortBy: string;
  orderBy: string;
}

export interface DateRangeType {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface Props {
  getBulkUploadHistoryAction: CallableFunction;
  bulkHistoryRecords;
  totalRecords: number;
  clearDownloadBulkHistoryFileAction: CallableFunction;
  downloadCsvAction: ({ url: string }) => void;
  isAdmin: boolean;
}

export default Props;
