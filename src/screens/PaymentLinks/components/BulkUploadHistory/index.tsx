import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { subDays } from 'date-fns';
import DateRange from '../../../../components/DateRange';
import AboutHeader from '../../../../components/AboutHeader';
import Breadcrumb from '../../../../components/Breadcrumb';
import SearchField from '../../../../components/SearchField';
import CustomTable from '../../../../components/CustomTable';
import { getBulkUploadHistoryAction } from '../../../../redux/actions/paymentLinks';
import { downloadCsvAction } from 'redux/actions/downloadCsv';
import CustomNoDataFound from '../../../../components/CustomNoDataFound';
import { PER_PAGE_LIMIT } from 'lib/constants';
import {
  tableConstants,
  PAYMENT_LINK_BULK_UPLOAD_HISTORY_BREADCRUMB_CONFIG,
  DEFAULT_DATE_RANGE_DAYS,
} from './constants';
import {
  getMerchantIdFromStore,
  formatToIST,
  getBase64Data,
  getDateRangeTitle,
} from '../../../../lib/helper';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import Props, { ListPayload } from './typing';
import './style.scss';

const BulkUploadHistory: FC<Props> = (props): JSX.Element => {
  const { bulkHistoryRecords, totalRecords } = props;

  const [searchValue, setSearchValue] = useState('');
  const [apiParams, setApiParams] = useState({
    search: '',
    page: 1,
    dateRange: {
      startDate: subDays(new Date(), DEFAULT_DATE_RANGE_DAYS),
      endDate: new Date(),
      key: 'selection',
    },
    sortBy: '',
    orderBy: '',
  });
  const [isDateRangeModal, setIsDateRangeModal] = useState(false);

  const merchantId = getMerchantIdFromStore();

  const fetchBulkHistoryListing = ({
    startDate,
    endDate,
    filename,
    pageNo,
    sortBy,
    orderBy,
  }: ListPayload) => {
    if (!props.isAdmin)
      pushClevertapEvent({
        eventName:
          clevertapEventConfigList.PAYMENT_LINKS_BULK_UPLOAD_HISTORY_VIEWED
            .eventName,
        eventPayload: {
          reportDate: getDateRangeTitle(startDate, endDate),
        },
      });
    props.getBulkUploadHistoryAction({
      pageNo,
      limit: PER_PAGE_LIMIT,
      payload: getBase64Data({
        start_date: formatToIST(new Date(startDate)),
        end_date: formatToIST(new Date(endDate)),
        file_name: filename || '',
        merchant_id: merchantId,
        sort_by: sortBy,
        order_by: orderBy,
      }),
    });
  };

  useEffect(() => {
    fetchBulkHistoryListing({
      startDate: apiParams.dateRange.startDate,
      endDate: apiParams.dateRange.endDate,
      filename: apiParams.search,
      pageNo: apiParams.page,
      sortBy: apiParams.sortBy,
      orderBy: apiParams.orderBy,
    });
  }, [apiParams]);

  const onPageChange = (pageNo) => {
    setApiParams({
      ...apiParams,
      page: pageNo,
    });
  };

  const dateRangeSaveHandler = (value) => {
    setIsDateRangeModal(false);
    setApiParams({
      ...apiParams,
      page: 1,
      dateRange: { ...value },
    });
  };

  const onSearch = () => {
    setApiParams({
      ...apiParams,
      page: 1,
      search: searchValue,
    });
  };

  // Handle Sorting
  const handleSorting = ({
    columnName,
    order,
  }: {
    columnName: string;
    order: string;
  }) => {
    setApiParams({
      ...apiParams,
      sortBy: columnName,
      orderBy: order,
    });
  };

  return (
    <React.Fragment>
      <div className='bulk-history-container payment-link-bulk-upload-history'>
        <AboutHeader
          title='Payment Link'
          content='View all payment links here.'
        />
        <div className='heading-title'>
          <div className='heading-detail'>
            <Breadcrumb
              config={PAYMENT_LINK_BULK_UPLOAD_HISTORY_BREADCRUMB_CONFIG}
              showIcon={true}
              svgIcon='white-payment-links'
              svgDetail='Bulk Upload History'
              description='View History for Bulk Payment Link Upload'
            />
          </div>
        </div>
        <div className='filtering-row'>
          <SearchField
            name='search'
            placeholder={'Search for a File Name'}
            searchValue={searchValue}
            handleChange={(e) => setSearchValue(e.target.value)}
            handleSubmit={onSearch}
          />
          <DateRange
            cancelHandler={() => setIsDateRangeModal(false)}
            saveHandler={(value) => dateRangeSaveHandler(value)}
            dateRange={apiParams.dateRange}
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
            currentPage={apiParams.page}
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

const mapStateToProps = ({ paymentLinksReducer, loginReducer }) => ({
  bulkHistoryRecords:
    paymentLinksReducer.bulkUploadHistoryState?.data?.bulkUploadHistoryList ??
    [],
  totalRecords:
    paymentLinksReducer.bulkUploadHistoryState?.data?.totalRows ?? 0,
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, {
  getBulkUploadHistoryAction,
  downloadCsvAction,
})(BulkUploadHistory);
