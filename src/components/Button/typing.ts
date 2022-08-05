export interface ButtonProps {
  label?: string | JSX.Element;
  enable?: boolean;
  onClick?(): void;
  icon?: string;
  btnStyleClass?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  btnStyleType?: 'primary' | 'secondary' | 'roundedSecondary';
}
