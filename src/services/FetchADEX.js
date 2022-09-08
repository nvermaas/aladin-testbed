import React, {useState, useEffect} from 'react';
import {useGlobalReducer} from '../contexts/GlobalContext';
import {
    SET_STATUS_ADEX,
    SET_FETCHED_ADEX,
    SET_NUMBER_OF_DATAPRODUCTS
} from '../contexts/GlobalStateReducer';


export default function FetchADEX() {

    // use global state
    const [my_state, my_dispatch] = useGlobalReducer()

    useEffect(() => {
            fetchADEX()
        }, [my_state.reload_adex]
    );

    const fetchADEX = () => {
        let d = (my_state.adex_fov / 2)
        let ra_min = Number(my_state.adex_ra) - d
        let ra_max = Number(my_state.adex_ra) + d
        let dec_min = Number(my_state.adex_dec) - d
        let dec_max = Number(my_state.adex_dec) + d

        //let url = my_state.adex_backend_url[1] + "/adex-fastapi/skyviews_rectangle/"
        let url = my_state.adex_backend_url[1] + "/adex-fastapi/skyviews_dataproducts/"
        url += "?ra_min=" + ra_min.toString() + "&ra_max=" + ra_max.toString()
        url += "&dec_min=" + dec_min.toString() + "&dec_max=" + dec_max.toString()
        url += "&collections=" + my_state.collection
        url += "&dp_types=" + my_state.dataproduct_type
        url += "&dp_subtypes=" + my_state.dataproduct_subtype
        //url += "&levels=" + my_state.level
        url += "&limit=" + my_state.data_limit.toString()
        //alert(url)
        if (my_state.status_adex !== 'fetching') {

            my_dispatch({type: SET_STATUS_ADEX, status_adex: 'fetching'})
            let startTime = new Date()
            fetch(url)
                .then(results => {

                    return results.json();
                })
                .then(data => {
                    let endTime = new Date()
                    let timeDiff = endTime - startTime

                    my_dispatch({type: SET_FETCHED_ADEX, fetched_adex: data})
                    my_dispatch({type: SET_NUMBER_OF_DATAPRODUCTS, number_of_dataproducts: data.length})
                    my_dispatch({type: SET_STATUS_ADEX, status_adex: 'fetched ('+timeDiff.toString()+' ms)'})

                })
                .catch(function () {
                    my_dispatch({type: SET_NUMBER_OF_DATAPRODUCTS, number_of_dataproducts: 0})
                    my_dispatch({type: SET_STATUS_ADEX, status_adex: 'failed'})
                    alert("fetch to " + url + " failed.");
                })
        }
    }

}