import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';

import Button from '../components/Button';
import InputForm from '../components/InputForm';
import * as loginPageActions from '../store/LoginPage/actions';
import { IDispatch, IProps, IState } from '../store/LoginPage/types';

type Props = IProps & IDispatch;

export class LoginPage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div>
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
      </div>
    );
  }

  private onClickLogin = () => {
    this.props.login();
  }

  private onChangeEmail = (value: string) => {
    this.props.setEmail(value);
  }

  private onChangePassword = (value: string) => {
    this.props.setPassword(value);
  }
}

const mapStateToProps = (state: IState): IProps => ({
  email: state.email,
  password: state.password,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): IDispatch => ({
  login: () => dispatch(loginPageActions.login()),
  setEmail: (val: string) => dispatch(loginPageActions.setEmail(val)),
  setPassword: (val: string) => dispatch(loginPageActions.setPassword(val)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
