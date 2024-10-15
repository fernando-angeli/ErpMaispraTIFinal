import userIcon from '../../assets/icons/userIcon.svg'
import './accountContainer.css'

import { jwtDecode } from "jwt-decode";
import { useAuth } from '../AuthContext';


function AccountContainer({isLoggedIn}) {
    const { JwtToken } = useAuth()
    const decoded = jwtDecode(JwtToken);

    if (isLoggedIn) {
        return (
            <>
                    <div className='account'>
      
                        <img src={userIcon} alt="" className='userIcon'/> 
                        <label>Olá,<br/>{decoded.firstName}</label>

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