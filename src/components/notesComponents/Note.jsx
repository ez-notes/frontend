import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';
import paperImage from './paper-image.png'
import { motion } from 'framer-motion'
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';

const Note = ({ note }) => {

    useEffect(() => {
        // Check if note is not null before setting the content
        if (note) {
        //check if the note is valid JSON
        // Initialize Quill with the bubble theme on the .noteText element
        const quill = new Quill(`.noteText${note._id}`, {
            theme: 'bubble',
            readOnly: true, // Set to true to prevent editing
        });
            
        // Parse the Quill delta from the JSON string
    const deltaObject = JSON.parse(note.note);
  
    // Load the delta object into the Quill editor
    quill.setContents(deltaObject);
  
    // Subscribe to Quill's 'text-change' event to update the note state
    quill.on('text-change', () => {
    });
  
    // Cleanup when the component is unmounted
    return () => {
      quill.off('text-change');
    };
        }
    }, [note]);

    return (
        <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='cards'
        >
            <Link to={`/notes/${note._id}`}>
                <Card style={{ width: "15rem", height: "11rem" }}>
                    <Card.Title id='shorthand'>{note.title}</Card.Title>
                    <Card.Img variant='bottom' src={paperImage} />
                    <Card.ImgOverlay>
                        <Card.Body className={`noteText${note._id}`} id='shorthand' variant='bottom'></Card.Body>
                    </Card.ImgOverlay>
                </Card>
            </Link>
        </motion.li>
    );
};

export default Note;