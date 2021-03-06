import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';

type ProtectedRouteProps = {
  component: any,
  exact: boolean,
  path: string,
  selectionHandler?: Function,
  otherProps?: any,

}

function ProtectedRoute({
  component: Component,
  exact,
  path,
  selectionHandler,
  ...otherCompProps
}: ProtectedRouteProps) {
  return (
    <Route
      exact
      path={path}
      render={(props: RouteProps) => (isAuthenticated() ? (
        <Component selectionHandler={selectionHandler} {...props} {...otherCompProps} />
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
