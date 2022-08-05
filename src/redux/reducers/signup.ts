import actionConstants from '../constants/';

const signupState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  opCode: 0,
  message: '',
};

const initialState = {
  signupState: { ...signupState },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case actionConstants.POST_SIGN_UP_REQUEST:
      return {
        ...state,
        signupState: {
          ...state.signupState,
          isLoading: true,
          isSuccess: false,
          isFailure: false,
          opCode: 0,
          message: '',
        },
      };

    case actionConstants.POST_SIGN_UP_SUCCESS:
      return {
        ...state,
        signupState: {
          ...state.signupState,
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          opCode: action.payload.body.OpCode,
          message: action.payload.body.ResponseMsg,
        },
      };

    case actionConstants.POST_SIGN_UP_FAILURE:
      return {
        ...state,
        signupState: {
          ...state.signupState,
          isLoading: false,
          isSuccess: false,
          isFailure: true,
          opCode: action.payload.body.error_code,
          message: action.payload.body.error_message,
        },
      };

    case actionConstants.POST_SIGN_UP_CLEAR:
      return {
        ...state,
        signupState,
      };
    default:
      return state;
  }
}
