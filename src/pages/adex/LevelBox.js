import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import {RELOAD_ADEX, SET_LEVEL} from '../../contexts/GlobalStateReducer'

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function LevelBox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    // use if you want the search to start while you hit enter
        const handleKeyPress = (event) => {

        let level = event.target.value.toUpperCase()

        if (event.charCode === 13) {
            my_dispatch({type: SET_LEVEL, level: level})
            my_dispatch({type: RELOAD_ADEX, reload_adex: !my_state.reload_adex})

            // prevent the enter key to reload the whole page
            event.preventDefault()
        }

    }

    return <Form inline>
        <div>
            <FormControl
                type="text"
                placeholder= {my_state.level}
                className="mr-sm-1"
                onKeyPress={handleKeyPress}>
            </FormControl>
        </div>
        </Form>
}
