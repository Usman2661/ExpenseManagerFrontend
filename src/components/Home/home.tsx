import React, { Component, useContext } from 'react';
import { UserContext } from '../../userContext';
import StatCards from './Staff/StatCards';
import ExpenseList from './Staff/ExpenseList';
import AdminHome from './Admin/AdminHome';

export function Home() {
  const { userAuthData, setUserAuthData } = useContext(UserContext);

  return (
    <div>
      {userAuthData.userType === 'Staff' ? (
        <div>
          <StatCards /> <ExpenseList />{' '}
        </div>
      ) : null}

      {userAuthData.userType === 'Admin' ? (
        <div>
          <AdminHome />
        </div>
      ) : null}
    </div>
  );
}
