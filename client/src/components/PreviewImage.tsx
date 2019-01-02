import * as React from 'react';

import Button from './Button';
import * as css from './PreviewImage.css';

interface IProps {
  key?: string;
  onRemove?: () => void;
  src: string;
}

class PreviewImage extends React.Component<IProps, {}> {
  public render() {
    const { src, onRemove, ...others } = this.props;

    const removeButton = onRemove ? (
      <Button onClick={this.handleOnClickRemove}>Remove</Button>
    ) : (
      undefined
    );

    return (
      <div className={css.image} {...others}>
        <img src={src} />
        {removeButton}
      </div>
    );
  }

  private handleOnClickRemove = () => {
    this.props.onRemove();
  }
}

export default PreviewImage;
