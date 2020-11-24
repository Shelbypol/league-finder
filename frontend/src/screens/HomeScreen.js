import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import {Col, Row, Button, Table, Form} from 'react-bootstrap';
import {createLeague, listLeagues, deleteLeague} from '../actions/leagueActions';
import {LEAGUE_CREATE_RESET} from '../constants/leagueConstants';

const HomeScreen = ({history}) => {

    const [sponsorBtn, setSponsorBtn] = useState(false);

    const dispatch = useDispatch();

    // List leagues state
    const leagueList = useSelector(state => state.leagueList);
    const {loading, error, leagues} = leagueList;

    // Create leagues state
    const leagueCreate = useSelector(state => state.leagueCreate);
    const {loading: loadingCreate, error: errorCreate, success: successCreate, league: createdLeague} = leagueCreate;

    // Delete leagues state
    const leagueDelete = useSelector(state => state.leagueDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = leagueDelete;


    useEffect(() => {
        dispatch(listLeagues());

        dispatch({type: LEAGUE_CREATE_RESET});

        if (successCreate) {
            history.push(`/addleague/${createdLeague._id}`)
        } else {
            dispatch(listLeagues())
        }

    }, [dispatch, history, successCreate, createdLeague]);

    const createLeagueHandler = () => {
        dispatch(createLeague())
    };

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteLeague(id));
        }
    };

    const sponsorBtnHandler = () => {
        setSponsorBtn(!sponsorBtn);
    };

    return (
        <>
            <Row className='align-items-center'>
                <h3>Available Leagues</h3>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createLeagueHandler}>
                        + Add League
                    </Button>
                    <Button className='my-3 mx-1' onClick={sponsorBtnHandler}>
                        Find Leagues to Sponsor
                    </Button>
                </Col>
            </Row>
            { loadingDelete && <Loader /> }
            { errorDelete && <p>{errorDelete}</p> }

            {loading ?
                (<Loader/>)
                : error ?
                    (<p> {error} </p>)
                    :
                    (

                        <Table striped bordered hover responsive className='table-sm mb-5'>
                            <thead>
                            <tr>
                                <th>LEAGUE NAME</th>
                                <th>PRICE</th>
                                <th>LOCATION</th>
                                <th> </th>
                            </tr>
                            </thead>
                            <tbody>
                            {leagues.map((league => (
                                <tr key={league._id}>
                                    <td>{league.name}</td>
                                    <td>${league.price}</td>
                                    <td>{league.location.city}, {league.location.state}</td>
                                    <td>
                                    <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(league._id)}>
                                        X
                                    </Button>
                                    </td>
                                </tr>
                            )))}
                            </tbody>
                        </Table>

                    )
            }

            {/*======== SPONSOR FORM ========*/}
            {sponsorBtn && (
                <Col>
                    <>
                        <Form>
                            <h4>Enter Search Requirements</h4>
                            {/* BUDGET */}
                            <Form.Group controlId='budget'>
                                <Form.Label>Budget</Form.Label>
                                <Form.Control type='budget'
                                              placeholder='Enter budget'
                                    // onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            {/* RADIUS */}
                            <Form.Group controlId='radius'>
                                <Form.Label>Search Radius</Form.Label>
                                <Form.Control type='radius'
                                              placeholder='Enter search radius'
                                    // onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            {/* ADDRESS */}
                            <Form.Group controlId='address'>
                                <Form.Label>Street Address</Form.Label>
                                <Form.Control type='text'
                                              placeholder='Enter street address'
                                    // onChange={(e) => setAddress(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            {/* CITY */}
                            <Form.Group controlId='city'>
                                <Form.Label>City</Form.Label>
                                <Form.Control type='text'
                                              placeholder='Enter city'
                                    // onChange={(e) => setCity(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            {/* STATE */}
                            <Form.Group controlId='state'>
                                <Form.Label>State</Form.Label>
                                <Form.Control type='text'
                                              placeholder='Enter state'

                                    // onChange={(e) => setState(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            {/* POSTAL CODE */}
                            <Form.Group controlId='postalCode'>
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control type='text'
                                              placeholder='Enter zip code'

                                    // onChange={(e) => setPostal(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            {/* COUNTRY */}
                            <Form.Group controlId='country'>
                                <Form.Label>Country</Form.Label>
                                <Form.Control type='text'
                                              placeholder='Enter country'

                                    // onChange={(e) => setCountry(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Button type='submit' variant='primary'>Search Leagues</Button>
                        </Form>
                    </>
                </Col>
            )
            }


        </>
    )
};

export default HomeScreen