import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { motion } from 'framer-motion';

const NoteEditor = ({ match }) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [note, setNote] = useState(null)
    const [modal, setModal] = useState(false)

    useEffect(() => {
        axios.get(`https://eznotesbackend.herokuapp.com/api/notes/${id}`)
            .then((res) => {
            setNote(res.data)
        })
    }, [id])

    const handleChange = (event) => {
    setNote({ ...note, [event.target.id]: event.target.value })
    }
    
    const editShowPage = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`https://eznotesbackend.herokuapp.com/api/notes/${id}`, note)
        .then(navigate('/'))
    }

    const handleDelete = () => {
        axios.delete(`https://eznotesbackend.herokuapp.com/api/notes/${id}`)
            .then(() => {
            navigate('/')
            })
    }

    if (!note) {
        return <h1>Loading...</h1>
    }

    return (
        <section>
            {modal ? (
                <div className='editingModal'>
                    <h2>Editing "{note.title}"</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='title'>Title</label>
                        <input onChange={handleChange} id='title' value={note.title} />
                        <label htmlFor='note'>Note</label>
                        <textarea
                            onChange={handleChange}
                            id='note'
                            value={note.note}
                        />
                            <Button variant='dark' type='submit'>Save</Button>
                            <Button variant='warning' type='submit' onClick={closeModal}>Exit without saving</Button>
                    </form>
                </div>
            ) : (
                    <div className='noteEditorView'>
                        <h2>{note.title}</h2>
                        <h3>Note: {note.note}</h3>

                        <div className='noteEditorEditDeleteButtons'>
                                <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={editShowPage}
                            >
                                Edit
                            </motion.button>
                                <span className='spacer'></span>
                            <motion.button
                                className='danger'
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleDelete}
                            >
                                Delete
                            
                            </motion.button>
                        </div>
                    </div>
                        
            )}
        </section>
    );
};

export default NoteEditor;