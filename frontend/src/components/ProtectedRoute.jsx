import { Navigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import { useLocation } from 'react-router-dom';

function ProtectedRoute({isLoggedIn, children}) {

    const location = useLocation();
    const { isAuthenticated } = useAuth();
    if(!isLoggedIn && !isAuthenticated) {
        if(location.pathname == "/resetpassword"){
            
            return children
        }
        return <Navigate to={'/login'}/>
    }
    return children 
}

export default ProtectedRoute