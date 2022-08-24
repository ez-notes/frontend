import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const NoteEditor = ({ match }) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [note, setNote] = useState(null)
    const [modal, setModal] = useState(false)

    useEffect(() => {
        axios.get(`http://eznotesbackend-env.eba-gvgtcyqj.us-west-1.elasticbeanstalk.com/api/notes/${id}`)
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
        axios.put(`http://eznotesbackend-env.eba-gvgtcyqj.us-west-1.elasticbeanstalk.com/api/notes/${id}`, note)
        .then(navigate('/'))
    }

    const handleDelete = () => {
        axios.delete(`http://eznotesbackend-env.eba-gvgtcyqj.us-west-1.elasticbeanstalk.com/api/notes/${id}`)
            .then(() => {
            navigate('/')
            })
        
        navigate('/')
    }

    if (!note) {
        return <h1>Loading...</h1>
    }

    return (
        <section>
            {modal ? (
                <div className='modal'>
                    <h2>Editing {note.title}</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='title'>Title</label>
                        <input onChange={handleChange} id='title' value={note.title} />
                        <label htmlFor='note'>Note</label>
                        <textarea
                            onChange={handleChange}
                            id='note'
                            value={note.note}
                        />
                        <button type='submit'>Submit</button>
                        <button type='button' onClick={closeModal}>
                            Close 
                        </button>
                    </form>
                </div>
            ) : (
                    <>
                        <h2>{note.title}</h2>
                        <h3>Note: {note.note}</h3>

                        <button onClick={editShowPage}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </>
            )}
        </section>
    );
};

export default NoteEditor;