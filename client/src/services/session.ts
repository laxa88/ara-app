import { APP } from '../constants/enums';
import { getCookie, setCookie } from './cookie';

const decode = (token: string) => {
  if (typeof token !== 'string') {
    return null;
  }

  const tokenStrings = token.split('.');
  const tokenBody = tokenStrings[1];

  if (!tokenBody) {
    return null;
  }

  const data = atob(tokenBody);

  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

const getSessionData = () => {
  const token = getCookie(APP.COOKIE_NAME);
  const decodedToken = decode(token) || {};

  return decodedToken.data;
};

const setSessionData = (token: string) => {
  const tokenObject = decode(token);

  if (!tokenObject || !tokenObject.exp) {
    throw new Error('Unexpected invalid token in user session');
  }

  const currTimestampInSeconds = Math.floor(Date.now() / 1000);
  const expiryTimestampInSeconds = +tokenObject.exp;
  const timeout = expiryTimestampInSeconds - currTimestampInSeconds;

  setCookie(APP.COOKIE_NAME, token, timeout);
};

export { getSessionData, setSessionData };
