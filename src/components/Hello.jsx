import React from 'react';

import * as helpers from './helper';

class Hello extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'LWY',
    };
  }

  render() {
    console.log('###render!');
    const { name } = this.state;
    const v1 = helpers.add(1, 2);
    const v2 = helpers.minus(5, 1);
    return <h1>{`Hello world, ${name} ${v1} ${v2}!`}</h1>;
  }
}

export default Hello;
