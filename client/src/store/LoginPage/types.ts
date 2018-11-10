export const enum ActionTypes {
  SET_EMAIL = 'LOGIN_PAGE/SET_EMAIL',
  SET_PASSWORD = 'LOGIN_PAGE/SET_PASSWORD',
  LOGIN = 'LOGIN_PAGE/LOGIN',
  LOGIN_SUCCESS = 'LOGIN_PAGE/LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_PAGE/LOGIN_FAIL',
}

export interface IPayload {
  email?: string;
  password?: string;
  message?: string;
  token?: string;
}

export interface IAction {
  type: string;
  payload?: IPayload;
  error?: boolean;
  meta?: any;
}

export interface IState {
  email: string;
  password: string;
  isLoading: boolean;
  errorMessage: string;
}

export interface IProps {
  email: string;
  password: string;
}

export interface IDispatch {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: (email: string, password: string) => void;
}
