import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import draft1 from '../Assets/draft1.png';
import '../Styles/Home.css';
import {SocialIcon} from 'react-social-icons';
// import audio from '../Assets/vine-boom.mp3';
// import axios from 'axios';

function Home() {

    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_KEY;
    const REDIRECT_URI = "https://dzakirinasyraff.github.io/Astronomify/main"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPE = "user-top-read"

    const [token, setToken] = useState("");
    
    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
    
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
    
        setToken(token)
    
    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    return ( 
        <>
        <div className="App">
            <div className="home">
                <div className="home-bg">
                    <div className="logo-container">
                    <img alt="spotify-logo" className="spotify-logo" width='50' height='50'/>
                    </div>
                    <div className='home-alert'>
                        <Alert variant="warning">This app is currently available for authorized testers only.</Alert>
                    </div>
                    <div className="home-header">
                        <div className="home-header-text">
                            <h1>ASTRONOMIFY</h1>
                        </div>
                        <div className="home-header-button">
                            <Button variant="outline-light" size="lg" as={Link} to="/Astronomify/test">test</Button>
                        {!token ? 
                        <Button variant='success' size="lg" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login to Spotify</Button> 
                        :
                        <Button variant='primary' as={Link} to="/Astronomify/main">Get Started !</Button>
                        }
                        </div>
                        {
                        token && <div><Button variant='danger' onClick={logout}>Logout</Button></div>
                        }
                    </div>
                    <div className="home-social p-3">
                        <p>Shameless plug:</p>
                        <div className="home-social-icons">
                            <SocialIcon url="https://www.instagram.com/dzak.js/" target="_blank" className='m-3'/>
                            <SocialIcon url="https://github.com/DzakirinAsyraff" fgColor='white' target="_blank" className='m-3'/>
                            <SocialIcon url="https://open.spotify.com/user/adzakirin?si=66c42d8cbad54a1e" target="_blank" className='m-3'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}

export default Home;