import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNote = () => {
    const [note, setNote] = useState({
        title: "",
        note: ""
    })

    const navigate = useNavigate()
    
    const handleChange = (event) => {
        setNote({...note, [event.target.id]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`https://eznotesbackend.herokuapp.com/api/notes/`, note)
            .then(() => {
            navigate('/')
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="create-form">
                <div>
                    <label className="create-label" htmlFor="title">Title</label>
                    <input onChange={handleChange} type="text" id="title" placeholder="title" />
                </div>
                <div>
                    <label className="create-label" htmlFor="note">Note</label>
                    <textarea onChange={handleChange} rows={10} cols={100} type="text" id="note" placeholder="note" />
                </div>
                <button type='submit'>Save & return</button>
            </form>
        </>
    );
};

export default AddNote;