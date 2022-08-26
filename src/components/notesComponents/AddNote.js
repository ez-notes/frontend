import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const AddNote = () => {
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
            navigate('/')
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="create-form">
                <div>
                    <label className="create-label" htmlFor="title"></label>
                    <input onChange={handleChange} type="text" id="title" placeholder="Title" />
                </div>
                <div>
                    <label className="create-label" htmlFor="note"></label>
                    <textarea onChange={handleChange} rows={10} cols={100} type="text" id="note" placeholder="Note" />
                </div>
                <button type='submit'>Save & return</button>
            </form>
        </>
    );
};

export default AddNote;