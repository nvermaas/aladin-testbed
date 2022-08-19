import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { filterPlanets } from '../../utils/selection'
import { getBackspaceIcon } from '../../utils/styling'

import {
    SET_SELECTED_EXOPLANET,
    SET_FILTERED_EXOPLANETS,
    SHOW_PLANETLIST
} from '../../contexts/GlobalStateReducer'

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function MagnitudeBox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    let text_to_search

    function doFilter() {
        let filtered_exoplanets = filterPlanets(my_state.fetched_exoplanets, text_to_search, 5000)

        // execute the filter by dispatching it to the global state (Aladin will respond to that)...
        my_dispatch({type: SET_FILTERED_EXOPLANETS, filtered_exoplanets: filtered_exoplanets})

        if (filtered_exoplanets.length <= 50) {
            my_dispatch({type: SHOW_PLANETLIST, show_planetlist: true})
        } else {
            if (my_state.show_planetlist) {
                my_dispatch({type: SHOW_PLANETLIST, show_planetlist: false})
            }
        }
        return
    }

    const handleResetClick = (event) => {
        my_dispatch({type: SET_FILTERED_EXOPLANETS, filtered_exoplanets: my_state.fetched_exoplanets})
        my_dispatch({type: SHOW_PLANETLIST, show_planetlist: false})
    }

    // use if you want the search to start while you hit enter
        const handleKeyUp = (event) => {

        text_to_search = event.target.value.toUpperCase()

        //if (event.charCode === 13) {
            doFilter()

            // prevent the enter key to reload the whole page
            //event.preventDefault()
        //}

    }

    return <Form inline>
        <div>
            <FormControl
                type="text"
                placeholder={props.default}
                className="mr-sm-1"
                onKeyUp={handleKeyUp}>
            </FormControl>
        </div>

        </Form>


}
