import * as React from 'react';
import styled from '../css/styled';

const StyledButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

interface IProps {
  onClick: () => void;
}

class Button extends React.PureComponent<IProps, {}> {
  public render() {
    return <StyledButton {...this.props} />;
  }
}

export default Button;
