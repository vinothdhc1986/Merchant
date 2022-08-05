/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/display-name */
import Popper from 'components/Popper';
import imgURL from 'lib/imgURL';
import { format } from 'date-fns';
import React from 'react';
import { FILTER_CONSTANT_RETURN_TYPE } from '../../lib/typing';
import { toCapitalize, checkPermissions } from 'lib/helper';

export const columnNames = {
  beneficiaryCode: 'Beneficiary ID',
  name: 'Beneficiary Name',
  accountNo: 'Bank Account',
  ifscCode: 'IFSC Code',
  upiHandle: 'VPA',
  emailId: 'Email',
  mobileNo: 'Phone',
  createdDateTime: 'Created Date',
  status: 'Status',
  action: 'Action',
};

export const columnsList = [
  {
    id: 'beneficiaryCode',
    isCustomizable: false,
    label: columnNames.beneficiaryCode,
  },

  {
    id: 'name',
    isCustomizable: true,
    label: columnNames.name,
  },

  {
    id: 'accountNo',
    isCustomizable: true,
    label: columnNames.accountNo,
  },
  {
    id: 'ifscCode',
    isCustomizable: true,
    label: columnNames.ifscCode,
  },
  {
    id: 'upiHandle',
    isCustomizable: true,
    label: columnNames.upiHandle,
  },
  {
    id: 'emailId',
    isCustomizable: true,
    label: columnNames.emailId,
  },
  {
    id: 'mobileNo',
    isCustomizable: true,
    label: columnNames.mobileNo,
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
  beneficiaryIdClickHandler: CallableFunction,
  clickedActionBtnId: string | null,
  setClickedActionBtnId: CallableFunction,
  approveBeneficiaryClickHandler: CallableFunction,
  rejectBeneficiaryClickHandler: CallableFunction,
  deactivateBeneficiaryClickHandler: CallableFunction
): any => {
  return [
    {
      key: 'beneficiaryCode',
      dataIndex: 'beneficiaryCode',
      title: columnNames.beneficiaryCode,
      sorter: true,
      ellipsis: true,
      align: 'center',
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <label
            className='active-link text-ellipsis'
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            onClick={() => beneficiaryIdClickHandler(rowData)}
          >
            {rowData.beneficiaryCode || 'NA'}
          </label>
        );
      },
    },
    {
      key: 'name',
      dataIndex: 'name',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.name,
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.name || 'NA'}</span>;
      },
    },
    {
      key: 'accountNo',
      dataIndex: 'accountNo',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.accountNo,
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.accountNo || 'NA'}</span>;
      },
    },
    {
      key: 'ifscCode',
      dataIndex: 'ifscCode',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.ifscCode,
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.ifscCode || 'NA'}</span>;
      },
    },
    {
      key: 'upiHandle',
      dataIndex: 'upiHandle',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.upiHandle,
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.upiHandle || 'NA'}</span>;
      },
    },
    {
      key: 'emailId',
      dataIndex: 'emailId',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.emailId,
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.emailId || 'NA'}</span>;
      },
    },
    {
      key: 'mobileNo',
      dataIndex: 'mobileNo',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.mobileNo,
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.mobileNo || 'NA'}</span>;
      },
    },
    {
      key: 'createdDateTime',
      dataIndex: 'createdDateTime',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.createdDateTime,
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.createdDateTime
              ? format(
                  new Date(rowData.createdDateTime),
                  'd MMM yyyy, hh:mm aa'
                )
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
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          //SUBMITTED, REJECTED, ACTIVE, PENDING, FAILED, DISABLED
          <div
            className={`status ${
              rowData.status ? rowData.status.toLowerCase() : ''
            }`}
          >
            {rowData.status ? toCapitalize(rowData.status) : 'NA'}
          </div>
        );
      },
    },
    {
      title: columnNames.action,
      isColumnVisible: checkPermissions('APPROVE_REJECT_BENEFICIARIES'),
      ellipsis: true,
      align: 'center',
      key: 'action',
      render: (rowData) => {
        return (
          <div className='action-bt'>
            <div className='dropdown'>
              {(rowData.status === 'SUBMITTED' ||
                rowData.status === 'ACTIVE') && (
                <Popper
                  visible={clickedActionBtnId === rowData.beneficiaryCode}
                  placement='bottomRight'
                  onVisibleChange={() => {
                    if (
                      clickedActionBtnId &&
                      clickedActionBtnId === rowData.beneficiaryCode
                    ) {
                      setClickedActionBtnId(null);
                    } else {
                      setClickedActionBtnId(rowData.beneficiaryCode);
                    }
                  }}
                  content={
                    <div
                      className='dropdown-menu'
                      aria-labelledby='dropdownMenuButton'
                    >
                      {rowData.status === 'SUBMITTED' && (
                        <>
                          <a
                            className='dropdown-item'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              approveBeneficiaryClickHandler(
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
                              rejectBeneficiaryClickHandler(
                                rowData.beneficiaryCode
                              );
                            }}
                          >
                            Reject
                          </a>
                        </>
                      )}
                      {rowData.status === 'ACTIVE' && (
                        <a
                          className='dropdown-item'
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            deactivateBeneficiaryClickHandler(
                              rowData.beneficiaryCode
                            );
                          }}
                        >
                          Deactivate
                        </a>
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
                        clickedActionBtnId === rowData.beneficiaryCode
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

export const BENE_SORTING_ENUM = {
  beneficiaryCode: 'BENEFICIARY_CODE',
  name: 'BENE_NAME',
  accountNo: 'ACCOUNT_NUMBER',
  ifscCode: 'IFSC_CODE',
  upiHandle: 'UPI_HANDLE',
  emailId: 'EMAIL',
  mobileNo: 'MOBILE_NUMBER',
  createdDateTime: 'CREATION_TIME ',
  // status:
};

export const initFilterPayload = {
  merchantDetails: {
    selectKey: 'Select',
    inputValue: '',
  },
  bankDetails: {
    selectKey: 'Select',
    inputValue: '',
  },
};

export const merchantDetailsOptions = [
  {
    value: '',
    label: 'Select',
  },
  {
    value: 'beneName',
    label: 'Beneficiary Name',
  },
  {
    value: 'emailId',
    label: 'Beneficiary Email',
  },
  {
    value: 'mobileNo',
    label: 'Beneficiary Phone No',
  },
];

export const bankDetailsOptions = [
  {
    value: '',
    label: 'Select',
  },
  {
    value: 'accountNo',
    label: 'Account Number',
  },
  {
    value: 'ifscCode',
    label: 'IFSC Code',
  },
  {
    value: 'upiHandle',
    label: 'VPA',
  },
];

export const BENE_FILTER_KEYS_MAPPING = {
  beneName: 'Beneficiary Name',
  'Beneficiary Name': 'beneName',
  emailId: 'Beneficiary Email',
  'Beneficiary Email': 'emailId',
  mobileNo: 'Beneficiary Phone No',
  'Beneficiary Phone No': 'mobileNo',
  accountNo: 'Account Number',
  'Account Number': 'accountNo',
  ifscCode: 'IFSC Code',
  'IFSC Code': 'ifscCode',
  upiHandle: 'VPA',
  VPA: 'upiHandle',
};

export const BANK_DETAILS_FILTER_KEYS = ['Account Number', 'IFSC Code', 'VPA'];

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
    {
      type: 'dropdownWithoutAmount',
      name: 'bankDetails',
      options: bankDetailsOptions,
      handleSelect: (name, value) => filterHandler(name, value, 'select'),
      handleInput: (name, value) => filterHandler(name, value, 'input'),
      value: filterPayload.bankDetails,
      inputErrorMessage: filterValidationError?.bankDetails,
      inputError:
        filterValidationError?.bankDetails &&
        filterIsTouchedPayload?.bankDetails,
      handleInputBlur: () => handleFilterInputBlur('bankDetails'),
    },
  ];
};
