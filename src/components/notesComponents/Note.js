import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';
import paperImage from './paper-image.png'
import clickSound from '../soundEffectsLibrary/489962__falcospizaetus__tearingpaper05.wav'
import { motion } from 'framer-motion'

const Note = ({ note }) => {

    

    const clickNote = () => {
        new Audio(clickSound).play()
    }

    return (
        <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='cards'
            onHoverStart={clickNote}
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