import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import BulkUploadModal from '../../components/CustomDropzone';
import SubHeader from '../../components/SubHeader';
import AboutHeader from '../../components/AboutHeader';
import FilterRow from '../../components/FilterRow';
import CustomTable from '../../components/CustomTable';
import { format } from 'date-fns';
import Button from '../../components/Button';
import CustomNoDataFound from 'components/CustomNoDataFound';
import {
  dateRangeUpToToday,
  checkPermissions,
  getMerchantIdFromStore,
} from '../../lib/helper';
import { tableConstants, SORTING_ENUM } from './bulkPayouts.constants';
import apiEndpoints from 'lib/apiEndpoints';
import {
  bulkPayoutListAction,
  clearBulkPayoutListAction,
} from '../../redux/actions/payouts';
import { PER_PAGE_LIMIT } from '../../lib/constants';
import config from '../../config';
import { downloadCsvAction } from 'redux/actions/downloadCsv';
import Props, {
  BulkPayoutListingPayloadType,
  SelectedRowIdType,
} from './typing';
import { DateRangeType } from '../../lib/typing';
import '../IndividualPayouts/style.scss';

const BulkPayouts: FC<Props> = (props): JSX.Element => {
  const merchantId = getMerchantIdFromStore();
  const { isAdmin } = props.loginState;
  const { bulkPayoutList, totalRecords } = props;

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [isDateRangeModal, setIsDateRangeModal] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeType | null>(
    dateRangeUpToToday()
  );

  const [isBulkPayoutsModal, setIsBulkPayoutsModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<SelectedRowIdType>(null);

  const filterRowProps = {
    dateRangePicker: {
      dateRange: dateRange,
      cancelHandler: () => setIsDateRangeModal(false),
      saveHandler: (value) => dateRangeSaveHandler(value),
      visible: isDateRangeModal,
      onVisibleChange: (visible: boolean) => setIsDateRangeModal(visible),
    },
    accountBalance: {
      onClick: () => {},
    },
    faq: {
      onClick: () => {},
    },
  };

  const dateRangeSaveHandler = (value: DateRangeType) => {
    setDateRange(value);
    setIsDateRangeModal(false);
    setPage(1);
  };

  const handleDownloadActionBtn = (fileId: number | string) => {
    setSelectedRowId(null);

    const url = `${config.API.API_PAYOUTS_URL}/${
      apiEndpoints.DOWNLOAD_BULK_PAYOUT_RECORD
    }?fileId=${fileId}&fileType=${'PAYOUT'}&merchantId=${merchantId}`;
    props.downloadCsvAction({ url });
  };

  const fetchBulkPayoutListing = ({
    pageNo,
    orderBy,
    sortBy,
    fromDate,
    toDate,
  }: BulkPayoutListingPayloadType) => {
    const requestPayload = {
      pageNumber: pageNo || 1,
      pageSize: PER_PAGE_LIMIT,
      ...(orderBy && { orderBy }),
      ...(sortBy && { sortBy }),
      ...(fromDate && {
        fromDate: format(new Date(fromDate), 'yyyy-MM-dd'),
      }),
      ...(toDate && {
        toDate: format(new Date(toDate), 'yyyy-MM-dd'),
      }),
      merchantId: merchantId,
    };
    props.bulkPayoutListAction(requestPayload);
  };

  useEffect(() => {
    fetchBulkPayoutListing({
      pageNo: page,
      orderBy,
      sortBy,
      fromDate: dateRange?.startDate,
      toDate: dateRange?.endDate,
    });
  }, [page, orderBy, sortBy, dateRange]);

  const handleSorting = ({
    columnName,
    order,
  }: {
    columnName: string;
    order: string;
  }) => {
    const sortingKey = order ? columnName : '';
    const sortingOrder = order || '';
    setSortBy(SORTING_ENUM[sortingKey]);
    setOrderBy(sortingOrder);
  };

  const onPageChange = (pageNo: number) => setPage(pageNo);

  return (
    <React.Fragment>
      <div className='individual-payouts-container'>
        {!isAdmin && (
          <AboutHeader
            title='About Bulk Payouts'
            content='Initiate payouts to unlimited vendors in one go all from your dashboard.'
          />
        )}

        <SubHeader
          title='Bulk Payouts'
          description='All bulk payouts ever uploaded are listed here'
          showIcon={true}
          svgIcon='bulk-payout-subheader'
          svgDetail='bulk-payouts'
          extraButtons={
            checkPermissions('CREATE_PAYOUTS') ? (
              <Button
                btnStyleClass={`secondry-button ${
                  isBulkPayoutsModal && 'focus-button'
                }`}
                label='Initiate Payout'
                onClick={() => {
                  setIsBulkPayoutsModal(!isBulkPayoutsModal);
                }}
                enable={true}
              />
            ) : undefined
          }
        />
        <FilterRow filterRowProps={filterRowProps} />

        {totalRecords > 0 ? (
          <CustomTable
            dataSource={bulkPayoutList}
            showPagination={Boolean(totalRecords > 0)}
            currentPage={page}
            onPageChangeHandler={onPageChange}
            totalRecords={totalRecords}
            handleSorting={handleSorting}
            columns={tableConstants({
              selectedRowId,
              setSelectedRowId,
              handleDownloadActionBtn,
            })}
          />
        ) : (
          <CustomNoDataFound
            title='There are no Bulk Payouts here!'
            subTitle='Your Bulk Payouts will show up here!'
          />
        )}

        {isBulkPayoutsModal && (
          <BulkUploadModal
            closeModal={() => setIsBulkPayoutsModal(false)}
            title={'Initiate Bulk Payouts'}
            uploadCsvEndpoint={apiEndpoints.UPLOAD_BULK_PAYOUT}
            downloadSampleCsvEndpoint={apiEndpoints.GET_PAYOUT_BULK_UPLOAD_CSV_TEMPLATE(
              'PAYOUT'
            )}
            sourceId={2}
            baseURL={config.API.API_PAYOUTS_URL}
            fetchListAfterUploadBulk={() =>
              fetchBulkPayoutListing({
                pageNo: page,
                orderBy,
                sortBy,
                fromDate: dateRange?.startDate,
                toDate: dateRange?.endDate,
              })
            }
          />
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({
  validationReducer,
  loginReducer,
  payoutsReducer,
}) => ({
  loginState: loginReducer.loginState,
  validationErrors: validationReducer.validationErrorState.validationErrors,
  bulkPayoutList: payoutsReducer.bulkPayoutListState?.body?.data ?? [],
  totalRecords: payoutsReducer.bulkPayoutListState?.body?.totalRecords ?? 0,
});

export default connect(mapStateToProps, {
  bulkPayoutListAction,
  clearBulkPayoutListAction,
  downloadCsvAction,
})(BulkPayouts);
