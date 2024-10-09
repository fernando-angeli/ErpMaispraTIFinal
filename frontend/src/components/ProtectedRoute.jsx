import { Navigate } from "react-router-dom";
import { useAuth } from './AuthContext';

function ProtectedRoute({isLoggedIn, children}) {
    const { isAuthenticated } = useAuth();
    if(!isLoggedIn && !isAuthenticated) {
        return <Navigate to={'/login'}/>
    }
    return children
}

export default ProtectedRoute