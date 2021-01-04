import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Signup from './components/user/Signup';
import Signin from './components/auth/Signin';
import Home from './components/Home';
import NewExpense from './components/expenses/NewExpense';
import Expenses from './components/expenses';
import Profile from './components/profile/Profile';
import EditExpense from './components/expenses/EditExpense';
import ExpAvgByCategory from './components/expenses/summaries/ExpAvgByCategory';
import MonthlyExpScatterPlot from './components/expenses/charts/ScatterPlot';
import AnnualTotalExpByMonth from './components/expenses/charts/BarGraph';
import AvgExpByCategory from './components/expenses/charts/PieGraph';
import ProtectedRoute from './shared/ProtectedRoute';
import { isAuthenticated } from './api/auth';

function AppRouter() {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (isAuthenticated() ? <Expenses /> : <Home {...props} />)}
        />
        <Route
          exact
          path="/signup"
          render={(props) => <Signup elevation={5} {...props} />}
        />
        <Route
          exact
          path="/signin"
          render={(props) => <Signin elevation={5} {...props} />}
        />
        <ProtectedRoute exact path="/new-expense" component={NewExpense} />
        <ProtectedRoute exact path="/expenses" component={Expenses} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/edit-expense" component={EditExpense} />
        <ProtectedRoute exact path="/exps-avg-by-category" component={ExpAvgByCategory} />
        <ProtectedRoute exact path="/scatter-graph-chart" component={MonthlyExpScatterPlot} />
        <ProtectedRoute exact path="/bar-graph-chart" component={AnnualTotalExpByMonth} />
        <ProtectedRoute exact path="/pie-graph-chart" component={AvgExpByCategory} />
      </Switch>
    </>
  );
}

export default AppRouter;
