import * as React from 'react';
import styled from '../css/styled';

const StyledButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: greenyellow;
  width: 100%;
  border: none;
  outline: none;

  &:hover {
    background-color: #c4ff65;
    cursor: pointer;
  }
`;

interface IProps {
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

class Button extends React.PureComponent<IProps, {}> {
  public render() {
    return <StyledButton {...this.props} />;
  }
}

export default Button;
