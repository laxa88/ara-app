import { ActionTypes, IAction, IState } from './types';

const defaultState: IState = {
  email: '',
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

    default:
      return state;
  }
}
