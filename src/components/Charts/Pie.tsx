import React from 'react';

interface PieChartProps {
  labels?: String[];
  series?: Number[];
}

export default function PieGraph(props: PieChartProps) {
  const { labels, series } = props;

  return <div></div>;
}
