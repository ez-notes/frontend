import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';

const Login = () => {
    const { loginWithRedirect } = useAuth0()
    const { logout } = useAuth0()

    return (
        <>
            <button onClick={() => loginWithRedirect()}>
                Login
            </button>
            <button onClick={() => logout()}>
                Logout
            </button>
            <Profile />
        </>
    );
};

export default Login;