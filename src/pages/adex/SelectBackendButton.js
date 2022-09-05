import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {RELOAD_ADEX, SET_ADEX_BACKEND_URL} from '../../contexts/GlobalStateReducer'

export default function SelectBackendButton() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (adex_backend_url) => {
        my_dispatch({type: SET_ADEX_BACKEND_URL, adex_backend_url: adex_backend_url})
        my_dispatch({type: RELOAD_ADEX, reload_adex: !my_state.reload_adex})
    }


    return <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            &nbsp;{my_state.adex_backend_url[0]}
        </Dropdown.Toggle>

        <Dropdown.Menu>

            <Dropdown.Item onClick={() => handleClick(['localhost:8000','http://localhost:8000'])}>localhost:8000 (dev)</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick(['sdc-dev.astron.nl','https://sdc-dev.astron.nl'])}>sdc-dev (test)</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick(['sdc.astron.nl','https://sdc.astron.nl'])}>sdc (production)</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick(['SURF Research Cloud (psycopg2)','http://145.38.187.31'])}>SURF Research Cloud (dev)</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>


}