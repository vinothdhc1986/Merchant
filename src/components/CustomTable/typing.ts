/* eslint-disable @typescript-eslint/no-empty-interface */
interface Props {
  dataSource;
  columns;
  handleSorting?: CallableFunction;
  totalRecords?: number;
  showPagination?: boolean;
  currentPage?: number | string;
  onPageChangeHandler?: CallableFunction;
  sortBy?: string;
  orderBy?: string;
  isSortingTwoWayBinded?: boolean;
}

export default Props;
