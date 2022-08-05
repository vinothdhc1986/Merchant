const contentType = {
  MULTIPART: 'multipart',
};

const UiRoutes = {
  SIGNUP: '/signup',
  LOGIN: '/login',
  LOGIN_OTP: '/validateOTP',
  FORGOT_PASSWORD: '/forgot-password',
  REGISTER_USER: '/register',
  OVERVIEW: '/overview',
  PAYMENT: '/payments',
  REFUNDS: '/refunds',
  PAYOUTS: '/payouts',
  INDIVIDUAL_PAYOUTS: '/individualPayouts',
  BULK_PAYOUTS: '/bulkPayouts',
  PAYOUT_LINKS: '/payoutLinks',
  BENEFICIARIES: '/beneficiaries',
  ROUTING: '/routing',
  API_DOCUMENTATION: '/apiDocumentation',
  SETTLEMENTS: '/settlements',
  SMART_ROUTING: '/smart-routing',
  SUBSCRIPTIONS: '/subscriptions',
  PAYMENT_LINKS: '/payment-links',
  PAYMENT_LINK_BULK_UPLOAD_HISTORY: '/payment-links/bulk-upload-history',
  PAYMENT_PAGES: '/payment-pages',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
  INTRODUCTION: '/introduction',
  VARIFY_IMEI: '/varify-imei',
  VIEW_GATEWAY_DETAILS: (gateway: string): string =>
    `/smart-routing/view-gateway/${gateway}`,
  CREATE_GATEWAY: '/smart-routing/gateway/create',
  PLANS: '/plans',
  PLANS_HISTORY: '/bulk-upload-history',
  SEARCH_RESULTS: '/search-results',
  REFUND_BULK_UPLOAD_HISTORY: '/refunds/bulk-upload-history',
  ADMIN_CUSTOM_ROUTING: '/admin/custom-routing',
  MERCHANT_LISTING: '/admin/merchant-listing',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_USER_MANAGEMENT: '/admin/users',
  ADMIN_REGISTER: '/admin/register',
};

const labels = {
  _login: {},
};

const emailValidationRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//const passwordValidationRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&? "])[a-zA-Z0-9!#$@^%&?]{8,100}$/;

const passwordValidationRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const phoneValidationRegex = /^[1-9]\d{9}$/;

const selectedCountryPhoneRegex = {
  India: /^(91)[1-9]\d{9}$/,
};

const numericValidationRegex = /^(0|[1-9][0-9]*)$/;

const decimalNumberValidationRegex = /^\d*\.?\d*$/;

const twoDigitAfterDecimalValidationRegex = /^\d*(\.\d{0,2})?$/;

const nameValidationRegex = /^[a-zA-Z ]*$/;

const alphaNumericValidationRegex = /^[a-zA-Z0-9 ]*$/;

const alphaNumericValidationRegexWithoutSpace = /^[a-zA-Z0-9]*$/;

const alphaNumericWithHyphenUnderScoreValidationRegex = /^[a-zA-Z0-9 _-]*$/;

const noWhiteSpaceStringValidationRegex = /^\S*$/;

const alphaNumericWithHashHyphenRegex = /^[a-zA-Z0-9#-]*$/;

const alphaNumericWithHashHyphenRegexWithSpace = /^[ a-zA-Z0-9#-]*$/;

const ifscCodeValidationRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

const PANValidationRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;

export {
  contentType,
  UiRoutes,
  labels,
  emailValidationRegex,
  passwordValidationRegex,
  phoneValidationRegex,
  numericValidationRegex,
  decimalNumberValidationRegex,
  nameValidationRegex,
  twoDigitAfterDecimalValidationRegex,
  alphaNumericValidationRegex,
  noWhiteSpaceStringValidationRegex,
  selectedCountryPhoneRegex,
  alphaNumericWithHashHyphenRegex,
  alphaNumericWithHashHyphenRegexWithSpace,
  alphaNumericWithHyphenUnderScoreValidationRegex,
  alphaNumericValidationRegexWithoutSpace,
  ifscCodeValidationRegex,
  PANValidationRegex,
};

export const localStorageKeys = {
  AUTH_TOKEN: 'PLURAL_XT_MERCHANT_DASH_LOGGED_IN',
};

export const PER_PAGE_LIMIT = 10;

export const PAYOUT_REQUEST_DATE_FORMAT = 'yyyy-MM-dd';

export const FILTER_KEYS_MAPPING = {
  customerId: 'Customer ID',
  'Customer ID': 'customerId',
  customerPhone: 'Customer Phone',
  'Customer Phone': 'customerPhone',
  customerEmail: 'Customer Email',
  'Customer Email': 'customerEmail',
  transactionId: 'Transaction ID',
  'Transaction ID': 'transactionId',
  orderId: 'Order ID',
  'Order ID': 'orderId',
  amount: 'Amount',
  Amount: 'amount',
  refundId: 'Refund ID',
  'Refund ID': 'refundId',
};

export const CUSTOM_ERROR_HANDLING_CODES = {
  '3090': true,
  '3130': true, // CREDENTIALS_NOT_VALID
  '3070': true, // USER_DOES_NOT_EXISTS
  '3220': true, // PASSWORD_MISMATCH
  '3480': true, // REFUND_NOT_ALLOWED_ON_THIS_ORDER_ID / REFUND_AMOUNT_NOT_ALLOWED
  '3490': true, // ALREADY_REFUNDED
};

export const COMMON_ERROR_CODES = {
  '3060': 'Something went wrong! Please try again.',
};

export const SEARCH_DELAY_BUFFER = 200;
export const REFRESH_TOKEN_MARGINAL_TIME = 10;
export const MAX_DATE_RANGE_DAYS = 93;

export const DEFAULT_VALIDATION_ERROR = 'Invalid Input';
export const DEFAULT_API_ERROR = 'Something went wrong!';
export const DEFAULT_API_SUCCESS = 'Success';

export const SETTINGS_TAB_CONSTANTS = {
  general: { label: 'General', value: 'general' },
  checkoutTheme: { label: 'Checkout Theme', value: 'checkoutTheme' },
  credentials: { label: 'Credentials', value: 'credentials' },
  webhook: { label: 'Webhook', value: 'webhook' },
  userManagement: { label: 'User Management', value: 'userManagement' },
  customization: { label: 'Customization', value: 'customization' },
  merchantDetails: { label: 'Merchant Details', value: 'merchantDetails' },
};

Object.freeze(SETTINGS_TAB_CONSTANTS);

export const LOGIN_CONSTANTS = {
  ZERO: 0,
  OTP_LENGTH: 6,
  LOGIN_OTP_EXP_TIME_IN_SECONDS: 180,
  FETCH_LOGIN_OTP_API_TYPE_FETCH: 'FETCH',
  FETCH_LOGIN_OTP_API_TYPE_RESEND: 'RESEND',
};

export const ERROR_CONSTANTS = {
  PASSWORD_EXPIRED: 'PASSWORD_EXPIRED',
  ACCOUNT_IS_BLOCKED: 'ACCOUNT_IS_BLOCKED',
  OTP_IS_NOT_VALID: 'OTP_IS_NOT_VALID',
  USER_IS_TERMINATED: 'USER_IS_TERMINATED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  MAX_OTP_ATTEMPTS_LIMIT_REACHED: 'MAX_OTP_ATTEMPTS_LIMIT_REACHED',
  OTP_EXPIRED: 'OTP_EXPIRED',
  MAX_RESET_PASSWORD_LIMIT_REACHED: 'MAX_RESET_PASSWORD_LIMIT_REACHED',
  USER_DOES_NOT_EXISTS: 'USER_DOES_NOT_EXISTS',
};

export const PAYOUT_SCHEDULE_LIST_TYPE = 'payLater';
export const PAYOUT_REGULAR_LIST_TYPE = 'payNow';

Object.freeze(LOGIN_CONSTANTS);
Object.freeze(ERROR_CONSTANTS);

export const PAYOUT_LISTING_NO_RECORD_ERROR_CODE = '500110';
