import React from 'react';
import { Button } from 'react-bootstrap';

const Header = () => {
    return (
        <header>
            <h1>
                <a href="/">EZ-Notes</a>
            </h1>
            <h3>
                <Button variant='secondary' href='/login'>Signup/Login</Button>
            </h3>
        </header>
    );
};

export default Header;