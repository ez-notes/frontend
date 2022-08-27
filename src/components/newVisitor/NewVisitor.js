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
                <Card style={{ width: "20rem", height: "14rem" }}>
                    <Card.Title><h3>Welcome to EZ Notes!</h3></Card.Title>
                    <Card.Img variant='bottom' src={paperImage} />
                    <Card.ImgOverlay>
                        <Card.Body className='text-left' variant='bottom'><br/>Welcome to EZ-Notes, a simple place to store some notes. Click 'Login' to login, or sign up, and only you'll be able to see your notes here while you'r logged in!</Card.Body>
                    </Card.ImgOverlay>
                    <LoginButton/>
                </Card>
            </div>
            
            
        )
    );
};

export default NewVisitor;