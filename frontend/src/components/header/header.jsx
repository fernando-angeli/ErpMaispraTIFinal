import AccountContainer from "../accountContainer/AccountContainer"
import './header.css'

function Header({isLoggedIn}) {
    return (
        <>
            <header className="header">
                <h1 className="logo">Brand Logo</h1>
                <AccountContainer isLoggedIn={isLoggedIn}/>
            </header>
            
        </>
    )
}

export default Header