interface Props {
  title: string;
  content: string;
  handleCancel: CallableFunction;
  handleSave: CallableFunction;
  cancelText?: string;
  confirmText?: string;
  iconType?: 'warning' | 'error';
}

export default Props;
