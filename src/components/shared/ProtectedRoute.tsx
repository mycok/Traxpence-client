import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../api/auth";

function ProtectedRoute({ component: Component, ...otherProps }) {
    return (
        <Route
            {...otherProps}
            render={(props) =>
                (isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/auth/signin",
                                state: { from: props.location }
                            }}
                        />
                    ))}
        />
    )
}

export default ProtectedRoute;