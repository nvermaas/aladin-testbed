import React from 'react';

import { useGlobalReducer } from '../../contexts/GlobalContext'
import { SET_SELECTED, ALADIN_RA, ALADIN_DEC, ALADIN_FOV } from '../../contexts/GlobalStateReducer'

const Aladin = (props) => {
    const [ my_state , my_dispatch] = useGlobalReducer()

    React.useEffect(() => {

        let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov:60 })
        aladin.setFov(parseFloat(my_state.aladin_fov))
        aladin.gotoRaDec(my_state.aladin_ra, my_state.aladin_dec)

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
                    my_dispatch({type: SET_SELECTED, selected: object.data.planet})
                } catch (e) {
                }
            }
        });

    }, [my_state.filtered_exoplanets, my_state.aladin_reload])


    const addCirclesToOverlay = (my_overlay, object, color) => {
        my_overlay.add(window.A.circle(object.ra, object.dec,0.5, {color: color, lineWidth: 2}));
    }

    // create the catalog layer
    const createLayers = (aladin, data) => {
        aladin.removeLayers()

        //let overlay_single_planet = window.A.graphicOverlay({name: 'single planet',color: 'yellow', lineWidth: 3});
        //aladin.addOverlay(overlay_single_planet);

        let overlay_multiple_planets = window.A.graphicOverlay({name: 'multiple planets',color: 'green', lineWidth: 5});
        aladin.addOverlay(overlay_multiple_planets);

        let my_catalog = window.A.catalog({
            name: 'Exoplanets',
            shape : 'circle',
            color : 'red',
            sourceSize: 20,
            labelColumn: 'planet',
            displayLabel: true,
            onClick: 'showPopup'});
            //onClick: 'showTable'});

        // loop through all the objects and add them to the appropriate layer based a property
        if (data) {
            data.forEach(function (object) {

                //if (object.sy_pnum===1) {
                //    addCirclesToOverlay(overlay_single_planet, object, "yellow")
                //} else

                if (object.sy_pnum>1) {
                    addCirclesToOverlay(overlay_multiple_planets, object, "green")
                }

                // draw a clickable icon for each observation
                addToCatalog(my_catalog, object)
            })

            aladin.addCatalog(my_catalog);

            // add Simbad catalog
            //aladin.addCatalog(window.A.catalogFromSimbad('m45', 0.2, {shape: 'plus', color : '#5d5', onClick: 'showTable'}));

        }
    }

    const addToCatalog = (my_catalog, object) => {
        let url = "https://uilennest.net/my_astrobase/exoplanets/?soltype__icontains=confirmed&hostname__icontains="+object.hostname
        let name = object.pl_name.replace(' ','_')
        //let url = "http://exoplanet.eu/catalog/"+name

        let source = [window.A.source(
            object.ra,
            object.dec,

            {
                planet: object.pl_name,
                star: object.hostname,
                nr_planets : object.sy_pnum,
                popupTitle: '<a href="'+url+'" target="_blank">'+object.pl_name+'</a>',
                popupDesc: '<hr>Planets: '+ object.sy_pnum,
            },

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