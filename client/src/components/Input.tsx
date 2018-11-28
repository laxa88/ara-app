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

export interface IInput {
  autoComplete?: string;
  disabled?: boolean;
  onChange: (newValue: string, prevValue: string) => void;
  placeholder?: string;
  type?: string;
  value: string;
}

class Input extends React.PureComponent<IInput, {}> {
  constructor(props: IInput) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  public render() {
    const { onChange, ...others } = this.props;

    return (
      <div>
        <StyledInput onChange={this.onChange} {...others} />
      </div>
    );
  }

  private onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value: newValue } = e.currentTarget;
    const { value: prevValue } = this.props;
    this.props.onChange(newValue, prevValue);
  }
}

export default Input;
