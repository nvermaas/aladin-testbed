import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {RELOAD_ADEX, SET_DATAPRODUCT_TYPE} from '../../contexts/GlobalStateReducer'

export default function SelectDataProductTypeButton() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (dataproduct_type) => {
        my_dispatch({type: SET_DATAPRODUCT_TYPE, dataproduct_type: dataproduct_type})
        my_dispatch({type: RELOAD_ADEX, reload_adex: !my_state.reload_adex})
    }


    return <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            Dataproduct Type: &nbsp;{my_state.dataproduct_type}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleClick('all')}>all</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('image')}>image</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('cube')}>cube</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('timeSeries')}>timeSeries</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('visibilities')}>visibilities</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>


}