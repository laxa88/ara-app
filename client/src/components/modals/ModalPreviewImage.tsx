import * as React from 'react';

import Button from '../Button';
import Modal from './Modal';

import * as previewImageCss from './css/preview-image.css';

interface IProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

class ModalPreviewImage extends React.PureComponent<IProps, {}> {
  public render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Button onClick={this.props.onClose}>Close</Button>
        <img className={previewImageCss.image} src={this.props.imageUrl} />
      </Modal>
    );
  }
}

export default ModalPreviewImage;
