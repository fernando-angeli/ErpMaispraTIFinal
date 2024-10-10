import { jwtDecode } from "jwt-decode";
import { useAuth } from '../components/AuthContext';

function HomePage() {
 const { JwtToken } = useAuth()
const decoded = jwtDecode(JwtToken);

    return (
        <>
            <h1 style={{padding:"1em"}}>Boa noite, {decoded.firstName}</h1>
        </>
    )
}

export default HomePage 