import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import LoadingSpinner from '../../components/LoadingSpinner';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import FilterCard from './FilterCard'
import Aladin from './Aladin'
import FetchUCAC4 from '../../services/FetchUCAC4';

export default function UCAC4Page(props) {

    const [ my_state, my_dispatch] = useGlobalReducer()

    // https://stackoverflow.com/questions/61347860/using-aladin-lite-app-not-built-for-react-in-react-app
    let defaultSurvey = {survey: "P/DSS2/color"}
    let fov = my_state.aladin_fov
/*
    if (my_state.status_ucac4 !== "fetched") {
        //FetchUCAC4()
        return <LoadingSpinner/>
    }
*/
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col sm={3} md={3} lg={3}>
                        <h1>{my_state.status_ucac4}</h1>
                        <FilterCard/>

                    </Col>
                    <Col sm={9} md={9} lg={9}>
                        <Card>
                            <Aladin survey={my_state.selected_survey} data={my_state.fetched_ucac4}/>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}