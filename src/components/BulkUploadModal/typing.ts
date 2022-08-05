interface Props {
  closeModal: () => void;
  title: string;
  getDownloadCsvTemplateAction?: CallableFunction;
  uploadBulkRefundAction: CallableFunction;
}

export default Props;
