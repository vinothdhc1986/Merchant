/* eslint-disable react/display-name */
import React from 'react';
import { format } from 'date-fns';
import imgURL from '../../lib/imgURL';
import { UiRoutes } from '../../lib/constants';
import config from '../../config';

const columnNames = {
  fileName: 'File Name',
  fileUploadOn: 'File Uploaded On',
  totalRecords: 'Total Records',
  recordsProcessed: 'Records Processed',
  recordsFailed: 'Records Failed',
  action: 'Action',
};

export const tableConstants = ({
  merchantId,
  handleDownloadCsv,
}: {
  merchantId: number | string;
  handleDownloadCsv: ({ url: string }) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): any => {
  return [
    {
      key: 'file_name',
      dataIndex: 'file_name',
      sorter: true,
      isColumnVisible: true,
      title: columnNames.fileName,
      render: (text, rowData) => {
        return <span>{rowData.file_name || 'NA'}</span>;
      },
    },
    {
      key: 'created_date',
      dataIndex: 'created_date',
      sorter: true,
      isColumnVisible: true,
      title: columnNames.fileUploadOn,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.created_date
              ? format(new Date(rowData.created_date), 'd MMM yyyy, hh:mm aa')
              : 'NA'}
          </span>
        );
      },
    },

    {
      key: 'total_record_inserted',
      dataIndex: 'total_record_inserted',
      sorter: true,
      isColumnVisible: true,
      title: columnNames.totalRecords,
      render: (text, rowData) => {
        return <span>{rowData.total_record_inserted || 0}</span>;
      },
    },
    {
      key: 'processed_record',
      dataIndex: 'processed_record',
      sorter: true,
      isColumnVisible: true,
      title: columnNames.recordsProcessed,
      render: (text, rowData) => {
        return <span>{rowData.processed_record || 0}</span>;
      },
    },
    {
      key: 'recordsFailed',
      dataIndex: 'recordsFailed',
      // sorter: true,
      isColumnVisible: true,
      title: columnNames.recordsFailed,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.total_record_inserted && rowData.recordsFailed
              ? rowData.total_record_inserted - rowData.recordsFailed
              : 0}
          </span>
        );
      },
    },
    {
      isColumnVisible: true,
      title: columnNames.action,
      render: (rowData) => {
        return (
          <div>
            <a
              onClick={() =>
                handleDownloadCsv({
                  url: `${config.API.API_BASE_URL}/api/v1/dashboard/transaction/refund/batch/interims/file/download/${merchantId}/${rowData.file_id}`,
                })
              }
            >
              <img src={imgURL['download-icon']} alt='Download' />
            </a>
          </div>
        );
      },
    },
  ];
};

export const REFUND_BULK_UPLOAD_HISTORY_BREADCRUMB_CONFIG = [
  { label: 'Refund', path: UiRoutes.REFUNDS },
  { label: 'Bulk Upload History' },
];
