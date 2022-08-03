import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import { useGlobalReducer } from '../../contexts/GlobalContext';

import CatalogFilterButton from './CatalogFilterButton'
import SurveyFilterButton from './SurveyFilterButton'

export default function FilterCard(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    return (
        <div className="App">
            <Card>

                <Card.Body>
                    <tr><td><h5>Select HiPS Survey and Catalog</h5></td></tr>
                    <tr><td><CatalogFilterButton year="All" /></td></tr>
                    <tr><td><SurveyFilterButton year="All" /></td></tr>
                </Card.Body>
            </Card>
        </div>
    );

}

