import { call, put, takeLatest } from 'redux-saga/effects';

import { getValue } from '../../common/object';
import { APP } from '../../constants/enums';
import * as service from '../../services/auth';
import { setCookie } from '../../services/cookie';
import { setSessionData } from '../../services/session';
import * as actions from './actions';
import { ActionTypes, IAction } from './types';

function* doLogin(action: IAction) {
  try {
    const { email, password } = action.payload;
    const response = yield call(service.login, email, password);
    const { token } = response.data;

    yield call(setSessionData, token);
    yield put<IAction>(actions.loginSuccess(token));
  } catch (e) {
    const message = getValue(e, 'response.data.message') || e.toString();
    yield put<IAction>(actions.loginFail(message));
  }
}

function* doLogout(action: IAction) {
  yield call(setCookie, APP.COOKIE_NAME, '', 0);
}

function* loginSaga() {
  yield takeLatest(ActionTypes.LOGIN, doLogin);
}

function* logoutSaga() {
  yield takeLatest(ActionTypes.LOGOUT, doLogout);
}

export { loginSaga, logoutSaga };
