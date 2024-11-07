import './CircleChart.css'
import { FaCircle } from "react-icons/fa";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart = ({title, total, totalActive, colorTotal, colorTotalActive}) => {
    const data = {
      datasets: [
        {
          data: [totalActive, total - totalActive], // Ativos e Inativos
          backgroundColor: [colorTotalActive,  colorTotal], // Cores do gráfico
          borderWidth: 0, // Remove a borda entre os segmentos
        },
      ],
    };
  
    const options = {
      cutout: '70%', // Define o tamanho do círculo interno para criar o efeito de anel
      rotation: 0, // Inicia o preenchimento no topo
      plugins: {
        tooltip: { enabled: true }, // Exibe a tooltip
      },
    };
  
    return (
      <div className='contentCircle'> 
        <div className='circleChart'>
            <h3>{title}</h3>
            <Doughnut data={data} options={options} />
            <h2>{((totalActive / total) * 100).toFixed(0)}%</h2>
        </div> 
        <div className='circleChartData'> 
            <span style={{color: colorTotal}}><FaCircle size={13}/> Total: {total}</span>
            <span style={{color:colorTotalActive}}><FaCircle size={13}/> Ativos: {totalActive}</span>
        </div> 
      </div>
    );
};

export default CircleChart;
