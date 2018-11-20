import { IState as IAuthState } from './Auth/types';
import { IState as ILoginPageState } from './LoginPage/types';
import { IState as IPaymentState } from './Payments/types';

export interface IReducers {
  payments: IPaymentState;
  loginPage: ILoginPageState;
  auth: IAuthState;
}
