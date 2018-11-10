import { ActionTypes, IAction } from './types';

export function setEmail(email: string): IAction {
  return { type: ActionTypes.SET_EMAIL, payload: { email } };
}

export function setPassword(password: string): IAction {
  return { type: ActionTypes.SET_PASSWORD, payload: { password } };
}

export function login(email: string, password: string): IAction {
  return { type: ActionTypes.LOGIN, payload: { email, password } };
}

export function loginSuccess(token: string): IAction {
  return { type: ActionTypes.LOGIN_SUCCESS, payload: { token } };
}

export function loginFail(message: string): IAction {
  return { type: ActionTypes.LOGIN_FAIL, payload: { message } };
}
