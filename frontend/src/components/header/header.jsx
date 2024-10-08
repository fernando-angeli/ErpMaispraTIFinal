import AccountContainer from "../accountContainer/AccountContainer"
import './header.css'
import { useAuth } from '../AuthContext'

function Header({isLoggedIn}) {
    const { logout } = useAuth();
    return (
        <>
            <header className="header">
                <h1 className="logo">Brand Logo</h1>
                <a href ='' onClick={logout}><AccountContainer isLoggedIn={isLoggedIn}/></a>
            </header>
            
        </>
    )
}

export default Header