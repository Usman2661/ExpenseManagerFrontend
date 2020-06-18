import React, { Component, useContext } from 'react';
import { UserContext } from '../../userContext';
import StatCards from './Staff/StatCards';
import ExpenseList from './Staff/ExpenseList';

export function Home() {
  const { userAuthData, setUserAuthData } = useContext(UserContext);

  return (
    <div>
      {userAuthData.userType === 'Staff' ? (
        <div>
          <StatCards /> <ExpenseList />{' '}
        </div>
      ) : null}
    </div>
  );
}
