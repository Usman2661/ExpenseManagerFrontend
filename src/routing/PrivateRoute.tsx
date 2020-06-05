import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { UserContext } from '../userContext';

export interface IPrivateRouteProps extends RouteProps {
  isAuth?: boolean; // is authenticate route
  redirectPath?: string; // redirect path if don't authenticate route
}

const PrivateRoute: React.FC<IPrivateRouteProps> = (props) => {
  const { userAuthData, setUserAuthData } = useContext(UserContext);

  return userAuthData.auth ? (
    <Route {...props} component={props.component} render={undefined} />
  ) : (
    <Redirect to={{ pathname: props.redirectPath }} />
  );
};

export default PrivateRoute;
