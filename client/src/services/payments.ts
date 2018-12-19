import axios from 'axios';

import * as paths from '../constants/paths';
import { buildHeaders, getAuthHeader, getContentType } from './headers';

export function getPayments() {
  const config = { headers: getAuthHeader() };

  return axios.get(`${paths.development.BASE_API_PATH}/v1/payments`, config);
}

export function addPayment(
  amount: number,
  remarks: string,
  attachments: any[],
) {
  // const data = { amount, remarks, files: attachments };

  const config = buildHeaders(
    getAuthHeader(),
    getContentType('multipart/form-data'),
  );

  const data = new FormData();

  data.append('amount', `${amount}`);
  data.append('remarks', remarks);

  for (const file of attachments) {
    data.append('files', file);
  }

  return axios.post(
    `${paths.development.BASE_API_PATH}/v1/payments`,
    data,
    config,
  );
}

export function updatePayment(id: number, amount: number, remarks: string) {
  const data = { amount, remarks };
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
