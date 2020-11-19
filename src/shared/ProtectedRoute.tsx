import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';

type ProtectedRouteProps = {
  component: any,
  exact: boolean,
  path: string
}

function ProtectedRoute({ component: Component, ...otherProps }: ProtectedRouteProps) {
  return (
    <Route
      {...otherProps}
      render={(props: RouteProps) => (isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/auth/signin',
            state: { from: props.location },
          }}
        />
      ))}
    />
  );
}

export default ProtectedRoute;
