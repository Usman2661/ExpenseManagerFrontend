import React, { Component, useContext } from 'react';
import { UserContext } from '../userContext';

export function Home() {
  const { userAuthData, setUserAuthData } = useContext(UserContext);
  return (
    <div>
      <h1> Welcome to the homepage {userAuthData.name} </h1>
    </div>
  );
}
