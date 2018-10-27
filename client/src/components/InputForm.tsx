import * as React from 'react';
import styled from '../css/styled';

import Input, { IInput } from './Input';

const Label = styled.label`
  color: red;
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
      <form>
        <Label>{label}</Label>
        <Input value={value} onChange={onChange} {...others} />
      </form>
    );
  }
}

export default InputForm;
