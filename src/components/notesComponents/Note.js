import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';
import paperImage from './paper-image.png'
import hoverSound from '../soundEffectsLibrary/page_turn_03.wav'
import clickSound from '../soundEffectsLibrary/page_turn_02.wav'
import { motion } from 'framer-motion'

const Note = ({ note }) => {

    

    const hoverNote = () => {
        new Audio(hoverSound).play()
    }
    const clickNote = () => {
        new Audio(clickSound).play()
    }

    return (
        <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='cards'
            // onHoverStart={hoverNote}
        >
            <Link to={`/notes/${note._id}`} onClick={clickNote}>
                <Card style={{ width: "15rem", height: "10rem" }}>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Img variant='bottom' src={paperImage} />
                    <Card.ImgOverlay>
                        <Card.Body className='noteText' variant='bottom'>{note.note.substring(0, 100)}</Card.Body>
                    </Card.ImgOverlay>
                </Card>
            </Link>
        </motion.li>
    );
};

export default Note;