export interface ModalProps {
    className: string;
    title?: string;
    description?: string;
    backButtonEnable?: boolean;
    onBackButtonClick?: () => void;
    onBackdropClick?: ()=> void;
}
