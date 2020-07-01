import React from 'react';
import StatCardsAdmin from './StatCardsAdmin';
import PendingClaims from './PendingClaims';

export default function ManagerHome() {
  return (
    <div>
      <StatCardsAdmin />
      <PendingClaims />
    </div>
  );
}
