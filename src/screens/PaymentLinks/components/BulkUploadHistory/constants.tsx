/* eslint-disable react/display-name */
import React from 'react';
import { format } from 'date-fns';
import imgURL from '../../../../lib/imgURL';
import { UiRoutes } from '../../../../lib/constants';
import config from '../../../../config';
import apiEndpoints from 'lib/apiEndpoints';

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
      dataIndex: 'fileName',
      sorter: true,
      isColumnVisible: true,
      title: columnNames.fileName,
      render: (text, rowData) => {
        return <span>{rowData.fileName || 'NA'}</span>;
      },
    },
    {
      key: 'date',
      dataIndex: 'insertedDateTime',
      sorter: true,
      isColumnVisible: true,
      title: columnNames.fileUploadOn,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.insertedDateTime
              ? format(
                  new Date(rowData.insertedDateTime),
                  'd MMM yyyy, hh:mm aa'
                )
              : 'NA'}
          </span>
        );
      },
    },

    {
      key: 'total_records',
      dataIndex: 'totalRecordsInserted',
      sorter: true,
      isColumnVisible: true,
      title: columnNames.totalRecords,
      render: (text, rowData) => {
        return <span>{rowData.totalRecordsInserted || 0}</span>;
      },
    },
    {
      key: 'total_records_processed',
      dataIndex: 'totalRecordsProcessed',
      sorter: true,
      isColumnVisible: true,
      title: columnNames.recordsProcessed,
      render: (text, rowData) => {
        return <span>{rowData.totalRecordsProcessed || 0}</span>;
      },
    },
    {
      key: 'recordsFailed',
      dataIndex: 'totalRecordsFailed',
      isColumnVisible: true,
      title: columnNames.recordsFailed,
      render: (text, rowData) => {
        return <span>{rowData.totalRecordsFailed || 0}</span>;
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
                  url: `${
                    config.API.API_BASE_URL
                  }/${apiEndpoints.DOWNLOAD_PAYMENT_LINK_BULK_UPLOAD_HISTORY_FILE(
                    rowData.fileId,
                    merchantId
                  )}`,
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

export const PAYMENT_LINK_BULK_UPLOAD_HISTORY_BREADCRUMB_CONFIG = [
  { label: 'Payment Links', path: UiRoutes.PAYMENT_LINKS },
  { label: 'Bulk Upload History' },
];

export const DEFAULT_DATE_RANGE_DAYS = 7;
