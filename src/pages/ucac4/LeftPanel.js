import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { toHMSLabel, toFOVLabel } from '../../utils/coordinates'
import MagnitudeBox from './MagnitudeBox'

export default function LeftPanel(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const renderRADec = (ra,dec) => {
        let ra_label = Number(ra.toFixed(2))
        let dec_label = Number(dec.toFixed(2))
        let radec_label = ra_label + ', ' + dec_label
        return <div>{toHMSLabel(radec_label)} </div>
    }

    return (
        <div className="App">
            <Card>

                <Card.Body align={"left"}>
                     <tr><td><h5>{my_state.status_ucac4}</h5></td></tr>
                    <tr><td><h5>Number of stars: {my_state.number_of_stars}</h5></td></tr>
                    <td>{renderRADec(my_state.aladin_ra, my_state.aladin_dec)}</td>
                    <tr><td><MagnitudeBox/></td></tr>
                </Card.Body>
            </Card>
        </div>
    );

}

