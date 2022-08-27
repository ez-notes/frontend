import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion'

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()

    return (
        !isAuthenticated && (
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='button'
                onClick={() => loginWithRedirect()}>
                Sign-up/Login
            </motion.button>
        )
    );
};

export default LoginButton;