import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { UserContext } from '../userContext';

export interface IManagerPrivateRouteProps extends RouteProps {
  isAuth?: boolean; // is authenticate route
  redirectPath?: string; // redirect path if don't authenticate route
}

const ManagerPrivateRoute: React.FC<IManagerPrivateRouteProps> = (props) => {
  const { userAuthData, setUserAuthData } = useContext(UserContext);

  return userAuthData.auth ? (
    <Route {...props} component={props.component} render={undefined} />
  ) : (
    <Redirect to={{ pathname: props.redirectPath }} />
  );
};

export default ManagerPrivateRoute;
