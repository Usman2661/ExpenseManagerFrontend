import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface BarChartProps {
  title?: String;
  name?: String;
  catagories?: String[];
  data?: Number[];
}

export default function Bar(props: BarChartProps) {
  const { title, name, catagories, data } = props;

  const chartOptions = {
    series: [
      {
        name: name,
        data: data,
      },
    ],
    options: {
      chart: {
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },

      xaxis: {
        categories: catagories,
        position: 'bottom',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: number) {
            return val;
          },
        },
      },
      title: {
        text: title,
        floating: true,
        align: 'center',
        style: {
          color: '#444',
        },
      },
    },
  };

  return (
    <div>
      {catagories !== undefined && catagories.length > 0 ? (
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type='bar'
          height={175}
        />
      ) : null}
    </div>
  );
}
