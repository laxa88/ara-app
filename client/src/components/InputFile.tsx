import * as React from 'react';
import styled from '../css/styled';

const StyledInput = styled.input`
  padding: 10px 20px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  margin: 15px 0;
  outline: none;
`;

const Warning = styled.div`
  color: red;
`;

const fileLimit = 5;

export interface IProps {
  onLoadedFiles: (files: File[], dataUrls: string[]) => void;
  accept: string;
}

interface IState {
  limitReached: boolean;
}

class FileForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      limitReached: false,
    };
  }

  public render() {
    const { onLoadedFiles, ...others } = this.props;

    const warning = this.state.limitReached ? (
      <Warning>Cannot upload more than {fileLimit} files</Warning>
    ) : (
      undefined
    );

    return (
      <div>
        <StyledInput
          type="file"
          multiple={true}
          onChange={this.handleOnChangeFiles}
          {...others}
        />

        {warning}
      </div>
    );
  }

  private handleOnChangeFiles = (e: React.FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;

    if (files.length > fileLimit) {
      this.setState({ limitReached: true });
      return;
    }

    this.setState({ limitReached: false });

    const loadedDataUrls: string[] = [];
    const loadedFiles: File[] = [];
    let loadedCount = 0;

    const readFile = (file: File) => {
      const reader = new FileReader();

      reader.onload = () => {
        loadedDataUrls.push(reader.result.toString());
        loadedFiles.push(file);

        loadedCount += 1;

        if (loadedCount >= files.length) {
          this.props.onLoadedFiles(loadedFiles, loadedDataUrls);
        }
      };

      reader.readAsDataURL(file);
    };

    for (let i = 0; i < files.length; i += 1) {
      readFile(files.item(i));
    }
  };
}

export default FileForm;
