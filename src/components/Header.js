import React from 'react';
import Login from './userComponents/Login';
import logo from '../logo/EZ-Notes.png'
import { motion } from 'framer-motion'
import hoverSound from './soundEffectsLibrary/page_turn_01.wav'

const hoverNote = () => {
    new Audio(hoverSound).play()
}

const Header = () => {
    return (
        <header>
            <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                // onHoverStart={hoverNote}
                href='/'> <img src={logo} alt='ez-notes'></img> </motion.a>
            <>
                <Login/>
            </>
        </header>
    );
};

export default Header;