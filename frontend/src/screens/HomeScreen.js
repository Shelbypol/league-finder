import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import {Col, Row, Button, Table, Form} from 'react-bootstrap';
import {createLeague, listLeagues, deleteLeague} from '../actions/leagueActions';
import {LEAGUE_CREATE_RESET} from '../constants/leagueConstants';
import {geocode} from '../components/GeoLocate';
import {getDistance} from 'geolib';


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

    // const [leagueAddress, setLeagueAddress] = useState('');
    // const [leagueCity, setLeagueCity] = useState('');
    // const [leagueState, setLeagueState] = useState('');
    // const [leaguePostal, setLeaguePostal] = useState('');
    // const [leagueCountry, setLeagueCountry] = useState('');

    const [available, setAvailable] = useState(true);
    const [availableBudgetLeagues, setAvailableBudgetLeagues] = useState([]);
    const [availableRadiusLeagues, setAvailableRadiusLeagues] = useState([]);
    const [finalLeagues, setFinalLeagues] = useState([]);

    const [distance, setDistance] = useState(0);

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


    }, [dispatch, history, successCreate, createdLeague, successDelete, finalLeagues]);

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

        setAvailableBudgetLeagues([]);
        setAvailableRadiusLeagues([]);
        setAvailable(true);

    };

    // SPONSOR INFO SUBMIT HANLDER
    const submitSponsorReqHandler = () => {
        setSponsorBtn(!sponsorBtn);
        setSponsorReq(!sponsorReq);
        sponsorRequirements();
        budgetCalc();
        // compare();
        finalLeagues.push(availableRadiusLeagues.filter(element => availableBudgetLeagues.includes(element)));
        // console.log('final');
        // console.log(finalLeagues);
        // console.log('budget');
        // console.log(availableBudgetLeagues);
        // console.log('radius');
        // console.log(availableRadiusLeagues);
    };


    // =======================   SPONSOR DISTANCE/BUDGET CALC     ==========================
    const sponsorRequirements = () => {
        let sponsorLat = 0;
        let sponsorLon = 0;
        let leagueLat = 0;
        let leagueLon = 0;
        let leagueStringAddress = '';

        const sponsorStringAddress = sponsorAddress + ',' + sponsorCity + ',' + sponsorState + ',' + sponsorPostal + ',' + sponsorCountry;

        geocode(sponsorStringAddress).then(function (results) {
            sponsorLat = results[1];
            sponsorLon = results[0];

            leagues.map(league => {

                leagueStringAddress = league.location.address + ',' + league.location.city + ',' + league.location.state + ',' + league.location.postalCode + ',' + league.location.country;

                geocode(leagueStringAddress).then(function (results) {
                    leagueLat = results[1];
                    leagueLon = results[0];

                    const distance = (
                        getDistance(
                            {latitude: sponsorLat, longitude: sponsorLon},
                            {latitude: leagueLat, longitude: leagueLon}
                        ) / 1609
                    );

                    if (distance <= sponsorRadius) {
                        return availableRadiusLeagues.push(league);
                        // console.log('league');
                        // console.log(league.name);
                        // console.log(league.location.address);
                        // console.log(distance);
                    }
                });
            });
            console.log(availableRadiusLeagues)
        });
    };

    //=======================      BUDGET CALC    =================
    const budgetCalc = () => {
        let sponsorBudgetBucket = sponsorBudget;

        // for (let i = 0; i <= leagues.length; i++) {
        leagues.map(league => {
            if (((sponsorBudgetBucket - league.price) >= 0) && (!availableBudgetLeagues.includes(league.name))) {
                sponsorBudgetBucket -= league.price;
                return availableBudgetLeagues.push(league)
            }
        });
        // }
        setAvailable(!available);
    };

    //=======================      FINAL BUDGET / LEAGUE ARRAY COMPARE      =================

    // const compare = () => {
    //     availableRadiusLeagues.forEach( (e1) => availableBudgetLeagues.forEach((e2) => {
    //         if(e1 === e2){
    //             finalLeagues.push(e1)
    //         }
    //     }));

    // const intersection = availableRadiusLeagues.filter(element => availableBudgetLeagues.includes(element));

    // console.log('final');
    // console.log(finalLeagues);
    // console.log('budget');
    // console.log(availableBudgetLeagues);
    // console.log('radius');
    // console.log(availableRadiusLeagues);
    // return finalLeagues;
    // };

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
                                (<th></th>)
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
                                    {availableBudgetLeagues.map((league => (
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