import * as React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import DashboardPage from '../containers/DashboardPage';
import LoginPage from '../containers/LoginPage';

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact={true} component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />
    </div>
  </Router>
);

export default AppRouter;
