import { jwtDecode } from "jwt-decode";
import { useAuth } from '../components/AuthContext';
import CircleChart from "../components/Charts/CircleChart";
import './HomePage.css'
function HomePage() {
 const { JwtToken } = useAuth()
const decoded = jwtDecode(JwtToken);

function getSaudacao() {
    const agora = new Date();
    const hora = agora.getHours();
    if (hora >= 6 && hora < 12) {
      return 'Bom dia';
    } else if (hora >= 12 && hora < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  }
    return (
        <div className="Homepage"> 
            <h1 style={{padding:"1em"}}>{getSaudacao()}, {decoded.fullName}</h1>
            <h4>Confira abaixo como anda o desempenho da tua empresa!</h4>
            <br/>
            <div className="graphs">
              <CircleChart title={'Clientes'} 
              total={500} totalActive={360}
              colorTotal = {'#80728A'}
              colorTotalActive={'#0E1D25'}
              />
              <CircleChart title={'Fornecedores'} 
              total={25} totalActive={17} 
              colorTotal = {' #B4D3E4'}
              colorTotalActive={'#1B3B4B'}/>
            </div>
        </div>

    )
}

export default HomePage 