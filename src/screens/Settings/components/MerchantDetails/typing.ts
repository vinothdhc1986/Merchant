import {
  UpdateKycDetailsRequestPayloadType,
  MerchantIdType,
} from '../../../../lib/typing';
interface DefaultStateType {
  isLoading: boolean;
  isSuccess: boolean;
  isFailure: boolean;
  errorCode: string | number;
  errorMessage: string;
  successMessage: string;
  data;
}

export interface InitFormPayloadType {
  businessName: string;
  businessPan: string;
  merchantId: MerchantIdType;
  contactNumber: string;
  email: string;
  taxInformation: string;
  billingAddress: string;
  kycDocuments: string;
  entityType: string;
  kycStatus: string;
}

export interface Props {
  validationErrors: {
    ONLY_ALPHABETS_ALLOWED: string;
    REQUIRED_FIELD: string;
    INVALID_PHONE: string;
    INVALID_EMAIL: string;
    SOMETHING_WENT_WRONG: string;
    INVALID_PAN: string;
  };
  getMerchantKycEntityTypesListAction: () => void;
  clearGetMerchantKycEntityTypesListAction: () => void;
  getMerchantKycDetailsAction: ({ merchantId: MerchantIdType }) => void;
  kycEntityTypesList: Array<{
    description: string;
    name: string;
  }>;
  getMerchantKycDetailsState: DefaultStateType;
  clearGetMerchantKycDetailsAction: () => void;
  merchantId: MerchantIdType;
  merchantName: string;
  merchantEmailId: string;
  updateMerchantKycDetailsAction: (
    payload: UpdateKycDetailsRequestPayloadType
  ) => void;
  clearUpdateMerchantKycDetailsAction: () => void;
  updateMerchantKycDetailsState: DefaultStateType;
}
