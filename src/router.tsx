import React from "react";
import { Route, Switch } from "react-router-dom";

import Signup from './pages/user/Signup';
import Signin from './pages/auth/Signin';
import Home from './pages/Home';

function AppRouter() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
            </Switch>
        </>
    )
}

export default AppRouter;
