export const enum ActionTypes {}

export interface IAction {
  type: string;
  payload?: {};
  error?: boolean;
  meta?: any;
}

export interface IState {
  _?: string;
}

export interface IProps {
  match?: any;
  isLoggedIn: boolean;
}

export interface IDispatch {
  _?: string;
}
