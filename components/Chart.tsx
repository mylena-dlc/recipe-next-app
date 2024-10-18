import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Enregistre les composants nécessaires de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface NutritionData {
  labels: string[];
  values: number[];
}

const Chart:React.FC<NutritionData> = ({ labels, values }) => {
    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Valeurs nutritionnelles',
            data: values, // Valeurs correspondantes (en grammes ou autre unité)
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
      return (
        <div>
          <Doughnut data={data} />
        </div>
      );
    };
    
    export default Chart;