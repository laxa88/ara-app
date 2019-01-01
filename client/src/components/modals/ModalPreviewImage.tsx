import * as React from 'react';

import Button from '../Button';
import Modal from './Modal';

import * as css from './ModalPreviewImage.css';

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
        <img className={css.image} src={this.props.imageUrl} />
      </Modal>
    );
  }
}

export default ModalPreviewImage;
