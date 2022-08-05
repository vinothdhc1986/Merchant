interface EditSecretkeyModalProps {
    handleCancel: CallableFunction;
    secretKeyValue: string;
    handleSave: (secretKey: string) => void;
}

export default EditSecretkeyModalProps;
