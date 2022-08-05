/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/display-name */
import React from 'react';
import { format } from 'date-fns';
import { getNextMidNightTimeStamp } from '../../lib/helper';

const columnNames = {
  invoiceNo: 'Invoice No',
  paymentLinkId: 'Payment Link ID',
  paymentGateway: 'Payment Gateway',
  // payeeEmailId: 'Payee Email ID',
  // payeeMobileNo: 'Payee Mobile No',
  paymentURL: 'Payment URL',
  amount: 'Amount (INR)',
  amountPaid: 'Amount Paid (INR)',
  payerEmailId: 'Payer Email ID',
  payerMobileNo: 'Payer Mobile No',
  productCode: 'Product Code',
  productDescription: 'Product Description',
  requestDateTime: 'Request Date Time',
  linkActivationTime: 'Link Activation Time',
  urlExpiryDatetTime: 'Link Expiry Time',
  status: 'Status',
  action: 'Action',
  payByPart: 'Pay In Parts',
};

export const statusColorMapping = {
  Processed: 'processed',
  Unprocessed: 'in-progress',
  Expired: 'failed',
  Partially_payment_done: 'processed',
  Disabled: 'failed',
};

export const filterFields = ({
  filterPayload,
  filterHandler,
  handleFilterInputBlur,
  filterValidationError,
  filterIsTouchedPayload,
  filterStatusOptions,
}) => {
  return [
    {
      type: 'inputField',
      name: 'invoiceNumber',
      label: 'Invoice No',
      subType: 'text',
      value: filterPayload.invoiceNumber,
      onChange: (name: string, value: string) => filterHandler(name, value),
      handleInputBlur: () => handleFilterInputBlur('invoiceNumber'),
      inputErrorMessage: filterValidationError?.invoiceNumber,
      inputError:
        filterValidationError?.invoiceNumber &&
        filterIsTouchedPayload?.invoiceNumber,
    },
    {
      type: 'inputField',
      name: 'customerMobileNumber',
      label: 'Customer Mobile Number',
      subType: 'text',
      maxlength: 10,
      onChange: (name: string, value: string) => filterHandler(name, value),
      value: filterPayload.customerMobileNumber,
      handleInputBlur: () => handleFilterInputBlur('customerMobileNumber'),
      inputErrorMessage: filterValidationError?.customerMobileNumber,
      inputError:
        filterValidationError?.customerMobileNumber &&
        filterIsTouchedPayload?.customerMobileNumber,
    },
    {
      type: 'checkboxGroup',
      name: 'processingStatus',
      label: 'Processing Status',
      options: filterStatusOptions,
      onChange: (name, value) => {
        filterHandler(name, value);
      },
      value: filterPayload.processingStatus,
    },
  ];
};

export const COLUMNS_LIST = [
  {
    id: 'invoiceNo',
    isCustomizable: false,
    label: 'Invoice No',
  },
  {
    id: 'paymentLinkId',
    isCustomizable: false,
    label: 'Payment Link ID',
  },
  {
    id: 'requestDateTime',
    isCustomizable: false,
    label: 'Request Date Time',
  },

  // {
  //   id: 'payeeEmailId',
  //   isCustomizable: true,
  //   label: 'Payee Email ID',
  // },
  // {
  //   id: 'payeeMobileNo',
  //   isCustomizable: true,
  //   label: 'Payee Mobile No',
  // },
  {
    id: 'paymentURL',
    isCustomizable: false,
    label: 'Payment URL',
  },
  {
    id: 'paymentGateway',
    isCustomizable: true,
    label: 'Payment Gateway',
  },
  {
    id: 'amount',
    isCustomizable: true,
    label: 'Amount (INR)',
  },
  {
    id: 'amountPaid',
    isCustomizable: true,
    label: 'Amount Paid (INR)',
  },
  {
    id: 'payerEmailId',
    isCustomizable: true,
    label: 'Payer Email ID',
  },
  {
    id: 'payerMobileNo',
    isCustomizable: true,
    label: 'Payer Mobile No',
  },
  {
    id: 'productCode',
    isCustomizable: true,
    label: 'Product Code',
  },
  {
    id: 'productDescription',
    isCustomizable: true,
    label: 'Product Description',
  },

  {
    id: 'scheduledDateTime',
    isCustomizable: true,
    label: 'Link Activation Time',
  },
  {
    id: 'payByPart',
    isCustomizable: true,
    label: 'Pay In Parts',
  },
  {
    id: 'urlExpiryDatetTime',
    isCustomizable: true,
    label: 'Link Expiry Time',
  },
  {
    id: 'status',
    isCustomizable: false,
    label: 'Status',
  },
  // {
  //   id: 'action',
  //   isCustomizable: false,
  //   label: 'Action',
  // },
];

export const initFilterPayload = {
  invoiceNumber: '',
  customerMobileNumber: '',
  processingStatus: [],
};

export const tableConstants = (
  visibleColumns,
  handleViewPaymentLinkDetails,
  copiedLinkId: number,
  handleCopy: (str: string, id: number) => void
) => {
  return [
    {
      key: 'invoiceNo',
      dataIndex: 'invoiceNo',
      sorter: true,
      title: columnNames.invoiceNo,
      align: 'center',
      ellipsis: true,
      isColumnVisible: visibleColumns && visibleColumns.includes('invoiceNo'),
      render: (text, rowData) => {
        return (
          <>
            <label
              className='active-link'
              onClick={() => handleViewPaymentLinkDetails(rowData)}
            >
              {rowData.invoiceNo || 'NA'}
            </label>
          </>
        );
      },
    },
    {
      key: 'paymentLinkId',
      dataIndex: 'paymentLinkId',
      sorter: true,
      title: columnNames.paymentLinkId,
      align: 'center',
      ellipsis: true,
      isColumnVisible:
        visibleColumns && visibleColumns.includes('paymentLinkId'),
      render: (text, rowData) => {
        return (
          <>
            <label
              className='active-link'
              onClick={() => handleViewPaymentLinkDetails(rowData)}
            >
              {rowData.paymentLinkId || 'NA'}
            </label>
          </>
        );
      },
    },
    {
      key: 'paymentGateway',
      dataIndex: 'paymentGateway',
      sorter: true,
      title: columnNames.paymentGateway,
      ellipsis: true,
      align: 'center',
      isColumnVisible:
        visibleColumns && visibleColumns.includes('paymentGateway'),
      render: (text, rowData) => {
        return <span>{rowData.gatewayName || 'NA'}</span>;
      },
    },
    {
      key: 'paymentUrl',
      dataIndex: 'paymentUrl',
      sorter: true,
      ellipsis: true,
      align: 'center',
      isColumnVisible: visibleColumns && visibleColumns.includes('paymentURL'),
      title: columnNames.paymentURL,
      render: (text, rowData) => {
        return (
          <div className='listing-payment-url-wrapper'>
            <div className='url'>{rowData.paymentUrl || 'NA'}</div>
            <div
              className='copy-button'
              onClick={() =>
                handleCopy(rowData?.paymentUrl ?? '', rowData.paymentLinkId)
              }
            >
              {copiedLinkId === rowData.paymentLinkId ? 'COPIED' : 'COPY'}
            </div>
          </div>
        );
      },
    },

    {
      key: 'amount',
      dataIndex: 'amount',
      sorter: true,
      title: columnNames.amount,
      ellipsis: true,
      align: 'center',
      isColumnVisible: visibleColumns && visibleColumns.includes('amount'),
      render: (text, rowData) => {
        return (
          <span>
            {rowData?.originalTxnAmount
              ? `₹ ${(Number(rowData.originalTxnAmount) / 100).toFixed(2)}`
              : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'amountPaid',
      dataIndex: 'amountPaid',
      sorter: true,
      title: columnNames.amountPaid,
      ellipsis: true,
      align: 'center',
      isColumnVisible: visibleColumns && visibleColumns.includes('amountPaid'),
      render: (text, rowData) => {
        return (
          <span>
            {rowData?.amountInRupees
              ? `₹ ${Number(rowData.amountInRupees).toFixed(2)}`
              : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'payerEmailId',
      dataIndex: 'payerEmailId',
      sorter: true,
      title: columnNames.payerEmailId,
      ellipsis: true,
      align: 'center',
      isColumnVisible:
        visibleColumns && visibleColumns.includes('payerEmailId'),
      render: (text, rowData) => {
        return <span>{rowData.payerEmailId || 'NA'}</span>;
      },
    },
    {
      key: 'payerMobileNo',
      dataIndex: 'payerMobileNo',
      sorter: true,
      title: columnNames.payerMobileNo,
      ellipsis: true,
      align: 'center',
      isColumnVisible:
        visibleColumns && visibleColumns.includes('payerMobileNo'),
      render: (text, rowData) => {
        return <span>{rowData.payerMobileNo || 'NA'}</span>;
      },
    },
    {
      key: 'productCode',
      dataIndex: 'productCode',
      sorter: true,
      title: columnNames.productCode,
      ellipsis: true,
      align: 'center',
      isColumnVisible: visibleColumns && visibleColumns.includes('productCode'),
      render: (text, rowData) => {
        return (
          <span>
            {(Array.isArray(rowData?.productInfo) &&
              rowData?.productInfo[0]?.productCode) ||
              'NA'}
          </span>
        );
      },
    },
    {
      key: 'productDescription',
      dataIndex: 'productDescription',
      sorter: true,
      title: columnNames.productDescription,
      ellipsis: true,
      align: 'center',
      isColumnVisible:
        visibleColumns && visibleColumns.includes('productDescription'),
      render: (text, rowData) => {
        return (
          <span className='white-space-wrap'>
            {rowData.productDescription || 'NA'}
          </span>
        );
      },
    },
    {
      key: 'requestDateTime',
      dataIndex: 'requestDateTime',
      sorter: true,
      title: columnNames.requestDateTime,
      ellipsis: true,
      align: 'center',
      isColumnVisible:
        visibleColumns && visibleColumns.includes('requestDateTime'),
      render: (text, rowData) => {
        return (
          <span>
            {rowData.requestDateTime
              ? format(
                  new Date(rowData.requestDateTime),
                  'd MMM yyyy, hh:mm aa'
                )
              : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'scheduledDateTime',
      dataIndex: 'scheduledDateTime',
      sorter: true,
      title: columnNames.linkActivationTime,
      ellipsis: true,
      align: 'center',
      isColumnVisible:
        visibleColumns && visibleColumns.includes('scheduledDateTime'),
      render: (text, rowData) => {
        return (
          <span>
            {rowData.scheduledDateTime
              ? format(
                  new Date(rowData.scheduledDateTime),
                  'd MMM yyyy, hh:mm aa'
                )
              : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'urlExpiryDatetTime',
      dataIndex: 'urlExpiryDatetTime',
      sorter: true,
      title: columnNames.urlExpiryDatetTime,
      ellipsis: true,
      align: 'center',
      isColumnVisible:
        visibleColumns && visibleColumns.includes('urlExpiryDatetTime'),
      render: (text, rowData) => {
        return (
          <span>
            {rowData.urlExpiryDatetTime
              ? format(
                  new Date(rowData.urlExpiryDatetTime),
                  'd MMM yyyy, hh:mm aa'
                )
              : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'payByPart',
      dataIndex: 'payByPart',
      sorter: true,
      title: columnNames.payByPart,
      ellipsis: true,
      align: 'center',
      isColumnVisible: visibleColumns && visibleColumns.includes('payByPart'),
      render: (text, rowData) => {
        return <span>{rowData.payByPart ? 'Yes' : 'No'}</span>;
      },
    },
    {
      key: 'Status',
      dataIndex: 'Status',
      sorter: true,
      ellipsis: true,
      align: 'center',
      isColumnVisible: visibleColumns && visibleColumns.includes('status'),
      title: columnNames.status,
      render: (text, rowData) => {
        return (
          <span
            className={`status ${statusColorMapping[rowData?.status ?? '']}`}
          >
            {rowData?.status || 'NA'}
          </span>
        );
      },
    },
    // TODO: To be discussed and removed {
    //   title: columnNames.action,
    //   isColumnVisible: true,
    //   ellipsis: true,
    //   align: 'center',
    //   render: (rowData) => {
    //     return (
    //       <span>
    //         <img
    //           src={
    //             clickedActionBtnId === rowData.paymentLinkId
    //               ? imgURL['active-dotted-menu']
    //               : imgURL['dotted-menu']
    //           }
    //         />
    //       </span>
    //     );
    //   },
    //   // {
    //   //   return rowData.OrderStatusMsg.toLowerCase() === 'charged' ||
    //   //     rowData.OrderStatusMsg.toLowerCase() === 'partial refunded' ? (
    //   //     <div className='action-bt'>
    //   //       <div className='dropdown'>
    //   //         <Popper
    //   //           visible={clickedActionBtnId === rowData.TransactionId}
    //   //           placement='bottomRight'
    //   //           onVisibleChange={() => {
    //   //             if (
    //   //               clickedActionBtnId &&
    //   //               clickedActionBtnId === rowData.TransactionId
    //   //             ) {
    //   //               setClickedActionBtnId(null);
    //   //             } else {
    //   //               setClickedActionBtnId(rowData.TransactionId);
    //   //             }
    //   //           }}
    //   //           content={
    //   //             <div
    //   //               className='dropdown-menu'
    //   //               aria-labelledby='dropdownMenuButton'
    //   //             >
    //   //               <a
    //   //                 className='dropdown-item'
    //   //                 style={{ cursor: 'pointer' }}
    //   //                 onClick={() => {}}
    //   //               >
    //   //                 Refund
    //   //                 </a>
    //   //               <Link className='dropdown-item' to={UiRoutes.VARIFY_IMEI}>
    //   //                 Verify IMEI <img src={imgURL['open-new-tab']} alt='' />
    //   //               </Link>
    //   //             </div>
    //   //           }
    //   //         >
    //   //           <button
    //   //             className='dropdown-toggle'
    //   //             type='button'
    //   //             id='dropdownMenuButton'
    //   //             data-toggle='dropdown'
    //   //             aria-haspopup='true'
    //   //             aria-expanded='false'
    //   //           >
    //   //             <img
    //   //               src={
    //   //                 clickedActionBtnId === rowData.TransactionId
    //   //                   ? imgURL['active-dotted-menu']
    //   //                   : imgURL['dotted-menu']
    //   //               }
    //   //               alt='menu'
    //   //             />
    //   //           </button>
    //   //         </Popper>
    //   //       </div>
    //   //     </div>
    //   //   ) : (
    //   //     ''
    //   //   );
    //   // },
    // },
  ];
};

export const INIT_VISIBLE_COLUMNS_IDS = [
  'invoiceNo',
  'paymentLinkId',
  'requestDateTime',
  'paymentURL',
  'status',
  'urlExpiryDatetTime',
];

export const getNextMidnightDateTime = (date: Date): Date => {
  return new Date(getNextMidNightTimeStamp(date.getTime()));
};

// Note: 0 -> all payment modes
export const PAYMENT_LINK_PAYMENT_MODE_CSV = '0';

export const BULK_UPLOAD_SOURCE_ID = 3;

export const CREATE_PAYMENT_LINK_AMOUNT_RANGE = {
  min: 1,
  max: 500000
};

export const PAYMENT_LINK_MAX_DATE_RANGE_DAYS = 92;
