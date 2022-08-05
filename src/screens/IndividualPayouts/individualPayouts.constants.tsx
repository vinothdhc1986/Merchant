/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/display-name */
import React from 'react';
import { format } from 'date-fns';
import Popper from 'components/Popper';
import imgURL from 'lib/imgURL';
import { FILTER_CONSTANT_RETURN_TYPE } from '../../lib/typing';
import { toCapitalize, checkPermissions } from 'lib/helper';
import {
  PAYOUT_SCHEDULE_LIST_TYPE,
  PAYOUT_REGULAR_LIST_TYPE,
} from 'lib/constants';
import { ConfirmModalPropType, ListTypeProp } from './typing';

export const columnNames = {
  payoutId: 'Payout ID',
  amount: 'Amount',
  paymentType: 'Transfer Type',
  payLaterDateAndTime: 'Scheduled Date & Time',
  beneficiaryCode: 'Beneficiary ID',
  accountOrUpi: 'Beneficiary VPA or Account',
  createdDateTime: 'Created On',
  status: 'Status',
  action: 'Action',
};

export const pendingFilterFields = (
  pendingPayNowPayoutCount: number,
  pendingPayLaterPayoutCount: number,
  appliedPendingFiltersList: Array<string>
) => {
  return [
    {
      pendingRecords: pendingPayNowPayoutCount,
      label: 'Individual',
      key: PAYOUT_REGULAR_LIST_TYPE,
    },
    {
      pendingRecords: pendingPayLaterPayoutCount,
      label: 'Scheduled',
      key: PAYOUT_SCHEDULE_LIST_TYPE,
    },
  ].filter(
    (item) =>
      appliedPendingFiltersList.includes(item.key) || item.pendingRecords > 0
  );
};

export const columnsList = [
  {
    id: 'payoutId',
    isCustomizable: false,
    label: columnNames.payoutId,
  },

  {
    id: 'amount',
    isCustomizable: true,
    label: columnNames.amount,
  },

  {
    id: 'paymentType',
    isCustomizable: true,
    label: columnNames.paymentType,
  },
  {
    id: 'payLaterDateAndTime',
    isCustomizable: true,
    label: columnNames.payLaterDateAndTime,
  },
  {
    id: 'beneficiaryCode',
    isCustomizable: true,
    label: columnNames.beneficiaryCode,
  },
  {
    id: 'accountOrUpi',
    isCustomizable: true,
    label: columnNames.accountOrUpi,
  },
  {
    id: 'createdDateTime',
    isCustomizable: true,
    label: columnNames.createdDateTime,
  },
  {
    id: 'status',
    isCustomizable: false,
    label: columnNames.status,
  },
  {
    id: 'action',
    isCustomizable: false,
    label: columnNames.action,
  },
];

export const tableConstants = (
  payoutClickHandler: CallableFunction,
  clickedActionBtnId: string | null,
  setClickedActionBtnId: CallableFunction,
  approveIndividualPayoutClickHandler: CallableFunction,
  rejectIndividualPayoutClickHandler: CallableFunction,
  cancelPayoutClickHandler: CallableFunction
): any => {
  return [
    {
      key: 'payoutId',
      dataIndex: 'payoutId',
      title: columnNames.payoutId,
      sorter: true,
      ellipsis: true,
      align: 'center',
      isColumnVisible: true, //visibleColumns && visibleColumns.includes('amount'),
      render: (text, rowData) => {
        return (
          <label
            className='active-link'
            onClick={() => payoutClickHandler(rowData)}
          >
            {rowData.payoutId || 'NA'}
          </label>
        );
      },
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.amount,
      isColumnVisible: true, //visibleColumns && visibleColumns.includes('amount'),
      render: (text, rowData) => {
        return (
          <span>
            {rowData.amount ? `₹${Number(rowData.amount).toFixed(2)}` : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'paymentType',
      dataIndex: 'paymentType',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.paymentType,
      isColumnVisible: true, //visibleColumns && visibleColumns.includes('amount'),
      render: (text, rowData) => {
        return <span>{rowData.paymentType || 'NA'}</span>;
      },
    },
    {
      key: 'beneficiaryCode',
      dataIndex: 'beneficiaryCode',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.beneficiaryCode,
      isColumnVisible: true, //visibleColumns && visibleColumns.includes('amount'),
      render: (text, rowData) => {
        return <span>{rowData.beneficiaryCode || 'NA'}</span>;
      },
    },
    {
      key: 'accountOrUpi',
      dataIndex: 'accountOrUpi',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.accountOrUpi,
      isColumnVisible: true, //visibleColumns && visibleColumns.includes('amount'),
      render: (text, rowData) => {
        return <span>{rowData.accountOrUpi || 'NA'}</span>;
      },
    },
    {
      key: 'payLaterDateAndTime',
      dataIndex: 'payLaterDateAndTime',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.payLaterDateAndTime,
      isColumnVisible: true, //visibleColumns && visibleColumns.includes('amount'),
      render: (text, rowData) => {
        return <span>{rowData.payLaterDateAndTime || '-'}</span>;
      },
    },
    {
      key: 'createdDateTime',
      dataIndex: 'createdDateTime',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.createdDateTime,
      isColumnVisible: true, //visibleColumns && visibleColumns.includes('createdOn'),
      render: (text, rowData) => {
        return (
          <span>
            {rowData.createdDateTime
              ? format(new Date(rowData.createdDateTime), 'd MMM yyyy hh:mm aa')
              : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'status',
      dataIndex: 'status',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.status,
      isColumnVisible: true, //visibleColumns && visibleColumns.includes('status'),
      render: (text, rowData) => {
        return (
          <div
            className={`status ${
              rowData.status ? rowData?.status.toLowerCase() : ''
            }`}
          >
            {
              rowData.status && toCapitalize(rowData.status) //? toPascal(rowData.status) : 'NA'
            }
          </div>
        );
      },
    },
    {
      title: columnNames.action,
      isColumnVisible: checkPermissions('APPROVE_REJECT_PAYOUTS'),
      ellipsis: true,
      align: 'center',
      key: 'action',
      render: (rowData) => {
        return (
          <div className='action-bt'>
            <div className='dropdown'>
              {(rowData.status.toLowerCase() === 'submitted' ||
                rowData.status.toLowerCase() === 'pending' ||
                rowData.status.toLowerCase() === 'scheduled') && (
                <Popper
                  visible={clickedActionBtnId === rowData.payoutId}
                  placement='bottomRight'
                  onVisibleChange={() => {
                    if (
                      clickedActionBtnId &&
                      clickedActionBtnId === rowData.payoutId
                    ) {
                      setClickedActionBtnId(null);
                    } else {
                      setClickedActionBtnId(rowData.payoutId);
                    }
                  }}
                  content={
                    <div
                      className='dropdown-menu'
                      aria-labelledby='dropdownMenuButton'
                    >
                      {rowData.status.toLowerCase() === 'submitted' && (
                        <>
                          <a
                            className='dropdown-item'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              approveIndividualPayoutClickHandler(
                                clickedActionBtnId
                              );
                            }}
                          >
                            Approve
                          </a>
                          <a
                            className='dropdown-item'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              rejectIndividualPayoutClickHandler(
                                clickedActionBtnId
                              );
                            }}
                          >
                            Reject
                          </a>
                        </>
                      )}
                      {(rowData.status.toLowerCase() === 'pending' ||
                        rowData.status.toLowerCase() === 'scheduled') && (
                        <>
                          <a
                            className='dropdown-item'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              cancelPayoutClickHandler(clickedActionBtnId);
                            }}
                          >
                            Cancel
                          </a>
                        </>
                      )}
                    </div>
                  }
                >
                  <button
                    className='dropdown-toggle'
                    type='button'
                    id='dropdownMenuButton'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <img
                      src={
                        clickedActionBtnId === rowData.payoutId
                          ? imgURL['active-dotted-menu']
                          : imgURL['dotted-menu']
                      }
                      alt='menu'
                    />
                  </button>
                </Popper>
              )}
            </div>
          </div>
        );
      },
    },
  ];
};

export const INDIVIDUAL_PAYOUT_SORTING_ENUM = {
  payoutId: 'PAYOUT_ID',
  beneficiaryCode: 'BENEFICIARY_CODE',
  accountOrUpi: 'ACCOUNT_OR_UPI',
  amount: 'AMOUNT',
  sourceType: 'SOURCE_TYPE',
  paymentType: 'PAYMENT_TYPE',
  createdDateTime: 'CREATED_DATE_TIME',
  payLaterDateAndTime: 'PAYLATER_DATE_TIME',
  status: 'STATUS',
};

export const merchantDetailsOptions = [
  {
    value: '',
    label: 'Select',
  },
  {
    value: 'fileId',
    label: 'File ID',
  },
];

export const initFilterPayload = {
  merchantDetails: {
    selectKey: 'Select',
    inputValue: '',
  },
};

export const INDIVIDUAL_PAYOUT_FILTER_KEYS_MAPPING = {
  fileId: 'File ID',
  'File ID': 'fileId',
};

export const filterFields = ({
  filterPayload,
  filterHandler,
  handleFilterInputBlur,
  filterValidationError,
  filterIsTouchedPayload,
}): Array<FILTER_CONSTANT_RETURN_TYPE> => {
  return [
    {
      type: 'dropdownWithoutAmount',
      name: 'merchantDetails',
      options: merchantDetailsOptions,
      handleSelect: (name, value) => {
        filterHandler(name, value, 'select');
      },
      handleInput: (name, value) => filterHandler(name, value, 'input'),
      value: filterPayload.merchantDetails,
      inputErrorMessage: filterValidationError?.merchantDetails,
      inputError:
        filterValidationError?.merchantDetails &&
        filterIsTouchedPayload?.merchantDetails,
      handleInputBlur: () => handleFilterInputBlur('merchantDetails'),
    },
  ];
};

export const PAYOUT_TAB_OPTIONS: { label: string; value: ListTypeProp }[] = [
  { label: `Checker's Bucket`, value: 'EDIT' },
  { label: `Bank's Bucket`, value: 'MASTER' },
];

export const defaultConfirmModalProps: ConfirmModalPropType = {
  modalType: '',
  isConfirmModal: false,
  confirmModalTitle: '',
  confirmModalContent: '',
};

export const defaultFailedTransactionDtls = {
  instructionIdentification: '',
  errorMsg: '',
};

export const remarksRegex = /^[ A-Za-z0-9 _@./#!&!$%+-]*$/;
export const rejectReasonRegex = /^[a-zA-Z0-9 .,]*$/;
export const MAX_REMARK_LENGTH = 128;

export const payoutTransferLimit = {
  UPI: { limitFrom: 1, limitTo: 100000 },
  NEFT: { limitFrom: 1000, limitTo: 1000000 },
  IMPS: { limitFrom: 1, limitTo: 250000 },
  RTGS: { limitFrom: 200000, limitTo: 10000000 },
};

export const bankPaymentOptions = [
  { label: 'NEFT', value: 'NEFT' },
  { label: 'IMPS', value: 'IMPS' },
  { label: 'RTGS', value: 'RTGS' },
];

export const upiPaymentOption = [{ label: 'UPI', value: 'UPI' }];
