import React from 'react'
import Profile from './Profile';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const { isLoading } = useAuth0()

    if (isLoading) return <div>Loading...</div>

    return (
            <>
            <LoginButton/>
            <LogoutButton />
            {/* If I need to check profile information, comment in Profile.js below */}
            {/* <Profile/> */}
        </>
    );
};

export default Login;