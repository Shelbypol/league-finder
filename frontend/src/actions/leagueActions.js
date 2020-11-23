import axios from 'axios';
import {
    LEAGUE_LIST_SUCCESS,
    LEAGUE_LIST_REQUEST,
    LEAGUE_LIST_FAIL
} from '../constants/leagueConstants';

// LEAGUE LIST
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
