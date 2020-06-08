import React, { Component, useContext } from 'react';
import { UserContext } from '../userContext';

export function Home() {
  const { userAuthData, setUserAuthData } = useContext(UserContext);
  return (
    <div>
      <h1> Welcome to the homepage: {userAuthData.name} </h1>
      <h1> Email: {userAuthData.email} </h1>
      <h1> Access Level: {userAuthData.userType} </h1>
      <h1> ID: {userAuthData.id} </h1>
      <h1> Auth Status: {userAuthData.auth} </h1>
    </div>
  );
}
