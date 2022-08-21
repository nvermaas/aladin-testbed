import React, {useState, useEffect} from 'react';
import {useGlobalReducer} from '../contexts/GlobalContext';
import {
    SET_STATUS_UCAC4,
    SET_FETCHED_UCAC4,
    SET_NUMBER_OF_STARS
} from '../contexts/GlobalStateReducer';


export default function FetchUCAC4() {
    // use global state
    const [my_state, my_dispatch] = useGlobalReducer()

    useEffect(() => {
            fetchStars()
        }, [my_state.magnitude_limit, my_state.reload_ucac4]
    );

    const fetchStars = () => {
        let d = (my_state.aladin_fov / 2)
        let ra_min = Number(my_state.aladin_ra) - d
        let ra_max = Number(my_state.aladin_ra) + d
        let dec_min = Number(my_state.aladin_dec) - d
        let dec_max = Number(my_state.aladin_dec) + d

        //const url = "http://192.168.178.37:8010/stars/"
        //const url = "http://192.168.178.37:8010/stars_rectangle/?ra_min=" + ra_min.toString() + "&ra_max=" + ra_max.toString() + "&dec_min=" + dec_min.toString() + "&dec_max=" + dec_max.toString() + "&limit=10000"
        let url = "https://uilennest.net/stars_rectangle/?ra_min=" + ra_min.toString() + "&ra_max=" + ra_max.toString()
        url += "&dec_min=" + dec_min.toString() + "&dec_max=" + dec_max.toString()
        url += "&limit=" + my_state.data_limit.toString()

        if (my_state.status_ucac4 !== 'fetching') {

            my_dispatch({type: SET_STATUS_UCAC4, status_ucac4: 'fetching'})

            fetch(url)
                .then(results => {

                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_UCAC4, fetched_ucac4: data})
                    my_dispatch({type: SET_NUMBER_OF_STARS, number_of_stars: data.length})
                    my_dispatch({type: SET_STATUS_UCAC4, status_ucac4: 'fetched'})

                })
                .catch(function () {
                    my_dispatch({type: SET_NUMBER_OF_STARS, number_of_stars: 0})
                    my_dispatch({type: SET_STATUS_UCAC4, status_ucac4: 'failed'})
                    alert("fetch to " + url + " failed.");
                })
        }
    }

}