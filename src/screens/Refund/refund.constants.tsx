/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/display-name */
import React from 'react';
import { FILTER_CONSTANT_RETURN_TYPE } from '../../lib/typing';
import { format } from 'date-fns';
import {
  paymentGatewayOptions,
  orderStatusOptions,
  toPascal,
} from '../../lib/helper';

export const initFilterPayload = {
  orderIds: {
    selectKey: 'Select',
    inputValue: '',
  },
  customerDetails: {
    selectKey: 'Select',
    inputValue: '',
  },
  refundStatus: [],
  paymentGateway: [],
};

export const columnsList = [
  {
    id: 'refundId',
    isCustomizable: false,
    label: 'Refund ID',
  },
  {
    id: 'transactionId',
    isCustomizable: false,
    label: 'Transaction Id',
  },
  {
    id: 'status',
    isCustomizable: false,
    label: 'Status',
  },
  {
    id: 'amount',
    isCustomizable: true,
    label: 'Amount',
  },
  {
    id: 'createdOn',
    isCustomizable: true,
    label: 'Created On',
  },
  {
    id: 'paymentGateway',
    isCustomizable: true,
    label: 'Payment Gateway',
  },
  {
    id: 'customerId',
    isCustomizable: true,
    label: 'Customer ID',
  },
  {
    id: 'phoneNumber',
    isCustomizable: true,
    label: 'Phone Number',
  },
  {
    id: 'email',
    isCustomizable: true,
    label: 'Email',
  },
  {
    id: 'description',
    isCustomizable: true,
    label: 'Description',
  },
  {
    id: 'lastModified',
    isCustomizable: true,
    label: 'Last Modified',
  },
  {
    id: 'currency',
    isCustomizable: true,
    label: 'Currency',
  },
  {
    id: 'amountRefunded',
    isCustomizable: true,
    label: 'Amount Refunded',
  },
  {
    id: 'paymentModeName',
    isCustomizable: true,
    label: 'Payment Mode',
  },
  {
    id: 'merchantOrderId',
    isCustomizable: true,
    label: 'Merchant Order ID',
  },
  {
    id: 'rrn',
    isCustomizable: true,
    label: 'RRN',
  },
  {
    id: 'gatewayTransactionID',
    isCustomizable: true,
    label: 'Gateway Transaction ID',
  },
];

const columnNames = {
  refundId: 'Refund Id',
  transactionId: 'Transaction Id',
  amount: 'Amount',
  createdOn: 'Created On',
  paymentGateway: 'Payment Gateway',
  status: 'Refund Status',
  customerId: 'Customer ID',
  phoneNumber: 'Phone Number',
  email: 'Email',
  description: 'Description',
  lastModified: 'Last Modified',
  currency: 'Currency',
  amountRefunded: 'Amount Refunded',
  paymentModeName: 'Payment Mode',
  merchantOrderId: 'Merchant Order ID',
  gatewayTransactionID: 'Gateway Transaction ID',
  rrn: 'RRN',
};

export const INIT_VISIBLE_COLUMNS_IDS = [
  'refundId',
  'transactionId',
  'amount',
  'createdOn',
  'paymentGateway',
  'status',
];

export const tableConstants = (
  visibleColumns: Array<string>,
  refundIdClickHandler: CallableFunction,
  transactionIdClickHandler: CallableFunction
) => {
  return [
    {
      key: 'RefundId',
      dataIndex: 'RefundId',
      title: columnNames.refundId,
      sorter: true,
      ellipsis: true,
      align: 'center',
      isColumnVisible: visibleColumns && visibleColumns.includes('refundId'),
      render: (text, rowData) => {
        return (
          <label
            className='active-link'
            onClick={() => refundIdClickHandler(rowData)}
          >
            {rowData.RefundId || 'NA'}
          </label>
        );
      },
    },
    {
      key: 'TransactionId',
      dataIndex: 'TransactionId',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.transactionId,
      isColumnVisible:
        visibleColumns && visibleColumns.includes('transactionId'),
      render: (text, rowData) => {
        return (
          <label
            className='active-link'
            onClick={() => transactionIdClickHandler(rowData)}
          >
            {rowData.TransactionId || 'NA'}
          </label>
        );
      },
    },

    {
      key: 'Amount',
      dataIndex: 'Amount',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.amount,
      isColumnVisible: visibleColumns && visibleColumns.includes('amount'),
      render: (text, rowData) => {
        return (
          <span>
            {rowData.Amount ? `₹${Number(rowData.Amount).toFixed(2)}` : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'TransactionDateTime',
      dataIndex: 'TransactionDateTime',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.createdOn,
      isColumnVisible: visibleColumns && visibleColumns.includes('createdOn'),
      render: (text, rowData) => {
        return (
          <span>
            {rowData.TransactionDateTime
              ? format(
                  new Date(rowData.TransactionDateTime),
                  'd MMM yyyy, hh:mm aa'
                )
              : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'GatewayName',
      dataIndex: 'GatewayName',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.paymentGateway,
      isColumnVisible:
        visibleColumns && visibleColumns.includes('paymentGateway'),
      render: (text, rowData) => {
        return <span>{rowData.GatewayName || 'NA'}</span>;
      },
    },
    {
      key: 'CustomerId',
      dataIndex: 'CustomerId',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.customerId,
      isColumnVisible: visibleColumns && visibleColumns.includes('customerId'),
      render: (text, rowData) => {
        return <span>{rowData.CustomerId || 'NA'}</span>;
      },
    },
    {
      key: 'CustomerPhoneNo',
      dataIndex: 'CustomerPhoneNo',
      sorter: true,
      ellipsis: true,
      align: 'center',
      title: columnNames.phoneNumber,
      isColumnVisible: visibleColumns && visibleColumns.includes('phoneNumber'),
      render: (text, rowData) => {
        return <span>{rowData.CustomerPhoneNo || 'NA'}</span>;
      },
    },
    {
      key: 'CustomerEmail',
      dataIndex: 'CustomerEmail',
      sorter: true,
      ellipsis: true,
      align: 'center',
      title: columnNames.email,
      isColumnVisible: visibleColumns && visibleColumns.includes('email'),
      render: (text, rowData) => {
        return <span>{rowData.CustomerEmail || 'NA'}</span>;
      },
    },
    {
      key: 'Description',
      dataIndex: 'Description',
      sorter: true,
      ellipsis: true,
      align: 'center',
      title: columnNames.description,
      isColumnVisible: visibleColumns && visibleColumns.includes('description'),
      render: (text, rowData) => {
        return <span>{rowData.Description || 'NA'}</span>;
      },
    },
    {
      key: 'LastModified',
      dataIndex: 'LastModified',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.lastModified,
      isColumnVisible:
        visibleColumns && visibleColumns.includes('lastModified'),
      render: (text, rowData) => {
        return (
          <span>
            {rowData.LastModified
              ? format(new Date(rowData.LastModified), 'd MMM yyyy, hh:mm aa')
              : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'Currency',
      dataIndex: 'Currency',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.currency,
      isColumnVisible: visibleColumns && visibleColumns.includes('currency'),
      render: (text, rowData) => {
        return <span>{rowData.Currency || 'NA'}</span>;
      },
    },
    {
      key: 'RefundAmount',
      dataIndex: 'RefundAmount',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.amountRefunded,
      isColumnVisible:
        visibleColumns && visibleColumns.includes('amountRefunded'),
      render: (text, rowData) => {
        return (
          <span>
            {rowData.RefundAmount
              ? `₹${Number(rowData.RefundAmount).toFixed(2)}`
              : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'PaymentModeName',
      dataIndex: 'PaymentModeName',
      sorter: true,
      ellipsis: true,
      align: 'center',
      isColumnVisible:
        visibleColumns && visibleColumns.includes('paymentModeName'),
      title: columnNames.paymentModeName,
      render: (text, rowData) => {
        return <span>{rowData.PaymentModeName || 'NA'}</span>;
      },
    },
    {
      key: 'MerchantOrderId',
      dataIndex: 'MerchantOrderId',
      sorter: true,
      ellipsis: true,
      align: 'center',
      isColumnVisible:
        visibleColumns && visibleColumns.includes('merchantOrderId'),
      title: columnNames.merchantOrderId,
      render: (text, rowData) => {
        return <span>{rowData.MerchantOrderId || 'NA'}</span>;
      },
    },
    {
      key: 'GatewayTransactionID',
      dataIndex: 'GatewayTransactionID',
      sorter: true,
      ellipsis: true,
      align: 'center',
      isColumnVisible:
        visibleColumns && visibleColumns.includes('gatewayTransactionID'),
      title: columnNames.gatewayTransactionID,
      render: (text, rowData) => {
        return <span>{rowData.GatewayTransactionID || 'NA'}</span>;
      },
    },
    {
      key: 'RRN',
      dataIndex: 'RRN',
      sorter: true,
      ellipsis: true,
      align: 'center',
      isColumnVisible: visibleColumns && visibleColumns.includes('rrn'),
      title: columnNames.rrn,
      render: (text, rowData) => {
        return <span>{rowData.RRN || 'NA'}</span>;
      },
    },
    {
      key: 'TxnStatusMsg',
      dataIndex: 'TxnStatusMsg',
      sorter: true,
      align: 'center',
      ellipsis: true,
      title: columnNames.status,
      isColumnVisible: visibleColumns && visibleColumns.includes('status'),
      render: (text, rowData) => {
        return (
          <div
            className={`status ${
              rowData.TxnStatusMsg ? rowData.TxnStatusMsg.toLowerCase() : ''
            }`}
          >
            {rowData.TxnStatusMsg ? toPascal(rowData.TxnStatusMsg) : 'NA'}
          </div>
        );
      },
    },
  ];
};

export const idsFilterOptions = [
  {
    value: '',
    label: 'Select',
  },
  {
    value: 'refundId',
    label: 'Refund ID',
  },
  {
    value: 'transactionId',
    label: 'Transaction ID',
  },
  {
    value: 'orderId',
    label: 'Order ID',
  },
];

export const customerFilterOptions = [
  {
    value: '',
    label: 'Select',
  },
  {
    value: 'customerId',
    label: 'Customer ID',
  },
  {
    value: 'customerPhone',
    label: 'Customer Phone',
  },
  {
    value: 'customerEmail',
    label: 'Customer Email',
  },
];

export const filterFields = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  filterPayload,
  filterHandler: CallableFunction,
  handleFilterInputBlur: CallableFunction,
  getAllRefundStatusList,
  filterData
): Array<FILTER_CONSTANT_RETURN_TYPE> => {
  return [
    {
      type: 'dropdownWithoutAmount',
      name: 'orderIds',
      options: idsFilterOptions,
      handleSelect: (name, value) => filterHandler(name, value, 'select'),
      handleInput: (name, value) => filterHandler(name, value, 'input'),
      // handleInputBlur: ()
      value: filterPayload.orderIds,
      inputErrorMessage: filterData?.filterValidationError?.orderIds,
      inputError:
        filterData?.filterValidationError?.orderIds &&
        filterData?.filterIsTouchedPayload?.orderIds,

      handleInputBlur: () => handleFilterInputBlur('orderIds'),
    },
    {
      type: 'dropdownWithoutAmount',
      name: 'customerDetails',
      options: customerFilterOptions,
      handleSelect: (name, value) => filterHandler(name, value, 'select'),
      handleInput: (name, value) => filterHandler(name, value, 'input'),
      value: filterPayload.customerDetails,
      inputErrorMessage: filterData?.filterValidationError?.customerDetails,
      inputError:
        filterData?.filterValidationError?.customerDetails &&
        filterData?.filterIsTouchedPayload?.customerDetails,
      handleInputBlur: () => handleFilterInputBlur('customerDetails'),
    },
    {
      type: 'checkboxGroup',
      name: 'refundStatus',
      label: 'Refund Status',
      options: orderStatusOptions(getAllRefundStatusList),
      onChange: (name, value) => filterHandler(name, value),
      value: filterPayload.refundStatus,
    },
    {
      type: 'checkboxGroup',
      name: 'paymentGateway',
      label: 'Payment Gateway',
      options: paymentGatewayOptions(filterData.paymentGateway),
      onChange: (name, value) => filterHandler(name, value),
      value: filterPayload.paymentGateway,
    },
  ];
};

export const refundSummaryList = [
  {
    label: 'Refund ID',
    render: (orderTransactionDetails) => {
      return (
        <> {orderTransactionDetails?.RefundDetailsList[0]?.RefundId ?? 'NA'}</>
      );
    },
  },
  {
    label: 'Order ID',
    render: (orderTransactionDetails) => {
      return (
        <>
          {' '}
          <span>{orderTransactionDetails?.OrderId ?? 'NA'}</span>
        </>
      );
    },
  },
  {
    label: 'Transaction ID',
    render: (orderTransactionDetails) => {
      return (
        <>
          {' '}
          {orderTransactionDetails?.TransactionDetailsList[0]?.TransactionId ??
            'NA'}
        </>
      );
    },
  },
  {
    label: 'Amount',
    render: (orderTransactionDetails) => {
      return (
        <> {orderTransactionDetails?.RefundDetailsList[0]?.Amount ?? 'NA'}</>
      );
    },
  },
  {
    label: 'Created On',
    render: (orderTransactionDetails) => {
      return (
        <>
          {' '}
          {orderTransactionDetails?.RefundDetailsList[0]?.Created
            ? format(
                new Date(
                  orderTransactionDetails?.RefundDetailsList[0]?.Created
                ),
                'd MMM yyyy, hh:mm aa'
              )
            : 'NA'}
        </>
      );
    },
  },
  {
    label: 'Payment Gateway',
    render: (orderTransactionDetails) => {
      return (
        <> {orderTransactionDetails?.RefundDetailsList[0]?.Gateway ?? 'NA'}</>
      );
    },
  },
  {
    label: 'Refund Status',
    render: (orderTransactionDetails) => {
      return (
        <>
          {' '}
          {toPascal(
            orderTransactionDetails?.RefundDetailsList[0]?.StatusMsg || ''
          ) ?? 'NA'}
        </>
      );
    },
  },
];

export const refundTransactionsSummaryList = [
  {
    label: 'Transaction ID',
    render: (orderTransactionDetails) => {
      return (
        <>
          <span>
            {orderTransactionDetails?.TransactionDetailsList[0]
              ?.TransactionId ?? 'NA'}
          </span>
        </>
      );
    },
  },
  {
    label: 'Order ID',
    render: (orderTransactionDetails) => {
      return (
        <>
          {' '}
          <span>{orderTransactionDetails?.OrderId ?? 'NA'}</span>
        </>
      );
    },
  },
  {
    label: 'Gateway',
    render: (orderTransactionDetails) => {
      return (
        <>
          {orderTransactionDetails?.TransactionDetailsList[0]?.Gateway ?? 'NA'}{' '}
        </>
      );
    },
  },
  {
    label: 'Created On',
    render: (orderTransactionDetails) => {
      return (
        <>
          {orderTransactionDetails?.TransactionDetailsList[0]?.Created
            ? format(
                new Date(
                  orderTransactionDetails?.TransactionDetailsList[0]?.Created
                ),
                'd MMM yyyy, hh:mm aa'
              )
            : 'NA'}{' '}
        </>
      );
    },
  },
  {
    label: 'Transaction Status',
    render: (orderTransactionDetails) => {
      return (
        <>
          <div>
            {toPascal(
              orderTransactionDetails?.TransactionDetailsList[0]?.StatusMsg ||
                ''
            ) ?? 'NA'}
          </div>
        </>
      );
    },
  },
];

export const BULK_UPLOAD_SOURCE_ID = 2;
