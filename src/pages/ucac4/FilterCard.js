import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import { useGlobalReducer } from '../../contexts/GlobalContext';

import MagnitudeBox from './MagnitudeBox'

export default function FilterCard(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    return (
        <div className="App">
            <Card>

                <Card.Body align={"left"}>
                    <tr><td><h5>Number of stars</h5></td></tr>
                    <tr><td><MagnitudeBox/></td></tr>
                </Card.Body>
            </Card>
        </div>
    );

}

