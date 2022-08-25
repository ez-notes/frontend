import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';
import paperImage from './paper-image.png'

const Note = ({ note }) => {
    return (
        <li>
            <Link to={`/notes/${note._id}`}>
                <Card style={{ width: "15rem", height: "15rem" }}>
                     <Card.Title>{note.title}</Card.Title>
                    <Card.Img variant='bottom' src={paperImage}/>  
                </Card>
            </Link>
        </li>
    );
};

export default Note;