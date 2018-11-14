import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route } from 'react-router-dom';
import * as Redux from 'redux';

import { getSessionData } from '../services/session';
import * as authActions from '../store/Auth/actions';
import { IDispatch } from '../store/Auth/types';
import { IProps } from '../store/DashboardPage/types';
import { IReducers } from '../store/types';
import DetailsPage from './DetailsPage';
import PaymentsPage from './PaymentsPage';

export type Props = IProps & IDispatch;

class DashboardPage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    if (!this.props.isLoggedIn) {
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
          <li>
            <button onClick={this.onClickLogout}>Logout</button>
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

  private onClickLogout = () => {
    this.props.logout();
  }
}

const mapStateToProps = (state: IReducers): IProps => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): IDispatch => ({
  logout: () => dispatch(authActions.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);
