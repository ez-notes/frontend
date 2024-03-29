import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import NotesBackdrop from './NotesBackdrop';
import { useAuth0 } from '@auth0/auth0-react';
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

const AddNote = ({ handleClose }) => {
    const { user } = useAuth0();
    const [note, setNote] = useState({
      title: '',
      note: '',
      owner: '',
    });
    const editorRef = useRef(null);
  
    useEffect(() => {
      editorRef.current = new Quill('#editor', {
        theme: 'snow',
      });
  
      editorRef.current.on('text-change', () => {
        setNote((prevNote) => ({
            ...prevNote,
            note: JSON.stringify(editorRef.current.getContents()),
          }));
      });
    }, []);
  
    const handleTitleChange = (event) => {
      setNote({
        ...note,
        title: event.target.value,
        owner: `${user.sub}`,
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const delta = editorRef.current.getContents();
      const noteContent = JSON.stringify(delta);
      const newNote = { ...note, note: noteContent };
  
      axios
        .post(`https://ez-note-backend.onrender.com/api/notes`, newNote)
        .then(() => {
          handleClose();
        })
        .then(() => {
          setTimeout(() => {
              window.location.reload();
          }, 500);
        });
    };

  return (
    <NotesBackdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal create-form"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form>
          <div>
            <label htmlFor="title"></label>
            <input onChange={handleTitleChange} type="text" id="title" placeholder="Title" />
          </div>
          <div id="editor" />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="button"
            onClick={handleSubmit}
          >
            Save & Return
          </motion.button>
        </form>
      </motion.div>
    </NotesBackdrop>
  );
};

export default AddNote;
