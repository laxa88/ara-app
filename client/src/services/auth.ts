import axios from 'axios';

import * as paths from '../constants/paths';

const login = (email: string, password: string) => {
  const body = { email, password };
  return axios.post(`${paths.development.BASE_API_PATH}/v1/auth`, body);
};

export { login };
