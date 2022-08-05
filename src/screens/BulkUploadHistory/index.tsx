import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { subDays } from 'date-fns';
import DateRange from '../../components/DateRange';
import AboutHeader from '../../components/AboutHeader';
import Breadcrumb from '../../components/Breadcrumb';
import SearchField from '../../components/SearchField';
import CustomTable from '../../components/CustomTable';
import { getRefundBulkUploadHistoryListAction } from '../../redux/actions/refund';
import { downloadCsvAction } from 'redux/actions/downloadCsv';
import {
  tableConstants,
  REFUND_BULK_UPLOAD_HISTORY_BREADCRUMB_CONFIG,
} from './bulkHistory.constants';
import { getMerchantIdFromStore, formatToIST } from '../../lib/helper';
import CustomNoDataFound from '../../components/CustomNoDataFound';
import Props, { ListPayload, DateRangeType } from './typing';
import './style.scss';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';

const BulkUploadHistory: FC<Props> = (props): JSX.Element => {
  const { bulkHistoryRecords, totalRecords } = props;

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: () => {},
  });

  const [page, setPage] = useState(1);
  const [isDateRangeModal, setIsDateRangeModal] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    // Todo: update the value for: up to current day
    startDate: subDays(new Date(), 7),
    endDate: new Date(),
    key: 'selection',
  });

  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('');

  const merchantId = getMerchantIdFromStore();

  const fetchBulkHistoryListing = ({
    startDate,
    endDate,
    filename,
    pageNo,
    sortBy,
    orderBy,
  }: ListPayload) => {
    props.getRefundBulkUploadHistoryListAction({
      start_date: formatToIST(new Date(startDate)),
      end_date: formatToIST(new Date(endDate)),
      file_name: filename,
      page_no: pageNo,
      limit: 10,
      merchant_id: merchantId,
      sort_by: sortBy || 'file_name',
      order_by: orderBy || 'ASC',
    });
  };

  useEffect(() => {
    if (!props.isAdmin)
      pushClevertapEvent(
        clevertapEventConfigList.REFUND_BULK_UPLOAD_HISTORY_SHOWN
      );
    fetchBulkHistoryListing({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      filename: '',
      pageNo: 1,
      sortBy,
      orderBy,
    });
  }, []);

  const onPageChange = (pageNo) => {
    fetchBulkHistoryListing({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      filename: formik.values.search,
      pageNo,
      sortBy,
      orderBy,
    });
    setPage(pageNo);
  };

  const dateRangeSaveHandler = (value) => {
    fetchBulkHistoryListing({
      startDate: value.startDate,
      endDate: value.endDate,
      filename: formik.values.search,
      pageNo: 1,
      sortBy,
      orderBy,
    });
    setDateRange(value);
    setIsDateRangeModal(false);
    setPage(1);
  };

  const onSearch = () => {
    fetchBulkHistoryListing({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      filename: formik.values.search,
      pageNo: 1,
      sortBy,
      orderBy,
    });
    setPage(1);
  };

  // Handle Sorting
  const handleSorting = ({
    columnName,
    order,
  }: {
    columnName: string;
    order: string;
  }) => {
    fetchBulkHistoryListing({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      filename: formik.values.search,
      pageNo: page,
      sortBy: columnName,
      orderBy: order,
    });
    setOrderBy(order);
    setSortBy(columnName);
  };

  return (
    <React.Fragment>
      <div className='bulk-history-container'>
        <AboutHeader
          title='About Refunds'
          content='View all refunds executed across multiple payment gateways.'
        />
        <div className='heading-title'>
          <div className='heading-detail'>
            <Breadcrumb
              config={REFUND_BULK_UPLOAD_HISTORY_BREADCRUMB_CONFIG}
              showIcon={true}
              svgIcon='refunds-icon-white'
              svgDetail='Bulk Upload History'
              description='View History for Bulk Refunds Uploads'
            />
          </div>
        </div>
        <div className='filtering-row'>
          <SearchField
            name='search'
            placeholder={'Search for a File Name'}
            searchValue={formik.values.search}
            handleChange={formik.handleChange}
            handleSubmit={onSearch}
          />
          <DateRange
            cancelHandler={() => setIsDateRangeModal(false)}
            saveHandler={(value) => dateRangeSaveHandler(value)}
            dateRange={dateRange}
            visible={isDateRangeModal}
            onVisibleChange={(visible: boolean) => setIsDateRangeModal(visible)}
          />
        </div>
        {bulkHistoryRecords.length > 0 ? (
          <CustomTable
            columns={tableConstants({
              merchantId,
              handleDownloadCsv: props.downloadCsvAction,
            })}
            dataSource={bulkHistoryRecords}
            handleSorting={handleSorting}
            showPagination={Boolean(totalRecords > 0)}
            currentPage={page}
            onPageChangeHandler={onPageChange}
            totalRecords={totalRecords}
          />
        ) : (
          <CustomNoDataFound
            title='There are no bulk upload history records here!'
            subTitle='Your bulk upload history details will show up here!'
          />
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ refundReducer, loginReducer }) => ({
  bulkHistoryRecords:
    refundReducer.refundBulkUploadHistoryState.data.files_data || [],
  totalRecords:
    refundReducer.refundBulkUploadHistoryState.data.total_files || 0,
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, {
  getRefundBulkUploadHistoryListAction,
  downloadCsvAction,
})(BulkUploadHistory);
