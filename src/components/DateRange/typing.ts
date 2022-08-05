import { DateRangeType } from '../../lib/typing';

interface Props {
  cancelHandler: () => void;
  saveHandler: (value: DateRangeType) => void;
  dateRange: DateRangeType | null;
  children?: JSX.Element;
  visible: boolean;
  onVisibleChange: (arg: boolean) => void;
}

export default Props;
