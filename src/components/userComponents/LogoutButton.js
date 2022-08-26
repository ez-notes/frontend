import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';
import LoginButton from './LoginButton';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0()

    return (
        isAuthenticated && (
            <button onClick={() => logout()}>
                    Logout
            </button>
        )
    );
};

export default LogoutButton;