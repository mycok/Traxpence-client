import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';

type ProtectedRouteProps = {
  component: any,
  exact: boolean,
  path: string

}

function ProtectedRoute({
  component: Component,
  exact,
  path,
  ...otherCompProps
}: ProtectedRouteProps) {
  return (
    <Route
      exact
      path={path}
      render={(props: RouteProps) => (isAuthenticated() ? (
        <Component {...props} {...otherCompProps} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      ))}
    />
  );
}

export default ProtectedRoute;
