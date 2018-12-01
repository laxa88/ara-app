import * as React from 'react';
import styled from '../../css/styled';

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Content = styled.div`
  background-color: white;
  width: 80%;
  max-width: 480px;
  border-radius: 5px;
  padding: 24px;
  margin: 24px;
  max-height: 80%;
  overflow: auto;
`;

class Modal extends React.Component<{}, {}> {
  public render() {
    return (
      <Overlay>
        <Content>{this.props.children}</Content>
      </Overlay>
    );
  }
}

export default Modal;
