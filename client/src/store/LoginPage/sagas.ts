import { call, put, takeLatest } from 'redux-saga/effects';

import { getValue } from '../../common/object';
import * as service from '../../services/auth';
import { ActionTypes, IAction } from './types';

function* doLogin(action: IAction) {
  try {
    const { email, password } = action.payload;

    const data = yield call(service.login, email, password);

    if (data.token) {
      yield put<IAction>({
        payload: { token: data.token },
        type: ActionTypes.LOGIN_SUCCESS,
      });
    } else {
      throw new Error(data.toString());
    }
  } catch (e) {
    const message = getValue(e, 'response.data.message') || e;
    yield put<IAction>({
      payload: { message: message.toString() },
      type: ActionTypes.LOGIN_FAIL,
    });
  }
}

function* saga() {
  yield takeLatest(ActionTypes.LOGIN, doLogin);
}

export { saga };
