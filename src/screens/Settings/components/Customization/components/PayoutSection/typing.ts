interface Props {
  clearPayoutModuleStatusAction: CallableFunction;
  updatePayoutModuleStatusState: {
    isSuccess: boolean;
    isFailure: boolean;
  };
  merchantPayoutEnabled: boolean;
  validationErrors: {
    SOMETHING_WENT_WRONG: string;
  };
  merchantData: {
    email: string;
    merchantId: string;
    name: string;
  };
  getBankListAction: () => void;
  clearBankListAction: () => void;
  updateMerchantPayoutModuleStatusAction: (config: {
    status: boolean;
    merchantId: string;
    email: string;
    name: string;
    bankId: string;
  }) => void;
  merchantPayoutBankId: string;
  bankList: Array<{ label: string; value: string }>;
}

export default Props;
