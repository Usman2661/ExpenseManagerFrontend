import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface BasicBarProps {
  labels: String[];
  data: Number[];
}

export default function BasicBar(props: BasicBarProps) {
  const { labels, data } = props;

  const chartData = {
    series: [
      {
        name: 'Expenses',
        data: data,
      },
    ],
    options: {
      chart: {
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: labels,
        labels: {
          show: false,
          formatter: function (val: number) {
            return '£' + val;
          },
        },
      },

      tooltip: {
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
        options={chartData.options}
        series={chartData.series}
        type='bar'
        height={350}
      />
    </div>
  );
}
