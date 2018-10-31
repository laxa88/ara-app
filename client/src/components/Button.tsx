import * as React from 'react';
import styled from '../css/styled';

const StyledButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

class Button extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <div>
        <StyledButton {...this.props} />
      </div>
    );
  }
}

export default Button;
