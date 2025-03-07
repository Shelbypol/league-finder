import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { leagueListReducer, leagueCreateReducer, leagueDetailsReducer, leagueUpdateReducer, leagueDeleteReducer  } from './reducers/leagueReducers';

const reducer = combineReducers({
    leagueList: leagueListReducer,
    leagueDetails: leagueDetailsReducer,
    leagueCreate: leagueCreateReducer,
    leagueUpdate: leagueUpdateReducer,
    leagueDelete: leagueDeleteReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware( ...middleware ))
);

export default store;