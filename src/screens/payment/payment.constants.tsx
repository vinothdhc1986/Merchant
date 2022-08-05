/*eslint-disable */
import React from 'react';
import imgURL from '../../lib/imgURL';
import { Link } from 'react-router-dom';
import { UiRoutes } from '../../lib/constants';
import Popper from '../../components/Popper';
import { format } from 'date-fns';
import {
  toCapitalize,
  paymentGatewayOptions,
  orderStatusOptions,
  checkPermissions,
  toPascal,
} from '../../lib/helper';

const columnNames = {
  transactionId: 'Transaction ID',
  orderId: 'Order ID',
  amount: 'Amount',
  createdOn: 'Created On',
  paymentGateway: 'Payment Gateway',
  customerId: 'Customer Id',
  phoneNumber: 'Phone Number',
  email: 'Email',
  description: 'Description',
  lastModified: 'Last Modified',
  currency: 'Currency',
  amountRefunded: 'Amount Refunded',
  status: 'Transaction Status',
  gatewayTransactionID: 'Gateway Transaction ID',
  paymentModeName: 'Payment Mode',
  merchantOrderId: 'Merchant Order ID',
  rrn: 'RRN',
  action: 'Action',
};

export const initFilterPayload = {
  orderIds: {
    selectKey: 'Select',
    inputValue: '',
  },
  customerDetails: {
    selectKey: 'Select',
    inputValue: '',
  },
  orderStatus: [],
  paymentGateway: [],
};

export const COLUMNS_LIST = [
  {
    id: 'transactionId',
    isCustomizable: false,
    label: 'Transaction ID',
  },
  {
    id: 'orderId',
    isCustomizable: false,
    label: 'Order ID',
  },
  {
    id: 'status',
    isCustomizable: false,
    label: 'Transaction Status',
  },
  {
    id: 'action',
    isCustomizable: false,
    label: 'Action',
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

export const INIT_VISIBLE_COLUMNS_IDS = [
  'transactionId',
  'orderId',
  'amount',
  'createdOn',
  'paymentGateway',
  'status',
  'action',
];

export const tableConstants = (
  visibleColumns,
  clickedActionBtnId,
  setClickedActionBtnId,
  refundClickHandler,
  transactionIdClickHandler,
  orderIdClickHandler
) => {
  return [
    // {
    //   key: 'Checkbox',
    //   dataIndex: 'Checkbox',
    //   title: '',
    //   isColumnVisible: true,
    //   align: 'center',
    //   ellipsis: true,
    //   render: (text, rowData) => {
    //     return (
    //       <div className='check-box'>
    //         <input
    //           type='checkbox'
    //           className='d-none individual'
    //           id={rowData.TransactionId}
    //         />
    //         <label htmlFor={rowData.TransactionId} className='d-flex'>
    //           <span className='check-box-icon d-block'></span>
    //         </label>
    //       </div>
    //     );
    //   },
    // },
    {
      key: 'TransactionId',
      dataIndex: 'TransactionId',
      sorter: true,
      title: columnNames.transactionId,
      align: 'center',
      ellipsis: true,
      isColumnVisible:
        visibleColumns && visibleColumns.includes('transactionId'),
      render: (text, rowData) => {
        return (
          <>
            <label
              className='active-link'
              onClick={() => transactionIdClickHandler(rowData)}
            >
              {rowData.TransactionId || 'NA'}
            </label>
            {/* <div className='date-sub'>
              {rowData.TransactionDateTime
                ? format(new Date(rowData.TransactionDateTime), 'd MMM yyyy')
                : 'NA'}
            </div> */}
          </>
        );
      },
    },
    {
      key: 'OrderId',
      dataIndex: 'OrderId',
      sorter: true,
      title: columnNames.orderId,
      ellipsis: true,
      align: 'center',
      isColumnVisible: visibleColumns && visibleColumns.includes('orderId'),
      render: (text, rowData) => {
        return (
          <label
            className='active-link'
            onClick={() => orderIdClickHandler(rowData)}
          >
            {rowData.OrderId || 'NA'}
          </label>
        );
      },
    },
    {
      key: 'Amount',
      dataIndex: 'Amount',
      sorter: true,
      title: columnNames.amount,
      ellipsis: true,
      align: 'center',
      isColumnVisible: visibleColumns && visibleColumns.includes('amount'),
      render: (text, rowData) => {
        return <span>{rowData.Amount ? `₹${rowData.Amount}` : 'NA'}</span>;
      },
    },
    {
      key: 'TransactionDateTime',
      dataIndex: 'TransactionDateTime',
      sorter: true,
      isColumnVisible: visibleColumns && visibleColumns.includes('createdOn'),
      title: columnNames.createdOn,
      ellipsis: true,
      align: 'center',
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
      title: columnNames.paymentGateway,
      ellipsis: true,
      align: 'center',
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
      ellipsis: true,
      align: 'center',
      isColumnVisible: visibleColumns && visibleColumns.includes('customerId'),
      title: columnNames.customerId,
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
      isColumnVisible: visibleColumns && visibleColumns.includes('phoneNumber'),
      title: columnNames.phoneNumber,
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
      isColumnVisible: visibleColumns && visibleColumns.includes('email'),
      title: columnNames.email,
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
      ellipsis: true,
      align: 'center',
      isColumnVisible:
        visibleColumns && visibleColumns.includes('lastModified'),
      title: columnNames.lastModified,
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
      ellipsis: true,
      align: 'center',
      isColumnVisible: visibleColumns && visibleColumns.includes('currency'),
      title: columnNames.currency,
      render: (text, rowData) => {
        return <span>{rowData.Currency || 'NA'}</span>;
      },
    },
    {
      key: 'RefundAmount',
      dataIndex: 'RefundAmount',
      sorter: true,
      ellipsis: true,
      align: 'center',
      isColumnVisible:
        visibleColumns && visibleColumns.includes('amountRefunded'),
      title: columnNames.amountRefunded,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.RefundAmount ? `₹${rowData.RefundAmount}` : 'NA'}
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
      ellipsis: true,
      align: 'center',
      isColumnVisible: visibleColumns && visibleColumns.includes('status'),
      title: columnNames.status,
      render: (text, rowData) => {
        return (
          <div
            className={`status overflow-ellipse ${
              rowData.TxnStatusMsg ? rowData.TxnStatusMsg.toLowerCase() : ''
            }`}
          >
            {toPascal(rowData.TxnStatusMsg) || 'NA'}
          </div>
        );
      },
    },
    {
      title: columnNames.action,
      isColumnVisible:
        checkPermissions('CREATE_REFUND') || checkPermissions('VERIFY_IMEI'),
      ellipsis: true,
      align: 'center',
      render: (rowData) => {
        return rowData.TransactionStatus === 4 ||
          rowData.TransactionStatus === 9 ? (
          <div className='action-bt'>
            <div className='dropdown'>
              <Popper
                visible={clickedActionBtnId === rowData.TransactionId}
                placement='bottomRight'
                onVisibleChange={() => {
                  if (
                    clickedActionBtnId &&
                    clickedActionBtnId === rowData.TransactionId
                  ) {
                    setClickedActionBtnId(null);
                  } else {
                    setClickedActionBtnId(rowData.TransactionId);
                  }
                }}
                content={
                  <div
                    className='dropdown-menu'
                    aria-labelledby='dropdownMenuButton'
                  >
                    {checkPermissions('CREATE_REFUND') && (
                      <a
                        className='dropdown-item'
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          refundClickHandler(rowData.TransactionId)
                        }
                      >
                        Refund
                      </a>
                    )}
                    {checkPermissions('VERIFY_IMEI') && (
                      <Link className='dropdown-item' to={UiRoutes.VARIFY_IMEI}>
                        Verify IMEI <img src={imgURL['open-new-tab']} alt='' />
                      </Link>
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
                      clickedActionBtnId === rowData.TransactionId
                        ? imgURL['active-dotted-menu']
                        : imgURL['dotted-menu']
                    }
                    alt='menu'
                  />
                </button>
              </Popper>
            </div>
          </div>
        ) : (
          ''
        );
      },
    },
  ];
};

export const orderDetailsOption = [
  {
    value: '',
    label: 'Select',
  },
  {
    value: 'transactionId',
    label: 'Transaction ID',
  },
  {
    value: 'orderId',
    label: 'Order ID',
  },
  {
    value: 'amount',
    label: 'Amount',
  },
];

export const customerDetailsOption = [
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

export const filterFields = ({
  filterPayload,
  filterHandler,
  allGatewaysList,
  getAllOrderStatusList,
  amountFilter,
  setAmountFilter,
  handleFilterInputBlur,
  filterValidationError,
  filterIsTouchedPayload,
}) => {
  return [
    {
      type: 'dropdownWithAmount',
      name: 'orderIds',
      options: orderDetailsOption,
      handleSelect: (name, value) => {
        filterHandler(name, value, 'select');
      },
      handleSelectAmount: (value) => {
        setAmountFilter(value);
      },
      handleInput: (name, value) => {
        filterHandler(name, value, 'input');
      },
      value: filterPayload.orderIds,
      amountFilter,
    },
    {
      type: 'dropdownWithoutAmount',
      name: 'customerDetails',
      options: customerDetailsOption,
      handleSelect: (name, value) => filterHandler(name, value, 'select'),
      handleInput: (name, value) => filterHandler(name, value, 'input'),
      value: filterPayload.customerDetails,
      inputErrorMessage: filterValidationError?.customerDetails,
      inputError:
        filterValidationError?.customerDetails &&
        filterIsTouchedPayload?.customerDetails,
      handleInputBlur: () => handleFilterInputBlur('customerDetails'),
    },
    {
      type: 'checkboxGroup',
      name: 'orderStatus',
      label: 'Transaction Status',
      options: orderStatusOptions(getAllOrderStatusList),
      onChange: (name, value) => filterHandler(name, value),
      value: filterPayload.orderStatus,
    },
    {
      type: 'checkboxGroup',
      name: 'paymentGateway',
      label: 'Payment Gateway',
      options: paymentGatewayOptions(allGatewaysList),
      onChange: (name, value) => {
        filterHandler(name, value);
      },
      value: filterPayload.paymentGateway,
    },
  ];
};

export const paymentOrderSummaryList = [
  {
    label: 'Transaction ID',
    render: (orderTransactionDetails) => {
      return (
        <span>
          {orderTransactionDetails?.TransactionDetailsList[0]?.TransactionId ??
            'NA'}
        </span>
      );
    },
  },
  {
    label: 'Order ID',
    render: (orderTransactionDetails) => {
      return <span>{orderTransactionDetails?.OrderId ?? 'NA'}</span>;
    },
  },
  {
    label: 'Merchant Order ID',
    render: (orderTransactionDetails) => {
      return <>{orderTransactionDetails?.MerchantOrderId ?? 'NA'}</>;
    },
  },
  {
    label: 'Order Status',
    render: (orderTransactionDetails) => {
      return (
        <div>
          {toPascal(orderTransactionDetails?.OrderStatusMsg || '') ?? 'NA'}
        </div>
      );
    },
  },
  {
    label: 'Amount',
    render: (orderTransactionDetails) => {
      return (
        <>
          {orderTransactionDetails?.Amount
            ? `₹ ${Number(orderTransactionDetails.Amount).toFixed(2)}`
            : 'NA'}
        </>
      );
    },
  },
  {
    label: 'Currency',
    render: (orderTransactionDetails) => {
      return <>{orderTransactionDetails?.Currency ?? 'NA'}</>;
    },
  },
  {
    label: 'Gateway',
    render: (orderTransactionDetails) => {
      return <>{orderTransactionDetails?.Gateway ?? 'NA'}</>;
    },
  },
  {
    label: 'Created On',
    render: (orderTransactionDetails) => {
      return (
        <>
          {orderTransactionDetails?.CreatedAt
            ? format(
                new Date(orderTransactionDetails.CreatedAt),
                'd MMM yyyy, hh:mm aa'
              )
            : 'NA'}
        </>
      );
    },
  },
  {
    label: 'Last Modified On',
    render: (orderTransactionDetails) => {
      return (
        <>
          {orderTransactionDetails?.LastModified
            ? format(
                new Date(orderTransactionDetails.LastModified),
                'd MMM yyyy, hh:mm aa'
              )
            : 'NA'}
        </>
      );
    },
  },
];

export const paymentCustomerDetailsList = [
  {
    label: 'Customer ID',
    render: (orderTransactionDetails) => {
      return <>{orderTransactionDetails?.CustomerId ?? 'NA'}</>;
    },
  },
  {
    label: 'Customer Phone',
    render: (orderTransactionDetails) => {
      return <>{orderTransactionDetails?.CustomerPhone ?? 'NA'}</>;
    },
  },
  {
    label: 'Customer Email',
    render: (orderTransactionDetails) => {
      return <>{orderTransactionDetails?.CustomerEmail ?? 'NA'}</>;
    },
  },
  {
    label: 'Description',
    render: (orderTransactionDetails) => {
      return <>{orderTransactionDetails?.Description ?? 'NA'}</>;
    },
  },
];

export const paymentAdditionalFieldsList = [
  {
    label: 'Field 1',
    render: (orderTransactionDetails) => {
      return <>{orderTransactionDetails?.UDF1 ?? 'NA'}</>;
    },
  },
  {
    label: 'Field 2',
    render: (orderTransactionDetails) => {
      return <>{orderTransactionDetails?.UDF2 ?? 'NA'}</>;
    },
  },
  {
    label: 'Field 3',
    render: (orderTransactionDetails) => {
      return <>{orderTransactionDetails?.UDF3 ?? 'NA'}</>;
    },
  },
  {
    label: 'Field 4',
    render: (orderTransactionDetails) => {
      return <>{orderTransactionDetails?.UDF4 ?? 'NA'}</>;
    },
  },
];

export const paymentTransactionDetailsList = [
  {
    label: 'Auth Amount',
    render: (orderTransactionDetails) => {
      return (
        <>
          {orderTransactionDetails?.TransactionDetailsList[0]?.AuthAmount
            ? `₹${Number(
                orderTransactionDetails.TransactionDetailsList[0].AuthAmount
              ).toFixed(2)}`
            : 'NA'}
        </>
      );
    },
  },
  {
    label: 'Payment Mode',
    render: (orderTransactionDetails) => {
      return (
        <>
          {orderTransactionDetails?.TransactionDetailsList[0]?.PaymentMode ??
            'NA'}
        </>
      );
    },
  },
  {
    label: 'Issuer',
    render: (orderTransactionDetails) => {
      return (
        <>
          {orderTransactionDetails?.TransactionDetailsList[0]?.Issuer ?? 'NA'}
        </>
      );
    },
  },
  {
    label: 'Is EMI',
    render: (orderTransactionDetails) => {
      return (
        <>
          {`${orderTransactionDetails?.TransactionDetailsList[0]?.IsEMI}` ??
            'NA'}
        </>
      );
    },
  },
  {
    label: 'Payment Scheme',
    render: (orderTransactionDetails) => {
      return (
        <>
          {orderTransactionDetails?.TransactionDetailsList[0]?.PaymentScheme ??
            'NA'}
        </>
      );
    },
  },
];

export const paymentPgResponseList = [
  {
    label: 'Auth Code',
    render: (orderTransactionDetails) => {
      return (
        <>
          {orderTransactionDetails?.TransactionDetailsList[0]?.AuthCode ?? 'NA'}
        </>
      );
    },
  },
  {
    label: 'Completed',
    render: (orderTransactionDetails) => {
      return (
        <>
          {orderTransactionDetails?.TransactionDetailsList[0]?.Completed
            ? format(
                new Date(
                  orderTransactionDetails.TransactionDetailsList[0].Completed
                ),
                'd MMM yyyy, hh:mm aa'
              )
            : 'NA'}
        </>
      );
    },
  },
  {
    label: 'Gateway Transaction ID',
    render: (orderTransactionDetails) => {
      return (
        <>
          {orderTransactionDetails?.TransactionDetailsList[0]
            ?.GatewayTransactionId ?? 'NA'}
        </>
      );
    },
  },
  {
    label: 'Response Code',
    render: (orderTransactionDetails) => {
      return (
        <>
          {orderTransactionDetails?.TransactionDetailsList[0]?.ResponseCode ??
            'NA'}
        </>
      );
    },
  },
  {
    label: 'Response Message',
    render: (orderTransactionDetails) => {
      return (
        <>
          {orderTransactionDetails?.TransactionDetailsList[0]?.ResponseMsg ??
            'NA'}
        </>
      );
    },
  },
  {
    label: 'RRN',
    render: (orderTransactionDetails) => {
      return (
        <>{orderTransactionDetails?.TransactionDetailsList[0]?.RRN ?? 'NA'}</>
      );
    },
  },
];

export const paymentTransactionsSummaryList = [
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
    label: 'Payment Gateway',
    render: (orderTransactionDetails) => {
      return <>{orderTransactionDetails?.Gateway ?? 'NA'}</>;
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
                  orderTransactionDetails.TransactionDetailsList[0].Created
                ),
                'd MMM yyyy, hh:mm aa'
              )
            : 'NA'}
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
