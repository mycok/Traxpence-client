import React from "react";
import { Route, Switch } from "react-router-dom";

import Signup from './components/user/Signup';
import Signin from './components/auth/Signin';
import Home from './pages/Home';
import NewExpense from './pages/expenses/NewExpense';
import Expenses from './pages/expenses';


function AppRouter() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/new-expense" component={NewExpense}/>
                <Route exact path="/expenses" component={Expenses}/>
            </Switch>
        </>
    )
}

export default AppRouter;
