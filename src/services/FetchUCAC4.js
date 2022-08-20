import React, {useState, useEffect} from 'react';
import {useGlobalReducer} from '../contexts/GlobalContext';
import {
    SET_STATUS_UCAC4,
    SET_FETCHED_UCAC4,
} from '../contexts/GlobalStateReducer';


export default function FetchUCAC4() {
    // use global state
    const [my_state, my_dispatch] = useGlobalReducer()

    useEffect(() => {
            fetchStars()
        }, []
    );

    const fetchStars = () => {

        let ra_min = my_state.aladin_ra - (my_state.aladin_fov / 2)
        let ra_max = my_state.aladin_ra + (my_state.aladin_fov / 2)
        let dec_min = my_state.aladin_dec - (my_state.aladin_fov / 2)
        let dec_max = my_state.aladin_dec + (my_state.aladin_fov / 2)

        //const url = "http://192.168.178.37:8010/stars/"
        const url = "http://192.168.178.37:8010/stars_rectangle/?ra_min=" + ra_min.toString() + "&ra_max=" + ra_max.toString() + "&dec_min=" + dec_min.toString() + "&dec_max=" + dec_max.toString()
        if (my_state.status_ucuc4 !== 'fetching') {

            my_dispatch({type: SET_STATUS_UCAC4, status_ucuc4: 'fetching'})

            fetch(url)
                .then(results => {

                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_UCAC4, fetched_ucac4: data})
                    my_dispatch({type: SET_STATUS_UCAC4, status_ucuc4: 'fetched'})
                })
                .catch(function () {
                    my_dispatch({type: SET_STATUS_UCAC4, status_ucuc4: 'failed'})
                    alert("fetch to " + url + " failed.");
                })
        }
    }

}