/*eslint-disable */

import React from 'react';
import imgURL from '../../lib/imgURL';
import { Link } from 'react-router-dom';
import { UiRoutes } from '../../lib/constants';

export const appliedFiltersList = [
  {
    keyName: 'Transaction ID',
    value: '1234',
  },
];

export const TAB_CONSTANTS = [
  { label: 'Payments', value: 'payment' },
  { label: 'Refunds', value: 'refunds' },
  { label: 'Settlements', value: 'settlements' },
  { label: 'Subscription', value: 'subscription' },
];

const columnNames = {
  transactionId: 'Transaction Id',
  orderId: 'Order Id',
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
  orderStatus: 'Order Status Code',
  status: 'Status',
  action: 'Action',
};

export const paymentRecords = [
  {
    id: 1,
    transactionId: '1234567890',
    orderId: '1234567890',
    amount: '12345.00',
    createdOn: '21 Feb 2021, 5:34 AM',
    paymentGateway: 'Edge',
    customerId: '1234567890',
    phoneNumber: '9876543210',
    email: 'firstname.lastname@domain.com',
    description: 'Some description some description',
    lastModified: '21 Feb 2021, 5:34 AM',
    currency: 'INR',
    amountRefunded: '₹0.00',
    orderStatus: '3',
    status: 'Charged',
  },
  {
    id: 2,
    transactionId: '1234567890',
    orderId: '1234567890',
    amount: '12345.00',
    createdOn: '21 Feb 2021, 5:34 AM',
    paymentGateway: 'Edge',
    customerId: '1234567890',
    phoneNumber: '9876543210',
    email: 'firstname.lastname@domain.com',
    description: 'Some description some description',
    lastModified: '21 Feb 2021, 5:34 AM',
    currency: 'INR',
    amountRefunded: '₹0.00',
    orderStatus: '3',
    status: 'Charged',
  },
  {
    id: 3,
    transactionId: '1234567890',
    orderId: '1234567890',
    amount: '12345.00',
    createdOn: '21 Feb 2021, 5:34 AM',
    paymentGateway: 'Edge',
    customerId: '1234567890',
    phoneNumber: '9876543210',
    email: 'firstname.lastname@domain.com',
    description: 'Some description some description',
    lastModified: '21 Feb 2021, 5:34 AM',
    currency: 'INR',
    amountRefunded: '₹0.00',
    orderStatus: '3',
    status: 'Charged',
  },
  {
    id: 4,
    transactionId: '1234567890',
    orderId: '1234567890',
    amount: '12345.00',
    createdOn: '21 Feb 2021, 5:34 AM',
    paymentGateway: 'Edge',
    customerId: '1234567890',
    phoneNumber: '9876543210',
    email: 'firstname.lastname@domain.com',
    description: 'Some description some description',
    lastModified: '21 Feb 2021, 5:34 AM',
    currency: 'INR',
    amountRefunded: '0.00',
    orderStatus: '3',
    status: 'Refunded',
  },
];

export const tableConstants = () => {
  return [
    {
      title: '',
      isColumnVisible: true,
      render: (rowData) => {
        return (
          <div className="check-box">
            <input
              type="checkbox"
              className="d-none individual"
              id={rowData.id}
            />
            <label htmlFor={rowData.id} className="d-flex">
              <span className="check-box-icon d-block"></span>
            </label>
          </div>
        );
      },
    },
    {
      id: 'transactionId',
      isColumnVisible: true,
      title: columnNames.transactionId,
      render: (rowData) => {
        return <label onClick={() => {}}>{rowData.transactionId}</label>;
      },
    },
    {
      id: 'orderId',
      isColumnVisible: true,
      title: columnNames.orderId,
      render: (rowData) => {
        return <label onClick={() => {}}>{rowData.orderId}</label>;
      },
    },
    {
      id: 'amount',
      isColumnVisible: true,
      title: columnNames.amount,
      render: (rowData) => {
        return <span>{rowData.amount}</span>;
      },
    },
    {
      id: 'createdOn',
      isColumnVisible: true,
      title: columnNames.createdOn,
      render: (rowData) => {
        return <span>{rowData.createdOn}</span>;
      },
    },
    {
      id: 'paymentGateway',
      isColumnVisible: true,
      title: columnNames.paymentGateway,
      render: (rowData) => {
        return <span>{rowData.paymentGateway}</span>;
      },
    },
    {
      id: 'customerId',
      isColumnVisible: true,
      title: columnNames.customerId,
      render: (rowData) => {
        return <span>{rowData.customerId}</span>;
      },
    },
    {
      id: 'phoneNumber',
      isColumnVisible: true,
      title: columnNames.phoneNumber,
      render: (rowData) => {
        return <span>{rowData.phoneNumber}</span>;
      },
    },
    {
      id: 'email',
      isColumnVisible: true,
      title: columnNames.email,
      render: (rowData) => {
        return <span>{rowData.email}</span>;
      },
    },
    {
      id: 'description',
      isColumnVisible: true,
      title: columnNames.description,
      render: (rowData) => {
        return <span>{rowData.description}</span>;
      },
    },
    {
      id: 'lastModified',
      isColumnVisible: true,
      title: columnNames.lastModified,
      render: (rowData) => {
        return <span>{rowData.lastModified}</span>;
      },
    },
    {
      id: 'currency',
      isColumnVisible: true,
      title: columnNames.currency,
      render: (rowData) => {
        return <span>{rowData.currency}</span>;
      },
    },
    {
      id: 'amountRefunded',
      isColumnVisible: true,
      title: columnNames.amountRefunded,
      render: (rowData) => {
        return <span>{rowData.amountRefunded}</span>;
      },
    },
    {
      id: 'orderStatus',
      isColumnVisible: true,
      title: columnNames.orderStatus,
      render: (rowData) => {
        return <span>{rowData.orderStatus}</span>;
      },
    },
    {
      id: 'status',
      isColumnVisible: true,
      title: columnNames.status,
      render: (rowData) => {
        return (
          <div className={`staus ${rowData.status.toLowerCase()}`}>
            {rowData.status}
          </div>
        );
      },
    },
  ];
};
