import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { UserContext } from '../userContext';

export interface IPublicRoute extends RouteProps {
  isAuth?: boolean; // is authenticate route
  redirectPath?: string; // redirect path if don't authenticate route
}

const PublicRoute: React.FC<IPublicRoute> = (props) => {
  const { userAuthData, setUserAuthData } = useContext(UserContext);

  return userAuthData.auth ? (
    <Redirect to={{ pathname: props.redirectPath }} />
  ) : (
    <Route {...props} component={props.component} render={undefined} />
  );
};

export default PublicRoute;
