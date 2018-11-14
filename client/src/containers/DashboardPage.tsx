import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route } from 'react-router-dom';
import { getSessionData } from '../services/session';
import { IReducers } from '../store/types';
import DetailsPage from './DetailsPage';
import PaymentsPage from './PaymentsPage';

interface IProps {
  match?: any;
  sessionData: object;
}

class DashboardPage extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    if (!this.props.sessionData) {
      return <Redirect to="/" />;
    }

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

const mapStateToProps = (state: IReducers): IProps => ({
  sessionData: getSessionData(),
});

export default connect(mapStateToProps)(DashboardPage);
