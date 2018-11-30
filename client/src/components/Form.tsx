import * as React from 'react';
import styled from '../css/styled';

export interface IProps {
  label: string;
}

const Label = styled.div`
  font-weight: bold;
`;

class Form extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { label, children, ...others } = this.props;

    return (
      <div>
        <Label {...others}>{label}</Label>
        {children}
      </div>
    );
  }
}

export default Form;
