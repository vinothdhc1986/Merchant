interface Props {
  accountBalanceState: {
    virtualAccountNumber: string;
    ifscCode: string;
    balance: number;
    isLoading: boolean;
    isFailure: boolean;
    errorMessage: string;
  };
  getAccountBalanceAction: (merchantId: string | number) => void;
  clearAccountBalanceStateAction: () => void;
  validationErrorState: {
    SOMETHING_WENT_WRONG: string;
  };
}

export default Props;
