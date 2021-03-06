import * as React from 'react';
import styled from '../css/styled';

const StyledDiv = styled.div`
  text-align: center;
  padding: 20px;
  color: red;
`;

class Error extends React.PureComponent<{}, {}> {
  public render() {
    return <StyledDiv {...this.props} />;
  }
}

export default Error;
