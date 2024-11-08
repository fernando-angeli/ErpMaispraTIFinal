import { jwtDecode } from "jwt-decode";
import { useAuth } from '../components/AuthContext';
import './HomePage.css'
import Dashbord from "./Dashbord/Dashbord";
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
        <div>
            <h1 style={{padding:"1em"}}>{getSaudacao()}, {decoded.fullName}</h1>
            <h4>Confira abaixo como anda o desempenho da tua empresa!</h4>
            <br/>
        </div>
            <Dashbord/>
        </div>

    )
}

export default HomePage 