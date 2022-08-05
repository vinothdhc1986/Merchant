/* eslint-disable react/display-name */
import React from 'react';
import { toCapitalize } from 'lib/helper';
import Popper from 'components/Popper';
import imgURL from 'lib/imgURL';
import { TableConstantsType } from './typing';

export const columnNames = {
  id: 'FILE ID',
  fileName: 'File Name',
  savedTime: 'File Uploaded On',
  totalCount: 'Total Records',
  processedCount: 'Records Processed',
  failureCount: 'Records Failed',
  fileStatus: 'Status',
  action: 'Action',
};

export const columnsList = [
  {
    id: 'fileName',
    isCustomizable: false,
    label: columnNames.fileName,
  },

  {
    id: 'savedTime',
    isCustomizable: false,
    label: columnNames.savedTime,
  },

  {
    id: 'totalCount',
    isCustomizable: false,
    label: columnNames.totalCount,
  },
  {
    id: 'processedCount',
    isCustomizable: false,
    label: columnNames.processedCount,
  },
  {
    id: 'failureCount',
    isCustomizable: false,
    label: columnNames.failureCount,
  },
  {
    id: 'fileStatus',
    isCustomizable: false,
    label: columnNames.fileStatus,
  },
  {
    id: 'action',
    isCustomizable: false,
    label: columnNames.action,
  },
];

export const tableConstants = ({
  selectedRowId,
  setSelectedRowId,
  handleDownloadActionBtn,
}: TableConstantsType): any => {
  return [
    {
      key: 'id',
      dataIndex: 'id',
      title: columnNames.id,
      sorter: true,
      ellipsis: true,
      align: 'center',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.id || 'NA'}</span>;
      },
    },
    {
      key: 'fileName',
      dataIndex: 'fileName',
      title: columnNames.fileName,
      sorter: true,
      ellipsis: true,
      align: 'center',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.fileName || 'NA'}</span>;
      },
    },
    {
      key: 'savedTime',
      dataIndex: 'savedTime',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.savedTime,
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.savedTime || 'NA'}</span>;
      },
    },
    {
      key: 'totalCount',
      dataIndex: 'totalCount',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.totalCount,
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.totalCount === null || rowData.totalCount === undefined
              ? 'NA'
              : rowData.totalCount}
          </span>
        );
      },
    },
    {
      key: 'processedCount',
      dataIndex: 'processedCount',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.processedCount,
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.processedCount === null ||
            rowData.processedCount === undefined
              ? 'NA'
              : rowData.processedCount}
          </span>
        );
      },
    },
    {
      key: 'failureCount',
      dataIndex: 'failureCount',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.failureCount,
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.failureCount === null || rowData.failureCount === undefined
              ? 'NA'
              : rowData.failureCount}
          </span>
        );
      },
    },
    {
      key: 'fileStatus',
      dataIndex: 'fileStatus',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.fileStatus,
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <div
            className={`status ${rowData.fileStatus ? rowData.fileStatus : ''}`}
          >
            {rowData?.fileStatus ? toCapitalize(rowData.fileStatus) : 'NA'}
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
                visible={selectedRowId === rowData.id}
                placement='bottomRight'
                onVisibleChange={() => {
                  if (selectedRowId && selectedRowId === rowData.id) {
                    setSelectedRowId(null);
                  } else {
                    setSelectedRowId(rowData.id);
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
                          handleDownloadActionBtn(rowData.id);
                        }}
                      >
                        Download
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
                      selectedRowId === rowData.id
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

export const SORTING_ENUM = {
  id: 'ID',
  fileName: 'FILE_NAME',
  savedTime: 'FILE_DATE',
  totalCount: 'TOTAL_COUNT',
  processedCount: 'SUCCESS_COUNT',
  failureCount: 'FAILURE_COUNT',
  fileStatus: 'FILE_STATUS',
};
