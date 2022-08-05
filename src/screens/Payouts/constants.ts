export const FILTER_CONSTANTS = [
  { label: 'Last 30 Days', value: 'LAST_30_DAYS' },
  { label: 'Last 7 Days', value: 'LAST_7_DAYS' },
  { label: 'Last 3 Days', value: 'LAST_3_DAYS' },
  { label: 'Last 24 Hours', value: 'LAST_24_HRS' },
];

export const STATUS_COLOR_MAPPING = {
  PROCESSING: {
    value: 0,
    name: 'PROCESSING',
    color: '#00C3D5',
    count: 0,
  },
  REJECTED: {
    value: 0,
    name: 'REJECTED',
    color: '#DD5182',
    count: 0,
  },
  CANCELLED: {
    value: 0,
    name: 'CANCELLED',
    color: '#FFA600',
    count: 0,
  },
  FAILED: {
    value: 0,
    name: 'FAILED',
    color: '#58508D',
    count: 0,
  },
};

export const STATUS_NO_DATA_COLOR_CONFIG = [
  { value: 100, name: 'no-data', color: '#F7F8FB', count: 0 },
];

export const PAYOUT_SCHEDULE_LIST_TYPE = 'payLater';
export const PAYOUT_REGULAR_LIST_TYPE = 'payNow';
