import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from '../css/styled';

export interface IProps {
  to: string;
  pathname?: string;
  onClick?: () => void;
}

const Div = styled<IProps, 'div'>('div')`
  font-size: 18px;
  font-family: sans-serif;
  font-weight: ${props => (props.to === props.pathname ? '600' : '')};
`;

class MenuItem extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { to, ...others } = this.props;

    return (
      <Link to={to}>
        <Div to={to} {...others} />
      </Link>
    );
  }
}

export default MenuItem;
