import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import NoteEditorModal from './NoteEditorModal';

const NoteEditor = ({ match }) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [note, setNote] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const close = () => setModalOpen(false)
    const open = () => setModalOpen(true)

    useEffect(() => {
        axios.get(`https://ez-note-backend.onrender.com/api/notes/${id}`)
            .then((res) => {
            setNote(res.data)
        })
    }, [id])

    const handleDelete = () => {
        axios.delete(`https://ez-note-backend.onrender.com/api/notes/${id}`)
            .then(() => {
            navigate('/')
            })
    }

    if (!note) {
        return <h1>Loading...</h1>
    }

    return (
        <section>
                    <div className='noteEditorView'>
                        <Card onDoubleClick={open}>
                    <Card.Title>{note.title}</Card.Title>
                                <Card.Body className='noteText'>{note.note}</Card.Body>
                        </Card>
                        <div className='noteEditorEditDeleteButtons'>
                                <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={open}
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
                    {modalOpen && <NoteEditorModal modalOpen={modalOpen} handleClose={close} setNote={setNote} note={note} />}
                        </div>
                    </div>
        </section>
    );
};

export default NoteEditor;