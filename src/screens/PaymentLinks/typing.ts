interface Props {
  getPaymentLinksListAction: CallableFunction;
  PaymentLinksListRecords;
  totalRecords: number;
  getPaymentLinkStatusCodeAction: () => void;
  statusCodeList: Array<{ status_id: string; status_name: string }>;
  downloadCsvAction: ({ url: string }) => void;
  isAdmin: boolean;
}

export default Props;
