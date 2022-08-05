export default {
  LOGIN: 'api/v1/dashboard/auth/merchant/user/Login',
  FETCH_LOGIN_OTP: 'api/v1/dashboard/auth/merchant/user/fetchOTPToken',
  VALIDATE_LOGIN_OTP: 'api/v1/dashboard/auth/merchant/login/authenticate/otp',
  SIGN_UP: 'api/v1/dashboard/auth/merchant/user/signup/dev/portal',
  FORGET_PASSWORD: 'api/v1/dashboard/auth/merchant/user/forgetpassword',
  VALIDATE_OTP:
    'api/v1/dashboard/auth/merchant/user/forgetpassword/validate/otp',
  SAVE_NEW_PASSWORD:
    'api/v1/dashboard/auth/merchant/user/forgetpassword/save/new/password',
  LOGOUT: 'api/v1/dashboard/auth/merchant/user/logout',
  CHANGE_PASSWORD: 'api/v1/dashboard/auth/merchant/user/changepassword',
  REFRESH_TOKEN: 'api/v1/dashboard/auth/merchant/verify/token',
  NEW_SIGN_UP: 'api/v1/dashboard/auth/merchant/user/new/login',
  SET_COOKIES: 'api/v1/dashboard/auth/merchant/cookie/set',
  CHECK_COOKIES: 'api/v1/dashboard/auth/merchant/cookie/check',
  ANALYTICS: (merchantId: string, isAdmin: boolean): string =>
    `api/v1/dashboard/transaction/analytics/data/admin/${isAdmin}/merchant/${merchantId}`,
  VALIDATION_ERRORS: 'api/v1/dashboard/transaction/home/ErrorText',
  GATEWAY_LIST: (merchantId: string): string =>
    `api/v1/dashboard/transaction/gateway/GetMappedGatewaysWithStatus/${merchantId}`,
  UNMAPPED_GATEWAY_LIST: (merchantId: string | number): string =>
    `api/v1/dashboard/transaction/gateway/GetUnmappedGateways/${merchantId}`,
  GATEWAY_CONFIGURATIONS: (
    gateway: string,
    merchantId: string | number,
    mode: boolean
  ): string =>
    `api/v1/dashboard/transaction/gateway/GetConfigurationForGateway/${gateway}/${mode}/${merchantId}`,
  SAVE_GATEWAY: 'api/v1/dashboard/transaction/gateway/SaveGateway',
  PREFERNCE_GATEWAY: (merchantId: string | number): string =>
    `api/v1/dashboard/transaction/gateway/ViewActiveSimpleLogic/${merchantId}`,
  ACTIVE_PRIORITY_LOGIC: (merchantId: string | number): string =>
    `api/v1/dashboard/transaction/gateway/ViewActivePriorityLogic/${merchantId}`,
  SAVE_CUSTOM_LOGIC: 'api/v1/dashboard/transaction/gateway/SaveCustomLogic',
  UPDATE_PREFERNCES: (
    preference: string,
    merchantId: string | number
  ): string =>
    `api/v1/dashboard/transaction/gateway/SaveSimpleLogic/${preference}/1/${merchantId}`,
  PRIORITY_LOGICS_LIST: (merchantId: string): string =>
    `api/v1/dashboard/transaction/gateway/GetAllMappedPriorityLogics/${merchantId}`,
  SMART_ROUTING_PREFERENCE_SCORES_LIST: (
    merchantId: number,
    preferenceType: string
  ): string =>
    `api/v1/dashboard/transaction/gateway/GetMapped${preferenceType}/${merchantId}`,
  SMART_ROUTING_CREATE_PREFERENCE_SCORES: (preferenceType: string): string =>
    `api/v1/dashboard/transaction/gateway/Create${preferenceType}RouteForMerchant`,
  SMART_ROUTING_DELETE_PREFERENCE_SCORES: (preferenceType: string): string =>
    `api/v1/dashboard/transaction/gateway/Delete${preferenceType}RouteForMerchant`,
  VIEW_SIMPLE_ROUTING_LOGIC: (merchantId: number): string =>
    `api/v1/dashboard/transaction/gateway/ViewActiveSimpleLogic/${merchantId}`,
  GET_ALL_CARD_BRAND_NAMES:
    'api/v1/dashboard/transaction/gateway/AllCardBrandNames',
  GET_ALL_ISSUER_NAMES:
    'api/v1/dashboard/transaction/gateway/GetAllIssuerNames',
  GET_ACTIVE_WEBHOOK_EVENTS:
    'api/v1/dashboard/transaction/Settings/GetActiveWebhookEventsForMerchant/merchantId',
  GET_MERCHENT_SETTINGS:
    'api/v1/dashboard/transaction/Settings/GetMerchantSettings/merchantId',
  UPDATE_MERCHENT_GENERAL_SETTINGS:
    'api/v1/dashboard/transaction/Settings/UpdateMerchantGeneralSettings',
  UPDATE_MERCHENT_WEBHOOK:
    'api/v1/dashboard/transaction/Settings/UpdateWebhookEventsForMerchant',
  GET_PAYMENT_LIST:
    'api/v1/dashboard/transaction/transaction/GetAllTransactionsOnMerchant',
  GET_REFUND_LIST: ({
    transactionType,
    merchantId,
  }: {
    transactionType: string | number;
    merchantId: string | number;
  }): string =>
    `api/v1/dashboard/transaction/transaction/GetAllTransactionsOnMerchant/${transactionType}/${merchantId}`,
  PAYMENT_GET_ORDER_TRANSACTION_DETAILS:
    'api/v1/dashboard/transaction/order/GetAllOrdersWithCriteria',
  GET_ACTIVE_USERS: 'api/v1/dashboard/transaction/user/all',
  GET_ALL_ROLES: 'api/v1/dashboard/transaction/user/roles/all',
  GET_ALL_PERMISSIONS_LIST: 'api/v1/dashboard/transaction/user/permissions',
  CREATE_NEW_ROLE: 'api/v1/dashboard/transaction/user/create/role',
  GET_ALL_GATEWAYS: 'api/v1/dashboard/transaction/transaction/GetAllGateways',
  GET_ALL_TRANSACTION_STATUS:
    'api/v1/dashboard/transaction/transaction/GetAllTransactionStatus',
  CREATE_NEW_USER: 'api/v1/dashboard/transaction/user/create',
  UPDATE_USER_DETAILS: 'api/v1/dashboard/transaction/user/update',
  DELETE_USER: 'api/v1/dashboard/transaction/user/remove',
  RESEND_INVITATION: 'api/v1/dashboard/transaction/user/resend/invitation/user',
  GET_CHECKOUT_THEME:
    'api/v1/dashboard/transaction/settings/get/checkout/data/merchant',
  UPDATE_CHECKOUT_THEME:
    'api/v1/dashboard/transaction/settings/update/checkout/data',
  CREATE_REFUND: 'api/v1/dashboard/transaction/refund/initiate',
  GET_REFUND_BULK_UPLOAD_HISTORY_LIST: `api/v1/dashboard/transaction/refund/batch/filter`,
  GET_REFUND_BULK_UPLOAD_CSV_TEMPLATE: `api/v1/dashboard/transaction/refund/batch/sample/file/download`,
  UPLOAD_BULK_REFUND: (merchantId: number | string): string =>
    `api/v1/dashboard/transaction/refund/batch/initiate/file/${merchantId}`,
  CHANGE_GATEWAY_STATUS:
    'api/v1/dashboard/transaction/merchant/ChangeMerchantGatewayMappingStatus',
  DELETE_PRIORITY_LOGIC: (configId: number, merchantId: number): string =>
    `api/v1/dashboard/transaction/gateway/DeletePriorityLogic/${configId}/${merchantId}`,
  GET_TODAY_TRANSACTIONS_DATA: (merchantId: number): string =>
    `api/v1/dashboard/transaction/transaction/GetTransactionSummary/${merchantId}`,
  GET_OVERVIEW_DATA: (merchantId: string | number): string =>
    `api/v1/dashboard/transaction/transaction/GetAllTransactionDataForCharting/${merchantId}`,
  GET_PAYMENT_LINKS_LIST: (id: number | string): string =>
    `api/v1/payment/transaction/transaction/paymentlink/search/${id}`,
  CREATE_PAYMENT_LINK: `api/v1/payment/transaction/transaction/paymentlink/CreatePaymentLink`,
  GET_MERCHANT_LIST: `api/v1/dashboard/transaction/merchant/admin/merchantList`,
  ADMIN_GET_ACTIVE_USERS: 'api/v1/dashboard/transaction/user/admin/all',
  ADMIN_GET_ALL_ROLES: 'api/v1/dashboard/transaction/user/roles/admin/all',
  ADMIN_GET_ALL_PERMISSIONS_LIST:
    'api/v1/dashboard/transaction/user/admin/permissions',
  ADMIN_CREATE_NEW_ROLE: 'api/v1/dashboard/transaction/user/admin/create/role',
  ADMIN_CREATE_NEW_USER: 'api/v1/dashboard/transaction/user/admin/create',
  ADMIN_UPDATE_USER_DETAILS: 'api/v1/dashboard/transaction/user/admin/update',
  ADMIN_DELETE_USER: 'api/v1/dashboard/transaction/user/remove/admin/user',
  ADMIN_RESEND_INVITATION:
    'api/v1/dashboard/transaction/user/resend/invitation/admin/user',
  GET_ADMIN_CUSTOM_ROUTING_LIST: `api/v1/dashboard/transaction/merchant/admin/merchantCustomRouting`,
  UPDATE_MERCHANT_TRM_STATUS: `api/v1/dashboard/transaction/merchant/ChangeStatusOfTRMForMerchant`,
  GET_ADMIN_PRIORITY_LOGIC: `api/v1/dashboard/transaction/merchant/admin/getPriorityLogic`,
  PUT_APPROVE_OR_REJECT_LOGIC: `api/v1/dashboard/transaction/merchant/admin/approveRejectLogic`,
  UPDATE_ADMIN_PRIORITY_LOGIC: `api/v1/dashboard/transaction/merchant/admin/updateCustomizedLogic`,
  MERCHANT_SEARCH: `api/v1/dashboard/transaction/merchant/admin/searchMerchant`,
  GET_ADMIN_CUSTOM_ROUTING_AUTO_SUGGEST_LIST: `api/v1/dashboard/transaction/merchant/admin/searchCustomizedMerchantList`,
  GET_PAYMENT_LINKS_BULK_UPLOAD_CSV_TEMPLATE: `api/v1/payment/transaction/transaction/paymentlink/downloadSampleCSV`,
  UPLOAD_BULK_PAYMENT_LINKS: (merchantId: number | string): string =>
    `api/v1/payment/transaction/transaction/paymentlink/bulkUpload/${merchantId}`,
  CLIENT_SECRET_KEY: `api/v1/dashboard/auth/merchant/recaptcha/recaptchaKey`,
  VERIFY_CAPTCHA_API: `api/v1/dashboard/auth/merchant/recaptcha/verify`,
  GET_PAYMENT_LINK_BULK_UPLOAD_HISTORY:
    'api/v1/payment/transaction/transaction/paymentlink/bulkUpload/history',
  DOWNLOAD_PAYMENT_LINK_BULK_UPLOAD_HISTORY_FILE: (
    fileId: number,
    merchantId: number | string
  ): string =>
    `api/v1/payment/transaction/transaction/paymentlink/download/${fileId}/${merchantId}`,
  GET_PAYMENT_LINK_STATUS_CODE:
    'api/v1/payment/transaction/transaction/paymentlink/paymentLinkStatus',
  GET_ALL_REFUND_STATUS:
    'api/v1/dashboard/transaction/refund/GetAllRefundStatus',
  GET_TRM_REDIRECT_URL: 'api/v1/dashboard/auth/merchant/trm/getRedirectUrl',
  VALIDATE_REGISTER_TOKEN: (token: string, isAdmin: boolean): string =>
    `api/v1/dashboard/auth/merchant/validateInviteLink/${token}/${isAdmin}`,
  // PAYOUT ENDPOINTS
  ADD_NEW_BENEFICIARY: 'api/v1/payout/vendor/manage',
  GET_BENEFICIARY_LIST: 'api/v1/payout/vendor/list',
  DOWNLOAD_BENEFICIARY_LIST: 'api/v1/payout/vendor/downloadlist',
  DOWNLOAD_INDIVIDUAL_PAYOUT_LIST: 'api/v1/payout/payout/downloadlist',
  APPROVE_REJECT_BENEFICIARIES: 'api/v1/payout/vendor/approve',
  GET_INDIVIDUAL_PAYOUTS_LIST: 'api/v1/payout/payout/list',
  GET_BENEFICIARY_BY_BENEFICIARY_CODE: 'api/v1/payout/vendor/mastercopy',
  ADD_NEW_INDIVIDUAL_PAYOUT: 'api/v1/payout/payout/manage',
  APPROVE_REJECT_INDIVIDUAL_PAYOUT: 'api/v1/payout/payout/approve',
  DEACTIVATE_BENEFICIARIES: 'api/v1/payout/vendor/disableBeneficiary',
  GET_BULK_PAYOUT_LIST: 'api/v1/payout/payout/filesummary',
  GET_PAYOUT_BULK_UPLOAD_CSV_TEMPLATE: (fileKeyword: string): string =>
    `api/v1/payout/common/downloadTemplate?fileKeyword=${fileKeyword}`,
  UPLOAD_BULK_PAYOUT: 'api/v1/payout/payout/upload',
  UPDATE_MERCHANT_PAYOUT_MODULE_STATUS:
    'api/v1/dashboard/transaction/merchant/admin/payout/status',
  CANCEL_APPROVED_INDIVIDUAL_PAYOUT: 'api/v1/payout/payout/cancelPayouts',
  DOWNLOAD_BULK_PAYOUT_RECORD: 'api/v1/payout/common/downloadLog',
  GET_PAYOUT_OVERVIEW_PENDING_SUMMARY:
    'api/v1/payout/payout/dashboardPendingSummary',
  GET_PAYOUT_OVERVIEW_STATUS_SUMMARY:
    'api/v1/payout/payout/dashboardPayoutStatusSummary',
  GET_PAYOUT_OVERVIEW_TRANSACTION_SUMMARY:
    'api/v1/payout/payout/dashboardTransactionSummary',
  GET_PAYOUT_MERCHANT_ACOUNT_BALANCE: 'api/v1/payout/payout/merchantbalance',
  GET_PAYOUT_REMITTER_ACCOUNTS_LIST: 'api/v1/payout/remitter/list',
  ADD_PAYOUT_REMITTER_ACCOUNT: 'api/v1/payout/remitter/add',
  UPDATE_PAYOUT_REMITTER_ACCOUNT: 'api/v1/payout/remitter/update',
  GET_PAYOUT_BANK_LIST:
    'api/v1/dashboard/transaction/merchant/admin/payout/beneficiary/banks',
  GET_MERCHANT_KYC_ENTITY_TYPES_LIST:
    'api/v1/payout/merchantkyc/kycentitytypes',
  GET_MERCHANT_KYC_DETAILS: 'api/v1/payout/merchantkyc/get',
  POST_UPDATE_MERCHANT_KYC_DETAILS: 'api/v1/payout/merchantkyc/manage',
  GET_PAYOUT_TRANSACTION_FAILED_MSG: 'api/v1/payout/payout/transactionfailmsg',
};
