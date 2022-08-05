export interface BulkPayoutListingPayloadType {
  pageNo: number;
  orderBy?: string;
  sortBy?: string;
  fromDate?: string | Date;
  toDate?: string | Date;
}

export type SelectedRowIdType = number | string | null;

export interface TableConstantsType {
  selectedRowId: SelectedRowIdType;
  setSelectedRowId: React.Dispatch<React.SetStateAction<SelectedRowIdType>>;
  handleDownloadActionBtn: (data: number | string) => void;
}

interface Props {
  loginState: {
    isAdmin: boolean;
    MerchantId: number;
  };
  validationErrors;
  bulkPayoutListAction: CallableFunction;
  clearBulkPayoutListAction: CallableFunction;
  bulkPayoutList;
  totalRecords: number;
  downloadCsvAction: CallableFunction;
}

export default Props;
