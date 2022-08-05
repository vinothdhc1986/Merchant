interface Props {
  closeModal: () => void;
  columnsList: {
    id: string;
    isCustomizable: boolean;
    label: string;
  }[];
  visibleColumns: string[];
  setVisibleColumns: React.Dispatch<string[]>;
}

export default Props;
