import {
    LEAGUE_LIST_REQUEST,
    LEAGUE_LIST_SUCCESS,
    LEAGUE_LIST_FAIL,
    LEAGUE_DETAILS_REQUEST,
    LEAGUE_DETAILS_SUCCESS,
    LEAGUE_DETAILS_FAIL,
    LEAGUE_CREATE_REQUEST,
    LEAGUE_CREATE_SUCCESS,
    LEAGUE_CREATE_FAIL,
    LEAGUE_CREATE_RESET,
} from '../constants/leagueConstants';

// LEAGUE LIST REDUCER
export const leagueListReducer = (state = { leagues: [] }, action) => {
    switch(action.type){
        case LEAGUE_LIST_REQUEST:
            return { loading: true };
        case LEAGUE_LIST_SUCCESS:
            return { loading: false, leagues: action.payload };
        case LEAGUE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// LEAGUE DETAILS REDUCER
export const leagueDetailsReducer = (state = { league: {} }, action) => {
    switch(action.type){
        case LEAGUE_DETAILS_REQUEST:
            return { loading: true, ...state };
        case LEAGUE_DETAILS_SUCCESS:
            return { loading: false, league: action.payload };
        case LEAGUE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state
    }
};


// LEAGUE CREATE REDUCER
export const leagueCreateReducer = (state = {}, action) => {
    switch(action.type){
        case LEAGUE_CREATE_REQUEST:
            return { loading: true };
        case LEAGUE_CREATE_SUCCESS:
            return { loading: false, success: true, league: action.payload };
        case LEAGUE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case LEAGUE_CREATE_RESET:
            return {};
        default:
            return state
    }
};

