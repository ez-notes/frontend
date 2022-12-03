import { useState, useEffect } from 'react';
import Note from './Note';
import axios from 'axios';
import AddNoteButton from './addNote/AddNoteButton';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../loader/Loading';


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
        axios.get('https://backend-production-0a8e.up.railway.app/api/notes')
            .then(res => {
                setNotes(res.data)
                setLoading(false)
            })
        return () => clearTimeout(handleLoadingTimeOut)
    }, [])
    
    if (!loading && !notes.length) {
        return <h2>Oops! Something went wrong. Try again later!</h2>
    }
// myNotes is an array, that takes the reversed array and looks for only the ones that match with the current logged in user. MyNotes begins as an empty array, but the findMyNotes function pushes the desired objects into the new myNotes array.
    const myNotes =[]
    const findMyNotes = (arr) => {
        for (let i = 0; i < arr.length; i ++) {
            let ownerId = arr[i].owner
            // console.log(ownerId + " " + [i])
            if (ownerId===user.sub) {
                myNotes.push(arr[i])
            }
        }
    }
    // console.log(reversed)
    // console.log(findMyNotes(reversed))
    // console.log(myNotes)
    // the .map below has to happen on an array that already is only the items where the reversed[i].owner === user.sub

    return (
        isAuthenticated && (
            <div className='notesButtonMover'>
                {findMyNotes(reversed)}
                {/* Render AddNoteButton above returned Notes */}
                <ul>
                    {myNotes.map((note) => (
                    <Note key={note._id} note={note} />
                ))}
                </ul>
                <AddNoteButton />
            </div>
        )
    );
};

export default Notes;