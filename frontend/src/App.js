import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import './App.css';
import HomeScreen from './screens/HomeScreen'

function App() {
    return (
        <Provider store={store}>
            <HomeScreen/>
        </Provider>
    );
}

export default App;
