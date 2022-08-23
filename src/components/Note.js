import { Link } from 'react-router-dom'

const Note = ({ note }) => {
    return (
        <li>
        <Link to={`/note/${note._id}`}>{note.title}</Link>
        </li>
    );
};

export default Note;