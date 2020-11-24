import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Container} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import { LEAGUE_UPDATE_RESET } from '../constants/leagueConstants';
import {listLeagueDetails, updateLeague} from "../actions/leagueActions";


const AddLeagueScreen = ({ match, history }) => {
    const leagueId = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postal, setPostal] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();

    const leagueDetails = useSelector(state => state.leagueDetails);
    const { loading, error, league } = leagueDetails;

    const leagueUpdate = useSelector(state => state.leagueUpdate);
    const { loading: loadingUpdate, error: errorUpdate , success: successUpdate } = leagueUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: LEAGUE_UPDATE_RESET});
            history.push('/');
        } else {
                setName(league.name);
                setPrice(league.price);
                setCity(league.city);
                setAddress(league.address);
                setPostal(league.postalCode);
                setCountry(league.country);

        }
    }, [league, dispatch, leagueId, history, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateLeague({
                _id: leagueId,
                name,
                price,
                location: {
                    address,
                    city,
                    postal,
                    country
                }
            }))
    };

    return (
        <>
            <Link to='/' className='btn btn-light my-3'>
                Go Back
            </Link>
            <Container>
                <h1>Add League</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <p>{errorUpdate}</p> }
                {loading && <Loader />}
                {loading && <p>{error}</p> }
                {loading ? <Loader/> : error ? <p>{error}</p> : (

                    <Form onSubmit={submitHandler}>
                        {/* NAME */}
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name'
                                          placeholder='Enter name'
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        {/* PRICE */}
                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='price'
                                          placeholder='Enter price'
                                          value={price}
                                          onChange={(e) => setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        {/* ADDRESS */}
                        <Form.Group controlId='address'>
                            <Form.Label>Street Address</Form.Label>
                            <Form.Control type='text'
                                          placeholder='Enter street address'
                                          value={address}
                                          onChange={(e) => setAddress(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        {/* CITY */}
                        <Form.Group controlId='city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control type='text'
                                          placeholder='Enter city'
                                          value={city}
                                          onChange={(e) => setCity(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        {/* POSTAL CODE */}
                        <Form.Group controlId='postalCode'>
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control type='text'
                                          placeholder='Enter zip code'
                                          value={postal}
                                          onChange={(e) => setPostal(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        {/* COUNTRY */}
                        <Form.Group controlId='country'>
                            <Form.Label>Country</Form.Label>
                            <Form.Control type='text'
                                          placeholder='Enter country'
                                          value={country}
                                          onChange={(e) => setCountry(e.target.value)}>
                            </Form.Control>
                        </Form.Group>


                        <Button type='submit' variant='primary'>Add League</Button>
                    </Form>
                ) }
            </Container>
        </>

    )
};

export default AddLeagueScreen