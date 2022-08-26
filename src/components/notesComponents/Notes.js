import { useState, useEffect } from 'react';
import Note from './Note';
import axios from 'axios';
import AddNoteButton from './AddNoteButton';
import { useAuth0 } from '@auth0/auth0-react';


const Notes = () => {
    const { user, isAuthenticated } = useAuth0()
// Create a state for all of the notes that will be rendered to the page.
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
// A variable for reverse, that will be used to make the newest notes added to the db show up first
    const reversed = [...notes].reverse()
// useEffect to make some axios requests
    useEffect(() => {
        // Timeout handling will go here
        const handleLoadingTimeOut = setTimeout(() => {
			if (!notes.length) {
				setLoading(false);
			}
        }, 5000)
        
        // the axios request
        axios.get('https://eznotesbackend.herokuapp.com/api/notes/')
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
    const findMyNotes = () => {
        for (let i = 0; i < reversed.length; i += 1) {
            let ownerId = reversed[i].owner
            console.log(ownerId + " " + [i])  
        }
    }
    findMyNotes()
    return (
        isAuthenticated && (
            <>
                
                {/* {console.log(reversed[1].owner)}
                {console.log(user.sub)} */}
                {/* Render AddNoteButton above returned Notes */}
                <AddNoteButton />
            <ul>
                {reversed.map((note) => (
                    <Note key={note._id} note={note} />
                ))}
                </ul>
            </>
        )
    );
};

export default Notes;