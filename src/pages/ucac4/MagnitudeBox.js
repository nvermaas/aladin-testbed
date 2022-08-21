import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import { SET_MAGNITUDE_LIMIT } from '../../contexts/GlobalStateReducer'

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function MagnitudeBox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    // use if you want the search to start while you hit enter
        const handleKeyPress = (event) => {

        let magnitude_limit = event.target.value.toUpperCase()

        if (event.charCode === 13) {
            my_dispatch({type: SET_MAGNITUDE_LIMIT, magnitude_limit: magnitude_limit})

            // prevent the enter key to reload the whole page
            event.preventDefault()
        }

    }

    return <Form inline>
        <div>
            <FormControl
                type="text"
                //value= {my_state.magnitude_limit}
                placeholder= {my_state.magnitude_limit}
                className="mr-sm-1"
                onKeyPress={handleKeyPress}>
            </FormControl>
        </div>
        </Form>


}
