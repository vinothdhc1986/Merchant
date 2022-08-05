/*eslint-disable */
import React from 'react';
import { format } from 'date-fns';

const columnNames = {
  merchantId: 'Merchant ID',
  merchantName: 'Merchant Name',
  createdOn: 'Created On',
  lastAccessedOn: 'Last Accessed On',
  action: '',
};

export const tableConstants = (merchantRedirectionHandler) => {
  return [
    {
      key: 'merchantId',
      dataIndex: 'merchantId',
      sorter: true,
      title: columnNames.merchantId,
      align: 'center',
      ellipsis: true,
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <>
            <span>{rowData.merchantId || 'NA'}</span>
          </>
        );
      },
    },
    {
      key: 'merchantName',
      dataIndex: 'merchantName',
      sorter: true,
      title: columnNames.merchantName,
      ellipsis: true,
      align: 'center',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.merchantName || 'NA'}</span>;
      },
    },
    {
      key: 'createdOn',
      dataIndex: 'createdOn',
      sorter: true,
      isColumnVisible: true,
      title: columnNames.createdOn,
      ellipsis: true,
      align: 'center',
      render: (text, rowData) => {
        return (
          <span>
            {rowData.createdOn
              ? format(new Date(rowData.createdOn), 'd MMM yyyy, hh:mm aa')
              : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'lastAccessedOn',
      dataIndex: 'lastAccessedOn',
      sorter: true,
      ellipsis: true,
      align: 'center',
      isColumnVisible: true,
      title: columnNames.lastAccessedOn,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.lastAccessedOn
              ? format(new Date(rowData.lastAccessedOn), 'd MMM yyyy, hh:mm aa')
              : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'action',
      dataIndex: 'merchantId',
      sorter: false,
      ellipsis: true,
      align: 'center',
      isColumnVisible: true,
      title: columnNames.action,
      render: (text, rowData) => {
        return (
          <label
            className='active-link'
            onClick={() =>{
              merchantRedirectionHandler(
                rowData.merchantId,
                rowData.merchantName,
                rowData.isTRMEnabled,
                rowData.emailId,
                rowData.isPayoutEnabled,
                rowData.payoutBankId,
              )}
            }
          >
            View Dashboard
          </label>
        );
      },
    },
  ];
};
