import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

import { useSelector } from 'redux/hooks';

interface IProtectedRoute {
  component: React.ElementType;
  path: string;
  exact: boolean;
}

function ProtectedRoute({ component: Component, ...rest }: IProtectedRoute) {
  const user = useSelector(({ user: { email } }) => email);

  const getRouteComponent = (props: RouteComponentProps) => {
    if (user) {
      return <Component {...props} />;
    }

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
  };

  return <Route {...rest} render={getRouteComponent} />;
}

export default ProtectedRoute;
