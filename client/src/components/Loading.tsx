import * as React from 'react';
import styled from '../css/styled';

const StyledDiv = styled.div`
  text-align: center;
  padding: 20px;
`;

class Loading extends React.PureComponent<{}, {}> {
  public render() {
    return <StyledDiv {...this.props} />;
  }
}

export default Loading;
