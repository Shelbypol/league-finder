import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import {Col, Row, Button, Table, Form} from 'react-bootstrap';
import {createLeague, listLeagues, deleteLeague} from '../actions/leagueActions';
import {LEAGUE_CREATE_RESET} from '../constants/leagueConstants';
import { geocode } from '../components/GeoLocate';
import {getDistance} from 'geolib';
// import * as geolib from 'geolib';

const HomeScreen = ({history}) => {

    const [sponsorBtn, setSponsorBtn] = useState(false);
    const [sponsorReq, setSponsorReq] = useState(false);
    const [sponsorBudget, setSponsorBudget] = useState(0);
    const [sponsorRadius, setSponsorRadius] = useState(0);
    const [sponsorAddress, setSponsorAddress] = useState('');
    const [sponsorCity, setSponsorCity] = useState('');
    const [sponsorState, setSponsorState] = useState('');
    const [sponsorPostal, setSponsorPostal] = useState('');
    const [sponsorCountry, setSponsorCountry] = useState('');
    const [available, setAvailable] = useState(true);
    const [availableLeagues, setAvailableLeagues] = useState([]);
    const [sponsorLatLon, setSponsorLatLon] = useState([]);
    const [testLatLon, setTestLatLon] = useState([]);

    const dispatch = useDispatch();

    // LIST LEAGUE STATE
    const leagueList = useSelector(state => state.leagueList);
    const {loading, error, leagues} = leagueList;

    // CREATE LEAGUE STATE
    const leagueCreate = useSelector(state => state.leagueCreate);
    const {loading: loadingCreate, error: errorCreate, success: successCreate, league: createdLeague} = leagueCreate;

    // DELETE LEAGUE STATE
    const leagueDelete = useSelector(state => state.leagueDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = leagueDelete;

    //============================      USE EFFECT      ==================================
    useEffect(() => {
        dispatch({type: LEAGUE_CREATE_RESET});
        dispatch(listLeagues());


        if (successCreate) {
            history.push(`/addleague/${createdLeague._id}`)
        } else {
            dispatch(listLeagues())
        }

    }, [dispatch, history, successCreate, createdLeague, successDelete]);

    //============================      HANDLERS      ==================================

    // CREATE LEAGUE HANDLER
    const createLeagueHandler = () => {
        dispatch(createLeague())
    };

    // DELETE LEAGUE HANDLER
    const deleteHandler = (id) => {
        // if (window.confirm('Are you sure you want to delete this league?')) {
        dispatch(deleteLeague(id));
        // }
    };

    // SPONSOR LEAGUE FORM HANDLER
    const sponsorBtnHandler = () => {
        setSponsorBtn(!sponsorBtn);

        if (sponsorReq === true) {
            setSponsorReq(false)
        }

        setAvailableLeagues([]);
        setAvailable(true);

    };


    // SPONSOR INFO SUBMIT
    const submitSponsorReqHandler = () => {
        setSponsorBtn(!sponsorBtn);
        setSponsorReq(!sponsorReq);
        budgetCalc();
    // =======================   SPONSOR   LAT / LON      ==========================
        const sponsorStringAddress = sponsorAddress + ',' + sponsorCity + ',' + sponsorState + ',' + sponsorPostal + ',' +  sponsorCountry;
        geocode(sponsorStringAddress).then(function(results) {
            console.log('sponsor address');
            console.log(({lat: results[1], lon: results[0]}));
            setSponsorLatLon(results);
        });

        const test = '13011, Kyle Seale Pkwy, San Antonio, TX, 78249, United States';
        geocode(test).then(function(results) {
            console.log('test address');
            console.log(results);
            console.log(({lat: results[1], lon: results[0]}));
            setTestLatLon(results)
        });

     const dist =
            getDistance(
          { latitude: 29.794141, longitude: -98.743591 },
            { latitude: 29.564572, longitude: -98.646396 }
            );

            const distanceInMiles = dist / 1609;
console.log(distanceInMiles)


    };
    // =======================      RADIUS      ==========================



    //============================      BUDGET CALC/ LEAGUE RETURN      =================
    const budgetCalc = () => {
        let sponsorBudgetBucket = sponsorBudget;

        for (let i = 0; i <= leagues.length; i++) {
            leagues.map(league => {
                if (((sponsorBudgetBucket - league.price) >= 0) && (!availableLeagues.includes(league.name))) {
                    sponsorBudgetBucket -= league.price;
                    availableLeagues.push(league)
                }
            });
        }
        setAvailable(!available);
    };



    // ========================     RETURN        ===============================
    return (
        <>

            {/*======== ALL LEAGUES ========*/}
            <Row className='align-items-center'>
                {available ?
                <h3>All Leagues</h3>
                :
                    <h3>Available Leagues</h3>
                }
                <Col className='text-right'>
                    <Button className='my-3' type='button' onClick={createLeagueHandler}>
                        + Add League
                    </Button>
                    <Button className='my-3 mx-1' type='button' onClick={sponsorBtnHandler}>
                        Find Leagues to Sponsor
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <p>{errorDelete}</p>}

            {loadingCreate && <Loader/>}
            {errorCreate && <p>{errorCreate}</p>}

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
                            {available ? (
                                <>
                                    <tbody>
                                    {leagues.map((league => (
                                        <tr key={league._id}>
                                            <td>{league.name}</td>
                                            <td>${league.price}</td>
                                            <td>{league.location.city}, {league.location.state}</td>
                                            <td>
                                                <Button variant='danger' className='btn-sm'
                                                        onClick={() => deleteHandler(league._id)}> x </Button>
                                            </td>
                                        </tr>
                                    )))}
                                    </tbody>
                                </>
                            ) : (
                                <>
                                    {/* LEAGUES W/IN SPONSOR BUDGET*/}
                                    <tbody>
                                    {availableLeagues.map((league => (
                                        <tr key={league._id}>
                                            <td>{league.name}</td>
                                            <td>${league.price}</td>
                                            <td>{league.location.city}, {league.location.state}</td>
                                        </tr>
                                    )))}
                                    </tbody>
                                </>
                            )}
                        </Table>
                    )
            }
            {/*======== SPONSOR FORM ========*/}
            {sponsorBtn && (
                <Col>
                    <>
                        <Form onSubmit={submitSponsorReqHandler}>
                            <h4>Enter Search Requirements</h4>
                            <i>( search for leagues within your budget and search radius )</i>
                            {/* BUDGET */}
                            <Form.Group controlId='budget'>
                                <Form.Label><strong>Budget</strong></Form.Label>
                                <Form.Control type='budget'
                                              placeholder='Enter budget'
                                              onChange={(e) => setSponsorBudget(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            {/* RADIUS */}
                            <Form.Group controlId='radius'>
                                <Form.Label><strong>Search Radius</strong><i>( in miles
                                    )</i></Form.Label>
                                <Form.Control type='radius'
                                              placeholder='Enter search radius'
                                              onChange={(e) => setSponsorRadius(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            {/* ADDRESS */}
                            <Form.Group controlId='address'>
                                <Form.Label><strong>Street Address</strong></Form.Label>
                                <Form.Control type='text'
                                              placeholder='Enter street address'
                                              onChange={(e) => setSponsorAddress(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            {/* CITY */}
                            <Form.Group controlId='city'>
                                <Form.Label><strong>City</strong></Form.Label>
                                <Form.Control type='text'
                                              placeholder='Enter city'
                                              onChange={(e) => setSponsorCity(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            {/* STATE */}
                            <Form.Group controlId='state'>
                                <Form.Label><strong>State</strong></Form.Label>
                                <Form.Control type='text'
                                              placeholder='Enter state'
                                              onChange={(e) => setSponsorState(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            {/* POSTAL CODE */}
                            <Form.Group controlId='postalCode'>
                                <Form.Label><strong>Zip Code</strong></Form.Label>
                                <Form.Control type='text'
                                              placeholder='Enter zip code'
                                              onChange={(e) => setSponsorPostal(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            {/* COUNTRY */}
                            <Form.Group controlId='country'>
                                <Form.Label><strong>Country</strong></Form.Label>
                                <Form.Control type='text'
                                              placeholder='Enter country'
                                              onChange={(e) => setSponsorCountry(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Button type='submit' variant='primary'>Search Leagues</Button>
                        </Form>
                    </>
                </Col>
            )}

            {/*======== SPONSOR SEARCH REQUIREMENTS ========*/}
            {sponsorReq ? (
                <>
                    <h5>Sponsor Search Requirements</h5>
                    <Table striped bordered hover responsive className='table-sm mb-5'>
                        <thead>
                        <tr>
                            <th>BUDGET</th>
                            <th>RADIUS</th>
                            <th>STARTING LOCATION</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>${sponsorBudget}</td>
                            <td>{sponsorRadius} miles</td>
                            <td>{sponsorAddress}, {sponsorState}</td>
                        </tr>
                        </tbody>
                    </Table>
                </>
            ) : ('')
            }
        </>
    )
};

    export default HomeScreen