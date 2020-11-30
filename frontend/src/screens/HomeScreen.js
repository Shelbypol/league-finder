import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import {Col, Row, Button, Table, Form} from 'react-bootstrap';
import {createLeague, listLeagues, deleteLeague} from '../actions/leagueActions';
import {LEAGUE_CREATE_RESET} from '../constants/leagueConstants';
import {geocode} from '../components/GeoLocate';
import {getDistance} from 'geolib';
import {haversineDistance} from '../components/GeoLocate';


const HomeScreen = ({history}) => {

    const [sponsorBtn, setSponsorBtn] = useState(false);
    const [sponsorReq, setSponsorReq] = useState(false);
    const [sponsorBudget, setSponsorBudget] = useState(0);
    const [sponsorRadius, setSponsorRadius] = useState(0);
    const [sponsorSubmit, setSponsorSubmit] = useState(false);

    const [sponsorAddress, setSponsorAddress] = useState('');
    const [sponsorCity, setSponsorCity] = useState('');
    const [sponsorState, setSponsorState] = useState('');
    const [sponsorPostal, setSponsorPostal] = useState('');
    const [sponsorCountry, setSponsorCountry] = useState('');

    const [sponsorLatLon, setSponsorLatLon] = useState(0);
    // const [sponsorLon, setSponsorLon] = useState(0);
    const [leagueLatLon, setLeagueLatLon] = useState(0);
    // const [leagueLon, setLeagueLon] = useState(0);
    const [distance, setDistance] = useState(0);

    const [available, setAvailable] = useState(true);
    const [availableBudgetLeagues, setAvailableBudgetLeagues] = useState([]);
    const [availableRadiusLeagues, setAvailableRadiusLeagues] = useState([]);
    const [finalLeagues, setFinalLeagues] = useState([]);

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

    }, [dispatch, history, successCreate, createdLeague, successDelete, finalLeagues, availableRadiusLeagues]);

    //============================      HANDLERS      ==================================

    // CREATE LEAGUE HANDLER
    const createLeagueHandler = () => {
        dispatch(createLeague())
    };

    // DELETE LEAGUE HANDLER
    const deleteHandler = (id) => {
        dispatch(deleteLeague(id));
    };

    // SPONSOR LEAGUE FORM HANDLER
    const sponsorBtnHandler = () => {
        setSponsorBtn(!sponsorBtn);

        if (sponsorReq === true) {
            setSponsorReq(false)
        }
        setAvailableBudgetLeagues([]);
        setAvailableRadiusLeagues([]);
        setFinalLeagues([]);
        setAvailable(true);

    };

    // SPONSOR INFO SUBMIT HANDLER

    const submitSponsorReqHandler = () => {
        setSponsorBtn(!sponsorBtn);
        setSponsorReq(!sponsorReq);
        whatever();
        // sponsorRequirements();
        budgetCalc();

        console.log('final');
        console.log(finalLeagues);
        console.log('budget');
        console.log(availableBudgetLeagues);
        console.log('radius');
        console.log(availableRadiusLeagues);
    };

    //====================================================================================
const whatever = () => {

    leagues.map((league) => {

        const sponsorStringAddress = sponsorAddress + ',' + sponsorCity + ',' + sponsorState + ',' + sponsorPostal + ',' + sponsorCountry;
        geocode(sponsorStringAddress).then(function (results) {
            const sponsorCoords =(results);
            // const sponsorLonCoord =(results[0]);

            let leagueStringAddress = league.location.address + ',' + league.location.city + ',' + league.location.state + ',' + league.location.postalCode + ',' + league.location.country;
            geocode(leagueStringAddress).then(function (results) {
                const leagueCoords =(results);
                // const leagueLonCoord =(results[0]);

                // if ((
                //     getDistance(
                //         {latitude: sponsorLatCoord, longitude: sponsorLonCoord},
                //         {latitude: leagueLatCoord, longitude: leagueLonCoord}
                //     ) / 1609 <= sponsorRadius) && (!availableRadiusLeagues.includes(league.name))) {
                //     availableRadiusLeagues.push(league)
                // }
    haversineDistance(sponsorCoords, leagueCoords);

        finalLeagues.push(availableRadiusLeagues.filter(element => availableBudgetLeagues.includes(element)));

            });
        });
    });


};



    //==================================================================================

    // const sponsorRequirements = () => {
    //     sponsorCoords();
    //     leagues.map((league) => {
    //         leagueCoords(league);
    //         if ((distance <= sponsorRadius) && (!availableRadiusLeagues.includes(league.name))) {
    //             availableRadiusLeagues.push(league)
    //         }
    //     });
    //     finalLeagues.push(availableRadiusLeagues.filter(element => availableBudgetLeagues.includes(element)));
    //
    //     console.log('final');
    //     console.log(finalLeagues);
    //     console.log('budget');
    //     console.log(availableBudgetLeagues);
    //     console.log('radius');
    //     console.log(availableRadiusLeagues);
    // };
    //
    // // SPONSOR COORDS
    // const sponsorCoords = () => {
    //     const sponsorStringAddress = sponsorAddress + ',' + sponsorCity + ',' + sponsorState + ',' + sponsorPostal + ',' + sponsorCountry;
    //     geocode(sponsorStringAddress).then(function (results) {
    //         setSponsorLat(results[1]);
    //         setSponsorLon(results[0]);
    //     });
    // };
    //
    // // LEAGUE COORDS
    // const leagueCoords = (league) => {
    //     let leagueStringAddress = league.location.address + ',' + league.location.city + ',' + league.location.state + ',' + league.location.postalCode + ',' + league.location.country;
    //     geocode(leagueStringAddress).then(function (results) {
    //         setLeagueLat(results[1]);
    //         setLeagueLon(results[0]);
    //         const radius = (
    //             getDistance(
    //                 {latitude: sponsorLat, longitude: sponsorLon},
    //                 {latitude: leagueLat, longitude: leagueLon}
    //             ) / 1609);
    //         setDistance(radius);
    //         calcDistance(sponsorLat, sponsorLon, leagueLat, leagueLon)
    //     });
    // };
    //
    // // DISTANCE
    // const calcDistance = (sponsorLat, sponsorLon, leagueLat, leagueLon) => {
    //     console.log('sponsor lat before: ' + sponsorLat);
    //     console.log('league lat before' + leagueLat);
    //     const radius = (
    //         getDistance(
    //             {latitude: sponsorLat, longitude: sponsorLon},
    //             {latitude: leagueLat, longitude: leagueLon}
    //         ) / 1609);
    //     console.log('radius: ' + radius);
    //     setDistance(radius);
    //     console.log('state dist after: ' + distance);
    //     // console.log(distance)
    // };

    // =======================   SPONSOR DISTANCE/BUDGET CALC     ==========================

    //
    // =======================   copy of SPONSOR DISTANCE/BUDGET CALC     ==========================

    // const sponsorRequirements = () => {
    //     let sponsorLatVar = 0;
    //     let sponsorLonVar = 0;
    //     let leagueLatVar = 0;
    //     let leagueLonVar = 0;
    //     let leagueStringAddress = '';
    //
    //     const sponsorStringAddress = sponsorAddress + ',' + sponsorCity + ',' + sponsorState + ',' + sponsorPostal + ',' + sponsorCountry;
    //
    //     geocode(sponsorStringAddress).then(function (results) {
    //         sponsorLatVar = results[1];
    //         sponsorLonVar = results[0];
    //
    //         leagues.map(league => {
    //
    //             leagueStringAddress = league.location.address + ',' + league.location.city + ',' + league.location.state + ',' + league.location.postalCode + ',' + league.location.country;
    //
    //             geocode(leagueStringAddress).then(function (results) {
    //                 leagueLatVar = results[1];
    //                 leagueLonVar = results[0];
    //
    //                 const distance = (
    //                     getDistance(
    //                         {latitude: sponsorLatVar, longitude: sponsorLonVar},
    //                         {latitude: leagueLatVar, longitude: leagueLonVar}
    //                     ) / 1609);
    //
    //                 if((distance <= sponsorRadius) && (!availableRadiusLeagues.includes(league))) {
    //                    availableRadiusLeagues.push(league);
    //                 }
    //                     finalLeagues.push(availableRadiusLeagues.filter(element => availableBudgetLeagues.includes(element)));
    //             });
    //         });
    //     });
    // };

    //=======================      BUDGET CALC    =================
    const budgetCalc = () => {
        let sponsorBudgetBucket = sponsorBudget;

        leagues.map(league => {
            if (((sponsorBudgetBucket - league.price) >= 0) && (!availableBudgetLeagues.includes(league.name))) {
                sponsorBudgetBucket -= league.price;
                return availableBudgetLeagues.push(league)
            }
        });
        setAvailable(!available);
    };

    // ========================    RETURN        ===============================
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
                                {available &&
                                (<th> </th>)
                                }
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

                                    {finalLeagues.map((league => (

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