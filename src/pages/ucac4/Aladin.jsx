import React from 'react';

import { useGlobalReducer } from '../../contexts/GlobalContext'
import { SET_SELECTED_EXOPLANET, ALADIN_RA, ALADIN_DEC, ALADIN_FOV } from '../../contexts/GlobalStateReducer'

const Aladin = (props) => {
    const [ my_state , my_dispatch] = useGlobalReducer()

    var myFilterFunction = function(source) {
        var magnitude  = parseFloat(source.data['VTmag']);
        if (isNaN(magnitude))  {
            return true;
        }
        let visible = magnitude < parseFloat(my_state.magnitude_limit)
        return visible
    }

    React.useEffect(() => {

        let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov:60 })
        aladin.setFov(parseFloat(my_state.aladin_fov))
        aladin.gotoRaDec(my_state.aladin_ra, my_state.aladin_dec)

        aladin.setImageSurvey(my_state.selected_survey)

        // create the catalog layer
        createLayers(aladin, props.data)

        // add a listener to aladin
        // define function triggered when  a source is hovered
        aladin.on('objectHovered', function(object) {

            // when an object is hovered, store the ra,dec,fov in the global state
            // (because I found no better or more accurate way of doing this).

            let radec = aladin.getRaDec()
            my_dispatch({type: ALADIN_RA, aladin_ra: radec[0]})
            my_dispatch({type: ALADIN_DEC, aladin_dec: radec[1]})

            let fov = aladin.getFov()
            my_dispatch({type: ALADIN_FOV, aladin_fov: fov[0]})

            if (object) {
                try {
                    // select the object under the mouse cursor, and store it in global state
                    my_dispatch({type: SET_SELECTED_EXOPLANET, selected_exoplanet: object.data.planet})
                } catch (e) {
                }
            }
        });

    }, [my_state.selected_survey, my_state.fetched_ucac4, my_state.magnitude_limit, my_state.aladin_reload])


    const addCirclesToOverlay = (my_overlay, object, color, size) => {
        my_overlay.add(window.A.circle(object.ra, object.dec,size, {color: color, lineWidth: 2}));
    }

    // create the catalog layer
    const createLayers = (aladin, data) => {
        aladin.removeLayers()

        let my_catalog = window.A.catalog({
            name: 'UCAC4',
            shape : 'circle',
            color : 'red',
            sourceSize: 20,
            labelColumn: 'star',
            displayLabel: true,
            onClick: 'showPopup'});
            //onClick: 'showTable'});

        // loop through all the objects and add them to the appropriate layer based a property
        if (data) {
            data.forEach(function (object) {

                // draw a clickable icon for each observation
                addToCatalog(my_catalog, object)
            })

            aladin.addCatalog(my_catalog);

        }
    }

    const addToCatalog = (my_catalog, object) => {
        let source = [window.A.source(
            object.ra,
            object.dec,
        )]

        my_catalog.addSources(source);
    }

    return (
        <div>
            <div id='aladin-lite-div' className="aladin"  />
        </div>
    )
}

export default Aladin