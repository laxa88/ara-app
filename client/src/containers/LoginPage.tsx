import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Redux from 'redux';

import Button from '../components/Button';
import InputForm from '../components/InputForm';
import styled from '../css/styled';
import { getSessionData } from '../services/session';
import * as authActions from '../store/Auth/actions';
import {
  IDispatch as IAuthDispatch,
  IProps as IAuthProps,
} from '../store/Auth/types';
import * as loginPageActions from '../store/LoginPage/actions';
import {
  IDispatch as ILoginPageDispatch,
  IProps,
} from '../store/LoginPage/types';
import { IReducers } from '../store/types';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  margin: 15px 0;
  max-width: 600px;
`;

const ErrorMessage = styled.div`
  font-size: 18px;
  color: red;
`;

export type Dispatch = ILoginPageDispatch & IAuthDispatch;
export type Props = IProps & IAuthProps;
export type ClassProps = Props & Dispatch;

export class LoginPage extends React.Component<ClassProps, {}> {
  constructor(props: ClassProps) {
    super(props);
  }

  public render() {
    // BUG: Because there is no redux-hydrate yet, if you
    // refresh the page, the isLoggedIn state will always reset.

    const { email, password, isLoading, errorMessage } = this.props;

    if (this.props.isLoggedIn) {
      return <Redirect to="/dashboard/payments" />;
    }

    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <InputForm
            disabled={isLoading}
            autoComplete="email"
            label="Email"
            type="email"
            value={email}
            placeholder="Input email here"
            onChange={this.onChangeEmail}
          />

          <InputForm
            disabled={isLoading}
            autoComplete="password"
            label="Password"
            value={password}
            type="password"
            placeholder="Input password here"
            onChange={this.onChangePassword}
          />

          <ErrorMessage>{errorMessage}</ErrorMessage>

          <Button disabled={isLoading} onClick={this.onClickLogin}>
            Login
          </Button>
        </Form>
      </Container>
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

const mapStateToProps = (state: IReducers): Props => ({
  email: state.loginPage.email,
  errorMessage: state.auth.errorMessage,
  isLoading: state.auth.isLoading,
  isLoggedIn: state.auth.isLoggedIn,
  password: state.loginPage.password,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): Dispatch => ({
  login: (e: string, p: string) => dispatch(authActions.login(e, p)),
  setEmail: (v: string) => dispatch(loginPageActions.setEmail(v)),
  setPassword: (v: string) => dispatch(loginPageActions.setPassword(v)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
