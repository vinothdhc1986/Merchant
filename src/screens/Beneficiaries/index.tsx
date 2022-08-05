import React, { FC, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import SubHeader from '../../components/SubHeader';
import Tabs from '../../components/Tabs';
import Filter from '../../components/Filter';
import ConfirmationModal from 'components/ConfirmationModal';
import AboutHeader from '../../components/AboutHeader';
import FilterRow from '../../components/FilterRow';
import SideModal from '../../components/SideModal';
import AppliedFiltersComponent from '../../components/AppliedFilters';
import CustomTable from '../../components/CustomTable';
import RejectModal from '../../components/RejectModal';
import Button from '../../components/Button';
import BeneficiariesSideModalBody from './components/BeneficiariesSideModalBody';
import AddBeneficiaryModal from './components/AddBeneficiaryModal';
import PendingListFilter from '../../components/PendingListFilter';
import CustomNoDataFound from 'components/CustomNoDataFound';
import { downloadCsvAction } from 'redux/actions/downloadCsv';
import notify from '../../lib/notifiy';
import {
  addNewBeneficiaryAction,
  beneficiaryListAction,
  approveBeneficiaryAction,
  rejectBeneficiaryAction,
  clearAddNewBeneficiaryAction,
  clearBeneficiaryListAction,
  clearApproveBeneficiaryAction,
  clearRejectBeneficiaryAction,
  deactivateBeneficiaryAction,
  clearDeactivateBeneficiaryAction,
} from '../../redux/actions/payouts';
import apiEndpoints from '../../lib/apiEndpoints';
import useRedirect from 'hooks/useRedirect';
import {
  checkPermissions,
  dateRangeUpToToday,
  getMerchantIdFromStore,
} from '../../lib/helper';
import {
  numericValidationRegex,
  phoneValidationRegex,
  emailValidationRegex,
  nameValidationRegex,
  alphaNumericValidationRegexWithoutSpace,
  PER_PAGE_LIMIT,
  PAYOUT_REQUEST_DATE_FORMAT,
  ifscCodeValidationRegex,
  PAYOUT_LISTING_NO_RECORD_ERROR_CODE,
} from '../../lib/constants';
import config from '../../config';
import {
  tableConstants,
  initFilterPayload,
  filterFields,
  BENE_FILTER_KEYS_MAPPING,
  BANK_DETAILS_FILTER_KEYS,
  BENE_SORTING_ENUM,
} from './beneficiaries.constants';
import { PAYOUT_TAB_OPTIONS } from 'screens/IndividualPayouts/individualPayouts.constants';
import { DateRangeType } from '../../lib/typing';
import Props, { BeneListingPayloadType, TabOptionsType } from './typing';
import '../IndividualPayouts/style.scss';

const Beneficiaries: FC<Props> = (props): JSX.Element => {
  const merchantId = getMerchantIdFromStore();
  const { totalRecords, pendingRecords, beneficiaryList } = props;
  const { isAdmin } = props.loginState;
  const { location } = useRedirect();

  const [isDateRangeModal, setIsDateRangeModal] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeType | null>(
    dateRangeUpToToday()
  );
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [isFilter, setIsFilter] = useState(false);
  const [listType, setListType] = useState<'EDIT' | 'MASTER'>('EDIT');
  const [filterPayload, setFilterPayload] = useState(initFilterPayload);
  const [appliedFilter, setAppliedFilter] = useState(initFilterPayload);
  const [appliedFiltersList, setAppliedFiltersList] = useState<any[]>([]);
  const [filterValidationError, setFilterValidationError] = useState({});
  const [filterIsTouchedPayload, setFilterIsTouchedPayload] = useState({});
  const [isAddBeneficiariesModal, setIsAddBeneficiariesModal] = useState(false);
  const [isRejectModal, setIsRejectModal] = useState(false);
  const [isBeneficiariesSideModal, setIsBeneficiariesSideModal] =
    useState(false);
  const [selectedRowForPayout, setSelectedRowForPayout] = useState<any>(null);
  const [clickedActionBtnId, setClickedActionBtnId] = useState<string | null>(
    null
  );
  const [appliedPendingFiltersList, setAppliedPendingFiltersList] = useState<
    Array<string>
  >([]);

  const [isDisableConfirmModal, setIsDisableConfirmModal] = useState(false);
  const [selectedRowBeneCode, setSelectedRowBeneCode] = useState(null);
  const [isApproveConfirmModal, setIsApproveConfirmModal] = useState(false);

  const [status, setStatus] = useState<'SUBMITTED' | ''>('');

  const disableToolbar = useMemo(() => {
    return !beneficiaryList.length && !appliedFiltersList.length;
  }, [beneficiaryList, appliedFiltersList]);

  const handleClickFilterBtn = () => {
    setIsFilter(true);
    setFilterValidationError({});
    setFilterIsTouchedPayload({});
  };

  const handleDownload = () => {
    const requestPayload = {
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
      ...(appliedFilter?.merchantDetails.inputValue && {
        [appliedFilter?.merchantDetails.selectKey]:
          appliedFilter?.merchantDetails.inputValue,
      }),
      ...(appliedFilter?.bankDetails.inputValue && {
        [appliedFilter?.bankDetails.selectKey]:
          appliedFilter?.bankDetails.inputValue,
      }),
      merchantId: merchantId,
      ...(status && { status }),
    };
    let url = `${config.API.API_PAYOUTS_URL}/${
      apiEndpoints.DOWNLOAD_BENEFICIARY_LIST
    }?pageNumber=${page || 1}`;
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
      disableToolbar: disableToolbar,
    },
    accountBalance: {
      onClick: () => {},
    },
    download: {
      onClick: handleDownload,
    },
  };

  useEffect(() => {
    if (location?.state?.isAddBeneficirayModalOpen) {
      setIsAddBeneficiariesModal(true);
    }
    if (location?.state?.isSubmitStatusApplied) {
      setAppliedPendingFiltersList(['beneficiaries']);
      setStatus('SUBMITTED');
      setDateRange(null);
    }
    return () => {
      props.clearBeneficiaryListAction();
      props.clearAddNewBeneficiaryAction();
    };
  }, []);

  useEffect(() => {
    const { isSuccess, isFailure, successMessage, errorMessage } =
      props.addNewBeneficiaryState;
    if (isSuccess) {
      notify({
        type: 'success',
        message: 'Success',
        description: successMessage || 'Beneficiary created successfully.',
      });
      props.clearAddNewBeneficiaryAction();
      fetchBeneListing({
        pageNo: 1,
        orderBy,
        sortBy,
        filters: appliedFilter,
        fromDate: dateRange?.startDate,
        toDate: dateRange?.endDate,
        listType,
      });
      setIsAddBeneficiariesModal(false);
    }
    if (isFailure) {
      notify({
        type: 'error',
        message: 'Failure',
        description: errorMessage,
      });
    }
  }, [props.addNewBeneficiaryState]);

  useEffect(() => {
    const { isSuccess, isFailure, successMessage, errorMessage } =
      props.approveBeneficiaryState;
    if (isSuccess) {
      notify({
        type: 'success',
        message: 'Success',
        description: successMessage,
      });
      props.clearApproveBeneficiaryAction();
      fetchBeneListing({
        pageNo: page,
        orderBy,
        sortBy,
        filters: appliedFilter,
        fromDate: dateRange?.startDate,
        toDate: dateRange?.endDate,
        listType,
      });
    }
    if (isFailure) {
      notify({
        type: 'error',
        message: 'Failure',
        description: errorMessage,
      });
      props.clearApproveBeneficiaryAction();
    }
  }, [props.approveBeneficiaryState]);

  useEffect(() => {
    const { isSuccess, isFailure, successMessage, errorMessage } =
      props.rejectBeneficiaryState;
    if (isSuccess) {
      notify({
        type: 'success',
        message: 'Success',
        description: successMessage,
      });
      fetchBeneListing({
        pageNo: page,
        orderBy,
        sortBy,
        filters: appliedFilter,
        fromDate: dateRange?.startDate,
        toDate: dateRange?.endDate,
        listType,
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
      props.clearRejectBeneficiaryAction();
    };
  }, [props.rejectBeneficiaryState]);

  useEffect(() => {
    const { isSuccess, isFailure, successMessage, errorMessage } =
      props.deactivateBeneficiaryState;
    if (isSuccess) {
      notify({
        type: 'success',
        message: 'Success',
        description: successMessage,
      });
      fetchBeneListing({
        pageNo: page,
        orderBy,
        sortBy,
        filters: appliedFilter,
        fromDate: dateRange?.startDate,
        toDate: dateRange?.endDate,
        listType,
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
      props.clearDeactivateBeneficiaryAction();
    };
  }, [props.deactivateBeneficiaryState]);

  useEffect(() => {
    const { isFailure, errorMessage, errorCode } = props.beneficiaryListState;
    if (isFailure && errorCode !== PAYOUT_LISTING_NO_RECORD_ERROR_CODE) {
      notify({
        type: 'error',
        message: 'Failure',
        description: errorMessage,
      });
      return () => {
        props.clearBeneficiaryListAction();
      };
    }
  }, [props.beneficiaryListState]);

  const dateRangeSaveHandler = (value: DateRangeType) => {
    setDateRange(value);
    setIsDateRangeModal(false);
    setPage(1);
  };

  const beneficiaryIdClickHandler = (rowData) => {
    setIsBeneficiariesSideModal(true);
    setSelectedRowForPayout(rowData);
    // call beneficiary details action, on success show beneficiary details side modal
  };

  const approveBeneficiaryClickHandler = (beneficiaryCode) => {
    setIsApproveConfirmModal(true);
    setSelectedRowBeneCode(beneficiaryCode);
    setClickedActionBtnId(null);
  };

  const deactivateBeneficiaryClickHandler = (beneficiaryCode) => {
    setSelectedRowBeneCode(beneficiaryCode);
    setIsDisableConfirmModal(true);
    setClickedActionBtnId(null);
  };

  const rejectBeneficiaryFromListClickHandler = (beneficiaryCode) => {
    setIsRejectModal(true);
    setSelectedRowForPayout(beneficiaryCode);
    setClickedActionBtnId(null);
  };

  const rejectModalSubmitButtonClickHandler = (reason) => {
    props.rejectBeneficiaryAction({
      rejectBeneficiaries: [
        {
          beneficiaryCode: selectedRowForPayout,
          reason,
        },
      ],
      merchantId: merchantId,
    });
    setIsRejectModal(false);
  };

  const fetchBeneListing = ({
    pageNo,
    orderBy,
    sortBy,
    filters,
    fromDate,
    toDate,
    listType,
    status,
  }: BeneListingPayloadType) => {
    const requestPayload = {
      pageNumber: pageNo || 1,
      pageSize: PER_PAGE_LIMIT,
      ...(orderBy && { orderBy }),
      ...(sortBy && { sortBy }),
      ...(fromDate && {
        fromDate: format(new Date(fromDate), PAYOUT_REQUEST_DATE_FORMAT),
      }),
      ...(toDate && {
        toDate: format(new Date(toDate), PAYOUT_REQUEST_DATE_FORMAT),
      }),
      ...(listType ? { listType } : { listType: 'EDIT' }),
      ...(filters?.merchantDetails.inputValue && {
        [filters?.merchantDetails.selectKey]:
          filters?.merchantDetails.inputValue,
      }),
      ...(filters?.bankDetails.inputValue && {
        [filters?.bankDetails.selectKey]: filters?.bankDetails.inputValue,
      }),
      merchantId: merchantId,
      ...(status && { status }),
    };
    props.beneficiaryListAction(requestPayload);
  };

  useEffect(() => {
    fetchBeneListing({
      pageNo: page,
      orderBy,
      sortBy,
      filters: appliedFilter,
      fromDate: dateRange?.startDate,
      toDate: dateRange?.endDate,
      listType,
      status,
    });
  }, [page, orderBy, sortBy, appliedFilter, dateRange, listType, status]);

  const handleFilterInputBlur = (name) => {
    setFilterIsTouchedPayload({
      ...filterIsTouchedPayload,
      [name]: true,
    });
  };

  const filterHandler = (fieldName, value, fieldType) => {
    const filterPayloadCopy = JSON.parse(JSON.stringify(filterPayload));
    switch (fieldName) {
      case 'merchantDetails':
      case 'bankDetails':
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
          if (filterPayloadCopy[fieldName][`selectKey`] === 'emailId') {
            filterPayloadCopy[fieldName][`inputValue`] = value;
            if (!emailValidationRegex.test(value) && value) {
              setFilterValidationError({
                ...filterValidationError,
                [fieldName]: props.validationErrors.INVALID_EMAIL,
              });
            } else {
              setFilterValidationError({
                ...filterValidationError,
                [fieldName]: '',
              });
            }
          } else if (filterPayloadCopy[fieldName][`selectKey`] === 'mobileNo') {
            if (numericValidationRegex.test(value) || value === '') {
              filterPayloadCopy[fieldName][`inputValue`] = value;
              if (!phoneValidationRegex.test(value) && value) {
                setFilterValidationError({
                  ...filterValidationError,
                  [fieldName]: props.validationErrors.INVALID_PHONE_NUMBER,
                });
              } else {
                setFilterValidationError({
                  ...filterValidationError,
                  [fieldName]: '',
                });
              }
            }
          } else if (
            filterPayloadCopy[fieldName][`selectKey`] === 'accountNo'
          ) {
            if (
              alphaNumericValidationRegexWithoutSpace.test(value) ||
              value === ''
            ) {
              filterPayloadCopy[fieldName][`inputValue`] = value;
            }
          } else if (filterPayloadCopy[fieldName][`selectKey`] === 'beneName') {
            if ((value && nameValidationRegex.test(value)) || !value) {
              filterPayloadCopy[fieldName][`inputValue`] = value;
            }
          } else if (filterPayloadCopy[fieldName][`selectKey`] === 'ifscCode') {
            if (
              (value && alphaNumericValidationRegexWithoutSpace.test(value)) ||
              !value
            ) {
              filterPayloadCopy[fieldName][`inputValue`] = value;
              if (!ifscCodeValidationRegex.test(value) && value) {
                setFilterValidationError({
                  ...filterValidationError,
                  [fieldName]: props.validationErrors.INVALID_IFSC_CODE,
                });
              } else {
                setFilterValidationError({
                  ...filterValidationError,
                  [fieldName]: '',
                });
              }
            }
          } else {
            filterPayloadCopy[fieldName][`inputValue`] = value;
          }
        }
        break;
    }
    setFilterPayload(filterPayloadCopy);
  };

  // Removed any specific filter Handler
  const removeFilterHandler = ({ keyName }) => {
    const appliedFilterCopy = JSON.parse(JSON.stringify(filterPayload));
    const defaultObj = {
      selectKey: '',
      inputValue: '',
    };
    if (BANK_DETAILS_FILTER_KEYS.includes(keyName)) {
      appliedFilterCopy.bankDetails = defaultObj;
    } else {
      appliedFilterCopy.merchantDetails = defaultObj;
    }
    setAppliedFilter(appliedFilterCopy);
    setFilterPayload(appliedFilterCopy);
    setPage(1);
  };

  // Update applied filter list, if there is any update in filters
  useEffect(() => {
    const allFilters: { keyName: string; value: string }[] = [];
    Object.keys(appliedFilter).forEach((key) => {
      if (appliedFilter[key]?.inputValue) {
        allFilters.push({
          keyName: BENE_FILTER_KEYS_MAPPING[appliedFilter[key]?.selectKey],
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
    setPage(1);
  };

  const handleResetFilter = () => {
    setFilterPayload(initFilterPayload);
    setFilterValidationError({});
    setFilterIsTouchedPayload({});
  };

  const onPageChange = (pageNo: number) => setPage(pageNo);

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

    setSortBy(BENE_SORTING_ENUM[sortingKey]);
    setOrderBy(sortingOrder);
  };

  const resetAll = () => {
    handleResetFilter();
    setAppliedFilter(initFilterPayload);
    setPage(1);
    setSortBy('');
    setOrderBy('');
  };

  const handleClickPendingFilter = () => {
    setAppliedPendingFiltersList(['beneficiaries']);
    setListType('EDIT');
    setStatus('SUBMITTED');
    setDateRange(null);
    resetAll();
  };

  const handleRemovePendingFilter = () => {
    setAppliedPendingFiltersList([]);
    setStatus('');
    setDateRange(dateRangeUpToToday());
    resetAll();
  };

  const handleTabChange = (value: TabOptionsType) => {
    setListType(value);
    status && setStatus('');
    setAppliedPendingFiltersList([]);
    setDateRange(dateRangeUpToToday());
    resetAll();
  };

  return (
    <React.Fragment>
      <div className='individual-payouts-container beneficiary-list-container'>
        {!isAdmin && (
          <AboutHeader
            title='About Beneficiaries'
            content='Initiate payouts to unlimited vendors in one go all from your dashboard.'
          />
        )}

        <SubHeader
          title='Beneficiaries'
          description='Beneficiaries created for your account can be viewed here. Create as many as you need.'
          showIcon={true}
          svgIcon='beneficiaries-subheader'
          svgDetail='beneficiaries'
          extraButtons={
            checkPermissions('CREATE_BENEFICIARIES') ? (
              <Button
                btnStyleClass={`secondry-button ${
                  isAddBeneficiariesModal && 'focus-button'
                }`}
                label='Add Beneficiary'
                onClick={() => {
                  setIsAddBeneficiariesModal(!isAddBeneficiariesModal);
                }}
                enable={true}
              />
            ) : undefined
          }
        />

        <Tabs
          options={PAYOUT_TAB_OPTIONS}
          value={listType}
          onChange={handleTabChange}
        />

        {listType === 'EDIT' && (status === 'SUBMITTED' || pendingRecords > 0) && (
          <PendingListFilter
            filterTitle={'Verification Needed'}
            filtersList={[
              {
                pendingRecords,
                label: 'Beneficiaries',
                key: 'beneficiaries',
              },
            ]}
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
              setPage(1);
              setAppliedFilter(initFilterPayload);
              setFilterPayload(initFilterPayload);
            }}
          />
        )}

        {beneficiaryList.length > 0 ? (
          <CustomTable
            dataSource={props.beneficiaryList}
            showPagination={Boolean(totalRecords > 0)}
            currentPage={page}
            onPageChangeHandler={onPageChange}
            totalRecords={totalRecords}
            handleSorting={handleSorting}
            columns={tableConstants(
              beneficiaryIdClickHandler,
              clickedActionBtnId,
              setClickedActionBtnId,
              approveBeneficiaryClickHandler,
              rejectBeneficiaryFromListClickHandler,
              deactivateBeneficiaryClickHandler
            )}
          />
        ) : (
          <CustomNoDataFound
            title='There are no beneficiaries here!'
            subTitle='Your Beneficiary list will show up here!'
          />
        )}

        {isBeneficiariesSideModal && (
          <SideModal
            ModalBody={BeneficiariesSideModalBody}
            modalBodyProps={{ rowData: selectedRowForPayout }}
            closeModal={() => setIsBeneficiariesSideModal(false)}
            title={'Payout Details'}
          />
        )}

        {isAddBeneficiariesModal && (
          <AddBeneficiaryModal
            closeModal={() => setIsAddBeneficiariesModal(false)}
            validationErrors={props.validationErrors}
            addNewBeneficiaryAction={props.addNewBeneficiaryAction}
            addNewBeneficiaryState
            clearAddNewBeneficiaryAction={props.clearAddNewBeneficiaryAction}
          />
        )}

        {isRejectModal && (
          <RejectModal
            closeModal={() => setIsRejectModal(false)}
            validationErrors={props.validationErrors}
            submitButtonHandler={rejectModalSubmitButtonClickHandler}
            submitButtonLabel='Reject Beneficiary'
            title='Reject Beneficiary'
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
              (!filterPayload.merchantDetails.inputValue &&
                !filterPayload.bankDetails.inputValue)
            }
          />
        )}

        {isDisableConfirmModal && (
          <ConfirmationModal
            title='Deactivate Beneficiary'
            confirmText='Confirm'
            iconType='warning'
            handleCancel={() => {
              setIsDisableConfirmModal(false);
              setSelectedRowBeneCode(null);
            }}
            handleSave={() => {
              props.deactivateBeneficiaryAction({
                beneficiaryCode: selectedRowBeneCode,
                merchantId: merchantId,
              });
              setIsDisableConfirmModal(false);
              setSelectedRowBeneCode(null);
            }}
            content='Are you sure you want to deactivate? once deactivated it can not be activated again.'
          />
        )}

        {isApproveConfirmModal && (
          <ConfirmationModal
            title='Approve Beneficiary'
            confirmText='Confirm'
            iconType='warning'
            handleCancel={() => {
              setIsApproveConfirmModal(false);
              setSelectedRowBeneCode(null);
            }}
            handleSave={() => {
              props.approveBeneficiaryAction({
                approveBeneficiaries: [selectedRowBeneCode],
                merchantId: merchantId,
              });
              setIsApproveConfirmModal(false);
              setSelectedRowBeneCode(null);
            }}
            content='Are you sure you want to approve?'
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
  beneficiaryList: payoutsReducer.beneficiaryListState?.data?.data ?? [],
  pendingRecords:
    payoutsReducer.beneficiaryListState?.data?.pendingRecords ?? 0,
  totalRecords: payoutsReducer.beneficiaryListState?.data?.totalRecords ?? 0,
  approveBeneficiaryState: payoutsReducer.approveBeneficiaryState,
  rejectBeneficiaryState: payoutsReducer.rejectBeneficiaryState,
  addNewBeneficiaryState: payoutsReducer.addNewBeneficiaryState,
  deactivateBeneficiaryState: payoutsReducer.deactivateBeneficiaryState,
  beneficiaryListState: payoutsReducer.beneficiaryListState,
});

export default connect(mapStateToProps, {
  addNewBeneficiaryAction,
  beneficiaryListAction,
  approveBeneficiaryAction,
  rejectBeneficiaryAction,
  clearAddNewBeneficiaryAction,
  clearBeneficiaryListAction,
  clearApproveBeneficiaryAction,
  clearRejectBeneficiaryAction,
  deactivateBeneficiaryAction,
  clearDeactivateBeneficiaryAction,
  downloadCsvAction,
})(Beneficiaries);
