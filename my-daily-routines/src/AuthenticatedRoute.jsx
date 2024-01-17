import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { StateContext } from './ContextProvider';
// element: Element
// eslint-disable-next-line react/prop-types
const AuthenticatedRoute = ({ children }) => {
    const { token } = useContext(StateContext);
    // return token ? <Element /> : <Navigate to={'/login'} replace />
    if (!token) {
        return <Navigate to={'/auth/login'} />
    }
    return children;
}

export default AuthenticatedRoute;
