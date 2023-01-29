import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

import { useSelector } from 'redux/hooks';

interface IProtectedRoute {
  component: React.ElementType;
  path: string;
  exact: boolean;
}

function ProtectedRoute({ component: Component, ...rest }: IProtectedRoute) {
  const user = useSelector(({ user }) => user);

  const getRouteComponent = (props: RouteComponentProps) => {
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
