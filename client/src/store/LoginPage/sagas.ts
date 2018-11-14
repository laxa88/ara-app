import { call, put, takeLatest } from 'redux-saga/effects';

import { getValue } from '../../common/object';
import * as service from '../../services/auth';
import { setSessionData } from '../../services/session';
import { ActionTypes, IAction } from './types';

const actionLoginSuccess = (token: string) => ({
  payload: { token },
  type: ActionTypes.LOGIN_SUCCESS,
});

const actionLoginFail = (message: string) => ({
  payload: { message },
  type: ActionTypes.LOGIN_FAIL,
});

function* doLogin(action: IAction) {
  try {
    const { email, password } = action.payload;
    const response = yield call(service.login, email, password);
    const { token } = response.data;

    yield call(setSessionData, token);
    yield put<IAction>(actionLoginSuccess(token));
  } catch (e) {
    const message = getValue(e, 'response.data.message') || e.toString();
    yield put<IAction>(actionLoginFail(message));
  }
}

function* saga() {
  yield takeLatest(ActionTypes.LOGIN, doLogin);
}

export { saga };
