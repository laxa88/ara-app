import * as React from 'react';

interface IProps {
  placeholder: string;
  type?: string;
}

interface IState {
  value: string;
}

class Input extends React.Component<IProps, IState> {
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
      <input
        placeholder={placeholder}
        value={this.state.value}
        onChange={this.onChange}
        {...others}
      />
    );
  }
}

export default Input;
