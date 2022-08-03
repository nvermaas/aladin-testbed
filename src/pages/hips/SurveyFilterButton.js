import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { SET_SELECTED_SURVEY} from '../../contexts/GlobalStateReducer'

import { getSurveyIcon } from '../../utils/styling'

export default function SurveyFilterButton() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (survey) => {
        my_dispatch({type: SET_SELECTED_SURVEY, selected_survey: survey})
    }


    return <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            {getSurveyIcon()}&nbsp;HiPS Survey: {my_state.selected_survey}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleClick("P/DSS2/color")}>DSS colored</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("P/allWISE/color")}>allWISE (infrared)</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>


}