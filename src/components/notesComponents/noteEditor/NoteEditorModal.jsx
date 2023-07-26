import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import EditorBackdrop from './EditorBackdrop';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

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
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const NoteEditorModal = ({ handleClose, note, setNote }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current = new Quill('#editor', {
      theme: 'snow', // You can choose different themes like 'bubble', 'snow', etc.
    });
  
    // Parse the Quill delta from the JSON string
    const deltaObject = JSON.parse(note.note);
  
    // Load the delta object into the Quill editor
    editorRef.current.setContents(deltaObject);
  
    // Subscribe to Quill's 'text-change' event to update the note state
    editorRef.current.on('text-change', () => {
      // Convert the updated Quill delta to a JSON string for saving in the database
      setNote((prevNote) => ({
        ...prevNote,
        note: JSON.stringify(editorRef.current.getContents()),
      }));
    });
  
    // Cleanup when the component is unmounted
    return () => {
      editorRef.current.off('text-change');
    };
  }, []);
  

  const handleChange = (event) => {
      setNote({ ...note, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get the Quill delta representing the rich text content
    const delta = editorRef.current.getContents();

    // Convert the Quill delta to a JSON string
    const noteContent = JSON.stringify(delta);

    // Create the updated note object with the new rich text content
    const updatedNote = { ...note, note: noteContent };

    // Send the updated note to the server
    axios
      .put(`https://ez-note-backend.onrender.com/api/notes/${id}`, updatedNote)
      .then(() => {
        navigate('/');
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
  };

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
        <form onSubmit={handleSubmit}>
          <div>
            <label className='edit-label' htmlFor='title'></label>
            <input
              onChange={handleChange}
              id='title'
              value={note.title}
            />
          </div>
          <div id='editor' />
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
