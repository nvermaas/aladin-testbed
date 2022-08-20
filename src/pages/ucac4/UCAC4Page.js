import React, {useEffect} from "react";
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import LoadingSpinner from '../../components/LoadingSpinner';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import LeftPanel from './LeftPanel'
import Aladin from './Aladin'
import FetchUCAC4 from '../../services/FetchUCAC4';

export default function UCAC4Page(props) {

    const [ my_state, my_dispatch] = useGlobalReducer()

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
                        <LeftPanel/>

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