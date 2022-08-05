import { InitFormPayloadType } from './typing';
export const ENTITY_TYPE_OPTIONS = [
  {
    label: 'Select',
    value: '',
  },
];

export const INIT_DIAL_CODE = '91';

export const initFormData: InitFormPayloadType = {
  businessName: '',
  businessPan: '',
  merchantId: '',
  contactNumber: '',
  email: '',
  taxInformation: '',
  billingAddress: '',
  kycDocuments: '',
  entityType: '',
  kycStatus: '',
};

export const KYC_STATUS_OPTIONS = [
  {
    label: 'Select',
    value: '',
  },
  {
    label: 'Verified',
    value: 'VERIFIED',
  },
  {
    label: 'Not Verified',
    value: 'NOT_VERIFIED',
  },
];
