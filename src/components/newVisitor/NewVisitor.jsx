import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Loading from '../loader/Loading';
import paperImage from '../notesComponents/paper-image.png'
import LoginButton from '../userComponents/LoginButton';

const NewVisitor = () => {

    // A loading screen to stop welcome screen from showing up whenever the page refreshes
    const [loading, setLoading] = useState(true)
 const { isAuthenticated } = useAuth0()
    if (loading === true) {
        setTimeout(() => setLoading(false), 800)
        return (
            <Loading />
        )
    };

    return (
        !isAuthenticated && (
            <div className='welcomeMessage'>
                <Card style={{ width: "50rem", height: "25rem" }}>
                    <Card.Title><h3>Welcome to EZ Notes!</h3></Card.Title>
                    <Card.Img variant='bottom' src={paperImage} />
                    <Card.ImgOverlay>
                        <Card.Body className='text-left welcomeText' variant='bottom'><br/>Welcome to EZ-Notes, a simple place to store some notes. Click 'Sign-up/Login' to login, or sign up, and you can quickly jot down some notes by clicking on the 'Add Note' button!</Card.Body>
                    </Card.ImgOverlay>
                    <LoginButton/>
                </Card>
            </div>
            
            
        )
    );
};

export default NewVisitor;