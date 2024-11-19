import './LineChartGraph.css'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartGraph = ({ labelData1, labelData2, labels, dataLine1, dataLine2, colorData1, colorData2 }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: labelData1,
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        borderColor: colorData1,
        backgroundColor: colorData1,
        tension: 1,
      },
      {
        label: labelData2,
        data: [5, 5, 3, 35, 36, 65, 75, 85, 75, 85, 130, 125],
        borderColor: colorData2,
        backgroundColor: colorData2,
        tension: 0.3,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    
  
    plugins: {
      legend: {
        position: 'top',
      },
    },

    scales: {
      x: {
        ticks: {
          color: colorData1,
        },
        grid: {
          color: colorData2,
        },
      },

      y: {
        ticks: {
          color: colorData1,
        },
        grid: {
          color: colorData2,
        },
      },
    },
  };

  

  return (
    <div className='lineContent'>
      <h3>Histórico de vendas 2024</h3>
      <div className='div-lineChartGraph'>
        <div className='lineChartGraph'>
          <Line data={data} options={options} id='lineChartGraph' />
        </div>
      </div>
    </div>
  )
};

export default LineChartGraph;
