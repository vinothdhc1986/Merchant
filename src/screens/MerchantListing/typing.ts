
interface Props {
  MerchantListRecords: any;
  getMerchantListAction: CallableFunction;
  totalRecords: number;
  setMerchantInfoAction: CallableFunction;
  searchRecords: any;
  merchantSearchAction: CallableFunction;
}

export interface GetMerchantListApiPayloadType {
  pageNo: number;
  sortBy?: string;
  orderBy?: string;
  merchantName?: string;
}

export default Props;
