import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { UserContext } from '../userContext';

export interface IAdminPrivateRouteProps extends RouteProps {
  isAuth?: boolean; // is authenticate route
  redirectPath?: string; // redirect path if don't authenticate route
}

const AdminPrivateRoute: React.FC<IAdminPrivateRouteProps> = (props) => {
  const { userAuthData, setUserAuthData } = useContext(UserContext);

  return userAuthData.userType === 'Admin' ? (
    <Route {...props} component={props.component} render={undefined} />
  ) : (
    <Redirect to={{ pathname: props.redirectPath }} />
  );
};

export default AdminPrivateRoute;
