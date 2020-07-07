import React from 'react';
import ReactApexChart from 'react-apexcharts';
import '../../css/PieBarCharts.css';

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
    <div className='pieChartContainer'>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type='donut'
        height={'100%'}
      />
    </div>
  );
}
