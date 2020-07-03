import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { UserContext } from '../userContext';

export interface IManagerOrSeniorPrivateRouteProps extends RouteProps {
  isAuth?: boolean; // is authenticate route
  redirectPath?: string; // redirect path if don't authenticate route
}

const ManagerOrSeniorPrivateRoute: React.FC<IManagerOrSeniorPrivateRouteProps> = (
  props
) => {
  const { userAuthData, setUserAuthData } = useContext(UserContext);

  return userAuthData.userType === 'SeniorManagement' ||
    userAuthData.userType === 'Manager' ? (
    <Route {...props} component={props.component} render={undefined} />
  ) : (
    <Redirect to={{ pathname: props.redirectPath }} />
  );
};

export default ManagerOrSeniorPrivateRoute;
