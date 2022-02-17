import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Signup from './components/user/Signup';
import Signin from './components/auth/Signin';
import Home from './components/Home';
import NewExpense from './components/expenses/NewExpense';
import Expenses from './components/expenses';
import Profile from './components/profile/Profile';
import EditExpense from './components/expenses/EditExpense';
import MonthlyExpAvgByCategory from './components/expenses/summaries/ExpAvgByCategory';
import Charts from './components/expenses/charts';
import ProtectedRoute from './shared/ProtectedRoute';
import { isAuthenticated } from './api/auth';

type AppRouterProps = {
  selectionHandler: React.Dispatch<React.SetStateAction<string>>
}

function AppRouter({ selectionHandler }: AppRouterProps) {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (isAuthenticated()
            ? <Profile selectionHandler={selectionHandler} />
            : <Home {...props} />)}
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
        <ProtectedRoute exact path="/expenses" selectionHandler={selectionHandler} component={Expenses} />
        <ProtectedRoute exact path="/profile" selectionHandler={selectionHandler} component={Profile} />
        <ProtectedRoute exact path="/edit-expense" component={EditExpense} />
        <ProtectedRoute exact path="/exps-avg-by-category" component={MonthlyExpAvgByCategory} />
        <ProtectedRoute exact path="/charts" component={Charts} />
      </Switch>
    </>
  );
}

export default AppRouter;
