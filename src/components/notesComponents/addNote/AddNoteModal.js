import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NotesBackdrop from './NotesBackdrop';
import { useAuth0 } from '@auth0/auth0-react';

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


const AddNote = ({ handleClose, text }) => {
    const { user } = useAuth0()


    const [note, setNote] = useState({
        title: "",
        note: "",
        owner: ""
    })

    const navigate = useNavigate()
    
    const handleChange = (event) => {
        setNote({...note, [event.target.id]: event.target.value, owner: `${user.sub}` })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`https://eznotesbackend.herokuapp.com/api/notes/`, note)
            .then(() => {
            handleClose()
            })
            .then(() => {
                setTimeout(() => {
                 window.location.reload()   
                }, 500)
            })
    }

    return (
        <NotesBackdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className='modal'
                variants={dropIn}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                <form className="create-form">
                    <div>
                        <label className="create-label" htmlFor="title"></label>
                        <input onChange={handleChange} type="text" id="title" placeholder="Title" />
                    </div>
                    <div>
                        <label className="create-label" htmlFor="note"></label>
                        <textarea onChange={handleChange} rows={9} cols={30} type="text" id="note" placeholder="Note" />
                    </div>
                    <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='button'
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