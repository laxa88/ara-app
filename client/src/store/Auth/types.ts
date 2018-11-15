export const enum ActionTypes {
  LOGIN = 'AUTH/LOGIN',
  LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS',
  LOGIN_FAIL = 'AUTH/LOGIN_FAIL',
  LOGOUT = 'AUTH/LOGOUT',
}

export interface IAction {
  type: string;
  payload?: {
    email?: string;
    password?: string;
    message?: string;
    token?: string;
  };
  error?: boolean;
  meta?: any;
}

export interface IState {
  isLoggedIn: boolean;
  isLoading: boolean;
  errorMessage: string;
}

export interface IProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  errorMessage: string;
}

export interface IDispatch {
  login?: (email: string, password: string) => void;
  logout?: () => void;
}
