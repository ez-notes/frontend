import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import NoteEditorModal from './NoteEditorModal';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';

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
                setNote(res.data);
            })
    }, [id]);

    useEffect(() => {
        
        // Check if note is not null before setting the content
        if (note) {
            // Initialize Quill with the bubble theme on the .noteText element
        const quill = new Quill('.noteText', {
            theme: 'bubble',
            readOnly: true, // Set to true to prevent editing
        });
            
        // Parse the Quill delta from the JSON string
    const deltaObject = JSON.parse(note.note);
  
    // Load the delta object into the Quill editor
    quill.setContents(deltaObject);
  
    // Subscribe to Quill's 'text-change' event to update the note state
    quill.on('text-change', () => {
      // Convert the updated Quill delta to a JSON string for saving in the database
      setNote({ ...note, note: JSON.stringify(quill.getContents()) });
    });
  
    // Cleanup when the component is unmounted
    return () => {
      quill.off('text-change');
    };
        }
    }, [note]);

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
                    {/* Render the rich text content using a div */}
                    <Card.Body className='noteText'>
                    </Card.Body>
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
