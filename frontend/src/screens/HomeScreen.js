import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import League from '../components/League';
import Loader from '../components/Loader';
import {Col, Row} from 'react-bootstrap';
import {listLeagues} from '../actions/leagueActions';

const HomeScreen = () => {

    const dispatch = useDispatch();

    const leagueList = useSelector(state => state.leagueList);
    const {loading, error, leagues} = leagueList;

    useEffect(() => {
        dispatch(listLeagues());
    }, [dispatch]);


    return (
        <>
            <h1>Leagues</h1>
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
        </>
    )
};

export default HomeScreen