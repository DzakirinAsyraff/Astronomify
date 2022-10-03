import React, { useState, useEffect } from 'react';
import {Button, Card, Container, Row, Col, Form, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { LocalDate, ChronoUnit, Period } from '@js-joda/core';
import '../Styles/Main.css';

function Success() {

    const [token, setToken] = useState("");
    const termArray = [
        ["past year", "long_term"],
        ["past 6 month", "medium_term"],
        ["past 4 weeks", "short_term"]
    ];
    const [termkey, setTermkey] = useState(0);
    const [limit, setLimit] = useState(10);
    const [tracks, setTracks] = useState([]);
    const [averageDate, setAverageDate] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isGo, setIsGo] = useState(false);
    // const [isSelected, setIsSelected] = useState(false);
    const [isWrong, setIsWrong] = useState(false);
    const [isCalculated, setIsCalculated] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isError, setIsError] = useState(false);

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

    const validateLimit = (e) => {
        if (e > 50) {
            setLimit(50);
        } else if (e < 1) {
            setLimit(1);
            setIsWrong(true);
        } else {
            setLimit(e);
            setIsWrong(false);
        }
    }

    const checkTrack = () => {
        setIsGo(true);
        validateLimit(limit);
        axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                limit: limit,
                time_range:termArray[termkey][1]
            }
        }).then(res => {
            // console.table(res.data.items)
            // console.table(res.data.items.album)
            setTracks(res.data.items)
            setIsReady(true)
            setIsLoading(false);
            setIsError(false);
            setIsWrong(false);
        }).catch(err => {
            console.log(err)
            setIsError(true);
        })
    }

    // function checkDateLength(date) {
    //     let parsed;
    //     if (date.length < 9) {
    //         parsed = LocalDate.parse(date, "-01-01");
    //     } else {
    //         parsed = LocalDate.parse(date);
    //     }
    //     return parsed;
    // }

    useEffect(() => {
        if (isReady){
            let dates = []
            for (let i = 0; i < tracks?.length; i++) {
                dates.push(tracks[i]?.album.release_date)
            }
            dates.sort()
            // console.log(dates)
            let d1;
            // d1 = checkDateLength(dates[0])
            if(dates[0].length < 10) {
                d1 = LocalDate.parse(dates[0] + "-01-01")
            }
            else {
                d1 = LocalDate.parse(dates[0])
            }
            for (let i = 1; i<dates.length; i++) {
                let d2;
                if (dates[i].length < 10) {
                    d2 = LocalDate.parse(dates[i] + "-01-01")
                } 
                else {
                    d2 = LocalDate.parse(dates[i])
                }
                let diff = d1.until(d2, ChronoUnit.DAYS)
                console.log(d2, d1, diff)
                diff = Math.trunc(diff/2)
                console.log("half diff", diff)
                d1 = d1.plus(Period.ofDays(diff))
                console.log(d1)
            }
            // console.log("final date: ", d1)
            setAverageDate(d1.toString())
            // console.log(d1.toString())
            // console.log(averageDate)
            setIsCalculated(true)
        }
    } , [isReady, tracks])


    return ( 
        <Container className='main-primary-container mb-1 mt-3'>
        <Container fluid className='header-container '>
        <h1>ASTRONOMIFY</h1>
        <h5>with your top {limit} tracks for the {termArray[termkey][0]}</h5>
        </Container>
        {!isReady ?
        <Container className='input-container'>
        <Form>
            <Row sm={2} xs={1}>
                <Col className='mb-2'>
                    <Form.Group controlId="formBasicLimit">
                        <Form.Label>Number of tracks</Form.Label>
                        <Form.Control 
                        type="number"
                        max="50" 
                        min="1"
                        placeholder="Minimum 1, Maximum 50" 
                        value={limit} 
                        onChange={(e) => setLimit(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col className='mb-2'>
                    <Form.Group controlId="formBasicRange">
                        <Form.Label>Time range</Form.Label>
                        <Form.Control as="select" onChange={(e) => {
                            setTermkey(e.target.value)
                            // setIsSelected(true)
                            console.log(e.target.value)
                        } }>
                            <option value={0}>Past Year</option>
                            <option value={1}>Past 6 Months</option>
                            <option value={2}>Past 4 Weeks</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
        <Button onClick={checkTrack}>Go!</Button>
        </Container> :
        null}
        {isLoading&&isGo&&!isError ?
        <div>Loading...</div> :
        null}
        {isError&&!isWrong ?
        <Alert variant='danger' className='alert'>Please Login with Spotify again
        <div className="d-flex justify-content-end">
          <Button as={Link} to={`Astronomify/`} variant="danger">
            Go to Login!
          </Button>
        </div>
        </Alert>
           :
        null}
        {isWrong&&
        <Alert variant='danger' className='alert'>Please enter a limit between 1 and 50</Alert>
        }
        {isReady ?
        <Container className='track-container'>
            <Row lg={5} md={3} sm={2} xs={1}>
                {/* {columns.map((column, index) => {
                    return ( */}
                        {/* <Col> */}
                            {tracks.map((track, index) => {
                                return (
                                    <Col>
                                    <Card bg='dark' key={index} className='mb-3 cardEntity'>
                                        <Card.Header>{track.album.name}</Card.Header>
                                        <Card.Img variant="top" src={track.album.images[1].url} />
                                        <Card.Body>
                                            <Card.Title>{track.name} ({track.popularity})</Card.Title>
                                            <Card.Text>
                                                {track.artists.map((artist, index) => {
                                                    return (
                                                        <div key={index}>{artist.name}</div>
                                                    )
                                                } )}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">{track.album.release_date}</small>
                                        </Card.Footer>
                                    </Card>
                                    </Col>
                                )
                            } )}
                        {/* </Col> */}
                    {/* )
                } )} */}
            </Row>
        </Container> 
        : null}
        {isCalculated ? 
        <Button size='lg' as={Link} to={`/final/${averageDate}`} >Astronomify !</Button> :
        null}
        </Container>
     );
}

export default Success;