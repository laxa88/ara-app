import * as React from 'react';
import styled from '../css/styled';

import Input, { IInput } from './Input';

const Label = styled.label`
  font-size: 18px;
  font-family: sans-serif;
`;

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
        <Label>{label}</Label>
        <Input value={value} onChange={onChange} {...others} />
      </div>
    );
  }
}

export default InputForm;
