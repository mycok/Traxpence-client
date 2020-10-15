import React from "react";
import { Route, Switch } from "react-router-dom";

import Signup from './components/user/Signup';
import Signin from './components/auth/Signin';
import Home from './components/Home';
import NewExpense from './components/expenses/NewExpense';
import Expenses from './components/expenses';
import Profile from "./components/profile/Profile";
import EditExpense from './components/expenses/EditExpense';
import ExpAvgByCategory from './components/expenses/summaries/ExpAvgByCategory';
import Charts from './components/expenses/charts'

function AppRouter() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/new-expense" component={NewExpense}/>
                <Route exact path="/expenses" component={Expenses}/>
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/edit-expense" component={EditExpense} />
                <Route exact path="/exps-avg-by-category" component={ExpAvgByCategory} />
                <Route exact path="/reports" component={Charts} />
            </Switch>
        </>
    )
}

export default AppRouter;
