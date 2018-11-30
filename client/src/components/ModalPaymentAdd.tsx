import * as React from 'react';
import styled from '../css/styled';
import Button from './Button';
import InputFileForm from './InputFileForm';
import InputForm from './InputForm';

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

const Modal = styled.div`
  background-color: white;
  width: 80%;
  max-width: 480px;
  border-radius: 5px;
  padding: 24px;
  margin: 24px;
  max-height: 80%;
  overflow: auto;
`;

const Header = styled.h2`
  margin: 10px;
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
  onClickAdd: (datePaid: string, attachments: any) => void;
}

interface IState {
  datePaid: string;
  previews: string[];
  attachments: File[];
}

class ModalPaymentAdd extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      attachments: [],
      datePaid: '',
      previews: [],
    };
  }

  public render() {
    const disabled = !this.state.datePaid;

    return (
      <Overlay>
        <Modal>
          <Header>Add new payment</Header>

          <InputForm
            label="Date paid"
            value={this.state.datePaid}
            onChange={this.handleOnChangeDatePaid}
            type="date"
          />

          <div>
            <InputFileForm
              label="Attachments"
              onLoadedFiles={this.handleOnLoadedFiles}
              accept="image/*"
            />

            {this.renderAttachments()}
          </div>

          <Button disabled={disabled} onClick={this.handleOnClickAdd}>
            Add
          </Button>
        </Modal>
      </Overlay>
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

  private handleOnClickAdd = () => {
    const { datePaid, attachments } = this.state;

    this.props.onClickAdd(datePaid, attachments);
  }
}

export default ModalPaymentAdd;
