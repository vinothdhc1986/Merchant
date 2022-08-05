import {
  ActionsReturnType,
  UpdateRemitterAccountPayloadType,
} from '../../../../../../../lib/typing';

export type StatusType = 'ACTIVE' | 'INACTIVE' | '';
export interface AccountRecordType {
  accountName: string;
  accountNo: string;
  accountType: string;
  status: StatusType;
  bankName: string;
  ifscCode: string;
  id: number;
}

export interface RemitterAccountsListRecordType extends AccountRecordType {
  createdDateTime?: string;
  updatedDateTime?: string;
  merchantId?: string | number;
  id: number;
}

export type SelectedRowType = RemitterAccountsListRecordType | null;

export interface TableConstantsType {
  selectedRow: SelectedRowType;
  setSelectedRow: React.Dispatch<React.SetStateAction<SelectedRowType>>;
  handleUpdateActionBtn: (rowData: RemitterAccountsListRecordType) => void;
}

type AddRemitterAccountStateType = {
  errorCode?: number | string;
  errorMessage?: string;
  isFailure: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  body?: any;
  successMessage?: string;
};

interface Props {
  remitterAccountsList: Array<SelectedRowType>;
  totalRecords: number;
  validationErrors: {
    SOMETHING_WENT_WRONG: string;
  };
  addRemitterAccountState: AddRemitterAccountStateType;
  updateRemitterAccountState: AddRemitterAccountStateType;
  remitterAccountsListAction: (data: {
    merchantId: string | number;
  }) => ActionsReturnType;
  clearRemitterAccountsListAction: () => {
    type: string;
  };
  clearAddRemitterAccountAction: () => {
    type: string;
  };
  clearUpdateRemitterAccountAction: () => {
    type: string;
  };
  updateRemitterAccountAction: (
    data: UpdateRemitterAccountPayloadType
  ) => ActionsReturnType;
}

export default Props;
