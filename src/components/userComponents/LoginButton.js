import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion'

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()

    return (
        !isAuthenticated && (
            <Button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='button'
                onClick={() => loginWithRedirect()}>
                Login
            </Button>
        )
    );
};

export default LoginButton;