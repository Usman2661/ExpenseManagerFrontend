import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function MixedChart() {
  const data = {
    series: [
      {
        name: 'Approved',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
      },
      {
        name: 'Rejected',
        type: 'column',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
      },
      {
        name: 'Pending',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
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
      labels: [
        '01/01/2003',
        '02/01/2003',
        '03/01/2003',
        '04/01/2003',
        '05/01/2003',
        '06/01/2003',
        '07/01/2003',
        '08/01/2003',
        '09/01/2003',
        '10/01/2003',
        '11/01/2003',
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
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
              return y.toFixed(0) + ' points';
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
        height={300}
      />
    </div>
  );
}
