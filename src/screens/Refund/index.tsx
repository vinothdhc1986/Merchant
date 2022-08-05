import React, {
  FC,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { connect } from 'react-redux';
import { subDays } from 'date-fns';
import Button from '../../components/Button';
import Filter from '../../components/Filter';
import config from '../../config';
import DateRange from '../../components/DateRange';
import useRedirect from '../../hooks/useRedirect';
import AboutHeader from '../../components/AboutHeader';
import SideModal from '../../components/SideModal';
import CustomTable from '../../components/CustomTable';
import CustomizeModal from '../../components/CustomizeModal';
import RefundSideModalBody from './components/RefundSideModalBody';
import TransactionSideModalBody from './components/TransactionSideModalBody';
import SubHeader from 'components/SubHeader';
import BulkUploadModal from '../../components/CustomDropzone';
import { getGatewayListAction } from '../../redux/actions/smartRouting';
import DownloadModal from '../../components/DownloadPopup';
import {
  getMerchantIdFromStore,
  checkPermissions,
  getDateRangeTitle,
} from '../../lib/helper';
import CustomNoDataFound from '../../components/CustomNoDataFound';
import {
  getRefundListAction,
  getAllRefundStatusAction,
} from '../../redux/actions/refund';
import { getOrderTransactionDetailsAction } from '../../redux/actions/payment';
import { downloadCsvAction } from 'redux/actions/downloadCsv';
import AppliedFiltersComponent from '../../components/AppliedFilters';
import {
  formatToIST,
  getGatewayName,
  getGatewayId,
  getPrevMidNightTimeStamp,
  getNextMidNightTimeStamp,
} from '../../lib/helper';
import {
  tableConstants,
  INIT_VISIBLE_COLUMNS_IDS,
  filterFields,
  columnsList,
  initFilterPayload,
  BULK_UPLOAD_SOURCE_ID,
} from './refund.constants';
import {
  UiRoutes,
  PER_PAGE_LIMIT,
  FILTER_KEYS_MAPPING,
} from '../../lib/constants';
import apiEndpoints from 'lib/apiEndpoints';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import {
  phoneValidationRegex,
  numericValidationRegex,
  emailValidationRegex,
} from '../../lib/constants';
import imgURL from '../../lib/imgURL';
import { DateRangeType } from '../../lib/typing';
import Props, { GetRefundListApiPayloadType } from './typing';
import './style.scss';

const Refund: FC<Props> = (props): JSX.Element => {
  const MERCHANT_ID = getMerchantIdFromStore();
  const { push, generatePath } = useRedirect();

  const {
    totalRecords,
    refundListRecords,
    getAllRefundStatusList,
    orderTransactionDetails,
    isorderTransactionDetailsFetching,
  } = props;

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [isCustomizeModal, setIsCustomizeModal] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Array<string>>(
    INIT_VISIBLE_COLUMNS_IDS
  );

  const [isFilter, setIsFilter] = useState(false);
  const [filterPayload, setFilterPayload] = useState(initFilterPayload);
  const [appliedFilter, setAppliedFilter] = useState(initFilterPayload);
  const [appliedFiltersList, setAppliedFiltersList] = useState<any[]>([]);
  const [filterValidationError, setFilterValidationError] = useState({});
  const [filterIsTouchedPayload, setFilterIsTouchedPayload] = useState({});

  const [isRefundSideModal, setIsRefundSideModal] = useState(false);
  const [isTransactionSideModal, setIsTransactionModal] =
    useState<boolean>(false);
  const [selectedRowForRefund, setSelectedRowForRefund] = useState<any>(null);
  const [selectedRowForTransaction, setSelectedRowForTransaction] =
    useState<any>(null);

  const [isDateRangeModal, setIsDateRangeModal] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: subDays(
      new Date(getPrevMidNightTimeStamp(new Date().getTime())),
      7
    ),
    endDate: new Date(getNextMidNightTimeStamp(new Date().getTime())),
    key: 'selection',
  });

  const [isBulkUpload, setIsBulkUpload] = useState(false);

  const [isDownloadModal, setIsDownloadModal] = useState(false);

  // Fetch Refunds Listing
  const fetchRefundsListing = ({
    fromDate,
    toDate,
    pageNo,
    filters,
    sortBy,
    orderBy,
  }: GetRefundListApiPayloadType) => {
    let requestPayload = {
      sortBy,
      orderBy,
    };
    if (fromDate && toDate) {
      requestPayload['fromDate'] = formatToIST(new Date(fromDate));
      requestPayload['toDate'] = formatToIST(new Date(toDate));
    }
    if (filters) {
      const filterPayloadCopy = {
        ...filters,
        refundStatus: filters.refundStatus.map(
          (item: string): string => item.split('-')[1]
        ),
        paymentGateway: filters.paymentGateway.map((item: string) => {
          if (item !== null) {
            return getGatewayId(item);
          }
        }),
      };
      requestPayload = {
        ...requestPayload,
        ...filterPayloadCopy,
      };
    }
    props.getRefundListAction({
      pageNo: pageNo,
      limit: PER_PAGE_LIMIT,
      merchantId: MERCHANT_ID,
      payload: {
        ...requestPayload,
      },
    });
  };

  const onPageChange = (pageNo) => {
    fetchRefundsListing({
      pageNo,
      filters: { ...appliedFilter },
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
      sortBy,
      orderBy,
    });
    setPage(pageNo);
  };

  useEffect(() => {
    fetchRefundsListing({
      pageNo: 1,
      filters: { ...appliedFilter },
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
    });
    props.getGatewayListAction(MERCHANT_ID);
    props.getAllRefundStatusAction();
  }, []);

  const disableToolbar = useMemo(() => {
    return !refundListRecords.length && !appliedFiltersList.length;
  }, [appliedFiltersList, refundListRecords]);

  const dateRangeSaveHandler = (value) => {
    setDateRange(value);
    setIsDateRangeModal(false);
    fetchRefundsListing({
      pageNo: 1,
      filters: { ...appliedFilter },
      fromDate: value.startDate,
      toDate: value.endDate,
      sortBy,
      orderBy,
    });
    setPage(1);
  };

  const refundIdClickHandler = (rowData) => {
    const payload = {
      OrderId: rowData.OrderId,
      MerchantId: MERCHANT_ID,
      TransactionId: rowData.RefundId,
      TxnType: 10,
    };
    props.getOrderTransactionDetailsAction(payload);
    setIsRefundSideModal(true);
    setIsTransactionModal(false);
    setSelectedRowForRefund(rowData);
  };

  const transactionIdClickHandler = (rowData) => {
    const payload = {
      OrderId: rowData.OrderId,
      MerchantId: MERCHANT_ID,
      TransactionId: rowData.TransactionId,
      TxnType: 1,
    };
    props.getOrderTransactionDetailsAction(payload);
    setIsTransactionModal(true);
    setIsRefundSideModal(false);
    setSelectedRowForTransaction(rowData);
  };

  const filterHandler = (fieldName, value, fieldType) => {
    const filterPayloadCopy = { ...filterPayload };

    switch (fieldName) {
      case 'orderIds':
      case 'customerDetails':
        if (fieldType === 'select') {
          const newData = {
            selectKey: value,
            inputValue: '',
          };

          // Resetting validation for the following field
          setFilterValidationError({
            ...filterValidationError,
            // TODO: Error message to be fetched from API
            [fieldName]: '',
          });
          setFilterIsTouchedPayload({
            ...filterIsTouchedPayload,
            [fieldName]: false,
          });
          filterPayloadCopy[fieldName] = newData;
        } else {
          // Filter Validations
          const newData = {
            selectKey: filterPayloadCopy[fieldName][`selectKey`],
            inputValue: value,
          };
          if (filterPayloadCopy[fieldName][`selectKey`] === 'customerPhone') {
            if (numericValidationRegex.test(value) || value === '') {
              filterPayloadCopy[fieldName] = newData;
              if (!phoneValidationRegex.test(value) && value) {
                setFilterValidationError({
                  ...filterValidationError,
                  // TODO: Error message to be fetched from API
                  [fieldName]: 'Invalid Phone Number',
                });
              } else {
                setFilterValidationError({
                  ...filterValidationError,
                  // TODO: Error message to be fetched from API
                  [fieldName]: '',
                });
              }
            }
          } else if (
            filterPayloadCopy[fieldName][`selectKey`] === 'customerEmail'
          ) {
            filterPayloadCopy[fieldName] = newData;
            if (!emailValidationRegex.test(value) && value) {
              setFilterValidationError({
                ...filterValidationError,
                // TODO: Error message to be fetched from API
                [fieldName]: 'Invalid Email',
              });
            } else {
              setFilterValidationError({
                ...filterValidationError,
                // TODO: Error message to be fetched from API
                [fieldName]: '',
              });
            }
          } else {
            if (numericValidationRegex.test(value) || value === '') {
              filterPayloadCopy[fieldName] = newData;
            }
          }
        }
        break;
      case 'refundStatus':
      case 'paymentGateway':
        if (filterPayloadCopy[fieldName].includes(value)) {
          const newData = filterPayloadCopy[fieldName].filter(
            (item) => item !== value
          );
          filterPayloadCopy[fieldName] = newData;
        } else {
          const newData = [...filterPayloadCopy[fieldName]];
          newData.push(value);
          filterPayloadCopy[fieldName] = newData;
        }
        break;
      default:
        break;
    }
    setFilterPayload(filterPayloadCopy);
  };

  const handleFilterInputBlur = useCallback(
    (name) => {
      setFilterIsTouchedPayload({
        ...filterIsTouchedPayload,
        [name]: true,
      });
    },
    [filterIsTouchedPayload]
  );

  const getRefundStatusName = useCallback((str: string): string => {
    return str.split('-')[0];
  }, []);

  /**
   * @ Update applied filter list, if there is any update in filters
   */
  useEffect(() => {
    const allFilters: { keyName: string; value: string }[] = [];
    if (appliedFilter.orderIds.inputValue) {
      allFilters.push({
        keyName: FILTER_KEYS_MAPPING[appliedFilter.orderIds.selectKey],
        value: appliedFilter.orderIds.inputValue,
      });
    }
    if (appliedFilter.customerDetails.inputValue) {
      allFilters.push({
        keyName: FILTER_KEYS_MAPPING[appliedFilter.customerDetails.selectKey],
        value: appliedFilter.customerDetails.inputValue,
      });
    }
    if (appliedFilter.paymentGateway.length > 0) {
      appliedFilter.paymentGateway.map((item) => {
        allFilters.push({
          keyName: 'Payment Gateway',
          value: `${getGatewayName(item)}`,
        });
      });
    }
    if (appliedFilter.refundStatus.length > 0) {
      appliedFilter.refundStatus.map((item) => {
        allFilters.push({
          keyName: 'Refund Status',
          value: `${getRefundStatusName(item)}`,
        });
      });
    }

    setAppliedFiltersList(allFilters);
  }, [appliedFilter]);

  /**
   * Removed any specific filter Handler
   */
  const removeFilterHandler = ({ keyName, value }) => {
    const appliedFilterCopy = { ...appliedFilter };
    switch (keyName) {
      case 'Refund ID':
      case 'Transaction ID':
      case 'Order ID':
        appliedFilterCopy['orderIds'] = {
          selectKey: '',
          inputValue: '',
        };
        break;
      case 'Customer ID':
      case 'Customer Phone':
      case 'Customer Email':
        appliedFilterCopy['customerDetails'] = {
          selectKey: '',
          inputValue: '',
        };
        break;
      case 'Payment Gateway':
        appliedFilterCopy.paymentGateway =
          appliedFilterCopy.paymentGateway.filter(
            (item: string): boolean => !item.includes(value)
          );
        break;
      case 'Refund Status':
        appliedFilterCopy.refundStatus = appliedFilterCopy.refundStatus.filter(
          (item: string): boolean => !item.includes(value)
        );
        break;
      default:
        break;
    }
    fetchRefundsListing({
      pageNo: 1,
      filters: { ...appliedFilterCopy },
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
      sortBy,
      orderBy,
    });
    setAppliedFilter(appliedFilterCopy);
    setFilterPayload(appliedFilterCopy);
    setPage(1);
  };

  const handleSubmitFilter = () => {
    const filterPayloadCopy = JSON.parse(JSON.stringify(filterPayload));
    fetchRefundsListing({
      pageNo: 1,
      filters: { ...filterPayloadCopy },
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
      sortBy,
      orderBy,
    });
    setPage(1);
    setIsFilter(false);
    setAppliedFilter(filterPayloadCopy);
  };

  // Handle Sorting
  const handleSorting = ({
    columnName,
    order,
  }: {
    columnName: string;
    order: string;
  }) => {
    const sortingKey = order ? columnName : '';
    const sortingOrder = order || '';
    fetchRefundsListing({
      pageNo: page,
      filters: { ...appliedFilter },
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
      sortBy: sortingKey,
      orderBy: sortingOrder,
    });
    setOrderBy(sortingOrder);
    setSortBy(sortingKey);
  };

  const handleDownload = () => {
    const payload = {
      ...appliedFilter,
      fromDate: formatToIST(new Date(dateRange.startDate)),
      toDate: formatToIST(new Date(dateRange.endDate)),
    };
    let filterPayloadCopy = {};
    if (payload) {
      filterPayloadCopy = {
        ...payload,
        refundStatus: payload.refundStatus.map(
          (item: string): string => item.split('-')[1]
        ),
        paymentGateway: payload.paymentGateway.map((item: string) => {
          if (item !== null) {
            return getGatewayId(item);
          }
        }),
      };
    }
    if (!props.isAdmin)
      pushClevertapEvent({
        eventName: clevertapEventConfigList.REFUND_REPORT_DOWNLOADED.eventName,
        eventPayload: {
          reportDate:
            getDateRangeTitle(dateRange.startDate, dateRange.endDate) ||
            'Custom Date',
        },
      });
    const base64data = btoa(JSON.stringify(filterPayloadCopy));
    props.downloadCsvAction({
      url: `${config.API.API_BASE_URL}/api/v1/dashboard/transaction/transaction/DownloadPaymentPage/10/${MERCHANT_ID}?token=${base64data}`,
    });
  };

  return (
    <React.Fragment>
      <div className='refund-container'>
        <AboutHeader
          title='About Refunds'
          content='View all refunds executed across multiple payment gateways.'
        />
        <SubHeader
          title='Refunds'
          description='Details of refunds executed across payment gateways. For
        initiating a refund, please visit the payments page and click on
        the transaction ID for execution.
      '
          showIcon={true}
          svgIcon='refunds-icon-white'
          svgDetail='Refunds'
          extraButtons={
            checkPermissions('CREATE_REFUND') ? (
              <Button
                btnStyleClass='secondry-button'
                label='Upload Bulk Refunds'
                onClick={() => setIsBulkUpload(true)}
                enable={true}
              />
            ) : undefined
          }
        />
        <div className='filtering-row'>
          <DateRange
            cancelHandler={() => setIsDateRangeModal(false)}
            saveHandler={(value) => dateRangeSaveHandler(value)}
            dateRange={dateRange}
            visible={isDateRangeModal}
            onVisibleChange={(visible: boolean) => setIsDateRangeModal(visible)}
          />
          <div className='filter-by'>
            <button
              onClick={() => {
                setIsFilter(true);
                setFilterValidationError({});
                setFilterIsTouchedPayload({});
              }}
              disabled={disableToolbar}
              className={disableToolbar ? 'disable-element' : ''}
            >
              <img src={imgURL['filter-icon']} alt='Filter By' /> Filter By
            </button>
          </div>
          <button
            onClick={() => {
              push(generatePath(UiRoutes.REFUND_BULK_UPLOAD_HISTORY));
            }}
          >
            <img src={imgURL['bulk-logo']} alt='Bulk Upload History' /> Bulk
            Upload History
          </button>
          <button
            onClick={() => setIsCustomizeModal(true)}
            disabled={
              !(Array.isArray(refundListRecords) && refundListRecords.length)
            }
            className={
              !(Array.isArray(refundListRecords) && refundListRecords.length)
                ? 'disable-element'
                : ''
            }
          >
            <img src={imgURL['grid-icon']} alt='Customize Columns' /> Customize
            Columns
          </button>
          <button
            onClick={() => {
              setIsDownloadModal(true);
              handleDownload();
              setTimeout(() => setIsDownloadModal(false), 3000);
            }}
            disabled={
              !(Array.isArray(refundListRecords) && refundListRecords.length)
            }
            className={
              !(Array.isArray(refundListRecords) && refundListRecords.length)
                ? 'disable-element'
                : ''
            }
          >
            <img src={imgURL['download-icon']} alt='Download' /> Download
          </button>
        </div>
        {appliedFiltersList.length > 0 && (
          <AppliedFiltersComponent
            appliedFiltersList={appliedFiltersList}
            removeFilterHandler={removeFilterHandler}
            clearAllHandler={() => {
              fetchRefundsListing({
                pageNo: 1,
                filters: { ...initFilterPayload },
                fromDate: dateRange.startDate,
                toDate: dateRange.endDate,
              });
              setPage(1);
              setAppliedFilter(initFilterPayload);
              setFilterPayload(initFilterPayload);
            }}
          />
        )}
        {refundListRecords.length > 0 ? (
          <CustomTable
            columns={tableConstants(
              visibleColumns,
              refundIdClickHandler,
              transactionIdClickHandler
            )}
            dataSource={refundListRecords}
            handleSorting={handleSorting}
            showPagination={Boolean(totalRecords > 0)}
            currentPage={page}
            onPageChangeHandler={onPageChange}
            totalRecords={totalRecords}
          />
        ) : (
          <CustomNoDataFound
            title='There are no refunds here!'
            subTitle='Your refund details will show up here!'
          />
        )}
      </div>
      {isFilter && (
        <Filter
          closeFilter={() => {
            setIsFilter(false);
            setFilterPayload(appliedFilter);
          }}
          applyFilter={handleSubmitFilter}
          resetFilter={() => {
            setFilterPayload({ ...initFilterPayload });
            setFilterValidationError({});
            setFilterIsTouchedPayload({});
          }}
          columns={filterFields(
            filterPayload,
            filterHandler,
            handleFilterInputBlur,
            getAllRefundStatusList,
            {
              paymentGateway: props.allGatewaysList,
              filterValidationError,
              filterIsTouchedPayload,
            }
          )}
          disableSubmit={Object.values(filterValidationError).some((el) => el)}
        />
      )}
      {isCustomizeModal && (
        <CustomizeModal
          closeModal={() => setIsCustomizeModal(false)}
          columnsList={columnsList}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />
      )}
      {isDownloadModal && (
        <DownloadModal
          totalRecords={totalRecords}
          cancelHandler={() => setIsDownloadModal(false)}
        />
      )}
      {isRefundSideModal && !isorderTransactionDetailsFetching && (
        <SideModal
          closeModal={() => setIsRefundSideModal(false)}
          title={'Refund Detail'}
          ModalBody={RefundSideModalBody}
          modalBodyProps={{
            rowData: selectedRowForRefund,
            orderTransactionDetails,
          }}
        />
      )}
      {isTransactionSideModal && !isorderTransactionDetailsFetching && (
        <SideModal
          closeModal={() => setIsTransactionModal(false)}
          title={'Transaction Detail'}
          ModalBody={TransactionSideModalBody}
          modalBodyProps={{
            rowData: selectedRowForTransaction,
            orderTransactionDetails,
          }}
        />
      )}

      {isBulkUpload && (
        <BulkUploadModal
          closeModal={() => setIsBulkUpload(false)}
          title={'Bulk Upload Refunds'}
          uploadCsvEndpoint={apiEndpoints.UPLOAD_BULK_REFUND(MERCHANT_ID)}
          downloadSampleCsvEndpoint={
            apiEndpoints.GET_REFUND_BULK_UPLOAD_CSV_TEMPLATE
          }
          sourceId={BULK_UPLOAD_SOURCE_ID}
          customFilename='sampleBatchRefund.csv'
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({
  refundReducer,
  paymentReducer,
  smartRoutingReducer,
  loginReducer,
}) => ({
  refundListRecords: refundReducer.refundList.data?.transactionDetailList ?? [],
  orderTransactionDetails:
    paymentReducer.orderTransactionDetails.data?.length > 0
      ? paymentReducer.orderTransactionDetails.data[0]
      : null,
  isorderTransactionDetailsFetching:
    paymentReducer.orderTransactionDetails.isLoading,
  totalRecords: refundReducer.refundList.data?.totalRowsInDB ?? 0,
  allGatewaysList:
    smartRoutingReducer.gatewayListState.list?.length > 0
      ? smartRoutingReducer.gatewayListState.list
      : [],
  getAllRefundStatusList:
    refundReducer.getAllRefundStatusList.data?.length > 0
      ? refundReducer.getAllRefundStatusList.data
      : [],
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, {
  getRefundListAction,
  getOrderTransactionDetailsAction,
  getGatewayListAction,
  getAllRefundStatusAction,
  downloadCsvAction,
})(Refund);
