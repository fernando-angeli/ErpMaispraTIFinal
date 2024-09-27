import userIcon from '../../assets/icons/userIcon.svg'
import exitIcon from '../../assets/icons/exitIcon.svg'
import './accountContainer.css'

function AccountContainer({isLoggedIn}) {
    if (isLoggedIn) {
        return (
            <>
                <div className='containerAccount'>
                    <div className='account'>
                        <img src={userIcon} alt="" className='userIcon'/> 
                        <label>Olá,<br/>Fulano</label>
                    </div>
                    <img src={exitIcon} alt="" className='exitIcon'/> 
                </div>
            </>

        )
    }
    return (
        <>
            <img src={userIcon} alt="" /> 
            <p>Faça login</p>
        </>
    )
}

export default AccountContainer