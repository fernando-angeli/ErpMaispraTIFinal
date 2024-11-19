import './CircleChart.css';
import { FaCircle } from "react-icons/fa";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React, { useMemo, useState, useEffect } from 'react';
import ListClients from '../Client/ListClients/ListClients';
import ListSupplier from '../Supplier/ListSupplier/ListSupplier';

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart = ({ title, total, totalActive, colorTotal, colorTotalActive }) => {
  // Estado intermediário para limitar a frequência de atualizações nos dados
  const [delayedTotal, setDelayedTotal] = useState(total);
  const [delayedTotalActive, setDelayedTotalActive] = useState(totalActive);

  // Atualiza os dados com um pequeno atraso
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedTotal(total);
      setDelayedTotalActive(totalActive);
    }, 300); // Atualização com atraso de 300ms

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, [total, totalActive]);

  // Configurações do gráfico e seus dados
  const data = useMemo(() => ({
    datasets: [
      {
        data: [delayedTotalActive, delayedTotal - delayedTotalActive],
        backgroundColor: [colorTotalActive, colorTotal],
        borderWidth: 0,
      },
    ],
  }), [delayedTotal, delayedTotalActive, colorTotal, colorTotalActive]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%', // Define o tamanho do círculo interno para criar o efeito de anel
    rotation: 0,
    plugins: {
      tooltip: { enabled: true },
    },
    animation: {
      duration: 500, // Reduz a duração da animação para testar
      easing: 'easeInOutQuad',
      animateRotate: false, // Desativa a rotação de animação
      animateScale: false, // Desativa a animação de escala
    },
  }), []);

  // Seleciona o componente de lista apropriado com base no título
  const listComponent = useMemo(() => {
    switch (title) {
      case "Clientes":
        return <ListClients onlyView={true} />;
      case "Fornecedores":
        return <ListSupplier onlyView={true} />;
      default:
        return null;
    }
  }, [title]);

  // Calcula a porcentagem de ativos
  const activePercentage = useMemo(() => {
    if (delayedTotal === 0) return 0; // Evita divisão por zero
    return ((delayedTotalActive / delayedTotal) * 100).toFixed(0);
  }, [delayedTotal, delayedTotalActive]);

  return (
    <div className="contentCircle notSelectable">
      <h4>{title}</h4>
      <div className="contentGraph">
        <div className="divGraph">
          <div className="circleChart">
            <Doughnut data={data} options={options} />
            <h2>{activePercentage}%</h2>
          </div>
          <div className="circleChartData">
            <span style={{ color: colorTotal }}>
              <FaCircle size={13} /> Total: {total}
            </span>
            <span style={{ color: colorTotalActive }}>
              <FaCircle size={13} /> Ativos: {totalActive}
            </span>
          </div>
        </div>
        <div className="list">{listComponent}</div>
      </div>
    </div>
  );
};

export default React.memo(CircleChart); // Evita renderizações desnecessárias
