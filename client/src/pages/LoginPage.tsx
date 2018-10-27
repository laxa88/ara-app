import * as React from 'react';
import { connect } from 'react-redux';

import InputForm from '../components/InputForm';
import * as loginPageActions from '../store/LoginPage/actions';
import { IDispatch, IState } from '../store/LoginPage/types';

interface IDispatchMap {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

interface IProps extends IDispatchMap {
  email: string;
  password: string;
}

class LoginPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
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
      </div>
    );
  }

  private onChangeEmail(value: string) {
    this.props.setEmail(value);
  }

  private onChangePassword(value: string) {
    this.props.setPassword(value);
  }
}

const mapStateToProps = (state: IState): IProps => ({
  email: state.email,
  password: state.password,
  setEmail: () => undefined,
  setPassword: () => undefined,
});

const mapDispatchToProps = (dispatch: IDispatch): IDispatchMap => ({
  setEmail: (val: string) => dispatch(loginPageActions.setEmail(val)),
  setPassword: (val: string) => dispatch(loginPageActions.setPassword(val)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
