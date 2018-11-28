import * as React from 'react';

import Input, { IInput } from './Input';

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
      <div>
        <div>{label}</div>
        <Input value={value} onChange={onChange} {...others} />
      </div>
    );
  }
}

export default InputForm;
