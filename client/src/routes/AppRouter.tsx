import * as React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Dashboard from '../containers/Dashboard';
import LoginPage from '../containers/LoginPage';

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact={true} component={LoginPage} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </Router>
);

export default AppRouter;
