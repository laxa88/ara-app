import axios from 'axios';

import { APP } from '../constants/enums';
import * as paths from '../constants/paths';
import { getCookie } from './cookie';
import { getAuthHeader } from './headers';

export function getPayments() {
  const config = { headers: getAuthHeader() };

  return axios.get(`${paths.development.BASE_API_PATH}/v1/payments`, config);
}

export function addPayment(datePaid: string) {
  const data = { date_paid: datePaid };
  const config = { headers: getAuthHeader() };

  return axios.post(
    `${paths.development.BASE_API_PATH}/v1/payments`,
    data,
    config,
  );
}

export function updatePayment(id: number, datePaid: string) {
  const data = { date_paid: datePaid };
  const config = { headers: getAuthHeader() };

  return axios.put(
    `${paths.development.BASE_API_PATH}/v1/payments/${id}`,
    data,
    config,
  );
}

export function approvePayment(id: number, approved: boolean) {
  const data = { approved };
  const config = { headers: getAuthHeader() };

  return axios.put(
    `${paths.development.BASE_API_PATH}/v1/payments/${id}/approve`,
    data,
    config,
  );
}
