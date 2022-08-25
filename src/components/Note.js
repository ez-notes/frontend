import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';

const Note = ({ note }) => {
    return (
        <li>
            <Link to={`/notes/${note._id}`}>
                <Card style={{ width: "13rem" }}>
                <Card.Title>{note.title}</Card.Title>
                </Card>
            </Link>
        </li>
    );
};

export default Note;