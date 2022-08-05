import imgURL from '../../lib/imgURL';

export const initGatewaysOptions = [
  {
    label: 'All Payment Gateways',
    value: 'all',
  },
];

export const totalTransactionsOptions = [
  {
    label: 'Total Transactions',
    value: 'totalTransactions',
  },
];

export const volumeAndCountOptions = [
  {
    label: 'By Volume and Count',
    value: 'byVolumeCount',
  },
  {
    label: 'By Success and Failure',
    value: 'bySuccessFailure',
  },
];

export const initPlatformDataset = [
  {
    name: 'Mobile',
    value: 0,
    index: 0,
    color: '#E270FF',
  },
  {
    name: 'Desktop',
    value: 0,
    index: 1,
    color: '#7B87F0',
  },
];

/**
 * Payment Modes IDs & Names(Keys)
1	CREDIT/DEBIT CARD
3	NET BANKING
4	EMI
5	REWARDS
6	EZECLICK
7	THIRD PARTY EMI
8	SI
9	E-MANDATE
10	UPI
11	WALLET
12	BHARAT QR CODE
13	DEBIT+PIN
14	DEBIT EMI
15	PAY BY POINTS
17	BUY NOW PAY LATER
 */

export const enabledPaymentModesList = [
  'CREDIT/DEBIT CARD',
  'PAY BY POINTS',
  'UPI',
  'WALLET',
  'EMI',
  'NET BANKING',
  // 'BUY NOW PAY LATER',
];

export const paymentMethodsList = [
  {
    key: 'CREDIT/DEBIT CARD',
    label: 'Credit/Debit Card',
    bgClass: 'creditCard',
    icon: imgURL['CreditCard-icon'],
    percentage: 0,
  },
  {
    key: 'PAY BY POINTS',
    label: 'Pay by points',
    bgClass: 'payByPoints',
    icon: imgURL['payByPoints-icon'],
    percentage: 0,
  },
  {
    key: 'UPI',
    label: 'UPI',
    bgClass: 'upi',
    icon: imgURL['upi-icon'],
    percentage: 0,
  },
  {
    key: 'WALLET',
    label: 'Wallet',
    bgClass: 'wallet',
    icon: imgURL['wallet-icon'],
    percentage: 0,
  },
  {
    key: 'EMI',
    label: 'EMI',
    bgClass: 'emi',
    icon: imgURL['emi-icon'],
    percentage: 0,
  },
  {
    key: 'NET BANKING',
    label: 'NET BANKING',
    bgClass: 'net-banking',
    icon: imgURL['net-banking-icon'],
    percentage: 0,
  },
  // {
  //   key: 'BUY NOW PAY LATER',
  //   label: 'BUY NOW PAY LATER',
  //   bgClass: 'buy-now-pay-later',
  //   icon: imgURL['buy-now-pay-later-icon'],
  //   percentage: 0,
  // },
  {
    key: 'others',
    label: 'Others',
    bgClass: 'others',
    icon: imgURL['other-icon'],
    percentage: 0,
  },
];

export const legendListForPaymentMethodChart = [
  {
    label: 'Transaction Volume',
    imgSrc: imgURL.bullet1,
  },
  {
    label: 'Transaction Count',
    imgSrc: imgURL.bullet2,
  },
];

export const legendListForVolumeAndCountChart = [
  {
    label: 'Successful Transactions',
    imgSrc: imgURL['success-transactions-bullet'],
  },
  {
    label: 'Failed Transactions',
    imgSrc: imgURL['failed-transactions-bullet'],
  },
];
