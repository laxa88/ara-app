import { IState as IAuthState } from './Auth/types';
import { IState as ILoginPageState } from './LoginPage/types';

export interface IReducers {
  loginPage: ILoginPageState;
  auth: IAuthState;
}
