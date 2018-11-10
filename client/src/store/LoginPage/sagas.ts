import { call, put, takeLatest } from 'redux-saga/effects';

import { getValue } from '../../common/object';
import * as service from '../../services/auth';
import { ActionTypes, IAction } from './types';

function* doLogin(action: IAction) {
  try {
    const { email, password } = action.payload;

    const data = yield call(service.login, email, password);

    const { token } = data;

    // TODO call() to store token as cookie with expiry

    yield put<IAction>({
      payload: { token },
      type: ActionTypes.LOGIN_SUCCESS,
    });
  } catch (e) {
    const message = getValue(e, 'response.data.message') || e.toString();

    yield put<IAction>({
      payload: { message },
      type: ActionTypes.LOGIN_FAIL,
    });
  }
}

function* saga() {
  yield takeLatest(ActionTypes.LOGIN, doLogin);
}

export { saga };
