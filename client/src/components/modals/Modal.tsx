import * as React from 'react';

import * as contentCss from './css/content.css';
import * as overlayCss from './css/overlay.css';

interface IProps {
  isOpen: boolean;
}

class Modal extends React.Component<IProps, {}> {
  public render() {
    if (this.props.isOpen) {
      return (
        <div className={overlayCss.overlay}>
          <div className={contentCss.content}>{this.props.children}</div>
        </div>
      );
    }

    return <div />;
  }
}

export default Modal;
