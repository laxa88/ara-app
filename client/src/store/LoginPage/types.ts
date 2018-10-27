export const enum ActionTypes {
  SET_EMAIL = 'LOGIN_PAGE/SET_EMAIL',
  SET_PASSWORD = 'LOGIN_PAGE/SET_PASSWORD',
}

export interface IState {
  email: string;
  password: string;
}

export interface IAction {
  type: string;
  payload?: any;
  error?: boolean;
  meta?: any;
}

export type IDispatch = (dispatch: IAction) => undefined;
