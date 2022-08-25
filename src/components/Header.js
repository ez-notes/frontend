import React from 'react';
import AddNote from './notesComponents/AddNote';

const Header = () => {
    return (
        <header>
            <h1>
                <a href="/">EZ-Notes</a>
            </h1>
            <AddNote />
        </header>
    );
};

export default Header;