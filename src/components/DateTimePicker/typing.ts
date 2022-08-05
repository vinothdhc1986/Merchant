import { popperPlacement } from "../Popper/typing";

interface Props {
  children: JSX.Element;
  visible: boolean;
  onVisibleChange: (string: boolean) => void;
  placement?: popperPlacement;
  value: Date;
  handleDateChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  parentId?: string;
}

export default Props;
