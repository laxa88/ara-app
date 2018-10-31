import * as React from 'react';
import styled from '../css/styled';

const StyledInput = styled.input`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

export interface IInput {
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (newValue: string, prevValue: string) => void;
}

class Input extends React.PureComponent<IInput, {}> {
  constructor(props: IInput) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  public render() {
    const { value, placeholder, onChange, ...others } = this.props;

    return (
      <div>
        <StyledInput
          value={value}
          placeholder={placeholder}
          onChange={this.onChange}
          {...others}
        />
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
