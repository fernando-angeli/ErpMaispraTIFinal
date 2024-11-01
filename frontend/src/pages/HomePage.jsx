import { jwtDecode } from "jwt-decode";
import { useAuth } from '../components/AuthContext';

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
        <>
            <h1 style={{padding:"1em"}}>{getSaudacao()}, {decoded.fullName}</h1>
        </>
    )
}

export default HomePage 