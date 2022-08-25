import React from 'react';
import Button from 'react-bootstrap/Button';

const AddNoteButton = () => {
    return (
        <h1>
            <Button variant="dark" href='/new-note'>Add Note</Button>{' '}
        </h1>
    );
};

export default AddNoteButton;