import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {RELOAD_ADEX, SET_COLLECTION} from '../../contexts/GlobalStateReducer'

export default function SelectCollectionButton() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (collection) => {
        my_dispatch({type: SET_COLLECTION, collection: collection})
        my_dispatch({type: RELOAD_ADEX, reload_adex: !my_state.reload_adex})
    }


    return <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            Collection: &nbsp;{my_state.collection}
        </Dropdown.Toggle>

        <Dropdown.Menu>

            <Dropdown.Item onClick={() => handleClick('apertif-imaging')}>apertif-imaging</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('apertif-timedomain')}>apertif-timedomain</Dropdown.Item>

        </Dropdown.Menu>
    </Dropdown>


}