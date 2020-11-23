import {
    LEAGUE_LIST_REQUEST,
    LEAGUE_LIST_SUCCESS,
    LEAGUE_LIST_FAIL,
} from "../constants/leagueConstants";


export const leagueListReducer = (state = { leagues: [] }, action) => {
    switch(action.type){
        case LEAGUE_LIST_REQUEST:
            return { loading: true, leagues: [] };
        case LEAGUE_LIST_SUCCESS:
            return { loading: false, leagues: action.payload.leagues };
        case LEAGUE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

