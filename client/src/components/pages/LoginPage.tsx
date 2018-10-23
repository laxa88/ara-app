import * as React from 'react';

import Input from '../elements/Input';

class LoginPage extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Input type="email" placeholder="Input email here" />
        <Input placeholder="Input password here" />
      </div>
    );
  }
}

export default LoginPage;
