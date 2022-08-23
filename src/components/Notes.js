import { useState, useEffect } from 'react';
import Note from './Note';
import axios from 'axios';

const Notes = () => {
// Create a state for all of the notes that will be rendered to the page.
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
// useEffect to make some axios requests
    useEffect(() => {
        // Timeout handling will go here
        const handleLoadingTimeOut = setTimeout(() => {
			if (!notes.length) {
				setLoading(false);
			}
        }, 5000)
        
        // the axios request
        axios.get('http://localhost:8000/api/notes')
            .then(res => {
                setNotes(res.data)
                setLoading(false)
            })
        return () => clearTimeout(handleLoadingTimeOut)
    }, [])
    if (loading && !notes.length) {
        return <h2>Loading...</h2>
    }

    if (!loading && !notes.length) {
        return <h2>Oops! Something went wrong. Try again later!</h2>
    }

    return (
        <ul>
            {notes.map((note) => (
                <Note key={note._id} note={note} />
            ))}
        </ul>
    );
};

export default Notes;