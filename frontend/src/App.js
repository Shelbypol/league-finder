import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import AddLeagueScreen from './screens/AddLeagueScreen'

function App() {
    return (
        <Router>
            <main className='py-3'>
                <Container>
                    <Route path='/addleague/:id' component={AddLeagueScreen} />
                    <Route path='/' component={HomeScreen} exact/>
                </Container>
            </main>
        </Router>
    );
}

export default App;
