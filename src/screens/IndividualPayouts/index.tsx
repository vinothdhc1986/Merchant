import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BulkUploadModal from '../../components/CustomDropzone';
import SubHeader from '../../components/SubHeader';
import { format } from 'date-fns';
import AboutHeader from '../../components/AboutHeader';
import FilterRow from '../../components/FilterRow';
import AppliedFiltersComponent from '../../components/AppliedFilters';
import Filter from '../../components/Filter';
import SideModal from '../../components/SideModal';
import CustomTable from '../../components/CustomTable';
import Button from '../../components/Button';
import useRedirect from 'hooks/useRedirect';
import Popper from '../../components/Popper';
import RejectModal from '../../components/RejectModal';
import CustomNoDataFound from '../../components/CustomNoDataFound';
import IndividualPayoutsSideModalBody from './components/IndividualPayoutsSideModalBody';
import notify from 'lib/notifiy';
import {
  PER_PAGE_LIMIT,
  PAYOUT_REQUEST_DATE_FORMAT,
  PAYOUT_SCHEDULE_LIST_TYPE,
  PAYOUT_REGULAR_LIST_TYPE,
  numericValidationRegex,
} from 'lib/constants';
import ConfirmationModal from 'components/ConfirmationModal';
import IndividualPayoutModal from './components/IndividualPayoutModal';
import Tabs from 'components/Tabs';
import { downloadCsvAction } from 'redux/actions/downloadCsv';

import config from '../../config';

import PendingListFilter from '../../components/PendingListFilter';
import {
  getIndividualPayoutsListAction,
  clearIndividualPayoutsListAction,
  approveIndividualPayoutAction,
  rejectIndividualPayoutAction,
  clearApproveIndividualPayoutAction,
  clearRejectIndividualPayoutAction,
  cancelApprovedIndividualPayoutAction,
  clearCancelApprovedIndividualPayoutAction,
  getTransactionFailMsgAction,
  clearGetTransactionFailMsgAction,
} from 'redux/actions/payouts';
import apiEndpoints from 'lib/apiEndpoints';
import {
  checkPermissions,
  getMerchantIdFromStore,
  dateRangeUpToToday,
} from '../../lib/helper';
import {
  INDIVIDUAL_PAYOUT_SORTING_ENUM,
  tableConstants,
  initFilterPayload,
  filterFields,
  INDIVIDUAL_PAYOUT_FILTER_KEYS_MAPPING,
  PAYOUT_TAB_OPTIONS,
  defaultConfirmModalProps,
  pendingFilterFields,
  defaultFailedTransactionDtls,
} from './individualPayouts.constants';
import { DateRangeType } from '../../lib/typing';
import {
  Props,
  ListTypeProp,
  PayoutListingPayloadType,
  ConfirmModalPropType,
  FailedTransactionDtls,
} from './typing';
import './style.scss';

const IndividualPayouts: FC<Props> = (props): JSX.Element => {
  const merchantId = getMerchantIdFromStore();
  const { isAdmin } = props.loginState;
  const { location } = useRedirect();

  const {
    totalRecords,
    individualPayoutList,
    pendingPayLaterPayoutCount,
    pendingPayNowPayoutCount,
  } = props;

  const [clickedActionBtnId, setClickedActionBtnId] = useState<string | null>(
    null
  );
  const [confirmModal, setConfirmModal] = useState<ConfirmModalPropType>({
    ...defaultConfirmModalProps,
  });
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [isRejectModal, setIsRejectModal] = useState(false);
  const [listType, setListType] = useState<ListTypeProp>('EDIT');
  const [isDateRangeModal, setIsDateRangeModal] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeType | null>(
    dateRangeUpToToday()
  );

  const [isFilter, setIsFilter] = useState(false);
  const [filterPayload, setFilterPayload] = useState(initFilterPayload);
  const [appliedFilter, setAppliedFilter] = useState(initFilterPayload);
  const [appliedFiltersList, setAppliedFiltersList] = useState<any[]>([]);

  const [pageNo, setPageNo] = useState(1);
  const [filterValidationError, setFilterValidationError] = useState({});
  const [filterIsTouchedPayload, setFilterIsTouchedPayload] = useState({});

  const [isInitiatePayoutPopper, setIsInitiatePayoutPopper] = useState(false);
  const [isIndividualPayoutModal, setIsIndividualPayoutModal] = useState(false);
  const [isBulkPayoutModal, setIsBulkPayoutModal] = useState(false);

  const [isIndividualPayoutSideModal, setIsIndividualPayoutSideModal] =
    useState(false);
  const [selectedRowForPayout, setSelectedRowForPayout] = useState<any>(null);
  const [
    selectedRowFailedTransactionDetails,
    setSelectedRowFailedTransactionDetails,
  ] = useState<FailedTransactionDtls>(defaultFailedTransactionDtls);
  const [selectedRowPayoutId, setSelectedRowPayoutId] = useState(null);

  const [status, setStatus] = useState<'SUBMITTED' | ''>('');
  const [appliedPendingFiltersList, setAppliedPendingFiltersList] = useState<
    Array<string>
  >([]);
  const [payType, setPayType] = useState<'payNow' | 'payLater' | ''>('');

  const handleClickFilterBtn = () => {
    setIsFilter(true);
    setFilterValidationError({});
    setFilterIsTouchedPayload({});
  };

  const handleDownload = () => {
    const requestPayload = {
      pageNumber: pageNo || 1,
      pageSize: PER_PAGE_LIMIT,
      ...(orderBy && { orderBy }),
      ...(sortBy && { sortBy }),
      ...(dateRange?.startDate && {
        fromDate: format(
          new Date(dateRange.startDate),
          PAYOUT_REQUEST_DATE_FORMAT
        ),
      }),
      ...(dateRange?.endDate && {
        toDate: format(new Date(dateRange.endDate), PAYOUT_REQUEST_DATE_FORMAT),
      }),
      ...(listType ? { listType } : { listType: 'EDIT' }),
      ...(appliedFilter?.merchantDetails.inputValue &&
        (appliedFilter?.merchantDetails.selectKey === 'fileId'
          ? {
              sourceId: appliedFilter?.merchantDetails.inputValue,
              sourceType: 'FILE',
            }
          : {
              [appliedFilter?.merchantDetails.selectKey]:
                appliedFilter?.merchantDetails.inputValue,
            })),
      merchantId: merchantId,
      ...(status && { status }),
    };
    let url = `${config.API.API_PAYOUTS_URL}/${
      apiEndpoints.DOWNLOAD_INDIVIDUAL_PAYOUT_LIST
    }?pageNumber=${pageNo || 1}`;
    Object.keys(requestPayload).forEach((key) => {
      url += `&${key}=${requestPayload[key]}`;
    });

    props.downloadCsvAction({ url });
  };

  const filterRowProps = {
    dateRangePicker: {
      dateRange: dateRange,
      cancelHandler: () => setIsDateRangeModal(false),
      saveHandler: (value) => dateRangeSaveHandler(value),
      visible: isDateRangeModal,
      onVisibleChange: (visible: boolean) => setIsDateRangeModal(visible),
    },
    filterBy: {
      handleClickFilterBtn,
      disableToolbar: false,
    },
    accountBalance: {
      onClick: () => {},
    },
    download: {
      onClick: handleDownload,
    },
  };

  useEffect(() => {
    if (location?.state?.submitStatusApplied) {
      setPayType(location?.state?.submitStatusApplied);
      setAppliedPendingFiltersList([location?.state?.submitStatusApplied]);
      setStatus('SUBMITTED');
      setDateRange(null);
    }
    return () => {
      props.clearIndividualPayoutsListAction();
    };
  }, []);

  useEffect(() => {
    fetchPayoutListing({
      listType,
      pageNo,
      sortBy,
      orderBy,
      fromDate: dateRange?.startDate,
      toDate: dateRange?.endDate,
      status,
      filters: appliedFilter,
      payType,
    });
  }, [
    listType,
    pageNo,
    sortBy,
    orderBy,
    dateRange,
    status,
    appliedFilter,
    payType,
  ]);

  const fetchPayoutListing = ({
    listType,
    pageNo,
    sortBy,
    orderBy,
    fromDate,
    toDate,
    status,
    filters,
    payType,
  }: PayoutListingPayloadType) => {
    const requestPayload = {
      pageNumber: pageNo,
      pageSize: PER_PAGE_LIMIT,
      ...(orderBy && { orderBy }),
      ...(sortBy && { sortBy }),
      ...(fromDate && {
        fromDate: format(new Date(fromDate), PAYOUT_REQUEST_DATE_FORMAT),
      }),
      ...(toDate && {
        toDate: format(new Date(toDate), PAYOUT_REQUEST_DATE_FORMAT),
      }),
      ...(payType &&
        (payType === PAYOUT_REGULAR_LIST_TYPE
          ? { payLater: false }
          : payType === PAYOUT_SCHEDULE_LIST_TYPE
          ? { payLater: true }
          : null)),
      merchantId: merchantId,
    };

    if (listType === 'EDIT' || listType === 'MASTER') {
      props.getIndividualPayoutsListAction({
        ...(listType && { listType }),
        ...(status && { status }),
        ...requestPayload,
        ...(filters?.merchantDetails.inputValue &&
          (filters?.merchantDetails.selectKey === 'fileId'
            ? {
                sourceId: filters?.merchantDetails.inputValue,
                sourceType: 'FILE',
              }
            : {
                [filters?.merchantDetails.selectKey]:
                  filters?.merchantDetails.inputValue,
              })),
      });
    }
  };

  useEffect(() => {
    const { isSuccess, isFailure, successMessage, errorMessage } =
      props.approveIndividualPayoutState;
    if (isSuccess) {
      notify({
        type: 'success',
        message: 'Success',
        description: successMessage,
      });
      props.clearApproveIndividualPayoutAction();

      fetchPayoutListing({
        listType,
        pageNo,
        sortBy,
        orderBy,
        fromDate: dateRange?.startDate,
        toDate: dateRange?.endDate,
      });
    }
    if (isFailure) {
      notify({
        type: 'error',
        message: 'Failure',
        description: errorMessage,
      });
      props.clearApproveIndividualPayoutAction();
    }
  }, [props.approveIndividualPayoutState]);

  useEffect(() => {
    const { isSuccess, isFailure, successMessage, errorMessage } =
      props.rejectIndividualPayoutState;
    if (isSuccess) {
      notify({
        type: 'success',
        message: 'Success',
        description: successMessage,
      });
      setIsRejectModal(false);
      fetchPayoutListing({
        listType,
        pageNo,
        sortBy,
        orderBy,
        fromDate: dateRange?.startDate,
        toDate: dateRange?.endDate,
      });
    }
    if (isFailure) {
      notify({
        type: 'error',
        message: 'Failure',
        description: errorMessage,
      });
    }

    return () => {
      props.clearRejectIndividualPayoutAction();
    };
  }, [props.rejectIndividualPayoutState]);

  useEffect(() => {
    const { isSuccess, isFailure, successMessage, errorMessage } =
      props.cancelApproveIndividualPayoutState;
    if (isSuccess) {
      notify({
        type: 'success',
        message: 'Success',
        description: successMessage,
      });
      fetchPayoutListing({
        listType,
        pageNo,
        sortBy,
        orderBy,
        fromDate: dateRange?.startDate,
        toDate: dateRange?.endDate,
      });
    }
    if (isFailure) {
      notify({
        type: 'error',
        message: 'Failure',
        description: errorMessage,
      });
    }

    return () => {
      props.clearCancelApprovedIndividualPayoutAction();
    };
  }, [props.cancelApproveIndividualPayoutState]);

  useEffect(() => {
    const { isSuccess, isFailure, data, errorMessage } =
      props.getTransactionFailState;

    if (isSuccess) {
      setSelectedRowFailedTransactionDetails({
        instructionIdentification: data.instructionIdentification,
        errorMsg: data.errorMsg,
      });
    }
    if (isFailure) {
      setSelectedRowFailedTransactionDetails(defaultFailedTransactionDtls);
      notify({
        type: 'error',
        message: 'Failure',
        description: errorMessage,
      });
    }
    return () => {
      props.clearGetTransactionFailMsgAction();
    };
  }, [props.getTransactionFailState]);

  const dateRangeSaveHandler = (value: DateRangeType) => {
    setDateRange(value);
    setIsDateRangeModal(false);
    setPageNo(1);
  };

  const payoutIdClickHandler = (rowData) => {
    if (rowData.status.toLowerCase() === 'failed') {
      props.getTransactionFailMsgAction({
        payoutId: rowData.payoutId,
        merchantId: merchantId,
      });
    }
    setIsIndividualPayoutSideModal(true);
    setSelectedRowForPayout(rowData);
  };

  const approveIndividualPayoutClickHandler = (payoutId) => {
    setSelectedRowPayoutId(payoutId);
    setConfirmModal({
      modalType: 'APPROVE',
      isConfirmModal: true,
      confirmModalTitle: 'Approve Individual Payouts',
      confirmModalContent: 'Are you sure you want to approve?',
    });
    setClickedActionBtnId(null);
  };

  const rejectIndividualPayoutFromListClickHandler = (payoutId) => {
    setIsRejectModal(true);
    setSelectedRowForPayout(payoutId);
    setClickedActionBtnId(null);
  };

  const cancelPayoutClickHandler = (payoutId) => {
    setConfirmModal({
      modalType: 'CANCEL',
      isConfirmModal: true,
      confirmModalTitle: 'Cancel Individual Payouts',
      confirmModalContent: 'Are you sure you want to cancel?',
    });
    setSelectedRowPayoutId(payoutId);
    setClickedActionBtnId(null);
  };

  const confirmModalSaveClickHandler = () => {
    if (confirmModal.modalType === 'APPROVE') {
      props.approveIndividualPayoutAction({
        approvePayouts: [`${selectedRowPayoutId}`],
        merchantId: merchantId,
      });
    }
    if (confirmModal.modalType === 'CANCEL') {
      props.cancelApprovedIndividualPayoutAction({
        payoutIds: [selectedRowPayoutId],
        merchantId: merchantId,
      });
    }
    setConfirmModal({
      ...defaultConfirmModalProps,
    });
    setSelectedRowPayoutId(null);
  };

  const rejectModalSubmitButtonClickHandler = (reason) => {
    props.rejectIndividualPayoutAction({
      rejectPayouts: [
        {
          payoutId: selectedRowForPayout,
          reason,
        },
      ],
      merchantId: merchantId,
    });
  };

  const onPageChange = (pageNo: number) => {
    setPageNo(pageNo);
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
    setSortBy(INDIVIDUAL_PAYOUT_SORTING_ENUM[sortingKey]);
    setOrderBy(sortingOrder);
  };

  const resetAll = () => {
    handleResetFilter();
    setAppliedFilter(initFilterPayload);
    setPageNo(1);
    setSortBy('');
    setOrderBy('');
  };

  const handleClickPendingFilter = (keyName) => {
    const tempArray = [...appliedPendingFiltersList, keyName];
    if (
      tempArray.includes(PAYOUT_REGULAR_LIST_TYPE) &&
      tempArray.includes(PAYOUT_SCHEDULE_LIST_TYPE)
    ) {
      setPayType('');
    } else {
      setPayType(keyName);
    }
    setAppliedPendingFiltersList(tempArray);
    setStatus('SUBMITTED');
    setDateRange(null);
    resetAll();
  };

  const handleRemovePendingFilter = (keyName) => {
    if (appliedPendingFiltersList.length === 2) {
      switch (keyName) {
        case PAYOUT_REGULAR_LIST_TYPE:
          setPayType(PAYOUT_SCHEDULE_LIST_TYPE);
          break;
        case PAYOUT_SCHEDULE_LIST_TYPE:
          setPayType(PAYOUT_REGULAR_LIST_TYPE);
          break;
      }
    } else {
      setPayType('');
    }
    setAppliedPendingFiltersList(
      appliedPendingFiltersList.filter((item) => item !== keyName)
    );
    if (appliedPendingFiltersList.length === 1) {
      setStatus('');
      setDateRange(dateRangeUpToToday());
    } else {
      setDateRange(null);
    }
    resetAll();
  };

  const handleTabChange = (value: ListTypeProp) => {
    setListType(value);
    status && setStatus('');
    setPayType('');
    setAppliedPendingFiltersList([]);
    setDateRange(dateRangeUpToToday());
    resetAll();
  };

  // filter handling
  const filterHandler = (fieldName, value, fieldType) => {
    const filterPayloadCopy = JSON.parse(JSON.stringify(filterPayload));
    switch (fieldName) {
      case 'merchantDetails':
        if (fieldType === 'select') {
          filterPayloadCopy[fieldName][`selectKey`] = value;
          filterPayloadCopy[fieldName][`inputValue`] = '';
          setFilterValidationError({
            ...filterValidationError,
            [fieldName]: '',
          });
          setFilterIsTouchedPayload({
            ...filterIsTouchedPayload,
            [fieldName]: false,
          });
        } else {
          if (numericValidationRegex.test(value) || value === '')
            filterPayloadCopy[fieldName][`inputValue`] = value;
        }
        break;
    }
    setFilterPayload(filterPayloadCopy);
  };

  // Removed any specific filter Handler
  const removeFilterHandler = () => {
    const appliedFilterCopy = JSON.parse(JSON.stringify(filterPayload));
    const defaultObj = {
      selectKey: '',
      inputValue: '',
    };
    appliedFilterCopy.merchantDetails = defaultObj;
    setAppliedFilter(appliedFilterCopy);
    setFilterPayload(appliedFilterCopy);
    setPageNo(1);
  };

  // Update applied filter list, if there is any update in filters
  useEffect(() => {
    const allFilters: { keyName: string; value: string }[] = [];
    Object.keys(appliedFilter).forEach((key) => {
      if (appliedFilter[key]?.inputValue) {
        allFilters.push({
          keyName:
            INDIVIDUAL_PAYOUT_FILTER_KEYS_MAPPING[
              appliedFilter[key]?.selectKey
            ],
          value: appliedFilter[key]?.inputValue,
        });
      }
    });
    setAppliedFiltersList(allFilters);
  }, [appliedFilter]);

  const handleSubmitFilter = () => {
    const filterPayloadCopy = JSON.parse(JSON.stringify(filterPayload));
    setAppliedFilter(filterPayloadCopy);
    setIsFilter(false);
    setPageNo(1);
  };

  const handleResetFilter = () => {
    setFilterPayload(initFilterPayload);
    setFilterValidationError({});
    setFilterIsTouchedPayload({});
  };

  const handleFilterInputBlur = (name) => {
    setFilterIsTouchedPayload({
      ...filterIsTouchedPayload,
      [name]: true,
    });
  };

  return (
    <React.Fragment>
      <div className='individual-payouts-container'>
        {!isAdmin && (
          <AboutHeader
            title='About Individual Payouts'
            content='Initiate payouts to unlimited vendors in one go all from your dashboard.'
          />
        )}

        <SubHeader
          title='Individual Payouts'
          description='All individual payouts ever created are listed here.'
          showIcon={true}
          svgIcon='individual-payout-subheader'
          svgDetail='Payouts'
          extraButtons={
            checkPermissions('CREATE_PAYOUTS') ? (
              <Popper
                visible={isInitiatePayoutPopper}
                onVisibleChange={(visible: boolean) =>
                  setIsInitiatePayoutPopper(visible)
                }
                content={
                  <div
                    className='dropdown-menu'
                    aria-labelledby='dropdownMenuButton'
                  >
                    <a
                      className='dropdown-item'
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setIsInitiatePayoutPopper(false);
                        setIsIndividualPayoutModal(true);
                        setIsBulkPayoutModal(false);
                      }}
                    >
                      Individual Payout
                    </a>
                    <a
                      className='dropdown-item'
                      onClick={() => {
                        setIsInitiatePayoutPopper(false);
                        setIsIndividualPayoutModal(false);
                        setIsBulkPayoutModal(true);
                      }}
                    >
                      Bulk Payout
                    </a>
                  </div>
                }
              >
                <Button
                  btnStyleClass={`secondry-button ${
                    isInitiatePayoutPopper && 'focus-button'
                  }`}
                  label='Initiate Payout'
                  onClick={() => {}}
                  enable={true}
                />
              </Popper>
            ) : undefined
          }
        />

        <Tabs
          options={PAYOUT_TAB_OPTIONS}
          value={listType}
          onChange={handleTabChange}
        />

        {listType === 'EDIT' &&
          (status === 'SUBMITTED' ||
            pendingPayNowPayoutCount > 0 ||
            pendingPayLaterPayoutCount > 0) && (
            <PendingListFilter
              filterTitle={'Pending for Approval'}
              filtersList={pendingFilterFields(
                pendingPayNowPayoutCount,
                pendingPayLaterPayoutCount,
                appliedPendingFiltersList
              )}
              handleClickPendingFilter={handleClickPendingFilter}
              handleRemovePendingFilter={handleRemovePendingFilter}
              appliedPendingFiltersList={appliedPendingFiltersList}
            />
          )}

        <FilterRow filterRowProps={filterRowProps} />

        {appliedFiltersList.length > 0 && (
          <AppliedFiltersComponent
            appliedFiltersList={appliedFiltersList}
            removeFilterHandler={removeFilterHandler}
            clearAllHandler={() => {
              setPageNo(1);
              setAppliedFilter(initFilterPayload);
              setFilterPayload(initFilterPayload);
            }}
          />
        )}

        {individualPayoutList.length > 0 ? (
          <CustomTable
            dataSource={individualPayoutList}
            columns={tableConstants(
              payoutIdClickHandler,
              clickedActionBtnId,
              setClickedActionBtnId,
              approveIndividualPayoutClickHandler,
              rejectIndividualPayoutFromListClickHandler,
              cancelPayoutClickHandler
            )}
            currentPage={pageNo}
            totalRecords={totalRecords}
            showPagination={true}
            onPageChangeHandler={onPageChange}
            handleSorting={handleSorting}
          />
        ) : (
          <CustomNoDataFound
            title='There are no payouts here!'
            subTitle='Your Payouts list will show up here!'
          />
        )}

        {isRejectModal && (
          <RejectModal
            closeModal={() => setIsRejectModal(false)}
            validationErrors={props.validationErrors}
            submitButtonHandler={rejectModalSubmitButtonClickHandler}
            submitButtonLabel='Reject Payout'
            title='Reject Payout'
          />
        )}

        {isIndividualPayoutSideModal && (
          <SideModal
            ModalBody={IndividualPayoutsSideModalBody}
            modalBodyProps={{
              rowData: selectedRowForPayout,
              failedTransactionDtls: selectedRowFailedTransactionDetails,
            }}
            closeModal={() => setIsIndividualPayoutSideModal(false)}
            title={'Payout Details'}
          />
        )}

        {isIndividualPayoutModal && (
          <IndividualPayoutModal
            closeModal={() => setIsIndividualPayoutModal(false)}
            fetchPayoutList={() =>
              fetchPayoutListing({
                listType: listType,
                pageNo: 1,
                sortBy,
                orderBy,
                fromDate: dateRange?.startDate,
                toDate: dateRange?.endDate,
              })
            }
          />
        )}

        {isBulkPayoutModal && (
          <BulkUploadModal
            closeModal={() => setIsBulkPayoutModal(false)}
            title={'Initiate Bulk Payouts'}
            uploadCsvEndpoint={apiEndpoints.UPLOAD_BULK_PAYOUT}
            downloadSampleCsvEndpoint={apiEndpoints.GET_PAYOUT_BULK_UPLOAD_CSV_TEMPLATE(
              'PAYOUT'
            )}
            sourceId={2}
            customFilename='sampleBulkPayout.csv'
            baseURL={config.API.API_PAYOUTS_URL}
          />
        )}

        {confirmModal.isConfirmModal && (
          <ConfirmationModal
            title={confirmModal.confirmModalTitle}
            confirmText='Confirm'
            iconType='warning'
            handleCancel={() => {
              setConfirmModal({
                ...defaultConfirmModalProps,
              });
              setSelectedRowPayoutId(null);
            }}
            handleSave={() => {
              confirmModalSaveClickHandler();
            }}
            content={confirmModal.confirmModalContent}
          />
        )}

        {isFilter && (
          <Filter
            closeFilter={() => {
              setIsFilter(false);
              setFilterPayload(appliedFilter);
            }}
            applyFilter={handleSubmitFilter}
            resetFilter={handleResetFilter}
            columns={filterFields({
              filterPayload,
              filterHandler,
              handleFilterInputBlur,
              filterValidationError,
              filterIsTouchedPayload,
            })}
            disableSubmit={
              Object.values(filterValidationError).some((el) => el) ||
              !filterPayload.merchantDetails.inputValue
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
  individualPayoutList:
    payoutsReducer.individualPayoutListState?.body?.data ?? [],
  pendingPayNowPayoutCount:
    payoutsReducer.individualPayoutListState?.body?.pendingPayNowPayoutCount ??
    0,
  pendingPayLaterPayoutCount:
    payoutsReducer.individualPayoutListState?.body
      ?.pendingPayLaterPayoutCount ?? 0,
  totalRecords:
    payoutsReducer.individualPayoutListState?.body?.totalRecords ?? 0,
  approveIndividualPayoutState: payoutsReducer.approveIndividualPayoutState,
  rejectIndividualPayoutState: payoutsReducer.rejectIndividualPayoutState,
  cancelApproveIndividualPayoutState:
    payoutsReducer.cancelApproveIndividualPayoutState,
  getTransactionFailState: payoutsReducer.getTransactionFailState,
});

export default connect(mapStateToProps, {
  getIndividualPayoutsListAction,
  clearIndividualPayoutsListAction,
  approveIndividualPayoutAction,
  rejectIndividualPayoutAction,
  clearApproveIndividualPayoutAction,
  clearRejectIndividualPayoutAction,
  cancelApprovedIndividualPayoutAction,
  clearCancelApprovedIndividualPayoutAction,
  downloadCsvAction,
  getTransactionFailMsgAction,
  clearGetTransactionFailMsgAction,
})(IndividualPayouts);
