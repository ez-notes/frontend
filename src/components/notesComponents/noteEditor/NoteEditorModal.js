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
                className='modal'
                variants={dropIn}
            >
                    <h2>Editing "{note.title}"</h2>
                    <form className='modal' onSubmit={handleSubmit}>
                        <label htmlFor='title'>Title</label>
                        <input onChange={handleChange} id='title' value={note.title} />
                        <label htmlFor='note'>Note</label>
                        <textarea
                            onChange={handleChange}
                            id='note'
                            value={note.note}
                        />
                            <button type='submit'>Save</button>
                    </form>
                
            </motion.div>
        </EditorBackdrop>
    );
};

export default NoteEditorModal;