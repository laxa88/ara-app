import * as React from 'react';
import styled from '../css/styled';

const StyledButton = styled.button`
  font-size: 18px;
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #acfb2d;
  width: 100%;
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
