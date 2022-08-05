export type popperPlacement =
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'topRight'
  | 'topLeft'
  | 'top';

interface Props {
  content: JSX.Element;
  children: JSX.Element;
  contentClassName?: string;
  placement?: popperPlacement;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  autoAdjustOverflow?: boolean;
  className?: string;
  parentId?: string;
  trigger?: string | string[];
}

export default Props;
