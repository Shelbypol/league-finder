import axios from 'axios';
import {
    LEAGUE_LIST_SUCCESS,
    LEAGUE_LIST_REQUEST,
    LEAGUE_LIST_FAIL,
    LEAGUE_DETAILS_REQUEST,
    LEAGUE_DETAILS_SUCCESS,
    LEAGUE_DETAILS_FAIL,
    LEAGUE_CREATE_REQUEST,
    LEAGUE_CREATE_SUCCESS,
    LEAGUE_CREATE_FAIL,
    LEAGUE_CREATE_RESET,
} from '../constants/leagueConstants';

// ======================= LEAGUE LIST
export const listLeagues = () => async (dispatch) => {
    try {
        dispatch({ type: LEAGUE_LIST_REQUEST });

        const { data } = await axios.get(`/api/leagues`);

        dispatch ({
            type: LEAGUE_LIST_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: LEAGUE_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};


// ======================= LEAGUE DETAILS
export const listLeagueDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: LEAGUE_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/leagues/${id}`);

        dispatch ({
            type: LEAGUE_DETAILS_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type: LEAGUE_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};


// ======================== CREATE LEAGUE
export const createLeague = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LEAGUE_CREATE_REQUEST,
        });

        const { data } = await axios.post(`/api/leagues/`, {} ,config);

        dispatch({
            type: LEAGUE_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: LEAGUE_CREATE_FAIL,
            payload: message,
        })
    }
};
