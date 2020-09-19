import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { AuthenticationContext } from '../components/AuthenticationContext';
import { isContainingData } from '../utils/index';

function ProtectedRoute({ component: Component, ...rest }) {
  const {
    userData,
  } = useContext(AuthenticationContext);

  const getRouteComponent = props => {
    if (isContainingData(userData)) {
      return (<Component {...props} />);
    }
    else {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              from: props.location
            }
          }}
        />
      )
    }
  }

  if (!userData) {
    return (
      <div>
          Loading...
      </div>
    )
  }
  else {
    return (
      <Route
        {...rest}
        render={getRouteComponent}
      />
    )
  }
}

export default ProtectedRoute;
