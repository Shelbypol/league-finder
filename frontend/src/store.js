import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {leagueListReducer} from "./reducers/leagueReducer";

const reducer = combineReducers({
    leagueList: leagueListReducer
});

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware( ...middleware ))
);

export default store;