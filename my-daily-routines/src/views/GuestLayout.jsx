import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { StateContext } from '../ContextProvider';
function GuestLayout () {
    const { token } = useContext(StateContext);
    if (token) {
        return <Navigate to={'/dashboard'} />
    }

    return (
        <div>
            <h1>Auth Page</h1>
            <Outlet />
        </div>
    );
}

export default GuestLayout;
