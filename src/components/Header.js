import React from 'react';
import Login from './userComponents/Login';

const Header = () => {
    return (
        <header>
            <h1>
                <a href="/">EZ-Notes</a>
            </h1>
            <h3>
                <Login/>
                
            </h3>
        </header>
    );
};

export default Header;