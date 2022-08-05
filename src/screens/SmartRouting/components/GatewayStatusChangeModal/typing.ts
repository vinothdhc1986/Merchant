interface statusChangeProps {
  handleCancel: CallableFunction;
  currentStatus: boolean;
  handleSave: (isActive: boolean) => void;
}

export default statusChangeProps;
