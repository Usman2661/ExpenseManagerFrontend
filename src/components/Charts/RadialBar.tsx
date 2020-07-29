import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface BasicBarProps {
  labels: String[];
  data: Number[];
}

export default function RadialBar(props: BasicBarProps) {
  const { labels, data } = props;

  const chartData = {
    series: data,
            options: {
              chart: {
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  offsetY: 0,
                  startAngle: 0,
                  endAngle: 270,
                  hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      show: false,
                    }
                  }
                }
              },
              colors: ['#58D68D', '#E74C3C', '#EB984E', '#F7DC6F'],
              labels: labels,
              legend: {
                show: true,
                floating: true,
                fontSize: '16px',
                position: 'left',
                offsetY: 15,
                labels: {
                  useSeriesColors: true,
                },
                markers: {
                  size: 0
                },
                formatter: function(seriesName: any, opts: any) {
                  if (seriesName == 'Pending Claims'){
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]

                  }
                  else {
                    return seriesName + ":  £" + opts.w.globals.series[opts.seriesIndex]
                  }
                },
                itemMargin: {
                  vertical: 3
                }
              },
              responsive: [{
                options: {
                  legend: {
                      show: false
                  }
                }
              }]
            },
          
  };
  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type='radialBar'
        height={350}
      />
    </div>
  );
}
