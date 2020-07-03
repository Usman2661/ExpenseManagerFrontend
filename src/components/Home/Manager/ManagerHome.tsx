import React from 'react';
import StatCardsAdmin from './StatCardsAdmin';
import PendingClaims from './PendingClaims';
import PieAndLineChart from './PieAndLineChart';

export default function ManagerHome() {
  return (
    <div>
      <StatCardsAdmin />
      <PieAndLineChart />
      <PendingClaims />
    </div>
  );
}
