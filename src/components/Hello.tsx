import * as React from 'react';

import * as helpers from './helper';

interface Props {
  age: number;
}

interface State {
  name: string;
}

class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: 'LWY',
    };
  }

  render() {
    console.log('###render!');
    const v1 = helpers.add(1, 2);
    const v2 = helpers.minus(5, 1);
    return (
      <h1>
        {`Hello world, ${this.props.age} ${this.state.name} ${v1} ${v2}!`}
      </h1>
    );
  }
}

export default Hello;
