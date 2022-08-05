import imgURL from '../../lib/imgURL';
import { UiRoutes } from '../../lib/constants';
import { CleverTapEventConfigName } from 'lib/typing';

export const transactionsOptionsList: Options[] = [
  {
    label: 'Payments',
    value: UiRoutes.PAYMENT,
    icon: imgURL['payments-icon'],
    clevertapEventName: CleverTapEventConfigName.SIDEBAR_TAB_CLICKED_PAYMENT,
  },
  {
    label: 'Refunds',
    value: UiRoutes.REFUNDS,
    icon: imgURL['refunds-icon'],
    clevertapEventName: CleverTapEventConfigName.SIDEBAR_TAB_CLICKED_REFUNDS,
  },
  // {
  //   label: 'Settlements',
  //   value: UiRoutes.SETTLEMENTS,
  //   icon: imgURL['settlements-icon'],
  // },
];

export const payoutsOptionsList: Options[] = [
  {
    label: 'Payouts',
    value: UiRoutes.PAYOUTS,
    icon: imgURL['payouts-icon'],
  },
  {
    label: 'Individual Payouts',
    value: UiRoutes.INDIVIDUAL_PAYOUTS,
    icon: imgURL['individual-payouts-icon'],
  },
  {
    label: 'Bulk Payouts',
    value: UiRoutes.BULK_PAYOUTS,
    icon: imgURL['bulk-payouts-icon'],
  },
  // {
  //   label: 'Payout Links',
  //   value: UiRoutes.PAYOUT_LINKS,
  //   icon: imgURL['payout-links-icon'],
  // },
  {
    label: 'Beneficiaries',
    value: UiRoutes.BENEFICIARIES,
    icon: imgURL['beneficiaries-icon'],
  },
  // {
  //   label: 'API Documentation',
  //   value: UiRoutes.API_DOCUMENTATION,
  //   icon: imgURL['api-documentation-icon'],
  // },
];

export const valueAddedFeaturesList: Options[] = [
  {
    label: 'Smart Routing',
    value: UiRoutes.SMART_ROUTING,
    icon: imgURL['smart-routing'],
    clevertapEventName:
      CleverTapEventConfigName.SIDEBAR_TAB_CLICKED_SMART_ROUTING,
  },
  // {
  //   label: 'Plans',
  //   value: UiRoutes.PLANS,
  //   icon: imgURL['plans-icon'],
  // },
  // {
  //   label: 'Subscriptions',
  //   value: UiRoutes.SUBSCRIPTIONS,
  //   icon: imgURL['subscription-icon'],
  // },
  // TODO: to be integrated in next scope
  // {
  //   label: 'Payment Links',
  //   value: UiRoutes.PAYMENT_LINKS,
  //   icon: imgURL['payment-link-icon'],
  //   clevertapEventName:
  //     CleverTapEventConfigName.SIDEBAR_TAB_CLICKED_PAYMENT_LINKS,
  // },
  // {
  //   label: 'Payment Pages',
  //   value: UiRoutes.PAYMENT_PAGES,
  //   icon: imgURL['payment-page-icon'],
  //   clevertapEventName:
  //     CleverTapEventConfigName.SIDEBAR_TAB_CLICKED_PAYMENT_PAGES,
  // },
  {
    label: 'Analytics',
    value: UiRoutes.ANALYTICS,
    icon: imgURL['analytic-icon'],
    clevertapEventName: CleverTapEventConfigName.SIDEBAR_TAB_CLICKED_ANALYTICS,
  },
];

export const adminOptionList: Options[] = [
  {
    label: 'Merchants',
    value: UiRoutes.MERCHANT_LISTING,
    icon: imgURL.merchant,
  },
  {
    label: 'Custom Routing',
    value: UiRoutes.ADMIN_CUSTOM_ROUTING,
    icon: imgURL['smart-routing'],
  },
  {
    label: 'Analytics',
    value: UiRoutes.ADMIN_ANALYTICS,
    icon: imgURL['analytic-icon'],
  },
  {
    label: 'Users',
    value: UiRoutes.ADMIN_USER_MANAGEMENT,
    icon: imgURL['admin-user-icon'],
  },
];

export interface Options {
  label: string;
  value: string;
  icon: string;
  clevertapEventName?: CleverTapEventConfigName;
}
