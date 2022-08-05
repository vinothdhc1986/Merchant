/* eslint-disable react/display-name */
import React from 'react';
import Popper from '../../../../../../../components/Popper';
import imgURL from '../../../../../../../lib/imgURL';
import { toCapitalize } from 'lib/helper';
import { TableConstantsType } from './typing';

export const columnNames = {
  id: 'ID',
  accountName: 'ACCOUNT NAME',
  accountNo: 'ACCOUNT NUMBER',
  ifscCode: 'IFSC CODE',
  accountType: 'ACCOUNT TYPE',
  bankName: 'BANK NAME',
  status: 'STATUS',
};

export const tableConstants = ({
  selectedRow,
  setSelectedRow,
  handleUpdateActionBtn,
}: TableConstantsType): any => {
  return [
    {
      key: 'id',
      dataIndex: 'id',
      title: columnNames.id,
      sorter: false,
      ellipsis: true,
      align: 'center',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.id || 'NA'}</span>;
      },
    },
    {
      key: 'accountName',
      dataIndex: 'accountName',
      title: columnNames.accountName,
      sorter: false,
      ellipsis: true,
      align: 'center',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.accountName || 'NA'}</span>;
      },
    },
    {
      key: 'accountNo',
      dataIndex: 'accountNo',
      sorter: false,
      align: 'center',
      ellipsis: true,
      title: columnNames.accountNo,
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.accountNo || 'NA'}</span>;
      },
    },
    {
      key: 'bankName',
      dataIndex: 'bankName',
      sorter: false,
      align: 'center',
      ellipsis: true,
      title: columnNames.bankName,
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.bankName || 'NA'}</span>;
      },
    },
    {
      key: 'ifscCode',
      dataIndex: 'ifscCode',
      sorter: false,
      align: 'center',
      ellipsis: true,
      title: columnNames.ifscCode,
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.ifscCode || 'NA'}</span>;
      },
    },
    {
      key: 'status',
      dataIndex: 'status',
      sorter: false,
      align: 'center',
      ellipsis: true,
      title: columnNames.status,
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <div className={`status ${rowData?.status.toLowerCase() ?? ''}`}>
            {rowData?.status ? toCapitalize(rowData.status) : 'NA'}
          </div>
        );
      },
    },

    {
      title: 'Action',
      ellipsis: true,
      align: 'center',
      isColumnVisible: true,
      render: (rowData) => {
        return (
          <div className='action-bt'>
            <div className='dropdown'>
              <Popper
                visible={selectedRow?.id === rowData.id}
                placement='bottomRight'
                onVisibleChange={() => {
                  if (selectedRow && selectedRow?.id === rowData.id) {
                    setSelectedRow(null);
                  } else {
                    setSelectedRow(rowData);
                  }
                }}
                content={
                  <>
                    <div
                      className='dropdown-menu'
                      aria-labelledby='dropdownMenuButton'
                    >
                      <a
                        className='dropdown-item'
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleUpdateActionBtn(rowData);
                        }}
                      >
                        {rowData?.status.toLowerCase() === 'active'
                          ? 'Deactivate'
                          : 'Activate'}
                      </a>
                    </div>
                  </>
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
                      selectedRow?.id === rowData.id
                        ? imgURL['active-dotted-menu']
                        : imgURL['dotted-menu']
                    }
                    alt='menu'
                  />
                </button>
              </Popper>
            </div>
          </div>
        );
      },
    },
  ];
};
