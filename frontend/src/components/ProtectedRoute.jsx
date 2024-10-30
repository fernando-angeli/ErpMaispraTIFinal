import { Navigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import { useLocation } from 'react-router-dom';

function ProtectedRoute({isLoggedIn, children}) {
    const location = useLocation();
    console.log("Current URL:", location.pathname);
    const { isAuthenticated } = useAuth();
    if(!isLoggedIn && !isAuthenticated) {
        if(location.pathname == "/resetpassword"){
            return <Navigate to={'/resetpassword'}/>
        }
        return <Navigate to={'/login'}/>

    }
    return children
}

export default ProtectedRoute