import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface PieChartProps {
  labels: String[];
  series: Number[];
}

export default function Pie(props: PieChartProps) {
  const { labels, series } = props;

  const data = {
    series: series,
    options: {
      labels: labels,
      chart: {
        type: 'donut',
      },
    },
  };
  return (
    <div>
      {labels.length > 0 ? (
        <ReactApexChart
          options={data.options}
          series={data.series}
          type='donut'
        />
      ) : null}
    </div>
  );
}
