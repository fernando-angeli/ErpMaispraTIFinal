import CircleChart from "../../components/Charts/CircleChart";
import './Dashbord.css'
import LineChartGraph from "../../components/Charts/LineChartGraph/LineChartGraph";
import BoxChartValue from "../../components/Charts/LineChartGraph/BoxChartValue/BoxChartValue";
import axios from 'axios'
import { useState, useEffect } from "react";
import { useAuth } from "../../components/AuthContext";

const Dashbord = () => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const { JwtToken } = useAuth();
  const [clients, setClients] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  function contarStatusAtivos(vetor) {
    if (!vetor) return 0;  
    return vetor.filter(v => v.status === 'ativo').length;
  }

  const handleShowClients = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/clientes`, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
        },
      });
      setClients(response.data.content);
    } catch (err) {
      console.log(err);
      alert("Erro ao chamar clientes!");
    }
  };

  const handleShowSuppliers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/fornecedores`, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
        },
      });
      setSuppliers(response.data.content);
    } catch (err) {
      console.log(err);
      alert("Erro ao puxar fornecedores!");
    }
  };


  useEffect(() => {
    handleShowClients(); 
    handleShowSuppliers();
  }, []);

  const totalClients = clients.length;
  const totalActiveClients = contarStatusAtivos(clients);
  const totalSuppliers = suppliers.length;
  const totalActiveSuppliers = contarStatusAtivos(suppliers);  

  return (
    <div className="dashContent">
      <div className="graphs">
        <LineChartGraph 
          labels={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 
          'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
          labelData1={'Vendas Registradas'}
          labelData2={'Vendas Canceladas'}
          colorData1='#0E1D25' colorData2='#80728A'/>
      </div>

      <div className="graphs">
        <CircleChart 
          title={'Clientes'} 
          total={totalClients} 
          totalActive={totalActiveClients}
          colorTotal={'#80728A'}
          colorTotalActive={'#0E1D25'}
        />
        <CircleChart 
          title={'Fornecedores'} 
          total={totalSuppliers} 
          totalActive={totalActiveSuppliers}
          colorTotal={'#B4D3E4'}
          colorTotalActive={'#1B3B4B'}
        />
      </div>

      <div className="graphs">
        <BoxChartValue
          title={'Valor em caixa'}
          isCredit={true}
          value={'15610485'}
        />
        <BoxChartValue
          title={'Valor Gasto'}
          isCredit={false}
          value={'7610485'}
        />
      </div>
    </div>
  );
};

export default Dashbord;
