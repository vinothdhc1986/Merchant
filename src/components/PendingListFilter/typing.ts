/* eslint-disable @typescript-eslint/no-empty-interface */
interface Props {
  filterTitle: string;
  handleClickPendingFilter: (keyName: string) => void;
  handleRemovePendingFilter: (keyName: string) => void;
  filtersList: Array<{
    pendingRecords: number;
    label: string;
    key: string;
  }>;
  appliedPendingFiltersList: Array<string>;
}

export default Props;
