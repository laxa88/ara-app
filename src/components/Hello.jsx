import React from 'react';

class Hello extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'unknown',
    };
  }

  render() {
    const { name } = this.state;
    return (
      <h1>
        Hello world!
        {name}
      </h1>
    );
  }
}

export default Hello;
