import { ActionTypes, IAction, IPayment } from './types';

export function getPayments(): IAction {
  return { type: ActionTypes.GET };
}

export function getPaymentsSuccess(payments: IPayment[]): IAction {
  return { type: ActionTypes.GET_SUCCESS, payload: { payments } };
}

export function getPaymentsFail(errorMessage: string): IAction {
  return { type: ActionTypes.GET_FAIL, payload: { errorMessage } };
}

export function addPayment(datePaid: string): IAction {
  return { type: ActionTypes.ADD, payload: { date_paid: datePaid } };
}

export function addPaymentSuccess(): IAction {
  return { type: ActionTypes.ADD_SUCCESS };
}

export function addPaymentFail(errorMessage: string): IAction {
  return { type: ActionTypes.ADD_FAIL, payload: { errorMessage } };
}

export function updatePayment(id: number, datePaid: string): IAction {
  return { type: ActionTypes.UPDATE, payload: { id, date_paid: datePaid } };
}

export function updatePaymentSuccess(): IAction {
  return { type: ActionTypes.UPDATE_SUCCESS };
}

export function updatePaymentFail(errorMessage: string): IAction {
  return { type: ActionTypes.UPDATE_FAIL, payload: { errorMessage } };
}

export function approvePayment(id: number, approved: boolean): IAction {
  return { type: ActionTypes.APPROVE, payload: { id, approved } };
}

export function approvePaymentSuccess(): IAction {
  return { type: ActionTypes.APPROVE_SUCCESS };
}

export function approvePaymentFail(errorMessage: string): IAction {
  return { type: ActionTypes.APPROVE_FAIL, payload: { errorMessage } };
}
