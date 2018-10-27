import * as React from 'react';

import InputForm from '../components/InputForm';

interface IState {
  email: string;
  password: string;
}

class LoginPage extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  public render() {
    return (
      <div>
        <InputForm
          label="Email"
          type="email"
          value={this.state.email}
          placeholder="Input email here"
          onChange={this.onChangeEmail}
        />
        <InputForm
          label="Password"
          value={this.state.password}
          type="password"
          placeholder="Input password here"
          onChange={this.onChangePassword}
        />
      </div>
    );
  }

  private onChangeEmail(value: string, prevValue: string) {
    this.setState({ email: value });
  }

  private onChangePassword(value: string, prevValue: string) {
    this.setState({ password: value });
  }
}

export default LoginPage;
