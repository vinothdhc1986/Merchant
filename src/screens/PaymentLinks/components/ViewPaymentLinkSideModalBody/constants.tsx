/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/display-name */
import React from 'react';
import { format } from 'date-fns';
import { toPascal } from 'lib/helper';
import { statusColorMapping } from 'screens/PaymentLinks/constants';

export const paymentLinkDetailConfig = (
  handleCopy: (str: string) => void,
  isCopiedToggle: boolean
) => [
  {
    label: 'Invoice No',
    render: (paymentLinkDetailPayload) => {
      return <>{paymentLinkDetailPayload?.invoiceNo ?? 'NA'}</>;
    },
  },
  {
    label: 'Payment Link ID',
    render: (paymentLinkDetailPayload) => {
      return <>{paymentLinkDetailPayload?.paymentLinkId ?? 'NA'}</>;
    },
  },
  {
    label: 'Payment Gateway',
    render: (paymentLinkDetailPayload) => {
      return (
        <div>
          {toPascal(paymentLinkDetailPayload.gatewayName || '') || 'NA'}
        </div>
      );
    },
  },
  {
    label: 'Amount (INR)',
    render: (paymentLinkDetailPayload) => {
      return (
        <>
          {paymentLinkDetailPayload?.originalTxnAmount
            ? `₹ ${(
                Number(paymentLinkDetailPayload.originalTxnAmount) / 100
              ).toFixed(2)}`
            : 'NA'}
        </>
      );
    },
  },
  {
    label: 'Amount Paid (INR)',
    render: (paymentLinkDetailPayload) => {
      return (
        <>
          {paymentLinkDetailPayload?.amountInRupees
            ? `₹ ${Number(paymentLinkDetailPayload.amountInRupees).toFixed(2)}`
            : 'NA'}
        </>
      );
    },
  },
  {
    label: 'Payer Email ID',
    render: (paymentLinkDetailPayload) => {
      return <>{paymentLinkDetailPayload?.payerEmailId ?? 'NA'}</>;
    },
  },
  {
    label: 'Payer Mobile No',
    render: (paymentLinkDetailPayload) => {
      return <>{paymentLinkDetailPayload?.payerMobileNo ?? 'NA'}</>;
    },
  },
  {
    label: 'Product Code',
    render: (paymentLinkDetailPayload) => {
      return (
        <>
          {(Array.isArray(paymentLinkDetailPayload?.productInfo) &&
            paymentLinkDetailPayload?.productInfo[0]?.productCode) ||
            'NA'}
        </>
      );
    },
  },
  {
    label: 'Product Description',
    render: (paymentLinkDetailPayload) => {
      return <>{paymentLinkDetailPayload?.productDescription ?? 'NA'}</>;
    },
  },
  {
    label: 'Request Date Time',
    render: (paymentLinkDetailPayload) => {
      return (
        <>
          {paymentLinkDetailPayload?.requestDateTime
            ? format(
                new Date(paymentLinkDetailPayload.requestDateTime),
                'd MMM yyyy, hh:mm aa'
              )
            : 'NA'}
        </>
      );
    },
  },
  {
    label: 'Link Activation Date Time',
    render: (paymentLinkDetailPayload) => {
      return (
        <>
          {paymentLinkDetailPayload?.scheduledDateTime
            ? format(
                new Date(paymentLinkDetailPayload.scheduledDateTime),
                'd MMM yyyy, hh:mm aa'
              )
            : 'NA'}
        </>
      );
    },
  },
  {
    label: 'Link Expiry Date Time',
    render: (paymentLinkDetailPayload) => {
      return (
        <>
          {paymentLinkDetailPayload?.urlExpiryDatetTime
            ? format(
                new Date(paymentLinkDetailPayload.urlExpiryDatetTime),
                'd MMM yyyy, hh:mm aa'
              )
            : 'NA'}
        </>
      );
    },
  },
  {
    label: 'Payment Link',
    render: (paymentLinkDetailPayload) => {
      return (
        <div className='payment-link-wrapper'>
          <div>{paymentLinkDetailPayload?.paymentUrl ?? 'NA'}</div>
          <div className='payment-link-copy-wrapper'>
            <span
              className='payment-link-copy'
              onClick={() =>
                handleCopy(paymentLinkDetailPayload?.paymentUrl ?? '')
              }
            >
              {isCopiedToggle ? 'COPIED' : 'COPY'}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    label: 'Pay In Parts',
    render: (paymentLinkDetailPayload) => {
      return <>{paymentLinkDetailPayload?.payByPart ? 'Yes' : 'No'}</>;
    },
  },
  {
    label: 'Status',
    render: (paymentLinkDetailPayload) => {
      return (
        <div
          className={`status ${
            statusColorMapping[paymentLinkDetailPayload?.status]
          } view-payment-link-status`}
        >
          {paymentLinkDetailPayload?.status ?? 'NA'}
        </div>
      );
    },
  },
];
