import { getCookie } from './cookie';

import { APP } from '../constants/enums';

export const buildHeaders = (...headers: any[]) => {
  const result = headers.reduce(
    (acc, next) => Object.assign({}, acc, next),
    {},
  );

  return { headers: result };
};

export const getAuthHeader = () => ({
  authorization: `Bearer ${getCookie(APP.COOKIE_NAME)}`,
});

export const getContentType = (type: string) => ({
  'Content-Type': type,
});
