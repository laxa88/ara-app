import * as React from 'react';
import { getMonth } from '../../common/date';
import styled from '../../css/styled';
import Button from '../Button';
import InputFileForm from '../InputFileForm';
import InputForm from '../InputForm';
import Modal from './Modal';

const Header = styled.h2`
  margin: 0 10px 20px;
  text-align: center;
`;

const PreviewContainer = styled.div`
  display: block;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 150px;
  object-fit: contain;
  display: block;
  padding: 10px;
  box-sizing: border-box;
  background-color: #eee;
  border-radius: 5px;
  margin-bottom: 10px;
`;

interface IProps {
  onClickConfirm: (datePaid: string, attachments: any) => void;
  onClickCancel: () => void;
}

interface IState {
  datePaid: string;
  previews: string[];
  attachments: File[];
}

class ModalPayment extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      attachments: [],
      datePaid: getMonth(),
      previews: [],
    };
  }

  public render() {
    const disabled = !(this.state.datePaid && this.state.previews.length);

    return (
      <Modal>
        <Header>New payment</Header>

        <InputForm
          label="Date paid"
          value={this.state.datePaid}
          onChange={this.handleOnChangeDatePaid}
          type="month"
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

  private handleOnChangeDatePaid = (value: string) => {
    this.setState({ datePaid: value });
  }

  private handleOnLoadedFiles = (files: File[], dataUrls: string[]) => {
    this.setState({ previews: dataUrls, attachments: files });
  }

  private handleOnClickConfirm = () => {
    const { datePaid, attachments } = this.state;

    this.props.onClickConfirm(datePaid, attachments);
  }

  private handleOnClickCancel = () => {
    this.props.onClickCancel();
  }
}

export default ModalPayment;
