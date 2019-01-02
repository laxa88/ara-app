import * as React from 'react';
import styled from '../../css/styled';
import Button from '../Button';
import InputFileForm from '../InputFileForm';
import InputForm from '../InputForm';
import PreviewImage from '../PreviewImage';
import Modal from './Modal';

import * as headerCss from './css/header.css';

const PreviewContainer = styled.div`
  display: block;
`;

interface IProps {
  onClickConfirm: (amount: number, remarks: string, attachments: any) => void;
  onClickCancel: () => void;
  isOpen: boolean;
}

interface IState {
  amount: number;
  attachments: File[];
  previews: string[];
  remarks: string;
}

class ModalPayment extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      amount: 0,
      attachments: [],
      previews: [],
      remarks: '',
    };
  }

  public render() {
    const disabled = !(this.state.amount && this.state.previews.length);

    return (
      <Modal isOpen={this.props.isOpen}>
        <h2 className={headerCss.header}>New payment</h2>

        <InputForm
          label="Amount"
          value={this.state.amount}
          onChange={this.handleOnChangeAmount}
        />

        <InputForm
          label="Remarks"
          value={this.state.remarks}
          onChange={this.handleOnChangeRemarks}
        />

        <div>
          <InputFileForm
            label="Attachments"
            onLoadedFiles={this.handleOnLoadedFiles}
            accept="image/*"
          />

          {this.renderAttachments()}
        </div>

        <div>
          <Button disabled={disabled} onClick={this.handleOnClickConfirm}>
            Add
          </Button>

          <Button onClick={this.handleOnClickCancel}>Cancel</Button>
        </div>
      </Modal>
    );
  }

  private renderAttachments = () => {
    const { previews } = this.state;

    const images = previews.map((dataUrl: string) => {
      const img = <PreviewImage key={dataUrl} src={dataUrl} />;
      return img;
    });

    return <PreviewContainer>{images}</PreviewContainer>;
  }

  private handleOnChangeAmount = (value: string) => {
    this.setState({ amount: +value });
  }

  private handleOnChangeRemarks = (value: string) => {
    this.setState({ remarks: value });
  }

  private handleOnLoadedFiles = (files: File[], dataUrls: string[]) => {
    this.setState({ previews: dataUrls, attachments: files });
  }

  private handleOnClickConfirm = () => {
    const { amount, remarks, attachments } = this.state;

    this.props.onClickConfirm(amount, remarks, attachments);
  }

  private handleOnClickCancel = () => {
    this.props.onClickCancel();
  }
}

export default ModalPayment;
