import { ActionTypes } from './types';

export function setEmail(email: string) {
  return { type: ActionTypes.SET_EMAIL, payload: { email } };
}

export function setPassword(password: string) {
  return { type: ActionTypes.SET_PASSWORD, payload: { password } };
}

export function login() {
  return { type: ActionTypes.LOGIN };
}
