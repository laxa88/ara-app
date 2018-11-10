import { ActionTypes, IAction, IState } from './types';

const defaultState: IState = {
  email: '',
  errorMessage: '',
  isLoading: false,
  password: '',
};

export function loginPage(
  state: IState = defaultState,
  action: IAction,
): IState {
  switch (action.type) {
    case ActionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.payload.email,
      };

    case ActionTypes.SET_PASSWORD:
      return {
        ...state,
        password: action.payload.password,
      };

    case ActionTypes.LOGIN:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case ActionTypes.LOGIN_FAIL:
      return {
        ...state,
        errorMessage: action.payload.message,
        isLoading: false,
      };

    default:
      return state;
  }
}
