import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';

import Button from '../components/Button';
import InputForm from '../components/InputForm';
import * as loginPageActions from '../store/LoginPage/actions';
import { IDispatch, IProps } from '../store/LoginPage/types';
import { IReducers } from '../store/types';

type Props = IProps & IDispatch;

export class LoginPage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <form onSubmit={this.onSubmit}>
        <InputForm
          label="Email"
          type="email"
          value={this.props.email}
          placeholder="Input email here"
          onChange={this.onChangeEmail}
        />
        <InputForm
          label="Password"
          value={this.props.password}
          type="password"
          placeholder="Input password here"
          onChange={this.onChangePassword}
        />
        <Button onClick={this.onClickLogin}>Login</Button>
      </form>
    );
  }

  private onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.onClickLogin();
  }

  private onClickLogin = () => {
    const { email, password } = this.props;
    this.props.login(email, password);
  }

  private onChangeEmail = (value: string) => {
    this.props.setEmail(value);
  }

  private onChangePassword = (value: string) => {
    this.props.setPassword(value);
  }
}

const mapStateToProps = (state: IReducers): IProps => ({
  email: state.loginPage.email,
  password: state.loginPage.password,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): IDispatch => ({
  login: (e: string, p: string) => dispatch(loginPageActions.login(e, p)),
  setEmail: (v: string) => dispatch(loginPageActions.setEmail(v)),
  setPassword: (v: string) => dispatch(loginPageActions.setPassword(v)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
