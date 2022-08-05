import {
  AddRemitterAccountPayloadType,
  UpdateRemitterAccountPayloadType,
  ActionsReturnType,
} from '../../../../../../../../lib/typing';
interface Props {
  cancelHandler: () => void;
  validationErrors: {
    SOMETHING_WENT_WRONG: string;
    REQUIRED_FIELD: string;
    BANK_NAME_MAX_LENGTH: string;
    ACCOUNT_NAME_MAX_LENGTH: string;
    ONLY_ALPHANUMERIC_ALLOWED: string;
    IFSC_CODE_MAX_LENGTH: string;
    ACCOUNT_NO_MAX_LENGTH: string;
    ONLY_ALPHABETS_ALLOWED: string;
    INVALID_IFSC_CODE: string;
    ACCOUNT_NO_MATCH_ERROR: string;
  };
  addRemitterAccountAction: (
    data: AddRemitterAccountPayloadType
  ) => ActionsReturnType;
  updateRemitterAccountAction: (
    data: UpdateRemitterAccountPayloadType
  ) => ActionsReturnType;
}

export default Props;
