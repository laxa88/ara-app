import * as React from 'react';

import Form from './Form';
import Input, { IProps as IInput } from './Input';

export interface IProps extends IInput {
  label: string;
}

class InputForm extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { label, value, onChange, ...others } = this.props;

    return (
      <Form label={label}>
        <Input value={value} onChange={onChange} {...others} />
      </Form>
    );
  }
}

export default InputForm;
