import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
import {Card, Container, Row, Col, Button} from 'react-bootstrap';
import'../Styles/Final.css';

function Final() {
    const {date} = useParams();
    const CLIENT_ID = process.env.REACT_APP_NASA_KEY;

    const [astro, setAstro] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${CLIENT_ID}&date=${date}`)
        .then(res => {
            setAstro(res.data)
            console.log(res.data)
            setIsLoading(false);
        }).catch(err => {
            console.log(err)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[date])

    return ( 
        <>
            <div className='header-container'>
                <h1>ASTRONOMIFY</h1>
            </div>
            {isLoading ? <h1>Loading...</h1> :
            <Container className='card-container'>
                <Row sm={2} xs={1}>
                    <Col className='mb-2 card-one'>
                        <Card className='astro-card' bg='dark'>
                            <Card.Header className='text-muted'>{astro.date}</Card.Header>
                            <Card.Title><h3>{astro.title}</h3></Card.Title>
                            <Card.Body>
                            {astro.media_type === 'image' ? 
                            <Card.Img variant='top' src={astro.url} />
                            : <iframe src={astro.url} title={astro.title} />}
                            </Card.Body>
                            {
                            astro.copyright&&
                            <Card.Footer >by {astro.copyright}</Card.Footer>
                            }
                        </Card>
                    </Col>
                    <Col className='mb-2 card-two'>
                        <Card className='astro-card' bg='dark'>
                        <Card.Header className='text-muted'>Description</Card.Header>
                        <Card.Body className='card-explanation'>
                                <Card.Text>
                                    {astro.explanation}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            }
            <div className='footer-container'>
                <Button variant="primary" as={Link} to="Astronomify/main">Back to main</Button>
            </div>
        </>
     );
}

export default Final;