import { useState } from 'react';
import { motion } from 'framer-motion'
import EditorBackdrop from './EditorBackdrop';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0,
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 10,
            stiffness: 50,
        }
    },
    exit: {
        y: '100vh',
        opacity: 0,
        transition: {
            duration: 0.4,
        }
    },
}



const NoteEditorModal = ({ handleClose, note, setNote }) => {

    const { id } = useParams()
    const navigate = useNavigate()

    const handleChange = (event) => {
        setNote({ ...note, [event.target.id]: event.target.value })
        }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`https://eznotesbackend.herokuapp.com/api/notes/${id}`, note)
        .then(navigate('/'))
    }

    return (
        <EditorBackdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className='modal edit-form'
                variants={dropIn}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                <form
                    onSubmit={handleSubmit}>
                    <div>
                    <label className='edit-label' htmlFor='title'></label>
                    <input onChange={handleChange}
                        id='title'
                        value={note.title} />
                    </div>
                    <div>
                        <label className='edit-label'
                        htmlFor='note'>
                    </label>
                    <textarea
                        rows={9} cols={30}
                            onChange={handleChange}
                            id='note'
                            value={note.note}
                        />
                        </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type='submit'
                    >
                        Save & Return
                    </motion.button>
                    </form>
                
            </motion.div>
        </EditorBackdrop>
    );
};

export default NoteEditorModal;