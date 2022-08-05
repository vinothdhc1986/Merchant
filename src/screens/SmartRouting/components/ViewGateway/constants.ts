import { UiRoutes } from 'lib/constants';

export const VIEW_GATEWAY_BREADCRUMB_CONFIG = (
  gateway: string
): {
  label: string;
  path: string;
}[] => [
  { label: 'Smart Routing', path: UiRoutes.SMART_ROUTING },
  { label: 'Gateways', path: UiRoutes.SMART_ROUTING },
  { label: gateway, path: UiRoutes.VIEW_GATEWAY_DETAILS(gateway) },
];
