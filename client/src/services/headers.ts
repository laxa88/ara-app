import { getCookie } from './cookie';

import { APP } from '../constants/enums';

export const getAuthHeader = () => ({
  authorization: `Bearer ${getCookie(APP.COOKIE_NAME)}`,
});
