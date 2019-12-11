import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

function AnonRoute({ component: Component, isLoggedin, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !isLoggedin ? <Redirect {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default withAuth(AnonRoute);
