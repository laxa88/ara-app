import { IState as authState } from './Auth/types';
import { IState as loginPageState } from './LoginPage/types';

export interface IReducers {
  loginPage: loginPageState;
  auth: authState;
}
