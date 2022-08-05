import React, { FC, useEffect, useState, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { subDays } from 'date-fns';
import config from '../../config';
import Modal from '../../components/Modal';
import Filter from '../../components/Filter';
import SideModal from '../../components/SideModal';
import DateRange from '../../components/DateRange';
import SubHeader from '../../components/SubHeader';
import CustomTable from '../../components/CustomTable';
import AboutHeader from '../../components/AboutHeader';
import RefundModalBody from './components/RefundModalBody';
import DownloadModal from '../../components/DownloadPopup';
import CustomizeModal from '../../components/CustomizeModal';
import CustomNoDataFound from '../../components/CustomNoDataFound';
import AppliedFiltersComponent from '../../components/AppliedFilters';
import { getGatewayListAction } from '../../redux/actions/smartRouting';
import OrderSummarySideModalBody from './components/OrderSummarySideModalBody';
import TransactionSideModalBody from './components/TransactionSideModalBody';
import imgURL from '../../lib/imgURL';
import notify from '../../lib/notifiy';
import {
  formatToIST,
  getMerchantIdFromStore,
  getPrevMidNightTimeStamp,
  getNextMidNightTimeStamp,
  getDateRangeTitle,
} from '../../lib/helper';
import {
  clearRefundAction,
  createRefundAction,
} from '../../redux/actions/refund';
import {
  getPaymentListAaction,
  getAllOrdersStatusAction,
  getOrderTransactionDetailsAction,
} from '../../redux/actions/payment';
import { downloadCsvAction } from 'redux/actions/downloadCsv';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import {
  PER_PAGE_LIMIT,
  FILTER_KEYS_MAPPING,
  numericValidationRegex,
  phoneValidationRegex,
  emailValidationRegex,
  decimalNumberValidationRegex,
  DEFAULT_API_SUCCESS,
} from '../../lib/constants';
import {
  tableConstants,
  INIT_VISIBLE_COLUMNS_IDS,
  COLUMNS_LIST,
  filterFields,
  initFilterPayload,
} from './payment.constants';
import { DateRangeType } from '../../lib/typing';
import Props, { GetPaymentListApiPayloadType } from './typing';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './style.scss';

const DEFAULT_AMOUNT_FILTER = 'isEqual';

const Payment: FC<Props> = (props): JSX.Element => {
  const MERCHANT_ID = getMerchantIdFromStore();
  const {
    totalRecords,
    PaymentListRecords,
    orderTransactionDetails,
    isorderTransactionDetailsFetching,
    getAllOrderStatusList,
    allGatewaysList,
    validationErrors,
  } = props;

  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(1);
  const [amountFilter, setAmountFilter] = useState(DEFAULT_AMOUNT_FILTER);
  const [visibleColumns, setVisibleColumns] = useState(
    INIT_VISIBLE_COLUMNS_IDS
  );
  const [isCustomizeModal, setIsCustomizeModal] = useState(false);
  const [isRefundModal, setIsRefundModal] = useState(false);
  const [selectedRowForRefund, setSelectedForRefund] = useState<any>(null);
  const [isFilter, setIsFilter] = useState(false);
  const [filterPayload, setFilterPayload] = useState(initFilterPayload);
  const [appliedFilter, setAppliedFilter] = useState(initFilterPayload);
  const [appliedFiltersList, setAppliedFiltersList] = useState<any[]>([]);
  const [filterValidationError, setFilterValidationError] = useState({});
  const [filterIsTouchedPayload, setFilterIsTouchedPayload] = useState({});

  const [isDownloadModal, setIsDownloadModal] = useState(false);
  const [clickedActionBtnId, setClickedActionBtnId] = useState<string | null>(
    null
  );

  const [isDateRangeModal, setIsDateRangeModal] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: subDays(
      new Date(getPrevMidNightTimeStamp(new Date().getTime())),
      7
    ),
    endDate: new Date(getNextMidNightTimeStamp(new Date().getTime())),
    key: 'selection',
  });

  const [isOrderSummarySideModal, setIsOrderSummarySideModal] = useState(false);
  const [isTransactionSideModal, setIsTransactionSideModal] = useState(false);
  const [
    selectedRowForTransactionDetails,
    setSelectedRowForTransactionDetails,
  ] = useState<any>(null);
  const [selectedRowForOrderSummary, setSelectedRowForOrderSummary] =
    useState<any>(null);

  const fetchPaymentsListing = ({
    fromDate,
    toDate,
    pageNo,
    filters,
    sortBy,
    orderBy,
  }: GetPaymentListApiPayloadType) => {
    let requestPayload = {
      sortBy,
      orderBy,
    };
    if (fromDate && toDate) {
      requestPayload['fromDate'] = formatToIST(new Date(fromDate));
      requestPayload['toDate'] = formatToIST(new Date(toDate));
    }

    if (filters) {
      let filterPayloadCopy = {
        ...filters,
        orderStatus: filters.orderStatus.map((item: string) => {
          if (item !== null) {
            return item.split('-')[1];
          }
        }),
        paymentGateway: filters.paymentGateway.map((item: string) => {
          if (item !== null) {
            return item.split('-')[1];
          }
        }),
      };
      if (filters.orderIds.selectKey === 'amount') {
        filterPayloadCopy = {
          ...filterPayloadCopy,
          orderIds: {
            ...filterPayloadCopy.orderIds,
            amountFilter,
          },
        };
      }
      requestPayload = {
        ...requestPayload,
        ...filterPayloadCopy,
      };
    }

    props.getPaymentListAaction({
      pageNo: pageNo,
      limit: PER_PAGE_LIMIT,
      merchantId: MERCHANT_ID,
      payload: {
        ...requestPayload,
      },
    });
  };

  const onPageChange = (pageNo: number) => {
    fetchPaymentsListing({
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
    fetchPaymentsListing({
      pageNo: 1,
      filters: { ...appliedFilter },
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
    });
    props.getGatewayListAction(`${MERCHANT_ID}`);
    props.getAllOrdersStatusAction();

    return () => {
      props.clearRefundAction();
    };
  }, []);

  const disableToolbar = useMemo(() => {
    return !PaymentListRecords.length && !appliedFiltersList.length;
  }, [appliedFiltersList, PaymentListRecords]);

  const fetchOrderTransactionDetails = (rowData) => {
    const payload = {
      OrderId: Number(rowData.OrderId),
      MerchantId: MERCHANT_ID,
      TransactionId: Number(rowData.TransactionId),
      TxnType: Number(rowData.TxnType || '1'),
    };
    props.getOrderTransactionDetailsAction(payload);
  };

  const transactionIdClickHandler = (rowData) => {
    fetchOrderTransactionDetails(rowData);
    setIsTransactionSideModal(true);
    setSelectedRowForTransactionDetails(rowData);
  };

  const orderIdClickHandler = (rowData) => {
    fetchOrderTransactionDetails(rowData);
    setIsOrderSummarySideModal(true);
    setSelectedRowForOrderSummary(rowData);
  };

  // update with new paymentlistrecords
  const refundClickHandler = (rowId) => {
    setIsRefundModal(true);
    setClickedActionBtnId(null);
    const data = PaymentListRecords.filter(
      (item) => item.TransactionId === rowId
    )[0];
    setSelectedForRefund(data);
  };

  const refundModalSaveHandler = (payload: {
    merchant_id: number;
    transaction_id: number;
    amount: number;
  }) => {
    props.createRefundAction(payload);
  };

  const filterHandler = (fieldName, value, fieldType) => {
    const filterPayloadCopy = JSON.parse(JSON.stringify(filterPayload));
    switch (fieldName) {
      case 'orderIds':
      case 'customerDetails':
        if (fieldType === 'select') {
          filterPayloadCopy[fieldName][`selectKey`] = value;
          filterPayloadCopy[fieldName][`inputValue`] = '';
          setAmountFilter(DEFAULT_AMOUNT_FILTER);
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
        } else {
          if (filterPayloadCopy[fieldName][`selectKey`] === 'customerPhone') {
            if (numericValidationRegex.test(value.split('-')[1]) || value === '') {
              filterPayloadCopy[fieldName][`inputValue`] = value;
              if (!phoneValidationRegex.test(value.split('-')[1]) && value) {
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
            filterPayloadCopy[fieldName][`inputValue`] = value;
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
          } else if (filterPayloadCopy[fieldName][`selectKey`] === 'amount') {
            if (
              (decimalNumberValidationRegex.test(value) &&
                parseFloat(value) >= 0) ||
              value === ''
            ) {
              filterPayloadCopy[fieldName][`inputValue`] = value;
            }
          } else {
            if (numericValidationRegex.test(value) || value === '') {
              filterPayloadCopy[fieldName][`inputValue`] = value;
            }
          }
        }
        break;
      case 'orderStatus':
        if (filterPayloadCopy[fieldName].includes(value)) {
          filterPayloadCopy[fieldName] = filterPayloadCopy[fieldName].filter(
            (item) => item !== value
          );
        } else {
          filterPayloadCopy[fieldName].push(value);
        }
        break;
      case 'paymentGateway':
        if (filterPayloadCopy[fieldName].includes(value)) {
          filterPayloadCopy[fieldName] = filterPayloadCopy[fieldName].filter(
            (item) => item !== value
          );
        } else {
          filterPayloadCopy[fieldName].push(value);
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

  const dateRangeSaveHandler = (value) => {
    setDateRange(value);
    setIsDateRangeModal(false);
    fetchPaymentsListing({
      pageNo: 1,
      filters: { ...appliedFilter },
      fromDate: value.startDate,
      toDate: value.endDate,
      sortBy,
      orderBy,
    });
    setPage(1);
  };

  const handleSubmitFilter = () => {
    const filterPayloadCopy = JSON.parse(JSON.stringify(filterPayload));
    fetchPaymentsListing({
      pageNo: 1,
      filters: { ...filterPayloadCopy },
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
      sortBy,
      orderBy,
    });
    setAppliedFilter(filterPayloadCopy);
    setIsFilter(false);
    setPage(1);
  };

  /**
   * Removed any specific filter Handler
   */
  const removeFilterHandler = ({ keyName, value }) => {
    const appliedFilterCopy = { ...appliedFilter };

    switch (keyName) {
      case 'Order ID':
      case 'Transaction ID':
      case 'Amount':
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
            (item: string) => !item.includes(value)
          );
        break;
      case 'Order Status':
        appliedFilterCopy.orderStatus = appliedFilterCopy.orderStatus.filter(
          (item: string) => !item.includes(value)
        );
        break;
      default:
        break;
    }
    // API Call After removing filter
    fetchPaymentsListing({
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
      appliedFilter.paymentGateway.map((item: string) => {
        allFilters.push({
          keyName: 'Payment Gateway',
          value: `${item.split('-')[0]}`,
        });
      });
    }
    if (appliedFilter.orderStatus.length > 0) {
      appliedFilter.orderStatus.map((item: string) => {
        allFilters.push({
          keyName: 'Order Status',
          value: `${item.split('-')[0]}`,
        });
      });
    }
    setAppliedFiltersList(allFilters);
  }, [appliedFilter]);

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
    fetchPaymentsListing({
      pageNo: page,
      filters: { ...appliedFilter },
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
      sortBy: sortingKey,
      orderBy: sortingOrder,
    });
    setSortBy(sortingKey);
    setOrderBy(sortingOrder);
  };

  useEffect(() => {
    const { isSuccess, data, isFailure } = props.createRefund;
    if (
      isSuccess &&
      (data.RESPONSE_CODE === '3550' ||
        data.RESPONSE_MESSAGE === 'REFUNDED_SUCCESSFULLY')
    ) {
      fetchPaymentsListing({
        pageNo: 1,
        filters: { ...appliedFilter },
        fromDate: dateRange.startDate,
        toDate: dateRange.endDate,
      });
      notify({
        type: 'success',
        message:
          validationErrors?.REFUND_INITIATE_SUCCESS ?? DEFAULT_API_SUCCESS,
        description:
          validationErrors?.REFUND_INITIATE_SUCCESS_DESCRIPTION?.replace(
            '${transactionId}',
            selectedRowForRefund?.TransactionId
          ) ?? '',
      });
      setIsRefundModal(false);
      props.clearRefundAction();
    }
    if (isFailure) {
      notify({
        type: 'error',
        message: props.createRefund.errorMessage,
        description: ``,
      });
    }
  }, [props.createRefund]);

  const handleDownload = () => {
    let filterPayloadCopy = {};
    if (appliedFilter) {
      filterPayloadCopy = {
        ...appliedFilter,
        orderStatus: appliedFilter.orderStatus.map((item: string) => {
          if (item !== null) {
            return item.split('-')[1];
          }
        }),
        paymentGateway: appliedFilter.paymentGateway.map((item: string) => {
          if (item !== null) {
            return item.split('-')[1];
          }
        }),
      };
    }
    const payload = {
      ...filterPayloadCopy,
      fromDate: formatToIST(new Date(dateRange.startDate)),
      toDate: formatToIST(new Date(dateRange.endDate)),
    };
    if (!props.isAdmin)
      pushClevertapEvent({
        eventName: clevertapEventConfigList.PAYMENT_REPORT_DOWNLOADED.eventName,
        eventPayload: {
          reportDate:
            getDateRangeTitle(dateRange.startDate, dateRange.endDate) ||
            'Custom Date',
        },
      });
    const base64data = btoa(JSON.stringify(payload));
    props.downloadCsvAction({
      url: `${config.API.API_BASE_URL}/api/v1/dashboard/transaction/transaction/DownloadPaymentPage/1/${MERCHANT_ID}?token=${base64data}`,
    });
  };

  return (
    <div className='payment-container'>
      <AboutHeader
        title='About Payments'
        content='Manage all transactions captured at any stage across multiple payment gateways.'
      />
      <SubHeader
        title='Payments'
        showIcon={true}
        svgIcon='payments-icon-white'
        svgDetail='Payments'
        description='This is a summary of all your transactions across multiple payment gateways'
      />
      <div className='filtering-row'>
        <DateRange
          cancelHandler={() => setIsDateRangeModal(false)}
          saveHandler={(value) => dateRangeSaveHandler(value)}
          dateRange={dateRange}
          onVisibleChange={(visible: boolean) => setIsDateRangeModal(visible)}
          visible={isDateRangeModal}
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
          onClick={() => setIsCustomizeModal(true)}
          disabled={
            !(Array.isArray(PaymentListRecords) && PaymentListRecords.length)
          }
          className={
            !(Array.isArray(PaymentListRecords) && PaymentListRecords.length)
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
            !(Array.isArray(PaymentListRecords) && PaymentListRecords.length)
          }
          className={
            !(Array.isArray(PaymentListRecords) && PaymentListRecords.length)
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
            fetchPaymentsListing({
              pageNo: 1,
              filters: { ...initFilterPayload },
              fromDate: dateRange.startDate,
              toDate: dateRange.endDate,
              sortBy,
              orderBy,
            });
            setPage(1);
            setAppliedFilter(initFilterPayload);
            setFilterPayload(initFilterPayload);
          }}
        />
      )}
      {PaymentListRecords.length > 0 ? (
        <CustomTable
          columns={tableConstants(
            visibleColumns,
            clickedActionBtnId,
            setClickedActionBtnId,
            refundClickHandler,
            transactionIdClickHandler,
            orderIdClickHandler
          )}
          dataSource={PaymentListRecords}
          handleSorting={handleSorting}
          showPagination={Boolean(totalRecords > 0)}
          currentPage={page}
          onPageChangeHandler={onPageChange}
          totalRecords={totalRecords}
        />
      ) : (
        <CustomNoDataFound
          title='There are no transactions here!'
          subTitle='Your transactions details will show up here!'
        />
      )}
      {isRefundModal && (
        <Modal
          modalWrapperClass='refund-model'
          ModalBody={RefundModalBody}
          modalBodyProps={{
            cancelHandler: () => setIsRefundModal(false),
            selectedRowForRefund,
            refundModalSaveHandler,
          }}
          onBackdropClick={() => setIsRefundModal(false)}
        />
      )}
      {isDownloadModal && (
        <DownloadModal
          totalRecords={totalRecords}
          cancelHandler={() => setIsDownloadModal(false)}
        />
      )}

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
          columns={filterFields({
            filterPayload,
            filterHandler,
            allGatewaysList,
            getAllOrderStatusList,
            amountFilter,
            setAmountFilter,
            handleFilterInputBlur,
            filterValidationError,
            filterIsTouchedPayload,
          })}
          disableSubmit={Object.values(filterValidationError).some((el) => el)}
        />
      )}

      {isCustomizeModal && (
        <CustomizeModal
          closeModal={() => setIsCustomizeModal(false)}
          columnsList={COLUMNS_LIST}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />
      )}

      {isOrderSummarySideModal && !isorderTransactionDetailsFetching && (
        <SideModal
          closeModal={() => setIsOrderSummarySideModal(false)}
          title={'Order Summary'}
          ModalBody={OrderSummarySideModalBody}
          modalBodyProps={{
            rowData: selectedRowForOrderSummary,
            orderTransactionDetails,
          }}
        />
      )}
      {isTransactionSideModal && !isorderTransactionDetailsFetching && (
        <SideModal
          closeModal={() => setIsTransactionSideModal(false)}
          title={'Transaction Detail'}
          ModalBody={TransactionSideModalBody}
          modalBodyProps={{
            rowData: selectedRowForTransactionDetails,
            orderTransactionDetails,
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({
  paymentReducer,
  smartRoutingReducer,
  refundReducer,
  validationReducer,
  loginReducer,
}) => ({
  PaymentListRecords:
    paymentReducer.paymentList.data?.transactionDetailList ?? [],
  orderTransactionDetails:
    paymentReducer.orderTransactionDetails.data?.length > 0
      ? paymentReducer.orderTransactionDetails.data[0]
      : null,
  isorderTransactionDetailsFetching:
    paymentReducer.orderTransactionDetails.isLoading,
  totalRecords: paymentReducer.paymentList.data?.totalRowsInDB ?? 0,
  allGatewaysList:
    smartRoutingReducer.gatewayListState.list?.length > 0
      ? smartRoutingReducer.gatewayListState.list
      : [],
  getAllOrderStatusList:
    paymentReducer.getAllOrderStatusList.data?.length > 0
      ? paymentReducer.getAllOrderStatusList.data
      : [],
  createRefund: refundReducer.createRefund,
  validationErrors: validationReducer.validationErrorState.validationErrors,
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, {
  getPaymentListAaction,
  getOrderTransactionDetailsAction,
  createRefundAction,
  clearRefundAction,
  getGatewayListAction,
  getAllOrdersStatusAction,
  downloadCsvAction,
})(Payment);
