import { ActionTypes, IAction } from './types';

export function setEmail(email: string): IAction {
  return { type: ActionTypes.SET_EMAIL, payload: { email } };
}

export function setPassword(password: string): IAction {
  return { type: ActionTypes.SET_PASSWORD, payload: { password } };
}
