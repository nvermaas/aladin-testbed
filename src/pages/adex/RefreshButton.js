import React from 'react';
import { Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {RELOAD_ADEX, SET_STATUS_ADEX} from '../../contexts/GlobalStateReducer'

import { getReloadIcon } from '../../utils/styling'

export default function RefreshButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = () => {
        my_dispatch({type: SET_STATUS_ADEX, status_adex: 'unfetched'})
        my_dispatch({type: RELOAD_ADEX, reload_adex: !my_state.reload_adex})
    }

    return <Button variant="outline-primary" onClick={() => handleClick()}>{getReloadIcon()}&nbsp;Reload Data</Button>
}