import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'

function App() {
    return (
        <Router>
            <main className='py-3'>
                <Container>
                    <Route path='/' component={HomeScreen} />
                </Container>
            </main>
        </Router>
    );
}

export default App;
