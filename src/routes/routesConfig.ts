import React from 'react';
import { UiRoutes } from '../lib/constants';
import { routeConfigType } from 'lib/typing';
const SignUp = React.lazy(() => import('../screens/NewSignup'));
const Login = React.lazy(() => import('../screens/Login'));
const LoginOtp = React.lazy(
  () => import('../screens/Login/components/LoginOtp')
);
const RegisterUser = React.lazy(() => import('../screens/RegisterUser'));
const Payment = React.lazy(() => import('../screens/payment'));
const Introduction = React.lazy(() => import('../screens/Introduction'));
const ImeiRequest = React.lazy(() => import('../screens/ImeiRequest'));
const SmartRouting = React.lazy(() => import('../screens/SmartRouting'));
const ViewGateway = React.lazy(
  () => import('../screens/SmartRouting/components/ViewGateway')
);
const CreateGateway = React.lazy(
  () => import('../screens/SmartRouting/components/CreateGateway')
);
const Refund = React.lazy(() => import('../screens/Refund'));
const Plans = React.lazy(() => import('../screens/Plans'));
const PlansHistory = React.lazy(() => import('../screens/BulkUploadHistory'));
const Settings = React.lazy(() => import('../screens/Settings'));
const SearchResults = React.lazy(() => import('../screens/SearchResults'));
const Settlements = React.lazy(() => import('../screens/Settlements'));
const Subscriptions = React.lazy(() => import('../screens/Subscriptions'));
// TODO: To be integrated in next scope
// const PaymentLinks = React.lazy(() => import('../screens/OldPaymentLinks'));
// const PaymentLinkBulkUploadHistory = React.lazy(
//   () => import('../screens/PaymentLinks/components/BulkUploadHistory')
// );
// const PaymentPages = React.lazy(() => import('../screens/PaymentPages'));
const Analytics = React.lazy(() => import('../screens/Analytics'));
const Overview = React.lazy(() => import('../screens/Overview'));
const BulkUploadHistory = React.lazy(
  () => import('../screens/BulkUploadHistory')
);
const AdminCustomRouting = React.lazy(
  () => import('../screens/AdminCustomRouting')
);
const MerchantListing = React.lazy(() => import('../screens/MerchantListing'));
const Admin_User_Management = React.lazy(
  () => import('../screens/Settings/components/UserManagement')
);
const Payouts = React.lazy(() => import('../screens/Payouts'));
const IndividualPayouts = React.lazy(
  () => import('../screens/IndividualPayouts')
);
const Beneficiaries = React.lazy(() => import('../screens/Beneficiaries'));
const BulkPayouts = React.lazy(() => import('../screens/BulkPayouts'));

const routeConfig: Array<routeConfigType> = [
  {
    path: UiRoutes.SIGNUP,
    component: SignUp,
    key: 'signup-screen',
    exact: true,
    layout: 'public',
  },
  {
    path: UiRoutes.LOGIN,
    component: Login,
    key: 'recentlyUsed-payment-screen',
    exact: true,
    layout: 'public',
  },
  {
    path: UiRoutes.LOGIN_OTP,
    component: LoginOtp,
    key: 'login-otp-screen',
    exact: true,
    layout: 'public',
  },
  {
    path: UiRoutes.ADMIN_REGISTER,
    component: RegisterUser,
    key: 'register-user-screen',
    exact: true,
    layout: 'public',
  },
  {
    path: UiRoutes.REGISTER_USER,
    component: RegisterUser,
    key: 'register-user-screen',
    exact: true,
    layout: 'public',
  },
  {
    path: UiRoutes.PAYMENT,
    component: Payment,
    key: 'payment',
    exact: true,
    layout: 'merchant',
  },
  {
    path: UiRoutes.INTRODUCTION,
    component: Introduction,
    key: 'introduction',
    exact: true,
    layout: 'merchant',
  },
  {
    path: UiRoutes.VARIFY_IMEI,
    component: ImeiRequest,
    key: 'introduction',
    exact: true,
    allowedPermission: ['VERIFY_IMEI'],
    layout: 'merchant',
  },
  {
    path: UiRoutes.CREATE_GATEWAY,
    component: CreateGateway,
    key: 'create-gateway',
    allowedPermission: ['CREATE_GATEWAY'],
    layout: 'merchant',
  },
  {
    path: UiRoutes.VIEW_GATEWAY_DETAILS(':gateway'),
    component: ViewGateway,
    key: 'view-gateway',
    exact: true,
    allowedPermission: ['UPDATE_GATEWAY_CONFIG', 'VIEW_GATEWAY_CONFIG'],
    layout: 'merchant',
  },
  {
    path: UiRoutes.SMART_ROUTING,
    component: SmartRouting,
    key: 'smart-routing',
    exact: true,
    layout: 'merchant',
  },
  {
    path: UiRoutes.REFUND_BULK_UPLOAD_HISTORY,
    component: BulkUploadHistory,
    key: 'refund-bulk-upload-history',
    exact: true,
    layout: 'merchant',
  },
  {
    path: UiRoutes.REFUNDS,
    component: Refund,
    key: 'refund',
    exact: true,
    layout: 'merchant',
  },
  {
    path: UiRoutes.PLANS,
    component: Plans,
    key: 'plans',
    exact: true,
    layout: 'merchant',
  },
  {
    path: UiRoutes.PLANS_HISTORY,
    component: PlansHistory,
    key: 'plansHistory',
    exact: true,
    layout: 'merchant',
  },
  {
    path: UiRoutes.SETTINGS,
    component: Settings,
    key: 'settings',
    exact: true,
    layout: 'merchant',
  },
  {
    path: UiRoutes.SEARCH_RESULTS,
    component: SearchResults,
    key: 'search-results',
    exact: true,
    layout: 'merchant',
  },
  {
    path: UiRoutes.SETTLEMENTS,
    component: Settlements,
    key: 'settlements',
    exact: true,
    layout: 'merchant',
  },
  {
    path: UiRoutes.SUBSCRIPTIONS,
    component: Subscriptions,
    key: 'subscriptions',
    exact: true,
    layout: 'merchant',
  },
  // TODO: To be integrated in next scope
  // {
  //   path: UiRoutes.PAYMENT_LINKS,
  //   component: PaymentLinks,
  //   key: 'payment-links',
  //   exact: true,
  //   layout: 'merchant',
  // },
  // {
  //   path: UiRoutes.PAYMENT_LINK_BULK_UPLOAD_HISTORY,
  //   component: PaymentLinkBulkUploadHistory,
  //   key: 'payment-links-bulk-upload-history',
  //   exact: true,
  //   layout: 'merchant',
  // },
  // {
  //   path: UiRoutes.PAYMENT_PAGES,
  //   component: PaymentPages,
  //   key: 'payment-pages',
  //   exact: true,
  //   layout: 'merchant',
  // },
  {
    path: UiRoutes.ANALYTICS,
    component: Analytics,
    key: 'analytics',
    exact: true,
    layout: 'merchant',
  },
  {
    path: UiRoutes.OVERVIEW,
    component: Overview,
    key: 'analytics',
    exact: true,
    layout: 'merchant',
  },
  {
    path: UiRoutes.PAYOUTS,
    component: Payouts,
    key: 'payouts',
    exact: true,
    layout: 'merchant-payout',
  },
  {
    path: UiRoutes.INDIVIDUAL_PAYOUTS,
    component: IndividualPayouts,
    key: 'individualPayouts',
    exact: true,
    layout: 'merchant-payout',
  },
  {
    path: UiRoutes.BENEFICIARIES,
    component: Beneficiaries,
    key: 'beneficiaries',
    exact: true,
    layout: 'merchant-payout',
  },
  {
    path: UiRoutes.BULK_PAYOUTS,
    component: BulkPayouts,
    key: 'bulkPayouts',
    exact: true,
    layout: 'merchant-payout',
  },
  {
    path: UiRoutes.ADMIN_LOGIN,
    component: Login,
    key: 'admin-login',
    exact: true,
    layout: 'public',
  },
  {
    path: UiRoutes.ADMIN_CUSTOM_ROUTING,
    component: AdminCustomRouting,
    key: 'admin-custom-routing',
    exact: true,
    layout: 'admin',
  },
  {
    path: UiRoutes.MERCHANT_LISTING,
    component: MerchantListing,
    key: 'merchantListing',
    exact: true,
    layout: 'admin',
  },
  {
    path: UiRoutes.ADMIN_ANALYTICS,
    component: Analytics,
    key: 'admin-analytics',
    exact: true,
    layout: 'admin',
  },
  {
    path: UiRoutes.ADMIN_USER_MANAGEMENT,
    component: Admin_User_Management,
    key: 'admin-user-management',
    exact: true,
    layout: 'admin',
  },
];

export default routeConfig;
