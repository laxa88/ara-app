import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route } from 'react-router-dom';
import * as Redux from 'redux';

import MenuItem from '../components/MenuItem';
import { getSessionData } from '../services/session';
import * as authActions from '../store/Auth/actions';
import { IDispatch } from '../store/Auth/types';
import { IProps } from '../store/Dashboard/types';
import { IReducers } from '../store/types';
import DetailsPage from './DetailsPage';
import PaymentsPage from './PaymentsPage';

export type Props = IProps & IDispatch;

class DashboardPage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { pathname } = window.location;

    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <ul>
          <li>
            <MenuItem
              to={`${this.props.match.url}/details`}
              pathname={pathname}
            >
              My Details
            </MenuItem>
          </li>
          <li>
            <MenuItem
              to={`${this.props.match.url}/payments`}
              pathname={pathname}
            >
              Payments
            </MenuItem>
          </li>
          <li>
            <MenuItem to="/" onClick={this.onClickLogout}>
              Logout
            </MenuItem>
          </li>
        </ul>

        <div>
          <Route
            exact={true}
            path={`${this.props.match.url}/details`}
            component={DetailsPage}
          />

          <Route
            exact={true}
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
  isLoggedIn: !!getSessionData(),
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): IDispatch => ({
  logout: () => dispatch(authActions.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);
