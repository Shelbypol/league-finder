import React from 'react';
import { Card } from 'react-bootstrap'

const League = ({ league }) => {

    return (
        <Card className='my-3 p-3 rounded'>
            <Card.Body>
                <Card.Title as='div'>
                    <strong>
                        {league.name}
                    </strong>
                </Card.Title>
                <Card.Text as='h3'>
                    ${league.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
};

export default League