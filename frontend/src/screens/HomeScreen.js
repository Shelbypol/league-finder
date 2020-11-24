import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import {Col, Row, Button, Table } from 'react-bootstrap';
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
        } else {
            dispatch(listLeagues())
        }

    }, [dispatch, history, successCreate, createdLeague]);

    const createLeagueHandler = () => {
        dispatch(createLeague())
    };

    return (
        <>
            <h1>All Available Leagues</h1>
                <Row className='align-items-center'>
                    <Col className='text-right'>
                        <Button className='my-3' onClick={createLeagueHandler}>
                            <i className='fas fa-plus'> </i> Add League
                        </Button>
                    </Col>
                </Row>
            {loading ?
                (<Loader/>)
                : error ?
                    ( <p> {error} </p> )
                    :
                    (

                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>NAME</th>
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
                                    {/*<td>*/}
                                        {/*<LinkContainer to={`/admin/product/${product._id}/edit`}>*/}
                                        {/*    <Button variant='light' className='btn-sm'>*/}
                                        {/*        <i className='fas fa-edit'> </i>*/}
                                        {/*    </Button>*/}
                                        {/*</LinkContainer>*/}

                                        {/*<Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(product._id)}>*/}
                                        {/*    <i className='fas fa-trash'> </i>*/}
                                        {/*</Button>*/}

                                    {/*</td>*/}
                                </tr>
                            )))}
                            </tbody>
                        </Table>

                    )
            }
        </>
    )
};

export default HomeScreen