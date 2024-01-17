import { Navigate, createBrowserRouter } from "react-router-dom";
// import App from "./App";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import RegistrationForm from "./views/register";
import LoginForm from "./views/Login";
import GuestLayout from "./views/GuestLayout";
import AuthLayout from "./views/AuthLayout";
import ProjectForm from "./views/ProjectForm";
import Projects from './views/Projects';

const router = createBrowserRouter([
    // {
    //     path: '/',
    //     element: <App />
    // },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to={'/dashboard'} />
            },
            {
                path: 'dashboard',
                element: <Dashboard />
                // element: <AuthenticatedRoute element={<Dashboard />} />
            },
            {
                path: 'projects/:id',
                element: <ProjectForm />

            },
            {
                path: 'projects',
                element: <ProjectForm />
            },
            {
                path: 'projectView',
                element: <Projects />
            },
            
        ]
    },
    {
        path: '/auth',
        element: <GuestLayout />,
        children: [
            {
                path: 'register',
                element: <RegistrationForm />
            },
            {
                path: 'login',
                element: <LoginForm />
            },
        ]
    },

    {
        path: 'signUp',
        element: <SignUp />,
        // element: <Navigate to={token ? '/dashboard' : '/login'} />
    }
])

export default router;