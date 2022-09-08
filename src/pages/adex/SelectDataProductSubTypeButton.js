import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {RELOAD_ADEX, SET_DATAPRODUCT_SUBTYPE} from '../../contexts/GlobalStateReducer'

export default function SelectDataProductSubTypeButton() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (dataproduct_subtype) => {
        my_dispatch({type: SET_DATAPRODUCT_SUBTYPE, dataproduct_subtype: dataproduct_subtype})
        my_dispatch({type: RELOAD_ADEX, reload_adex: !my_state.reload_adex})
    }


    return <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            Dataproduct SubType: &nbsp;{my_state.dataproduct_subtype}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleClick('all')}>all</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('continuumChunk')}>continuumChunk</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('continuumMF')}>continuumMF</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('calibratedImage')}>calibratedImage</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('polarisationImage')}>polarisationImage</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('lineCube')}>lineCube</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('continuumCube')}>continuumCube</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('polarizationCube')}>polarizationCube</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('uncalibratedVisibility')}>uncalibratedVisibility</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('calibratedVisibility')}>calibratedVisibility</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('compressedUncalibratedVisibility')}>compressedUncalibratedVisibility</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('splitttedUncalibratedVisibility')}>splitttedUncalibratedVisibility</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('uncalibratedVisibility')}>uncalibratedVisibility</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('pulsarTimingTimeSeries')}>pulsarTimingTimeSeries</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>


}