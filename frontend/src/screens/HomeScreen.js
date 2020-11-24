import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import League from '../components/League';
import Loader from '../components/Loader';
import {Col, Row, Button } from 'react-bootstrap';
import {createLeague, listLeagues} from '../actions/leagueActions';
import {LEAGUE_CREATE_RESET} from '../constants/leagueConstants';

const HomeScreen = ({ history }) => {

    const dispatch = useDispatch();

    const leagueList = useSelector(state => state.leagueList);
    const {loading, error, leagues} = leagueList;


    const leagueCreate = useSelector(state => state.leagueCreate);
    const {loading: loadingCreate, error: errorCreate, success: successCreate, league: createdLeague} = leagueCreate;


    useEffect(() => {
        dispatch(listLeagues());

        dispatch({ type: LEAGUE_CREATE_RESET });

        if(successCreate){
            history.push(`/addleague/${createdLeague._id}`)
        }

    }, [dispatch, history, successCreate, createdLeague]);

    const createLeagueHandler = () => {
        dispatch(createLeague())
    };

    return (
        <>
            <h1>Available Leagues</h1>
            {loading ?
                (<Loader/>)
                : error ?
                    ( <p> {error} </p> )
                    :
                    (
                        <Row>
                            {leagues.map(league => (
                                <Col key={league._id} sm={12} md={6} lg={4}>
                                    <League league={league} />
                                </Col>
                            ))}
                        </Row>
                    )
            }
            <>
                <Row className='align-items-center'>
                    <Col className='text-right'>
                        <Button className='my-3' onClick={createLeagueHandler}>
                            <i className='fas fa-plus'> </i> Add League
                        </Button>
                    </Col>
                </Row>
            </>
        </>
    )
};

export default HomeScreen