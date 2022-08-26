import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()

    return (
        !isAuthenticated && (
            <Button varriant='secondary' onClick={() => loginWithRedirect()}>
                Login
            </Button>
        )
    );
};

export default LoginButton;