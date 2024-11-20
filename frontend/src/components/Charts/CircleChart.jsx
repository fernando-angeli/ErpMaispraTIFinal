import './CircleChart.css';
import { FaCircle } from "react-icons/fa";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import ListClients from '../Client/ListClients/ListClients';
import ListSupplier from '../Supplier/ListSupplier/ListSupplier';

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart = ({ title, total, totalActive, colorTotal, colorTotalActive }) => {
  const [delayedTotal, setDelayedTotal] = useState(total);
  const [delayedTotalActive, setDelayedTotalActive] = useState(totalActive);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedTotal(total);
      setDelayedTotalActive(totalActive);
    }, 100); 

    return () => clearTimeout(timer); 
  }, [total, totalActive]);


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
    cutout: '70%', 
    rotation: 0,
    plugins: {
      tooltip: { enabled: true },
    },
    animation: {
      duration: 200, // Reduz a duração da animação para testar
      easing: 'easeInOutQuad',
      animateRotate: false,
      animateScale: false, 
    },
  }), []);
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

  // Usando useRef para garantir o acesso seguro ao DOM
  const contentCircleRef = useRef(null); // Referência para o contêiner

  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Verifica se o ref foi atribuído
    if (contentCircleRef.current) {
      const handleResize = () => {
        // Verifica o tamanho do contêiner sempre que houver mudança
        const width = contentCircleRef.current.offsetWidth;
        const height = contentCircleRef.current.offsetHeight;
        
        setSize({ width, height });
      };

      const resizeObserver = new ResizeObserver(handleResize); // Cria o ResizeObserver
      resizeObserver.observe(contentCircleRef.current); // Inicia a observação no contêiner

      // Cleanup: Desfaz a observação quando o componente for desmontado
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []); // O useEffect é executado apenas uma vez, após o componente ser montado

  return (
    <div className="contentCircle notSelectable" ref={contentCircleRef}>
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
        <div className="list">{size.height > 700 ? listComponent : ""}</div>
      </div>
    </div>
  );
};

export default React.memo(CircleChart); 