import React from 'react';
import Button from 'react-bootstrap/Button';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AddNoteButton = () => {
    return (
        <h1>
            <Link to='/new-note'>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='button'
                    onClick={() => null}
                >
                    Add Note
                </motion.button>{' '}
            </Link>
        </h1>
    );
};

export default AddNoteButton;