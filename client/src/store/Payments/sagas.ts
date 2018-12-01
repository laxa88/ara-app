import { call, put, takeLatest } from 'redux-saga/effects';

import { getValue } from '../../common/object';
import * as service from '../../services/payments';
import * as actions from './actions';
import { ActionTypes, IAction } from './types';

function* getPayments() {
  try {
    const response = yield call(service.getPayments);
    yield put<IAction>(actions.getPaymentsSuccess(response.data));
  } catch (e) {
    const message = getValue(e, 'response.data.message') || e.toString();
    yield put<IAction>(actions.getPaymentsFail(message));
  }
}

function* addPayment(action: IAction) {
  try {
    const { date_paid } = action.payload;
    yield call(service.addPayment, date_paid);
    yield put<IAction>(actions.addPaymentSuccess());
    yield put<IAction>(actions.getPayments());
  } catch (e) {
    const message = getValue(e, 'response.data.message') || e.toString();
    yield put<IAction>(actions.addPaymentFail(message));
  }
}

function* updatePayment(action: IAction) {
  try {
    const { id, date_paid } = action.payload;
    yield call(service.updatePayment, id, date_paid);
    yield put<IAction>(actions.updatePaymentSuccess());
  } catch (e) {
    const message = getValue(e, 'response.data.message') || e.toString();
    yield put<IAction>(actions.updatePaymentFail(message));
  }
}

function* approvePayment(action: IAction) {
  try {
    const { id, approved } = action.payload;
    yield call(service.approvePayment, id, approved);
    yield put<IAction>(actions.approvePaymentSuccess());
  } catch (e) {
    const message = getValue(e, 'response.data.message') || e.toString();
    yield put<IAction>(actions.approvePaymentFail(message));
  }
}

function* getPaymentsSaga() {
  yield takeLatest(ActionTypes.GET, getPayments);
}

function* addPaymentSaga() {
  yield takeLatest(ActionTypes.ADD, addPayment);
}

function* updatePaymentSaga() {
  yield takeLatest(ActionTypes.UPDATE, updatePayment);
}

function* approvePaymentSaga() {
  yield takeLatest(ActionTypes.APPROVE, approvePayment);
}

export {
  getPaymentsSaga,
  addPaymentSaga,
  updatePaymentSaga,
  approvePaymentSaga,
};
