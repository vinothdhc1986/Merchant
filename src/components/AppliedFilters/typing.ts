interface Props {
  appliedFiltersList?: Array<{
    keyName: string;
    value: string;
  }>;
  clearAllHandler?: any;
  removeFilterHandler?: any;
  isPendingListFilter?: boolean;
  appliedPendingFiltersList?: Array<string>;
  hideClearAllBtn?: boolean;
  removePendingListFilterHandler?: () => void;
}

export default Props;
