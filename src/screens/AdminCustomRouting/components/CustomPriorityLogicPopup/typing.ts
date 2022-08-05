interface Props {
  closeModal: () => void;
  modalType: 'review' | 'update';
  customRoutingLogic: string;
  setCustomRoutingLogic?: React.Dispatch<React.SetStateAction<string>>;
  handleApprove?: () => void;
  handleReject?: () => void;
  handleUpdate?: () => void;
  selectedRowStatus?: string;
}

export default Props;
