export const enum ActionTypes {
  SET_EMAIL = 'LOGIN_PAGE/SET_EMAIL',
  SET_PASSWORD = 'LOGIN_PAGE/SET_PASSWORD',
}

export interface IAction {
  type: string;
  payload?: {
    email?: string;
    password?: string;
  };
  error?: boolean;
  meta?: any;
}

export interface IState {
  email: string;
  password: string;
}

export interface IProps {
  email: string;
  password: string;
}

export interface IDispatch {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}
