import * as React from 'react';
import styled from '../css/styled';

interface IInput {
  isActive: boolean;
}

interface IInput2 {
  primary: boolean;
}

const Input = styled<IInput, 'input'>('input')`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${props => props.theme.primaryColor};
  border: 2px solid
    ${props =>
      props.isActive
        ? props.theme.primaryColor
        : props.theme.primaryColorInverted};
`;

const Input2 = styled<IInput2, 'input'>('input')`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${props => props.theme.primaryColorInverted};
  border: 2px solid ${props => (props.primary ? 'blue' : 'yellow')};
`;

Input.defaultProps = {
  theme: {
    primaryColor: 'palevioletred',
    primaryColorInverted: 'green',
  },
};

Input2.defaultProps = {
  theme: {
    primaryColor: 'palevioletred',
    primaryColorInverted: 'green',
  },
};

interface IProps {
  isActive: boolean;
  placeholder: string;
  type?: string;
}

interface IState {
  value: string;
}

class InputBase extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      value: '',
    };
  }

  public onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: e.currentTarget.value });
  }

  public render() {
    const { placeholder, ...others } = this.props;

    return (
      <div>
        <Input
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.onChange}
          {...others}
        />
        <Input2 primary={this.props.isActive} />
      </div>
    );
  }
}

export default InputBase;
