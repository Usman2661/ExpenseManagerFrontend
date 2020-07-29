import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface MixedChartProps {
  labels: String[];
  approvedData: Number[];
  rejectedData: Number[];
  pendingData: Number[];
}

export default function MixedChart(props: MixedChartProps) {
  const { labels, approvedData, rejectedData, pendingData } = props;
  const data = {
    series: [
      {
        name: 'Approved',
        type: 'bar',
        data: approvedData,
      },
      {
        name: 'Rejected',
        type: 'bar',
        data: rejectedData,
      },
      {
        name: 'Pending',
        type: 'line',
        data: pendingData,
      },
    ],
    options: {
      colors: ['#2ECC71', '#E74C3C', '#F39C12'],
      chart: {
        type: 'line',
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth',
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
        },
      },

      fill: {},
      labels: labels,
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'String',
      },
      yaxis: {
        title: {
          text: 'Amount',
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        colors: ['#F44336', '#E91E63', '#9C27B0'],
        y: {
          formatter: function (y: any) {
            if (typeof y !== 'undefined') {
              return '£' + y.toFixed(0);
            }
            return y;
          },
        },
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type='line'
        height={245}
      />
    </div>
  );
}
