import * as React from 'react';
import Form from './Form';
import InputFile, { IProps as IInput } from './InputFile';

export interface IProps extends IInput {
  label: string;
}

class InputFileForm extends React.Component<IProps, {}> {
  public render() {
    const { label, ...others } = this.props;

    return (
      <Form label={label}>
        <InputFile {...others} />
      </Form>
    );
  }
}

export default InputFileForm;
