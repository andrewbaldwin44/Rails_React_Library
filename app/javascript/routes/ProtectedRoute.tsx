import { Route, Redirect } from 'react-router-dom';

import { useSelector } from 'redux/hooks';

function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector(({ user }) => user);

  const getRouteComponent = props => {
    if (user.email) {
      return <Component {...props} />;
    } else {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              from: props.location,
            },
          }}
        />
      );
    }
  };

  return <Route {...rest} render={getRouteComponent} />;
}

export default ProtectedRoute;
