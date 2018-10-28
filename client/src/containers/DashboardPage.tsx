import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import DetailsPage from './DetailsPage';
import PaymentsPage from './PaymentsPage';

interface IProps {
  match: any;
}

class DashboardPage extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <ul>
          <li>
            <Link to={`${this.props.match.url}/details`}>My Details</Link>
          </li>
          <li>
            <Link to={`${this.props.match.url}/payments`}>Payments</Link>
          </li>
        </ul>

        <div>
          <Route
            path={`${this.props.match.url}/details`}
            component={DetailsPage}
          />
          <Route
            path={`${this.props.match.url}/payments`}
            component={PaymentsPage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => state;

export default connect(mapStateToProps)(DashboardPage);
