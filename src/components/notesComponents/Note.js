import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';
import paperImage from './paper-image.png'
import clickSound from '../soundEffectsLibrary/popity.wav'

const Note = ({ note }) => {

    

    const clickNote = () => {
        new Audio(clickSound).play()
    }

    return (
            <li>
                <Link to={`/notes/${note._id}`} onClick={clickNote}>
                    <Card style={{ width: "15rem", height: "15rem" }}>
                        <Card.Title>{note.title}</Card.Title>
                        <Card.Img variant='bottom' src={paperImage}/>  
                    </Card>
                </Link>
            </li>
    );
};

export default Note;