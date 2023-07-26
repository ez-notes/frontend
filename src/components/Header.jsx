import React from 'react';
import Login from './userComponents/Login';
import logo from '../logo/EZ-Notes.png'
import { motion } from 'framer-motion'


const Header = () => {
    return (
        <header>
            <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href='/'> <img src={logo} alt='ez-notes'></img> </motion.a>
            <>
                <Login/>
            </>
        </header>
    );
};

export default Header;