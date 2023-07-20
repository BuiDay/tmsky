import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  scales,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Card } from 'antd';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const data = {
  labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
  datasets: [
    {
      label: '# of Votes',
      data: [5,8,6,4,5,6],
      backgroundColor: 'rgba(107, 93, 209, 0.5)',
      borderColor: '#5544D3',
      borderWidth: 1,
    },
  ],
};

const options:any = {
    scale: {
        gridLines: {
          color: "black",
          lineWidth: 5
        },
        angleLines: {
          display: false
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1
        },
        r: {
            min: 0,
            max: 10,
        },
        pointLabels: {
          fontSize: 18,
          fontColor: "green"
        }
      },
      legend: {
        position: 'left'
      }
  };

export function RadarChart() {
  return <Card> <Radar data={data} options={options}/></Card>
}