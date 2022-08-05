import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { connect } from 'react-redux';
import { subDays } from 'date-fns';
import DateRange from 'components/DateRange';
import SubHeader from 'components/SubHeader';
import AboutHeader from 'components/AboutHeader';
import Filter from 'components/Filter';
import CustomTable from 'components/CustomTable';
import CustomizeModal from 'components/CustomizeModal';
import DownloadModal from 'components/DownloadPopup';
import CustomNoDataFound from 'components/CustomNoDataFound';
import CreatePaymentLinkDropDown from './components/CreatePaymentLinkDropDown';
import Popper from 'components/Popper';
import CreatePaymentLinkSideModalBody from './components/CreatePaymentLink';
import AppliedFiltersComponent from 'components/AppliedFilters';
import SideModal from 'components/SideModal';
import ViewPaymentLinkSideModalBody from './components/ViewPaymentLinkSideModalBody';
import BulkUploadModal from 'components/CustomDropzone';
import {
  getPaymentLinksListAction,
  getPaymentLinkStatusCodeAction,
} from 'redux/actions/paymentLinks';
import { downloadCsvAction } from 'redux/actions/downloadCsv';
import useRedirect from 'hooks/useRedirect';
import config from 'config';
import apiEndpoints from 'lib/apiEndpoints';
import {
  PER_PAGE_LIMIT,
  UiRoutes,
  phoneValidationRegex,
  noWhiteSpaceStringValidationRegex,
  numericValidationRegex,
} from 'lib/constants';
import {
  tableConstants,
  INIT_VISIBLE_COLUMNS_IDS,
  COLUMNS_LIST,
  filterFields,
  initFilterPayload,
  getNextMidnightDateTime,
  BULK_UPLOAD_SOURCE_ID,
  PAYMENT_LINK_MAX_DATE_RANGE_DAYS,
} from './constants';
import {
  checkPermissions,
  copyToClipboard,
  formatToIST,
  getDateRangeTitle,
  getMerchantIdFromStore,
  toPascal,
} from 'lib/helper';
import imgURL from 'lib/imgURL';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import Props from './typing';
import './style.scss';

const PaymentLinks: FC<Props> = (props): JSX.Element => {
  const MERCHANT_ID = getMerchantIdFromStore();
  const { totalRecords, PaymentLinksListRecords } = props;

  const { push, generatePath } = useRedirect();

  const [sortBy, setSortBy] = useState<string>('');
  const [copiedLinkId, setCopiedLinkId] = useState(NaN);
  const [copiedTimoutRef, setCopiedTimeoutRef] = useState<number>();
  const [orderBy, setOrderBy] = useState<string>('');
  const [page, setPage] = useState<number | string>(1);
  const [visibleColumns, setVisibleColumns] = useState<any>(
    INIT_VISIBLE_COLUMNS_IDS
  );
  const [isCustomizeModal, setIsCustomizeModal] = useState<boolean>(false);

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filterPayload, setFilterPayload] = useState(initFilterPayload);
  const [appliedFilter, setAppliedFilter] = useState(initFilterPayload);
  const [appliedFiltersList, setAppliedFiltersList] = useState<any[]>([]);
  const [filterValidationError, setFilterValidationError] = useState({});
  const [filterIsTouchedPayload, setFilterIsTouchedPayload] = useState({});

  const [isDownloadModal, setIsDownloadModal] = useState<boolean>(false);

  const [isDateRangeModal, setIsDateRangeModal] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<any>({
    startDate: subDays(new Date(), PAYMENT_LINK_MAX_DATE_RANGE_DAYS),
    endDate: getNextMidnightDateTime(new Date()),
    key: 'selection',
  });
  const [showCreatePaymentLinkDropdown, setShowCreatePaymentLinkDropdown] =
    useState<boolean>(false);
  const [showCreatePaymentLinkModal, setShowCreatePaymentLinkModal] =
    useState<boolean>(false);
  const [showBulkUploadModal, setShowBulkUploadModal] =
    useState<boolean>(false);
  const [paymentLinkDetailState, setPaymentLinkDetailState] = useState<{
    showSideModal: boolean;
    payload: any;
  }>({
    showSideModal: false,
    payload: {},
  });

  const statusNameToCodeMapping = useMemo(() => {
    return props.statusCodeList.reduce((mapping, statusItem) => {
      return {
        ...mapping,
        [toPascal(statusItem.status_name, '_')]: statusItem.status_id,
      };
    }, {});
  }, [props.statusCodeList]);

  const filterStatusOptions = useMemo(() => {
    return props.statusCodeList.map((statusItem) => ({
      id: toPascal(statusItem.status_name, '_'),
      label: toPascal(statusItem.status_name, '_'),
    }));
  }, [props.statusCodeList]);

  const fetchPaymentsLinksListing = ({
    fromDate,
    toDate,
    pageNo,
    filters,
    sortBy,
    orderBy,
  }: {
    fromDate?: string | Date;
    toDate?: string | Date;
    pageNo: string | number;
    filters?: any;
    sortBy?: string;
    orderBy?: string;
  }) => {
    let requestPayload = {
      sortBy,
      orderBy,
    };
    if (fromDate && toDate) {
      requestPayload['fromDate'] = formatToIST(new Date(fromDate));
      requestPayload['toDate'] = formatToIST(new Date(toDate));
    }

    if (filters) {
      requestPayload = {
        ...requestPayload,
        ...filters,
      };
    }

    // Note: Status name replaced from status code
    if (
      requestPayload['processingStatus'] &&
      Array.isArray(requestPayload['processingStatus'])
    ) {
      requestPayload['processingStatus'] = requestPayload[
        'processingStatus'
      ].map((statusName) => statusNameToCodeMapping[statusName]);
    }

    props.getPaymentLinksListAction({
      pageNo: pageNo,
      limit: PER_PAGE_LIMIT,
      payload: {
        ...requestPayload,
      },
    });
  };

  const dateRangeSaveHandler = (value) => {
    setDateRange(value);
    setIsDateRangeModal(false);
    fetchPaymentsLinksListing({
      pageNo: 1,
      filters: { ...appliedFilter },
      fromDate: value.startDate,
      toDate: value.endDate,
      sortBy,
      orderBy,
    });
    setPage(1);
  };

  /**
   * Removed any specific filter Handler
   */
  const removeFilterHandler = ({ keyName, value }) => {
    const appliedFilterCopy = { ...appliedFilter };

    switch (keyName) {
      case 'Invoice No':
        appliedFilterCopy.invoiceNumber = '';
        break;
      case 'Customer Mobile Number':
        appliedFilterCopy.customerMobileNumber = '';
        break;
      case 'Processing Status':
        appliedFilterCopy.processingStatus =
          appliedFilterCopy.processingStatus.filter(
            (item: string) => !item.includes(value)
          );
        break;
      default:
        break;
    }
    fetchPaymentsLinksListing({
      pageNo: 1,
      filters: { ...appliedFilterCopy },
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
      sortBy,
      orderBy,
    });
    setAppliedFilter(appliedFilterCopy);
    setFilterPayload(appliedFilterCopy);
  };

  useEffect(() => {
    fetchPaymentsLinksListing({
      pageNo: 1,
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
      sortBy,
      orderBy,
    });
    props.getPaymentLinkStatusCodeAction();
  }, []);

  const handleFilterInputBlur = useCallback(
    (name) => {
      setFilterIsTouchedPayload({
        ...filterIsTouchedPayload,
        [name]: true,
      });
    },
    [filterIsTouchedPayload]
  );

  // Handle Sorting
  const handleSorting = ({
    columnName,
    order,
  }: {
    columnName: string;
    order: string;
  }) => {
    fetchPaymentsLinksListing({
      pageNo: page,
      filters: { ...appliedFilter },
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
      sortBy: order ? columnName : '',
      orderBy: order || '',
    });
    setSortBy(order ? columnName : '');
    setOrderBy(order || '');
  };

  const onPageChange = (pageNo) => {
    fetchPaymentsLinksListing({
      pageNo,
      filters: { ...appliedFilter },
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
      sortBy,
      orderBy,
    });
    setPage(pageNo);
  };

  const handleSubmitFilter = () => {
    const filterPayloadCopy = JSON.parse(JSON.stringify(filterPayload));
    fetchPaymentsLinksListing({
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

  const filterHandler = (fieldName, value) => {
    const filterPayloadCopy = JSON.parse(JSON.stringify(filterPayload));
    switch (fieldName) {
      case 'invoiceNumber':
        filterPayloadCopy[fieldName] = value;
        if (!noWhiteSpaceStringValidationRegex.test(value)) {
          setFilterValidationError({
            ...filterValidationError,
            // TODO: Error message to be fetched from API
            [fieldName]: 'Invalid Format',
          });
        } else {
          setFilterValidationError({
            ...filterValidationError,
            // TODO: Error message to be fetched from API
            [fieldName]: '',
          });
        }
        break;
      case 'customerMobileNumber':
        if (numericValidationRegex.test(value) || value === '') {
          filterPayloadCopy[fieldName] = value;
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
        break;
      case 'processingStatus':
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

  const handleDownload = () => {
    const downloadFilterPayload = { ...appliedFilter };
    if (!props.isAdmin)
      pushClevertapEvent({
        eventName:
          clevertapEventConfigList.PAYMENT_LINKS_REPORT_DOWNLOADED.eventName,
        eventPayload: {
          reportDate: getDateRangeTitle(dateRange.startDate, dateRange.endDate) || 'Custom Date',
        },
      });
    if (dateRange.startDate && dateRange.endDate) {
      downloadFilterPayload['fromDate'] = formatToIST(dateRange.startDate);
      downloadFilterPayload['toDate'] = formatToIST(dateRange.endDate);
    }
    // Note: Mapping status name -> status code
    if (
      downloadFilterPayload['processingStatus'] &&
      Array.isArray(downloadFilterPayload['processingStatus'])
    ) {
      downloadFilterPayload['processingStatus'] = downloadFilterPayload[
        'processingStatus'
      ].map((statusName) => statusNameToCodeMapping[statusName]);
    }

    const buff = new Buffer(JSON.stringify(downloadFilterPayload));
    const base64data = buff.toString('base64');
    props.downloadCsvAction({
      url: `${config.API.API_BASE_URL}/api/v1/payment/transaction/transaction/paymentlink/download/${MERCHANT_ID}?payload=${base64data}`,
    });
  };

  /**
   * @ Update applied filter list, if there is any update in filters
   */
  useEffect(() => {
    const allFilters: { keyName: string; value: string }[] = [];
    if (appliedFilter.invoiceNumber) {
      allFilters.push({
        keyName: 'Invoice No',
        value: appliedFilter.invoiceNumber,
      });
    }
    if (appliedFilter.customerMobileNumber) {
      allFilters.push({
        keyName: 'Customer Mobile No',
        value: appliedFilter.customerMobileNumber,
      });
    }
    if (appliedFilter.processingStatus.length > 0) {
      appliedFilter.processingStatus.map((item: string) => {
        allFilters.push({
          keyName: 'Processing Status',
          value: `${item.split('-')[0]}`,
        });
      });
    }
    setAppliedFiltersList(allFilters);
  }, [appliedFilter]);

  const showSideModalHandler = () => {
    return (
      <SideModal
        closeModal={() => setShowCreatePaymentLinkModal(false)}
        title={'Create Payment Link'}
        ModalBody={CreatePaymentLinkSideModalBody}
        modalBodyProps={{
          handleClose: () => setShowCreatePaymentLinkModal(false),
          handleRefreshListing: () => {
            setPage(1);
            setDateRange({
              ...dateRange,
              startDate: subDays(new Date(), PAYMENT_LINK_MAX_DATE_RANGE_DAYS),
              endDate: getNextMidnightDateTime(new Date()),
            });
            setAppliedFilter({
              invoiceNumber: '',
              customerMobileNumber: '',
              processingStatus: [],
            });
            setFilterPayload({
              invoiceNumber: '',
              customerMobileNumber: '',
              processingStatus: [],
            });
            setSortBy('');
            setOrderBy('');
            fetchPaymentsLinksListing({
              pageNo: 1,
              filters: {
                invoiceNumber: '',
                customerMobileNumber: '',
                processingStatus: [],
              },
              fromDate: subDays(new Date(), PAYMENT_LINK_MAX_DATE_RANGE_DAYS),
              toDate: getNextMidnightDateTime(new Date()),
              sortBy: '',
              orderBy: '',
            });
          },
        }}
      />
    );
  };

  const showBulkUploadModalHandler = () => {
    return (
      <BulkUploadModal
        closeModal={() => setShowBulkUploadModal(false)}
        title={'Bulk Upload Payment Links'}
        uploadCsvEndpoint={apiEndpoints.UPLOAD_BULK_PAYMENT_LINKS(MERCHANT_ID)}
        downloadSampleCsvEndpoint={
          apiEndpoints.GET_PAYMENT_LINKS_BULK_UPLOAD_CSV_TEMPLATE
        }
        sourceId={BULK_UPLOAD_SOURCE_ID}
      />
    );
  };

  const handleViewPaymentLinkDetails = useCallback((payload) => {
    setPaymentLinkDetailState({
      showSideModal: true,
      payload,
    });
  }, []);

  const disableFilterButton = useMemo(() => {
    return !PaymentLinksListRecords.length && !appliedFiltersList.length;
  }, [appliedFiltersList, PaymentLinksListRecords]);

  const handleCopy = useCallback(
    (str: string, id: number) => {
      clearTimeout(copiedTimoutRef);
      copyToClipboard(str);
      setCopiedLinkId(id);
      const timeoutRef = setTimeout(() => {
        setCopiedLinkId(NaN);
      }, 2000);
      setCopiedTimeoutRef(Number(timeoutRef));
    },
    [copiedTimoutRef]
  );

  const customTableColumns = useMemo(() => {
    return tableConstants(
      visibleColumns,
      handleViewPaymentLinkDetails,
      copiedLinkId,
      handleCopy
    );
  }, [visibleColumns, handleViewPaymentLinkDetails, copiedLinkId, handleCopy]);

  return (
    <React.Fragment>
      <div className='payment-links-container'>
        <AboutHeader
          title='Payment Link'
          content='Create payment links and share with your customers to accept payment'
        />
        <SubHeader
          title='Payment Link'
          description='Create payment links and share with your customers to accept payment'
          showIcon={true}
          svgIcon='white-payment-links'
          svgDetail='Payment Link'
          extraButtons={
            checkPermissions('CREATE_PAYMENT_LINKS') ? (
              <Popper
                visible={showCreatePaymentLinkDropdown}
                placement='bottomRight'
                onVisibleChange={(visible) => {
                  setShowCreatePaymentLinkDropdown(visible);
                }}
                content={
                  <CreatePaymentLinkDropDown
                    showCreatePaymentLinkModal={setShowCreatePaymentLinkModal}
                    showBulkUploadModal={setShowBulkUploadModal}
                    handleCloseDropdown={() =>
                      setShowCreatePaymentLinkDropdown(false)
                    }
                  />
                }
              >
                <button
                  className='primary-button'
                  onClick={() => setShowCreatePaymentLinkDropdown(true)}
                >
                  Create New Payment Link
                  <img
                    src={imgURL['white-dropdown']}
                    alt='Create New Payment Link'
                  />
                </button>
              </Popper>
            ) : (
              <></>
            )
          }
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
              disabled={disableFilterButton}
              className={disableFilterButton ? 'disable-element' : ''}
            >
              <img src={imgURL['filter-icon']} alt='Filter By' /> Filter By
            </button>
          </div>

          <button
            onClick={() => {
              push(generatePath(UiRoutes.PAYMENT_LINK_BULK_UPLOAD_HISTORY));
            }}
          >
            <img src={imgURL['bulk-logo']} alt='Bulk Upload History' /> Bulk
            Upload History
          </button>
          <button
            onClick={() => setIsCustomizeModal(true)}
            disabled={
              !(
                Array.isArray(PaymentLinksListRecords) &&
                PaymentLinksListRecords.length
              )
            }
            className={
              !(
                Array.isArray(PaymentLinksListRecords) &&
                PaymentLinksListRecords.length
              )
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
              !(
                Array.isArray(PaymentLinksListRecords) &&
                PaymentLinksListRecords.length
              )
            }
            className={
              !(
                Array.isArray(PaymentLinksListRecords) &&
                PaymentLinksListRecords.length
              )
                ? 'disable-element'
                : ''
            }
          >
            <img src={imgURL['download-icon']} alt='Download' /> Download
          </button>
        </div>
      </div>
      {appliedFiltersList.length > 0 && (
        <AppliedFiltersComponent
          appliedFiltersList={appliedFiltersList}
          removeFilterHandler={removeFilterHandler}
          clearAllHandler={() => {
            fetchPaymentsLinksListing({
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
      {PaymentLinksListRecords.length > 0 ? (
        <CustomTable
          columns={customTableColumns}
          dataSource={PaymentLinksListRecords}
          handleSorting={handleSorting}
          showPagination={Boolean(totalRecords > 0)}
          currentPage={page}
          onPageChangeHandler={onPageChange}
          totalRecords={totalRecords}
          sortBy={sortBy}
          orderBy={orderBy}
          isSortingTwoWayBinded
        />
      ) : (
        <CustomNoDataFound
          title='There are no transactions here!'
          subTitle='Your transactions details will show up here!'
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
            handleFilterInputBlur,
            filterValidationError,
            filterIsTouchedPayload,
            filterStatusOptions,
          })}
          disableSubmit={Object.values(filterValidationError).some((el) => el)}
        />
      )}
      {showCreatePaymentLinkModal && showSideModalHandler()}
      {showBulkUploadModal && showBulkUploadModalHandler()}
      {paymentLinkDetailState.showSideModal && (
        <SideModal
          ModalBody={ViewPaymentLinkSideModalBody}
          modalBodyProps={{
            paymentLinkDetails: paymentLinkDetailState.payload,
          }}
          title={'Payment Link Details'}
          closeModal={() =>
            setPaymentLinkDetailState({
              showSideModal: false,
              payload: {},
            })
          }
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({ paymentLinksReducer, loginReducer }) => ({
  PaymentLinksListRecords:
    paymentLinksReducer.paymentLinksList?.data.searchResponseModel ?? [],
  totalRecords: paymentLinksReducer.paymentLinksList.data?.totalRows ?? 0,
  statusCodeList: paymentLinksReducer?.statusCodeMappingState?.data ?? [],
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, {
  getPaymentLinksListAction,
  getPaymentLinkStatusCodeAction,
  downloadCsvAction,
})(PaymentLinks);
