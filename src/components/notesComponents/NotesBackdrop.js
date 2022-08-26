import React from 'react';
import { motion } from 'framer-motion'

const NotesBackdrop = ({ children, onClick }) => {
    
    return (
        <motion.div
            className='notesBackdrop'
            onClick={onClick
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}

        </motion.div>
    );
};

export default NotesBackdrop;