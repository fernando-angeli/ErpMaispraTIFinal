import AccountContainer from "../accountContainer/AccountContainer"
import './header.css'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom';

function Header({isLoggedIn}) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    return (
        <>
            <header className="header">
                <h1 className="logo">Brand Logo</h1>
                <a href ='' onClick={()=>{
                logout()
                navigate("/login")
                }}>
                <AccountContainer isLoggedIn={isLoggedIn}/></a>
            </header>
            
        </>
    )
}

export default Header